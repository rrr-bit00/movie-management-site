export default function MovieDetail({movie}) {
    if (!movie) {
      return <p>作品が削除されたか、詳細がありません</p>
    }

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>監督：{movie.director}</p>
      <p>公開年：{movie.year}</p>
      <p>{movie.description}</p>
    </div>
  )
}
