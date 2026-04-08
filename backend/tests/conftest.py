import os

os.environ["RUN_DB_INIT_ON_STARTUP"] = "false"

import pytest
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, create_engine
from sqlmodel.pool import StaticPool

from src.main import app

sqlite_url = "sqlite://"
test_engine = create_engine(
    sqlite_url, connect_args={"check_same_thread": False}, poolclass=StaticPool
)


@pytest.fixture()
def client():
    # テストテーブル、エンジンの作成
    app.state.engine = test_engine
    SQLModel.metadata.create_all(test_engine)

    with TestClient(app) as c:
        yield c

    SQLModel.metadata.drop_all(test_engine)

    if hasattr(app.state, "engine"):
        del app.state.engine
