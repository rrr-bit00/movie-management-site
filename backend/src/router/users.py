from typing import Any

from fastapi import APIRouter, HTTPException


from src.crud import users
from src.core.database import SessionDep
from src.core.security import verify_password
from src.deps import CurrentUser
from src.schemas.message import Message
from src.schemas.users import (
    UserCreate,
    UserRegister,
    UserUpdateMe,
    UserResponse,
    UpdatePassword,
)

router = APIRouter(prefix="/users", tags=["users"])


# ユーザー自身のアカウントを取得
@router.get("/me", response_model=UserResponse)
def read_user_me(current_user: CurrentUser) -> Any:
    return current_user


# 自身のアカウントを編集
@router.patch("/me", response_model=UserResponse)
def update_user_me(
    *, session: SessionDep, current_user: CurrentUser, user_in: UserUpdateMe
) -> Any:
    # ユーザー名の変更があるか判定
    if user_in.username:
        existing_user = users.get_user_by_name(
            session=session, username=user_in.username
        )
        # アカウントがあって、カレントユーザーでなければエラー
        if existing_user and existing_user.id != current_user.id:
            raise HTTPException(
                status_code=409, detail="すでに使用されているユーザー名です"
            )
    updated_user = users.update_current_user(
        session=session, update_user=user_in, current_user=current_user
    )

    return updated_user


# 自身のアカウントのパスワードを更新
@router.patch("/me/password", response_model=Message)
def update_password_me(
    *, session: SessionDep, current_user: CurrentUser, update_password: UpdatePassword
) -> Message:
    # 返り値が(bool, str | None)なので使用しない文字列を_で受け取る
    verified, _ = verify_password(
        update_password.current_pass, current_user.hashed_password
    )
    # ハッシュ化したパスワードと一致しなければエラー
    if not verified:
        raise HTTPException(status_code=400, detail="パスワードが違います")
    if update_password.current_pass == update_password.new_pass:
        raise HTTPException(
            status_code=400,
            detail="新しいパスワードと現在のパスワードを同じにすることはできません",
        )

    updated_password_message = users.update_current_password(
        session=session,
        update_password=update_password,
        current_user=current_user,
    )
    return updated_password_message


# 自身のアカウントを削除
@router.delete("/me", response_model=Message)
def delete_user_me(session: SessionDep, current_user: CurrentUser) -> Message:
    deleted_user_message = users.delete_current_user(session, current_user)
    return deleted_user_message


# ログイン前にアカウントを新規作成
@router.post("/signup", response_model=UserResponse)
def register_user(session: SessionDep, user_in: UserRegister) -> Any:
    user = users.get_user_by_name(session, user_in.username)
    # 既にユーザー名が登録されていればエラー
    if user:
        raise HTTPException(
            status_code=400, detail="このユーザー名は既に使用されています"
        )
    user_create = UserCreate.model_validate(user_in)
    user = users.create_user(session, user_create)
    return user
