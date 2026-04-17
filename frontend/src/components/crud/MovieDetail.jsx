'use client'

import { getStatusClass } from "@/lib/status"

export default function MovieDetail({ movie }) {
  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 text-lg">作品が削除されたか、詳細がありません</p>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
      {movie.image ? (
        <>
          <img
            src={movie.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-slate-950/60" />
        </>
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-slate-800 via-slate-900 to-slate-950" />
      )}

      <div className="relative z-10 p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          <div className="overflow-hidden rounded-xl border border-white/10">
            <img
              src={movie.image}
              alt={movie.title}
              className="block h-80 w-full object-cover md:h-full"
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-yellow-300">{movie.title}</h1>
                <p className="mt-2 text-lg text-slate-100">監督 {movie.director}</p>
                <p className="mt-1 text-slate-200">{movie.released_year} 年公開</p>
              </div>

              {movie.status && (
                <span className={`shrink-0 rounded-full border px-3 py-1 text-sm font-medium ${getStatusClass(movie.status.code)}`}>
                  {movie.status.label}
                </span>
              )}
            </div>

            {movie.description && (
              <div className="mt-6">
                <h2 className="mb-2 text-sm font-semibold tracking-wide text-slate-300">
                  あらすじ
                </h2>
                <p className="leading-7 text-slate-100">{movie.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
