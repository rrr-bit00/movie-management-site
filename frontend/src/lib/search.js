import { getMovieIdApi, searchMoviesApi } from "./api/item";
import { getMovieIdMock, searchMoviesMock } from "./mock/mock";
import { getSessionOrNull } from "./session";

// .envからMockを使用するか判別
const USE_MOCK = process.env.PUBLIC_USE_MOCK === "true";

export async function searchMovies(q) {
    if (USE_MOCK) return searchMoviesMock(q)

    const session = await getSessionOrNull()
    if (!session) return searchMoviesMock(q)

    return searchMoviesApi(q)
}

export async function getMovieById(id) {
    if (USE_MOCK) return getMovieIdMock(id)

    const session = await getSessionOrNull()
    if (!session) return getMovieIdMock(id)

    return getMovieIdApi(id)
}
