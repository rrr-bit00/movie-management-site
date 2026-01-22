from typing import Any

from fastapi import APIRouter, HTTPException


from src.crud import users
from src.core.database import SessionDep
from src.core.security import get_password_hash, verify_password
from src.deps import CurrentUser
from src.schemas.users import (
    UserCreate,
    UserRegister,
    UserUpdate,
    UserUpdateMe,
    UserResponse,
    UsersResponse,
    UpdatePassword,
)
from src.models.users import User
from src.models.movies import Movies

router = APIRouter(prefix="/users", tags=["users"])

# ユーザー自身のアカウントを取得
@router.get("/me", response_model=UserResponse)
def read_user_me(current_user: CurrentUser) -> Any:
    return current_user

# ログイン前にアカウントを新規作成
@router.post("/signup", response_model=UserRegister):
def register_user(session: SessionDep, user_in: UserRegister) -> Any:
    user = users.get_user_by_email(session=session, email=user_in.email)
    # 既にEmailが登録されていればTrue、なければFalse
    if user:
        raise HTTPException(
            status_code=400,
            detail="このEmailはすでに登録されています"
        )
    user_cretate = UserCreate.model_validate(user_in)
    user = users.create_user(session=session, user_cretate=user_cretate)
    return user

