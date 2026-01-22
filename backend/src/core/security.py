from datetime import datetime, timedelta

from passlib.context import CryptContext


pwd_context = CryptContext(schemas=["bcrypt"], deprecated="auto")

# plain_passwordとhashed_passwordが一致するか確認
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# plain_passwordをhashed_passwordにする
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)
