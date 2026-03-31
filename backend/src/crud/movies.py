import uuid

from sqlmodel import Session, select

from src.deps import CurrentUser
from src.models.movies import Movie
from src.schemas.movies import MovieCreate, MovieUpdate


def create_movie(session: Session, movie: MovieCreate, current_user: CurrentUser):
    db_movie = Movie.model_validate(movie, update={"owner_id": current_user.id})
    session.add(db_movie)
    session.commit()
    session.refresh(db_movie)
    return db_movie


def get_all_movies(
    session: Session,
    current_user: CurrentUser,
    query: str | None = None,
):
    statement = select(Movie).where(Movie.owner_id == current_user.id)

    keyword = query.strip() if query else ""
    if keyword:
        pattern = f"%{keyword}%"
        statement = statement.where(
            (Movie.title.ilike(pattern))
            | (Movie.director.ilike(pattern))
            | (Movie.released_year.ilike(pattern))
        )

    return session.exec(statement).all()


def get_movie(movie_id: uuid.UUID, session: Session, current_user: CurrentUser):
    statement = select(Movie).where(
        Movie.id == movie_id,
        Movie.owner_id == current_user.id,
    )
    return session.exec(statement).first()


def update_movie(
    movie_id: uuid.UUID,
    movie_data: MovieUpdate,
    session: Session,
    current_user: CurrentUser,
):
    db_movie = get_movie(movie_id, session, current_user)
    if db_movie is None:
        return None

    # 送られたものだけを取り出す
    data = movie_data.model_dump(exclude_unset=True)

    for key, value in data.items():
        setattr(db_movie, key, value)

    session.commit()
    session.refresh(db_movie)
    return db_movie


def delete_movie(movie_id: uuid.UUID, session: Session, current_user: CurrentUser):
    db_movie = get_movie(movie_id, session, current_user)
    if db_movie is None:
        return None
    session.delete(db_movie)
    session.commit()
    return db_movie
