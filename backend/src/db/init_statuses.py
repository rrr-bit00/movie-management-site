from sqlmodel import select, Session

from src.models.status import Status


def init_statuses(session: Session) -> None:
    default = [
        {"code": "unwatched", "label": "未視聴"},
        {"code": "watching", "label": "鑑賞中"},
        {"code": "watched", "label": "鑑賞済み"},
    ]

    for item in default:
        status = session.exec(select(Status).where(Status.code == item["code"])).first()

        if status is None:
            session.add(Status(**item))
        else:
            status.label = item["label"]

    session.commit()
