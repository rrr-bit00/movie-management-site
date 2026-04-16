import { getMovieIdApi, searchMoviesApi } from "./api/item";
import { getMovieIdMock, searchMoviesMock } from "./mock/mock";
import { getSessionOrNull } from "./session";

export async function searchMovies(q = "", statusCode = null) {
    const session = await getSessionOrNull()
    if (session) return searchMoviesApi(q, statusCode)
    return searchMoviesMock(q, statusCode)
}

export async function getMovieById(id) {
    const session = await getSessionOrNull()
    if (session) return getMovieIdApi(id)
    return getMovieIdMock(id)
}
