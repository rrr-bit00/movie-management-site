from typing import TYPE_CHECKING, Optional

import uuid

from sqlmodel import Field, Relationship

from src.schemas.movies import MovieBase

# owner: UserでPylanceから「"User" が定義されていません」と出るため,
# TYPE_CHECKINGで型チェック時にのみimportをさせる
if TYPE_CHECKING:
    from src.models.users import User
    from src.models.status import Status


class Movie(MovieBase, table=True):
    # テーブル名を明記
    __tablename__: str = "movies"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(
        foreign_key="users.id", nullable=False, ondelete="CASCADE"
    )
    status_id: int | None = Field(default=None, foreign_key="statuses.id")
    # User | None だと__future__のannotationsが必要になるため、Optionalで代用
    owner: Optional["User"] = Relationship(back_populates="movies")
    # Statusとリレーション
    status: Optional["Status"] = Relationship(back_populates="movies")
