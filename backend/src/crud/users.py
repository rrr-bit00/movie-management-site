from typing import Any
from sqlmodel import Session, select
from pydantic import EmailStr

from src.core.security import get_password_hash
from src.deps import CurrentUser
from src.models.users import User
from src.schemas.message import Message
from src.schemas.users import UpdatePassword, UserCreate, UserUpdateMe


def get_user_by_email(session: Session, email: EmailStr) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user


def get_user_by_username(session: Session, username: str) -> User | None:
    statement = select(User).where(User.username == username)
    session_user = session.exec(statement).first()
    return session_user


# DBにユーザーを登録
def create_user(session: Session, user_create: UserCreate) -> User:
    db_obj = User.model_validate(
        user_create, update={"hashed_password": get_password_hash(user_create.password)}
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


# アカウント情報を更新する処理
def update_current_user(
    *, session: Session, update_user: UserUpdateMe, current_user: CurrentUser
) -> Any:
    # 入力値だけを更新（入力されていないデータは無視）
    user_data = update_user.model_dump(exclude_unset=True)
    current_user.sqlmodel_update(user_data)
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return current_user


# アカウントのパスワードを更新する処理
def update_current_password(
    *, session: Session, update_password: UpdatePassword, current_user: CurrentUser
) -> Message:
    # 入力されたパスワードをハッシュ化して、更新
    hashed_password = get_password_hash(update_password.new_pass)
    set_hash_password(
        session=session, hashed_password=hashed_password, user=current_user
    )
    return Message(message="パスワードの更新に成功しました")


# 自身のアカウントを削除する処理
def delete_current_user(session: Session, current_user: CurrentUser) -> Message:
    session.delete(current_user)
    session.commit()
    return Message(message="アカウントの削除に成功しました")


def set_hash_password(*, session: Session, hashed_password: str, user: User) -> None:
    user.hashed_password = hashed_password
    session.add(user)
    session.commit()
