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

    return (
        <section className="flex-1 bg-linear-to-b from-slate-700 via-slate-600 to-slate-100 px-3 py-4 sm:px-4 sm:py-6">
            <div className="mx-auto max-w-5xl">
                <MovieDetail movie={movie} canManage={canManage} />

                {canManage && (
                    <div className="mx-auto mt-4 flex w-full max-w-5xl flex-col-reverse gap-3 px-1 sm:flex-row sm:items-center sm:justify-between sm:px-0">
                        <Button
                            asChild
                            variant="outline"
                            className="w-full border-slate-300 bg-white text-slate-800 hover:bg-slate-50 sm:w-auto"
                        >
                            <Link href={`/movies/${id}/edit`}>映画情報を更新</Link>
                        </Button>

                        <DeleteMovieButton id={movie.id} className="w-full sm:w-auto" />
                    </div>
                )}
            </div>
        </section>
    )
}
