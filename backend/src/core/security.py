from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher
from pwdlib.hashers.bcrypt import BcryptHasher


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
