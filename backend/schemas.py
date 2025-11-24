from pydantic import BaseModel

class MovieBase(BaseModel):
    title: str
    description: str
    director: str
    released_year: int


class MovieCreate(MovieBase):
    pass

class MovieUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    director: str | None = None
    released_year: int | None = None

class MovieResponse(MovieBase):
    id: int

    class Config:
        orm_mode = True
