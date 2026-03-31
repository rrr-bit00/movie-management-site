from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from src.core import security
from src.core.config import settings
from src.core.database import SessionDep
from src.crud.auth import authenticate
from src.schemas.token import Token


router = APIRouter(tags=["login"])


# ログイン時に期限付きトークンを付与する
@router.post("/login/access-token")
def login_access_token(
    session: SessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    # OAuth2PasswordRequestFormはフォーム項目名が username / password 固定。
    # username には「ユーザー名またはメールアドレス」を入れる。
    user = authenticate(
        session=session, identifier=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="ユーザー名かパスワードが間違っています",
        )
    # userがあってもacitiveとは限らないため、確認
    elif not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="アクティブなアカウントではありません",
        )
    # トークンの期限を発行
    access_token_exp = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(
        access_token=security.create_access_token(
            user.id, expires_delta=access_token_exp
        )
    )
