from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

# Type_Checking
if TYPE_CHECKING:
    from src.models.movies import Movie


class Status(SQLModel, table=True):
    __tablename__: str = "statuses"

    id: int | None = Field(default=None, primary_key=True)
    code: str = Field(index=True, unique=True)
    label: str
    # Movieとリレーション
    movies: list["Movie"] = Relationship(back_populates="status")
