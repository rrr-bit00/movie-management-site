import os

from contextlib import asynccontextmanager

from fastapi import FastAPI

from src.core.database import build_engine, create_db_and_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    # 起動時の処理
    print("start apps")

    if not hasattr(app.state, "engine"):
        app.state.engine = build_engine()

    if os.getenv("RUN_DB_INIT_ON_STARTUP", "true").lower() == "true":
        create_db_and_tables(app.state.engine)

    # 起動時と終了時の実行を分ける
    yield

    # 終了時の実行
    print("end apps")
