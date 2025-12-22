from sqlmodel import Session, select

from models import Movie
from schemas import MovieCreate, MovieUpdate

def create_movie(movie: MovieCreate, session: Session):
    db_movie = Movie(**movie.model_dump())
    session.add(db_movie)
    session.commit()
    session.refresh(db_movie)
    return db_movie

def get_all_movies(session: Session):
    return session.exec(select(Movie)).all()

def get_movie(movie_id: int, session: Session):
    return session.get(Movie, movie_id)

def update_movie(movie_id: int, movie_data: MovieUpdate, session: Session):
    db_movie = session.get(Movie, movie_id)
    if db_movie is None:
        return None

    # 送られたものだけを取り出す
    data = movie_data.model_dump(exclude_unset=True)

    for key, value in data.items():
        setattr(db_movie, key, value)

    session.commit()
    session.refresh(db_movie)
    return db_movie

def delete_movie(movie_id: int, session: Session):
    db_movie = session.get(Movie, movie_id)
    if db_movie is None:
        return None
    session.delete(db_movie)
    session.commit()
    return db_movie
