import GetMovie from "@/components/crud/GetMovie"
import { searchMovies } from "@/lib/movies";

export default async function MoviePage({searchParams}) {
    const query = searchParams.q ?? ''

    // 検索クエリから問い合わせ
    const movies = await searchMovies(query)

    return (
        <div className="flex flex-wrap justify-center">
            <GetMovie movies={movies} />
        </div >
    )
}

