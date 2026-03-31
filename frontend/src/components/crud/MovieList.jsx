'use client'

import Link from "next/link"

export default function MovieList({ movies }) {
    if (!movies || movies.length === 0)
        return <p className="text-muted-foreground">作品が見つかりませんでした</p>
    return (
        <>
            {movies.map((movie) => (
                <Link href={`/movies/${movie.id}`} key={movie.id} className="mx-5 my-6">
                    <div className="block max-w-sm overflow-hidden rounded border-3 border-solid border-gray-300 shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
                        {movie.image ? (
                            <img
                                className="flex h-52 w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300"
                                src={movie.image}
                                alt={movie.title}
                                loading="lazy"
                            />
                        ) : (
                            <div className="flex h-52 w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 text-sm text-slate-600">
                                No Image
                            </div>
                        )}
                        <div className="px-6 py-4 text-center">
                            <h3 className="font-bold text-xl mb-2">title : {movie.title}</h3>
                            <p className="mb-1">director : {movie.director}</p>
                            <p className="mb-2">released_year : {movie.released_year}</p>
                            <p className="line-clamp-2">description: {movie.description}</p>
                        </div>
                    </div>
                </Link>
            ))
            }
        </>
    )
}
