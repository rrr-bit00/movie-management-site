'use server'

import { revalidatePath } from "next/cache";
import { createMovieApi, deleteMovieApi, updateMovieApi } from "../api/item";

export async function createMovie(values) {
    const created = await createMovieApi(values)
    revalidatePath("/movies")
    return created
}

export async function updateMovie(id, values) {
    const updated = await updateMovieApi(id, values)
    revalidatePath("/movies")
    revalidatePath(`/movies/${id}`)
    return updated
}

export async function removeMovie(id) {
    await deleteMovieApi(id)
    revalidatePath("/movies")
}
