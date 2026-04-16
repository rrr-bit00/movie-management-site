'use client'

import { useRouter } from "next/navigation"
import MovieForm from "./MovieForm";
import { updateMovie } from "@/lib/actions/movies";


export default function MovieEdit({ movie }) {
    const router = useRouter();

    return (
        <MovieForm
            initialValues={{
                title: movie.title,
                description: movie.description,
                director: movie.director,
                released_year: String(movie.released_year ?? ""),
                image: movie.image ?? "",
                status: movie.status?.code ?? "unwatched"
            }}
            submitLabel="更新"
            onSubmit={async (values) => {
                await updateMovie(movie.id, values);
                router.push(`/movies/`);
                router.refresh();
            }}
        />
    );
}
