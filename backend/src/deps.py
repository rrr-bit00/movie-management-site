from typing import Annotated

from fastapi.security import OAuth2PasswordBearer
from pydantic import ValidationError

import jwt
from jwt.exceptions import InvalidTokenError
from fastapi import Depends, HTTPException, status
from src.core.config import settings
from src.core.database import SessionDep
from src.models.users import User
from src.schemas.token import TokenPayload


reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_STR}/login/access-token"
)

TokenDep = Annotated[str, Depends(reusable_oauth2)]


# 認証を通してユーザーを取得する関数
def get_current_user(session: SessionDep, token: TokenDep) -> User:
    # 認証を検証する
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    # 検証に失敗した場合、403のステータスコードを返す
    except (InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="認証情報を検証できませんでした",
        )
    # カレントuserを取得
    user = session.get(User, token_data.sub)
    # userがなければ404を返す
    if not user:
        raise HTTPException(status_code=404, detail="アカウントが見つかりませんでした")
    # userがあっても、activeじゃなければ400を返す
    if not user.is_active:
        raise HTTPException(status_code=400, detail="アカウントが有効ではありません")
    # 全て通れば、userを返す
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]
