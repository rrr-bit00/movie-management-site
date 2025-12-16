import Link from "next/link"

export default async function MovieList({ movies }) {
    if (!movies || movies.length === 0)
        return <p className="text-muted-foreground">作品が見つかりませんでした</p>
    return (
        <>
            {movies.map((movie) => (
                <Link href={`/movies/${movie.id}`} key={movie.id} className="mx-5 my-6">
                    <div className="border-solid border-3 border-gray-300 max-w-sm rounded overflow-hidden shadow-lg block">
                        <img className="w-full h-50" src={movie.image} alt={movie.title} />
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
