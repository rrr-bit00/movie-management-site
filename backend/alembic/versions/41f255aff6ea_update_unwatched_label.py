"""update unwatched label

Revision ID: 41f255aff6ea
Revises: dfdd3a0382aa
Create Date: 2026-04-16 15:33:53.352117

"""

from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "41f255aff6ea"
down_revision: Union[str, Sequence[str], None] = "dfdd3a0382aa"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute("""
        UPDATE statuses
        SET code = 'unwatched',
            label = '未視聴'
        WHERE code = 'want_to_watch'
    """)


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("""
        UPDATE statuses
        SET code = 'want_to_watch',
            label = '見たい'
        WHERE code = 'unwatched'
    """)
