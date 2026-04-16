from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRoute

from src.core.config import settings

# ORIGINS
origins = settings.all_cors_origins


# OpenAPIの中でoperationIdという各エンドポイントの前にtagsをつける
def custom_generate_unique_id(route: APIRoute) -> str:
    tag = route.tags[0] if route.tags else "default"
    return f"{tag} - {route.name}"


# CORS設定
def setup_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,  # 許可するオリジンを指定
        allow_credentials=True,  # クッキーなどの認証情報の送信を許可するかどうか
        allow_methods=["*"],  # 許可するHTTPメソッド（"*"はすべて許可）
        allow_headers=["*"],  # 許可するHTTPヘッダー（"*"はすべて許可）
    )
