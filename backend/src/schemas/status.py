from sqlmodel import SQLModel


class StatusBase(SQLModel):
    code: str
    label: str


class StatusRead(StatusBase):
    pass
