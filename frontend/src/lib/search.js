import { getMovieIdApi, searchMoviesApi } from "./api";
import { getMovieIdMock, searchMoviesMock } from "./mock/mock";

// .envからMockを使用するか判別
const USE_MOCK = process.env.PUBLIC_USE_MOCK === "true";

export async function searchMovies(q) {
    return USE_MOCK ? searchMoviesMock(q) : searchMoviesApi(q)
}

export async function getMovieById(id) {
    return USE_MOCK ? getMovieIdMock(id) : getMovieIdApi(id)
}
