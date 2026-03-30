import MovieList from "@/components/crud/MovieList"
import { searchMovies } from "@/lib/search";
import { requireSession } from "@/lib/session";

export default async function MoviePage({ searchParams }) {
    await requireSession()

    const { q } = await searchParams
    // クエリがあるか判定
    const query = q ?? ''

    // 検索クエリから問い合わせ
    const movies = await searchMovies(query)

    return (
        <div className="flex flex-wrap justify-center">
            <MovieList movies={movies} />
        </div >
    )
}
