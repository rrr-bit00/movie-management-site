import Link from "next/link"
import MovieDetail from "@/components/crud/MovieDetail"
import { getMovieById } from "@/lib/search"
import { Button } from "@/components/ui/button"
import { getSessionOrNull } from "@/lib/session"

export default async function page({ params }) {
    const { id } = await params
    const session = await getSessionOrNull()

    const movie = await getMovieById(id)
    const canManage = Boolean(session) && typeof movie?.id === "string"
    // params（id）のDataを取得する
    return (
        <>
            <MovieDetail movie={movie} canManage={canManage} />
            {canManage && (
                <div className="mx-auto max-w-4xl px-4 pb-8">
                    <Button asChild variant="outline" className="w-full border-slate-300 bg-white text-slate-800 hover:bg-slate-50">
                        <Link href={`/movies/${id}/edit`}>映画情報を更新</Link>
                    </Button>
                </div>
            )}
        </>
    )
}
