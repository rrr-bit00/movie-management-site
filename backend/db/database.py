from typing import Annotated
from fastapi import Depends
from sqlmodel import create_engine, SQLmodel

SQLITE_URL = "sqlite:///./movies.db"

engine = create_engine(
    SQLITE_URL, connect_args={"check_same_thread": False}
)

# DBとテーブル作成
def create_db_and_tables:
    SQLmodel.metadata.create_all(engine)

# Session
def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]
