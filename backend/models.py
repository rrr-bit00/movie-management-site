from sqlmodel import Field, SQLModel

class Movie(SQLModel, table=True):

    id: int = Field(primary_key=True, index=True)
    title: str = Field(index=True)
    description: str
    director: str = Field(index=True)
    released_year: str | None = Field(default=None, index=True)
