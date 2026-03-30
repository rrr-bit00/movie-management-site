import uuid

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
    # 検証とUserの取得失敗時に401を返したいのでまとめる
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="認証情報を検証できませんでした",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # 認証を検証する
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
            options={"require": ["sub", "exp"]},
        )
        token_data = TokenPayload(**payload)

        if token_data.sub is None:
            raise credentials_exception

        # subが文字列なので、一応DB接続前にUUIDに変換しておく
        user_id = uuid.UUID(token_data.sub)
    except (InvalidTokenError, ValidationError):
        raise credentials_exception
    # カレントuserを取得
    user = session.get(User, user_id)
    if not user:
        raise credentials_exception
    # userがあっても、activeじゃなければ400を返す
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="アカウントが有効ではありません",
        )
    # 全て通れば、userを返す
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]
