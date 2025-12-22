import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.pool import StaticPool

from main import app
from db.database import get_session

sqlite_url = "sqlite://"
test_engine = create_engine(sqlite_url, connect_args={"check_same_thread": False},
                       poolclass=StaticPool)

@pytest.fixture()
def client():
    # テストテーブルの作成
    SQLModel.metadata.create_all(test_engine)

    # オーバーライド用関数
    def override_get_session():
        with Session(test_engine) as session:
            yield session

    # オーバーライド
    app.dependency_overrides[get_session] = override_get_session

    with TestClient(app) as c:
        yield c

    # 削除
    app.dependency_overrides.clear()
    SQLModel.metadata.drop_all(test_engine)
