from fastapi.testclient import TestClient

def test_create_movie(client: TestClient):
    # Create
    r = client.post("/movies", json={
        "title": "test1",
        "description": "lorem",
        "director": "John",
        "released_year": 2020
        })

    assert r.status_code in (200, 201)

    movie = r.json()
    movie_id = movie["id"]
    assert movie_id is not None

    # Read
    r = client.get(f"/movies/{movie_id}")
    assert r.status_code == 200
    assert r.json()['title'] == "test1"

    # Update
    r = client.put(f"/movies/{movie_id}", json={
        "title": "test-update",
        "description": "lorem2",
        "director": "Anna"})
    assert r.status_code == 200
    assert r.json()["title"] == "test-update"

    # Delete
    r = client.delete(f"/movies/{movie_id}")
    assert r.status_code in (200, 204)

    # 削除の確認
    r = client.get(f"/movies/{movie_id}")
    assert r.status_code == 404
