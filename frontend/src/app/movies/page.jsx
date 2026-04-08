import MovieList from "@/components/crud/MovieList"
import { searchMovies } from "@/lib/search";

export default async function MoviePage({ searchParams }) {
    const { q } = await searchParams
    // クエリがあるか判定
    const query = q ?? ''

    // 検索クエリから問い合わせ
    const movies = await searchMovies(query)

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_25%_35%,_#f5b97155,_transparent_28%),radial-gradient(circle_at_80%_20%,_#76b7ff4d,_transparent_26%),radial-gradient(circle_at_50%_80%,_#7fd8b240,_transparent_30%),linear-gradient(165deg,_#0e131b,_#1b2432_58%,_#1a1714)] py-10">
            <div className="flex flex-wrap justify-center">
                <MovieList movies={movies} />
            </div >
        </div>
    )
}
