from contextlib import asynccontextmanager

from fastapi import FastAPI

from src.core.database import create_db_and_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    # 起動時の処理
    print("start apps")
    create_db_and_tables()

    # 起動時と終了時の実行を分ける
    yield

    # 終了時の実行
    print("end apps")
