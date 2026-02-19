from datetime import datetime, timedelta, timezone
from typing import Any
import jwt
from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher
from pwdlib.hashers.bcrypt import BcryptHasher

from src.core.config import settings


password_hash = PasswordHash((Argon2Hasher(), BcryptHasher()))


# plain_passwordとhashed_passwordが一致するか確認
# 返り値はboolとhashパスの文字列
def verify_password(
    plain_password: str, hashed_password: str
) -> tuple[bool, str | None]:
    return password_hash.verify_and_update(plain_password, hashed_password)


# plain_passwordをhashed_passwordにする
def get_password_hash(password: str) -> str:
    return password_hash.hash(password)


# 期限付きトークンを作成する関数
def create_access_token(subject: str | Any, expires_delta: timedelta) -> str:
    expire = datetime.now(timezone.utc) + expires_delta
    # 期限とuuidを入れたjwtのペイロードを作成
    to_encode = {"exp": expire, "sub": str(subject)}
    # JWT署名（トークン）を作成
    encode_jwt = jwt.encode(
        to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return encode_jwt
