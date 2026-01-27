# annotationsを利用して型ヒントの評価を遅らせる
from __future__ import annotations
from typing import TYPE_CHECKING
import uuid

from sqlmodel import Field, Relationship

from src.schemas.users import UserBase

# List["Movie"]で「"Movie" が定義されていません」と出るため、
# TYPE_CHECKINGで型チェック時にのみimportをさせる
if TYPE_CHECKING:
    from src.models.movies import Movie


class User(UserBase, table=True):
    # テーブル名を明記
    __tablename__: str = "users"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_pass: str
    movies: list["Movie"] = Relationship(back_populates="owner", cascade_delete=True)
