import { mocksData } from "./mockData";

// モックの一覧取得
export async function searchMoviesMock(q = "", statusCode = null) {
    // Mockデータ用
    await new Promise(resolve => setTimeout(resolve, 100))

    let movies = [...mocksData]
    const keyword = q.trim().toLowerCase()
    if (keyword) {
        movies = movies.filter(movie => {
            const titleMatch = movie.title.toLowerCase().includes(keyword)
            const directorMatch = movie.director.toLowerCase().includes(keyword)
            const yearMatch = String(movie.released_year ?? "").toLowerCase().includes(keyword)

            return titleMatch || directorMatch || yearMatch
        })
    }

    if (statusCode) {
        movies = movies.filter(movie => movie.status?.code === statusCode)
    }

    return movies
}

// モックの詳細を取得
export async function getMovieIdMock(id) {
    await new Promise(r => setTimeout(r, 100))
    return mocksData.find(m => m.id === Number(id)) ?? null
}
