'use client'

import { useRouter } from "next/navigation"
import MovieForm from "./MovieForm";
import { updateMovieApi } from "@/lib/api/item";


export default function MovieEdit({ movie }) {
    const router = useRouter();

    return (
        <MovieForm
            initialValues={{ title: movie.title, description: movie.description, director: movie.director, released_year: String(movie.released_year ?? "") }}
            submitLabel="更新"
            onSubmit={async (values) => {
                await updateMovieApi(movie.id, values);
                router.push(`/movies/`);
                router.refresh();
            }}
        />
    );
}
