export async function searchMoviesApi(q) {
    const res = await fetch(
        // localhostではコンテナ内でアクセスするため、コンテナのサービス名を指定する
        `http://backend:8080/movies?query=${encodeURIComponent(q)}`,
        { cache: "no-store" }
    )

    if (!res.ok) {
        throw new Error("検索に失敗しました")
    }
    return res.json()
}

export async function getMovieIdApi(id) {
    const res = await fetch(
        `http://backend:8080/movies/${id}`,
        { cache: "no-store" }
    )
    if (!res.ok) {
        throw new Error("詳細の取得に失敗しました")
    }
    return res.json()
}

export async function createMovieApi(body) {
    const res = await fetch(
        `http://backend:8080/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // メタデータの宣言(JSONを渡す)
        body: JSON.stringify(body),
    }
    )
    if (!res.ok) {
        throw new Error("作成に失敗しました")
    }
    return res.json()
}

export async function updateMovieApi(body) {
    const res = await fetch(
        `http://backend:8080/movies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
    )
    if (!res.ok) {
        throw new Error("更新に失敗しました")
    }
    return res.json()
}

export async function deleteMovieApi(id) {
    const res = await fetch(
        `http://backend:8080/movies/${id}`, {
        method: "DELETE",
    }
    )
    if (!res.ok) {
        throw new Error("削除に失敗しました")
    }
    return res.json()
}
