from sqlmodel import SQLModel


class TokenPayload(SQLModel):
    sub: str


class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"
