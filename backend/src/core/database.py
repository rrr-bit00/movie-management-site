from typing import Annotated
from fastapi import Depends
from sqlmodel import create_engine, SQLModel, Session

# create_allの前にDBのテーブル設計を読み込んでいる必要があるのでインポート
from src.models.users import User
from src.models.movies import Movie


SQLITE_URL = "sqlite:///./movies.db"

engine = create_engine(SQLITE_URL, connect_args={"check_same_thread": False})


# DBとテーブル作成
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


# Session
def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
