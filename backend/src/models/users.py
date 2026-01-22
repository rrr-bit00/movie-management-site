import uuid

from sqlmodel import Field, Relationship

from ../schemas/users import UserBase


class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_pass: str
    movies: list["movie"] = Relationship(
        back_populates="owner"
        cascade_delete=True
    )
