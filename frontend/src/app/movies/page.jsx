import MovieList from "@/components/crud/MovieList"
import StatusFilter from "@/components/ui/status-filter";
import { searchMovies } from "@/lib/search";

export default async function MoviePage({ searchParams }) {
    const { q, status } = await searchParams
    // クエリがあるか判定
    const query = q ?? ''
    // ステータスコードの中身で内容を変える
    const statusCode = status && status !== "all" ? status : null

    // 検索クエリから問い合わせ
    const movies = await searchMovies(query, statusCode)

    return (
        <div className="flex-1 bg-[linear-gradient(180deg,_#2c3037_0%,_#31353d_48%,_#2a2e35_100%)] py-10">
            <div className="mx-auto max-w-6xl px-4">
                <div className="mb-6">
                    <StatusFilter />
                </div>

                <div className="flex flex-wrap justify-center">
                    <MovieList movies={movies} />
                </div>
            </div>
        </div>
    )
}
