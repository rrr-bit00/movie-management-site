'use client'

import MovieForm from "@/components/crud/MovieForm";
import { createMovie } from "@/lib/actions/movies";
import { useRouter } from "next/navigation";

export default function NewMovieForm() {
    const router = useRouter();

    return (
        <MovieForm
            submitLabel="作成"
            onSubmit={async (values) => {
                const created = await createMovie(values)
                router.push(`/movies/${created.id}`)
                router.refresh()
            }}
        />
    )
}
