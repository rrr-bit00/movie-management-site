'use client'

import { getStatusClass } from "@/lib/status"

export default function MovieDetail({ movie }) {
  if (!movie) {
    return (
      <div className="flex-1 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/40 px-4">
        <p className="text-base text-slate-300">
          作品が削除されたか、詳細がありません
        </p>
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_#1e293b_0%,_#0f172a_100%)]" />
      )}

      <div className="relative z-10 p-3 sm:p-4 md:p-6">
        <div className="grid gap-4 lg:grid-cols-[220px_1fr] xl:grid-cols-[250px_1fr]">
          <div className="mx-auto w-full max-w-[180px] overflow-hidden rounded-xl border border-white/10 bg-slate-900 sm:max-w-[220px] lg:mx-0 lg:max-w-none">
            {movie.image ? (
              <img
                src={movie.image}
                alt={movie.title}
                className="block aspect-[2/3] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center bg-slate-900">
                <img
                  src="/images/movie-placeholder-icon.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-40 w-40 object-contain opacity-95 sm:h-28 sm:w-28"
                />
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/8 p-4 sm:p-5 backdrop-blur-[2px]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="break-words text-xl font-bold leading-tight text-yellow-300 sm:text-2xl md:text-3xl">
                  {movie.title}
                </h1>
                <p className="mt-3 text-sm text-slate-100 sm:text-base">
                  監督 {movie.director}
                </p>
                <p className="mt-1 text-sm text-slate-200 sm:text-base">
                  {movie.released_year} 年公開
                </p>
              </div>

              {movie.status && (
                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium sm:text-sm ${getStatusClass(movie.status.code)}`}
                >
                  {movie.status.label}
                </span>
              )}
            </div>

            <div className="mt-5">
              <h2 className="mb-2 text-sm font-semibold tracking-wide text-slate-300">
                あらすじ
              </h2>
              <p className="text-sm leading-7 text-slate-100 sm:text-base sm:leading-8">
                {movie.description || "未登録"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
