export async function searchMoviesApi(q) {
    const res = await fetch(
        `http://localhost:8080/movies?query=${encodeURIComponent(q)}`,
        {cache: "no-store"}
    )

    if (!res.ok) {
        throw new Error("検索に失敗しました")
    }
    return res.json()
}

export async function getMovieIdApi(id) {
    const res = await fetch (
        `http://localhost:8080/movies/${id}`,
        {cache: "no-store"}
    )
    if (!res.ok) {
        throw new Error("詳細の取得に失敗しました")
    }
    return res.json()
}
