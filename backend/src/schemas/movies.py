import uuid

from sqlmodel import SQLModel, Field

class MovieBase(SQLModel):
    title: str = Field(index=True, min_length=1, max_length=30)
    description: str | None = Field(default=None, max_length=255)
    director: str = Field(min_length=1, max_length=255)
    released_year: str | None = Field(default=None, max_length=4)


class MovieCreate(MovieBase):
    pass

class MovieUpdate(SQLModel):
    title: str | None = Field(default=None, max_length=30)
    description: str | None = Field(default=None, max_length=255)
    director: str | None = Field(default=None, max_length=255)
    released_year: str | None = Field(default=None, max_length=4)

class MovieResponse(MovieBase):
    id: uuid.UUID

class MoviesResponse(SQLModel):
    data: list[MovieResponse]
    count: int
