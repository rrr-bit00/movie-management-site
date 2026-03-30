import { notFound } from "next/navigation";
import { getMovieById } from "@/lib/search";
import MovieEdit from "@/components/crud/MovieEdit";
import { requireSession } from "@/lib/session";

export default async function Page({ params }) {
    await requireSession()

    const { id } = await params;
    const movie = await getMovieById(id);

    if (!movie) notFound(); // 404ページにする

    return <MovieEdit movie={movie} />;
}
