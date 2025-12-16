import { mocksData } from "./mockData";

// モックの一覧取得
export async function searchMoviesMock(q) {
    // Mockデータ用
    await new Promise(resolve => setTimeout(resolve, 100))

    if (!q) return mocksData

    q = q.toLowerCase()

    return mocksData.filter(movie => {
        const titleMatch = movie.title.toLowerCase().includes(q)
        const directorMatch = movie.director.toLowerCase().includes(q)
        const yearMatch = movie.director.toLowerCase().includes(q)

        return titleMatch || directorMatch || yearMatch
    })
}

// モックの詳細を取得
export async function getMovieIdMock(id) {
    await new Promise(r => setTimeout(r, 100))
    return mocksData.find(m => m.id === Number(id)) ?? null
}
