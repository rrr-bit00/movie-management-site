import uuid

from sqlmodel import Session, select
from sqlalchemy.orm import selectinload

from src.deps import CurrentUser
from src.models.status import Status
from src.models.movies import Movie
from src.schemas.movies import MovieCreate, MovieUpdate


def create_movie(session: Session, movie: MovieCreate, current_user: CurrentUser):
    status_id = None

    if movie.status_code is not None:
        status = session.exec(
            select(Status).Where(Status.code == movie.status_code)
        ).first()

        if status is None:
            raise ValueError("Invalid Status_code")

        status_id = status.id

    movie_data = movie.model_dump(exclude={"status_code"})

    db_movie = Movie(**movie_data, owner_id=current_user.id, status_id=status_id)
    session.add(db_movie)
    session.commit()
    session.refresh(db_movie)
    return db_movie


def get_all_movies(
    session: Session,
    current_user: CurrentUser,
    query: str | None = None,
):
    statement = (
        select(Movie)
        .where(Movie.owner_id == current_user.id)
        .options(selectinload(Movie.status))
    )

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
    statement = (
        select(Movie)
        .where(
            Movie.id == movie_id,
            Movie.owner_id == current_user.id,
        )
        .options(selectinload(Movie.status))
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

    # status_code は入力専用なので別処理にする
    if "status_code" in movie_data.model_fields_set:
        if movie_data.status_code is None:
            # 明示的に null が来たら status を外す
            db_movie.status_id = None
        else:
            status = session.exec(
                select(Status).where(Status.code == movie_data.status_code)
            ).first()

            if status is None:
                raise ValueError("Invalid Status_code")

            db_movie.status_id = status.id

    # DBモデルにそのまま入れる項目だけ更新
    data = movie_data.model_dump(exclude_unset=True, exclude={"status_code"})

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
