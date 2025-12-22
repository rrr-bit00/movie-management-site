from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Depends
from sqlmodel import Session

from schemas import MovieCreate, MovieResponse, MovieUpdate
from db.crud import create_movie, get_all_movies, get_movie, update_movie, delete_movie
from db.database import create_db_and_tables, SessionDep
from models import Movie
from core.middleware import setup_middleware
from core.lifespans import lifespan

# lifespanを渡してDB作成
app = FastAPI(lifespan=lifespan)

# ミドルウェア
setup_middleware(app)


@app.post("/movies", response_model=MovieResponse)
def add_movie(movie: MovieCreate, session: SessionDep):
    return create_movie(movie, session)

@app.get("/movies", response_model=list[MovieResponse])
def list_movies():
    return get_all_movies()

@app.get("/movies/{movie_id}", response_model=MovieResponse)
def read_movie(movie_id: int, session: SessionDep):
    movie = get_movie(movie_id, session)
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie

@app.put("/movies/{movie_id}", response_model=MovieResponse)
def update_movie_info(movie_id: int, movie: MovieUpdate, session: SessionDep):
    updated = update_movie(movie_id, movie, session)
    if updated is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return updated

@app.delete("/movies/{movie_id}", response_model=MovieResponse)
def delete_movie_info(movie_id: int, session: SessionDep):
    deleted = delete_movie(movie_id, session)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return deleted
