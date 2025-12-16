import MovieList from "@/components/crud/MovieList"
import { searchMovies } from "@/lib/search";

export default async function MoviePage({searchParams}) {
    // クエリがあるか判定
    const query = searchParams.q ?? ''

    // 検索クエリから問い合わせ
    const movies = await searchMovies(query)

    return (
        <div className="flex flex-wrap justify-center">
            <MovieList movies={movies} />
        </div >
    )
}

