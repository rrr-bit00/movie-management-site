import uuid

from sqlmodel import Field Relationship

from ../schemas/movies import MovieBase
from ../models/users import User

class Movies(MovieBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(
        foreign_key="user.id", nulable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="movies")
