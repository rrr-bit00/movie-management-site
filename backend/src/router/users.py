from typing import Any

from fastapi import APIRouter, HTTPException


from src.crud import users
from src.core.database import SessionDep
from src.core.security import get_password_hash, verify_password
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
    # emailの変更があるか判定
    if user_in.email:
        existing_user = users.get_user_by_email(session=session, email=user_in.email)
        # アカウントがあって、カレントユーザーでなければエラー
        if existing_user and existing_user.id != current_user.id:
            raise HTTPException(status_code=409, detail="")

    # 入力値だけを更新
    user_data = user_in.model_dump(exclude_unset=True)
    current_user.sqlmodel_update(user_data)
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return current_user


# 自身のアカウントのパスワードを更新
@router.patch("/me/password", response_model=Message)
def update_password_me(
    *, session: SessionDep, current_user: CurrentUser, update_password: UpdatePassword
) -> Message:
    # 返り値が(bool, str | None)なので使用しない文字列を_で受け取る
    verified, _ = verify_password(
        update_password.current_pass, current_user.hashed_pass
    )
    # ハッシュ化したパスワードと一致しなければエラー
    if not verified:
        raise HTTPException(status_code=400, detail="パスワードが違います")
    if update_password.current_pass == update_password.new_pass:
        raise HTTPException(
            status_code=400,
            detail="新しいパスワードと現在のパスワードを同じにすることはできません",
        )

    hashed_password = get_password_hash(update_password.new_pass)
    current_user.hashed_pass = hashed_password
    session.add(current_user)
    session.commit()
    return Message(message="パスワードの更新に成功しました")


# 自身のアカウントを削除
@router.delete("me", response_model=Message)
def delete_user_me(session: SessionDep, current_user: CurrentUser) -> Message:
    session.delete(current_user)
    session.commit()
    return Message(message="アカウントの削除に成功しました")


# ログイン前にアカウントを新規作成
@router.post("/signup", response_model=UserRegister)
def register_user(session: SessionDep, user_in: UserRegister) -> Any:
    user = users.get_user_by_email(session=session, email=user_in.email)
    # 既にEmailが登録されていればエラー
    if user:
        raise HTTPException(status_code=400, detail="このEmailはすでに登録されています")
    user_create = UserCreate.model_validate(user_in)
    user = users.create_user(session=session, user_create=user_create)
    return user
