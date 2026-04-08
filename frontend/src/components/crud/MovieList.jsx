'use client'

import Link from "next/link"

export default function MovieList({ movies }) {
    if (!movies || movies.length === 0)
        return <p className="text-muted-foreground">作品が見つかりませんでした</p>
    return (
        <>
            {movies.map((movie) => (
                <Link href={`/movies/${movie.id}`} key={movie.id} className="mx-5 my-6 border border-amber-300/4 hover:shadow-amber-300/20" >
                    <div className="block max-w-sm overflow-hidden rounded border-3 border-solid border-gray-300 shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
                        {movie.image ? (
                            <img
                                className="flex h-52 w-full items-center justify-center bg-linear-to-br from-slate-200 to-slate-300"
                                src={movie.image}
                                alt={movie.title}
                                loading="lazy"
                            />
                        ) : (
                            <div className="flex h-52 w-full items-center justify-center bg-linear-to-br from-slate-200 to-slate-300 text-sm text-slate-600">
                                No Image
                            </div>
                        )}
                        <div className="px-6 py-4 text-center bg-white/12">
                            <h3 className="font-bold text-xl mb-2 text-amber-200">{movie.title}</h3>
                            <p className="mb-1 text-slate-200/90">監督 {movie.director}</p>
                            <p className="mb-2 text-slate-200/90">{movie.released_year} 年公開</p>
                            <p className="line-clamp-2">{movie.description}</p>
                        </div>
                    </div>
                </Link>
            ))
            }
        </>
    )
}
