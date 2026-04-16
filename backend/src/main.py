from fastapi import APIRouter, FastAPI

from src.core.config import settings
from src.core.middleware import custom_generate_unique_id, setup_middleware
from src.core.lifespans import lifespan
from src.router import login, movies, users, warmup

# @app.on_eventが非推奨のため、推奨されているlifespanを使用
# lifespanを渡してDB作成
app = FastAPI(
    lifespan=lifespan,
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
)

# ミドルウェア
setup_middleware(app)

# routerディレクトリからそれぞれのrouterをappに登録
api_router = APIRouter()
api_router.include_router(users.router)
api_router.include_router(movies.router)
api_router.include_router(login.router)

# 各ルーティングの先頭に環境変数のAPI_STRをつける
app.include_router(api_router, prefix=settings.API_STR)

# rootに直接生やすルーティングを設定
app.include_router(warmup.router)
