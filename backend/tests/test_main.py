from fastapi.testclient import TestClient

from ..main import app

# TestClientを作成
client = TestClient(app)

def test_read_main():
    # クライアントを通してリクエストを送信
    response = client.get("/")
    # ステータスのアサート
    assert response.status_code == 200
    # bodyのアサート
    assert response.json() == {"msg": "Hello World"}
