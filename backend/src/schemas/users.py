import uuid

from sqlmodel import SQLModel, Field
from pydantic import EmailStr

# Baseモデル（管理者以上の権限）
class UserBase(SQLModel):
    username: str = Field(min_length=1, max_length=20)
    # EmailStrはminを設定しなくても空文字列を排除
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)

# アカウント作成（管理者以上の権限）
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=72)

# アカウント作成（一般ユーザー用）
class UserRegister(SQLModel):
    username: str = Field(min_length=1, max_length=20)
    password: str = Field(min_length=8, max_length=20)
    email: EmailStr = Field(max_length=255)

# 編集用（管理者以上の権限）
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)
    password: str | None = Field(default=None, min_length=8, max_length=72)

# 編集用（一般ユーザー用）
class UserUpdateMe(SQLModel):
    username: str | None = Field(default=None, max_length=20)
    email: EmailStr | None = Field(default=None, max_length=255)

# パスワードの更新（一般ユーザー用）
class UpdatePassword(SQLModel):
    current_pass: str = Field(min_length=8, max_length=72)
    new_pass: str = Field(min_length=8, max_length=72)

# レスポンスモデル（個人用）
class UserResponse(UserBase):
    id: uuid.UUID

# レスポンスモデル（複数人用）
class UsersResponse(SQLModel):
    data: list[UserPublic]
    count: int
