import os

os.environ["RUN_DB_INIT_ON_STARTUP"] = "false"

import pytest
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, Session, create_engine
from sqlmodel.pool import StaticPool

from src.main import app
from src.models.users import User
from src.deps import get_current_user
from src.db.init_statuses import init_statuses


sqlite_url = "sqlite://"
test_engine = create_engine(
    sqlite_url,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)


@pytest.fixture()
def client():
    # テストテーブル、エンジンの作成
    app.state.engine = test_engine
    SQLModel.metadata.create_all(test_engine)

    # テストユーザーをDBに作る
    with Session(test_engine) as session:
        init_statuses(session)

        test_user = User(
            username="testuser",
            email="test@example.com",
            hashed_password="dummy",
            is_active=True,
        )
        session.add(test_user)
        session.commit()
        session.refresh(test_user)

    # 認証依存を override
    def override_get_current_user():
        return test_user

    app.dependency_overrides[get_current_user] = override_get_current_user

    with TestClient(app) as c:
        yield c

    app.dependency_overrides.clear()
    SQLModel.metadata.drop_all(test_engine)

    if hasattr(app.state, "engine"):
        del app.state.engine
