import Link from "next/link"
import MovieDetail from "@/components/crud/MovieDetail"
import { getMovieById } from "@/lib/search"
import { Button } from "@/components/ui/button"
import { requireSession } from "@/lib/session"

export default async function page({ params }) {
    await requireSession()

    const { id } = await params

    const movie = await getMovieById(id)
    // params（id）のDataを取得する
    return (
        <>
            <MovieDetail movie={movie} />
            <Button asChild>
                <Link href={`/movies/${id}/edit`}>映画情報の編集</Link>
            </Button>
        </>
    )
}
