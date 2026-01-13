import { notFound } from "next/navigation";
import { getMovieById } from "@/lib/search";
import MovieEdit from "@/components/crud/MovieEdit";

export default async function Page({ params }) {
    const { id } = await params;
    const movie = await getMovieById(id);

    if (!movie) notFound(); // 404ページにする

    return <MovieEdit movie={movie} />;
}
