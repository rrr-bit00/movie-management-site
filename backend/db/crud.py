from sqlmodel import Session
from models import Movie
from schemas import MovieCreate, MovieUpdate

def create_movie(movie: MovieCreate, session: Session):
    db_movie = Movie(**movie.model_dump())
    session.add(db_movie)
    session.commit()
    session.refresh(db_movie)
    return db_movie

def get_all_movies(session: Session):
    return session.exec(Movie).all()

def get_movie(movie_id: int, session: Session):
    return session.exec(Movie).filter(Movie.id == movie_id).first()

def update_movie(movie_id: int, movie_data: MovieUpdate, session: Session):
    db_movie = session.exec(Movie).filter(Movie.id == movie_id).first()
    if db_movie is None:
        return None
    for key, value in movie_data.model_dump().items():
        setattr(db_movie, key, value)

    session.commit()
    session.refresh(db_movie)
    return db_movie

def delete_movie(movie_id: int, session: Session):
    db_movie = session.exec(Movie).filter(Movie.id == movie_id).first()
    if db_movie is None:
        return None
    session.delete(db_movie)
    session.commit()
    return db_movie
