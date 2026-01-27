# annotationsを利用して型ヒントの評価を遅らせる
from __future__ import annotations
from typing import TYPE_CHECKING

import uuid

from sqlmodel import Field, Relationship

from src.schemas.movies import MovieBase

# owner: UserでPylanceから「"User" が定義されていません」と出るため,
# TYPE_CHECKINGで型チェック時にのみimportをさせる
if TYPE_CHECKING:
    from src.models.users import User


class Movie(MovieBase, table=True):
    # テーブル名を明記
    __tablename__: str = "movies"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(
        foreign_key="users.id", nullable=False, ondelete="CASCADE"
    )
    owner: User | None = Relationship(back_populates="movies")
