from fastapi import APIRouter, HTTPException, Response, status

from src.deps import CurrentUser
from src.schemas.movies import MovieCreate, MovieResponse, MovieUpdate
from src.crud import movies
from src.core.database import SessionDep

router = APIRouter(prefix="/movies", tags=["movies"])


@router.post("/", response_model=MovieResponse, status_code=status.HTTP_201_CREATED)
def add_movie(session: SessionDep, movie_in: MovieCreate, current_user: CurrentUser):
    return movies.create_movie(session, movie_in, current_user=current_user)


@router.get("/", response_model=list[MovieResponse])
def list_movies(session: SessionDep, current_user: CurrentUser):
    return movies.get_all_movies(session, current_user)


@router.get("/{movie_id}", response_model=MovieResponse)
def read_movie(movie_id: int, session: SessionDep):
    movie = movies.get_movie(movie_id, session)
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie


@router.patch("/{movie_id}", response_model=MovieResponse)
def update_movie_info(movie_id: int, movie_in: MovieUpdate, session: SessionDep):
    updated = movies.update_movie(movie_id, movie_in, session)
    if updated is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return updated


# 204はレスポンスが禁止なので、Responseを明示してbodyを返さない
@router.delete("/{movie_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_movie_info(movie_id: int, session: SessionDep) -> Response:
    deleted = movies.delete_movie(movie_id, session)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)
