'use client'

import DeleteMovieButton from "./DeleteMovieButton"

export default function MovieDetail({ movie }) {
  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 text-lg">作品が削除されたか、詳細がありません</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* 画像セクション */}
        <div className="relative h-96 bg-gradient-to-br from-slate-800 to-slate-900">
          <img
            className="w-full h-full object-contain p-8"
            src={movie.image}
            alt={movie.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </div>

        {/* 情報セクション */}
        <div className="p-8 space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            {movie.title}
          </h2>

          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-medium">監督</span>
              <span className="text-gray-900">{movie.director}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-medium">公開年</span>
              <span className="text-gray-900">{movie.released_year}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              {movie.description}
            </p>
          </div>

          <div className="pt-4">
            <DeleteMovieButton id={movie.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
