from sqlmodel import Session
from pydantic import EmailStr

from src.core.security import verify_password
from src.crud.users import get_user_by_email, set_hash_password
from src.models.users import User


# ダミー用のArgon2ハッシュ
DUMMY_HASH = "$argon2id$v=19$m=65536,t=3,p=4$3cpnyD27TIoCfrodA5OrXw$elfbDgEQ7FU/Llg7UALYVsw98mj7B5KWvwiLScv3cK0"


# ログイン時の認証用関数
def authenticate(*, session: Session, email: EmailStr, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        # パスワードを検証することでタイミング攻撃を防止。
        # メールアドレスが存在するかどうかに関わらず応答時間を同じにできる。
        verify_password(password, DUMMY_HASH)
        return None

    verified, updated_hash_password = verify_password(password, db_user.hashed_password)
    # dbのハッシュ化したパスワードと一致しなければNone
    if not verified:
        return None
    if updated_hash_password:
        set_hash_password(
            session=session, hashed_password=updated_hash_password, user=db_user
        )
    return db_user
