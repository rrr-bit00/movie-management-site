import { getMovieIdApi, searchMoviesApi } from "./api/item";
import { getMovieIdMock, searchMoviesMock } from "./mock/mock";
import { getSessionOrNull } from "./session";

export async function searchMovies(q) {
    const session = await getSessionOrNull()
    if (session) return searchMoviesApi(q)
    return searchMoviesMock(q)
}

export async function getMovieById(id) {
    const session = await getSessionOrNull()
    if (session) return getMovieIdApi(id)
    return getMovieIdMock(id)
}
