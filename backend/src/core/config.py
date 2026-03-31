import os
from typing import Annotated, Any, Literal, Self
import warnings
from pydantic import (
    AnyUrl,
    BeforeValidator,
    HttpUrl,
    PostgresDsn,
    computed_field,
    model_validator,
)
from pydantic_settings import BaseSettings, SettingsConfigDict


def parse_cors(v: Any) -> list[str] | str:
    # vが文字列で[から始まるならば、カンマで区切って空ではない文字列をlist化
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",") if i.strip()]
    # vがリストか文字列であれば、そのまま返す
    elif isinstance(v, list | str):
        return v
    # if文に引っかからない場合は、求めている形ではないのでValueエラーを返す
    raise ValueError(v)


class Settings(BaseSettings):
    # localの環境変数のファイルを読み込み
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "local")
    model_config = SettingsConfigDict(
        # 開発時だけ.env.localファイルから環境変数を読む（なければ無視）
        env_file="../.env.local"
        if os.getenv("ENVIRONMENT", "local") == "local"
        else None,
        # .envの中に空の値がある場合は無視
        env_ignore_empty=True,
        # Settingsクラスにない変数は無視
        extra="ignore",
    )
    API_STR: str = "/api/v1"
    # 開発用に適当な値をセット（local以外で生成したsecret_keyを.envから読み込む）
    SECRET_KEY: str = "localDevelopment"
    # 期限を設定
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7
    # フロントエンドのポートを持つ
    # docker-compose等のコンテナ利用の場合は、localhostをコンテナ名にする
    FRONTEND_HOST: str = "http://front:3030"
    # 開発か本番のどちらかの状態を持つ
    ENVIRONMENTS: Literal["local", "production"] = "local"

    # バックエンドのCORSのURLを複数持たせるために、必要があれば整形
    BACKEND_CORS_ORIGINS: Annotated[
        list[AnyUrl] | str, BeforeValidator(parse_cors)
    ] = []

    # 署名の形式を設定
    ALGORITHM: str = "HS256"

    # @property: 関数を属性っぽく読む / @computed_field: dump・schemaにも出る派生設定にする
    @computed_field
    @property
    def all_cors_origins(self) -> list[str]:
        return [str(origin).rstrip("/") for origin in self.BACKEND_CORS_ORIGINS] + [
            self.FRONTEND_HOST
        ]

    PROJECT_NAME: str = "Movie-manage"
    SENTRY_DSN: HttpUrl | None = None
    # コンテナ同士で接続するため、localhostではなくコンテナ名にする。
    POSTGRES_SERVER: str = "db"
    POSTGRES_PORT: int = 5432

    POSTGRES_USER: str = ""
    POSTGRES_PASSWORD: str = ""
    POSTGRES_DB: str = ""

    @computed_field
    @property
    # PostgresDsnで環境変数からのPostgresのpasswordなどをURL型にし、
    # .buildメソッドでURLとしてつなげる
    def SQLALCHEMY_DATABASE_URI(self) -> PostgresDsn:
        return PostgresDsn.build(
            scheme="postgresql+psycopg",
            username=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_SERVER,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_DB,
        )

    BAD_VALUES: set[str] = {"localDevelopment", "postgres", "development"}

    # local環境以外で、危険なデフォルト値を使用していないか確認
    def _check_default_secret(
        self, *, var_name: str, value: str | None, bad_value: set[str]
    ) -> None:
        if value in bad_value:
            message = (
                f'The value of {var_name} is "changethis", '
                "for security, please change it, at least for deployments."
            )
            # local環境の場合は警告。それ以外の環境の場合はエラー返す
            if self.ENVIRONMENTS == "local":
                warnings.warn(message, stacklevel=1)
            else:
                raise ValueError(message)

    # mode=afterでSettingクラスの生成後に、自動で実行する関数
    # 危険な値が使用されていないか確認するための関数を呼び出す
    @model_validator(mode="after")
    def _enforce_non_default_secrets(self) -> Self:
        self._check_default_secret(
            var_name="SECRET_KEY", value=self.SECRET_KEY, bad_value=self.BAD_VALUES
        )
        self._check_default_secret(
            var_name="POSTGRES_USER",
            value=self.POSTGRES_USER,
            bad_value=self.BAD_VALUES,
        )
        self._check_default_secret(
            var_name="POSTGRES_PASSWORD",
            value=self.POSTGRES_PASSWORD,
            bad_value=self.BAD_VALUES,
        )
        return self


# Settingクラスのインスタンスを生成
settings = Settings()
