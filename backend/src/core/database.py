from typing import Annotated
from fastapi import Depends
from sqlmodel import create_engine, SQLModel, Session

# create_allの前にDBのテーブル設計を読み込んでいる必要があるのでインポート
from src.core.config import settings
from src.models.users import User
from src.models.movies import Movie


engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))


# DBとテーブル作成
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


# Session
def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
