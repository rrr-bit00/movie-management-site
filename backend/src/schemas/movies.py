import uuid

from sqlmodel import SQLModel, Field

from src.schemas.status import StatusRead


class MovieBase(SQLModel):
    title: str = Field(index=True, min_length=1, max_length=30)
    director: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)
    released_year: str | None = Field(default=None, max_length=4)
    image: str | None = Field(default=None, max_length=2048)


class MovieCreate(MovieBase):
    status_code: str | None = Field(default=None)
    pass


class MovieUpdate(SQLModel):
    title: str | None = Field(default=None, max_length=30)
    description: str | None = Field(default=None, max_length=255)
    director: str | None = Field(default=None, max_length=255)
    released_year: str | None = Field(default=None, max_length=4)
    image: str | None = Field(default=None, max_length=2048)
    status_code: str | None = Field(default=None)


class MovieResponse(MovieBase):
    id: uuid.UUID
    status: StatusRead | None = None


class MoviesResponse(SQLModel):
    data: list[MovieResponse]
    count: int
