from sqlmodel import Session

from models import Movie
from database import SessionLocal
from schemas import MovieCreate, MovieUpdate

def create_movie(movie: MovieCreate):
    with SessionLocal() as db:
        db_movie = Movie(**movie.model_dump())
        db.add(db_movie)
        db.commit()
        db.refresh(db_movie)
        return db_movie


def get_movies():
    with SessionLocal() as db:
        return db.query(Movie).all()

def update_movie(db: Session, movie_id: int, movie_data: MovieUpdate):
    db_movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if db_movie is None:
        return None
    for key, value in movie_data.model_dump().items():
        setattr(db_movie, key, value)

    db.commit()
    db.refresh(db_movie)
    return db_movie

def delete_movie(db: Session, movie_id: int):
    db_movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if db_movie is None:
        return None
    db.delete(db_movie)
    db.commit()
    return db_movie
