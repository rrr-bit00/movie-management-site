import Link from "next/link"
import MovieDetail from "@/components/crud/MovieDetail"
import { getMovieById } from "@/lib/search"
import { Button } from "@/components/ui/button"
import { getSessionOrNull } from "@/lib/session"
import DeleteMovieButton from "@/components/crud/DeleteMovieButton"

export default async function page({ params }) {
    const { id } = await params
    const session = await getSessionOrNull()

    const movie = await getMovieById(id)
    const canManage = Boolean(session) && typeof movie?.id === "string"
    // params（id）のDataを取得する
    return (
        <section className="min-h-[calc(100dvh-76px-64px)] bg-linear-to-b from-slate-700 via-slate-600 to-slate-100 py-8">
            <div className="mx-auto max-w-5xl">
                <MovieDetail movie={movie} canManage={canManage} />
                {canManage && (
                    <div className="flex mx-auto max-w-4xl px-4 pb-8 items-start justify-between">
                        <Button asChild variant="outline" className=" border-slate-300 bg-white text-slate-800 hover:bg-slate-50">
                            <Link href={`/movies/${id}/edit`}>映画情報を更新</Link>
                        </Button>

                        <DeleteMovieButton id={movie.id} />
                    </div>
                )}
            </div>
        </section>
    )
}
