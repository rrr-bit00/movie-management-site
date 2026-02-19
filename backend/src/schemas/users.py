import uuid

from sqlmodel import SQLModel, Field
from pydantic import EmailStr


# Baseモデル（ユーザー側が触れないモデル）
class UserBase(SQLModel):
    username: str = Field(unique=True, min_length=1, max_length=20)
    # EmailStrはminを設定しなくても空文字列を排除
    email: EmailStr | None = Field(unique=True, index=True, max_length=255)
    is_active: bool = Field(default=True)


# アカウント作成（ユーザー側が触れないモデル）
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=72)


# アカウント作成（一般ユーザー用）
class UserRegister(SQLModel):
    username: str = Field(min_length=1, max_length=20)
    password: str = Field(min_length=8, max_length=20)
    email: EmailStr | None = Field(max_length=255)


# 編集用（一般ユーザー用）
class UserUpdateMe(SQLModel):
    username: str | None = Field(default=None, min_length=1, max_length=20)
    email: EmailStr | None = Field(default=None, max_length=255)


# パスワードの更新（一般ユーザー用）
class UpdatePassword(SQLModel):
    current_pass: str = Field(min_length=8, max_length=72)
    new_pass: str = Field(min_length=8, max_length=72)


# レスポンスモデル（個人用）
class UserResponse(UserBase):
    id: uuid.UUID
