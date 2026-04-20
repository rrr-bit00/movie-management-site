'use client'

import Link from "next/link"
import { getStatusClass } from "@/lib/status"

export default function MovieList({ movies }) {
    if (!movies || movies.length === 0) {
        return <p className="text-muted-foreground">作品が見つかりませんでした</p>
    }

    return (
        <>
            {movies.map((movie) => {
                const hasImage = Boolean(movie.image?.trim())
                const description = movie.description?.trim() || "あらすじ未登録"
                const releasedYear = movie.released_year
                    ? `${movie.released_year} 年公開`
                    : "公開年未登録"

                return (
                    <Link
                        href={`/movies/${movie.id}`}
                        key={movie.id}
                        className="mx-3 my-4 block w-[250px] shrink-0"
                    >
                        <article className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-gray-300 bg-slate-700/95 shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
                            <div className="aspect-[4/3] w-full shrink-0 overflow-hidden bg-slate-900">
                                {hasImage ? (
                                    <img
                                        src={movie.image}
                                        alt={movie.title}
                                        loading="lazy"
                                        className="block h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_35%_22%,_rgba(96,165,250,0.14),_transparent_26%),radial-gradient(circle_at_78%_30%,_rgba(139,92,246,0.22),_transparent_30%),linear-gradient(180deg,_#111827_0%,_#191c2a_52%,_#20183d_100%)]">
                                        <img
                                            src="/images/movie-placeholder-icon.svg"
                                            alt=""
                                            aria-hidden="true"
                                            className="h-30 w-30 object-contain opacity-95"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-1 flex-col px-5 py-4">
                                <h3 className="line-clamp-2 min-h-[1rem] text-center text-xl font-bold text-amber-200">
                                    {movie.title}
                                </h3>

                                <div className="mt-3 flex items-start justify-between gap-3">
                                    <div className="min-w-0 text-left">
                                        <p className="line-clamp-1 text-slate-200/90">
                                            監督 {movie.director}
                                        </p>
                                        <p className="mt-1 line-clamp-1 text-slate-200/90">
                                            {releasedYear}
                                        </p>
                                    </div>

                                    {movie.status && (
                                        <span
                                            className={`shrink-0 rounded-full border px-3 py-1 text-sm font-medium ${getStatusClass(movie.status.code)}`}
                                        >
                                            {movie.status.label}
                                        </span>
                                    )}
                                </div>

                                <p className="mt-4 line-clamp-2 min-h-[3.5rem] text-left text-slate-100/90">
                                    {description}
                                </p>
                            </div>
                        </article>
                    </Link>
                )
            })}
        </>
    )
}
