'use client'

import MovieForm from "@/components/crud/MovieForm";
import { createMovieApi } from "@/lib/api";
import { useRouter } from "next/navigation"


export default function page() {
    const router = useRouter();

    return (
        <MovieForm
            submitLabel="作成"
            onSubmit={async (values) => {
                const created = await createMovieApi(values);
                router.push(`/movies/${created.id}`);
                router.refresh();
            }}
        />
    )
}
