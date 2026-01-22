from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ORIGINS
origins = ["http://localhost:3030"]

# CORS設定
def setup_middleware(app: FastAPI):
    app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 許可するオリジンを指定
    allow_credentials=False, # クッキーなどの認証情報の送信を許可するかどうか
    allow_methods=["*"],    # 許可するHTTPメソッド（"*"はすべて許可）
    allow_headers=["*"],    # 許可するHTTPヘッダー（"*"はすべて許可）
)

