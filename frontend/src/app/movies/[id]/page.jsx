import MovieDetail from "@/components/crud/MovieDetail"
import { getMovieById } from "@/lib/search"

export default async function page({ params }) {
    const movie = await getMovieById(params.id)

    // params（id）のDataを取得する
    return (
        <MovieDetail movie={movie}/>
    )
}
