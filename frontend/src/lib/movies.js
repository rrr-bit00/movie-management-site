import { mocksData } from "./mock/mock"

export async function searchMovies(q) {

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

    if (!q) return []

    const res = await fetch(
        `http://localhost:8080/movies?query=${encodeURIComponent(q)}`,
        {cache: "no-store"}
    )

    if (!res.ok) {
        throw new Error("検索に失敗しました")
    }

    return res.json()
}
