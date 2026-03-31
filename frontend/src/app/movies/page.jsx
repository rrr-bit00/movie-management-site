import MovieList from "@/components/crud/MovieList"
import { searchMovies } from "@/lib/search";

export default async function MoviePage({ searchParams }) {
    const { q } = await searchParams
    // クエリがあるか判定
    const query = q ?? ''

    // 検索クエリから問い合わせ
    const movies = await searchMovies(query)

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_80%_40%,_#f6d1a5,_transparent_25%),radial-gradient(circle_at_30%_70%,_#c9e6ff,_transparent_25%),linear-gradient(345deg,_#0f1218,_#192333_55%,_#12161d)] py-10">
            <div className="flex flex-wrap justify-center">
                <MovieList movies={movies} />
            </div >
        </div>
    )
}
