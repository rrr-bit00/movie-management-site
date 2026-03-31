# Movie Management Site

映画情報を管理するためのフルスタックアプリです。  
Next.js（フロントエンド）と FastAPI（バックエンド）、PostgreSQL（DB）で構成されています。

## 使用技術
- Frontend: Next.js (App Router), React, Tailwind CSS
- Backend: FastAPI, SQLModel
- Database: PostgreSQL
- Auth: JWT + httpOnly Cookie セッション
- Infrastructure (想定): Vercel / Render or Railway

## デザインについて（Codex使用）
本プロジェクトのログインページ・登録ページ・ルートページのスタイル調整の一部には **Codex** を使用しています。  
UI 方針や実装内容は最終的に作者の意図で調整しています。

## アクセス先
### 本番（デプロイ後に更新）
- Frontend: `https://<your-frontend-domain>`
- Backend API: `https://<your-backend-domain>`
- API Docs (Swagger): `https://<your-backend-domain>/docs`

### ローカル開発
- Frontend: `http://localhost:3030`
- Backend API: `http://localhost:8080`
- API Docs (Swagger): `http://localhost:8080/docs`

### 主な画面
- ルート: `http://localhost:3030/`
- ログイン: `http://localhost:3030/login`
- 新規登録: `http://localhost:3030/register`
- 映画一覧: `http://localhost:3030/movies`

## 使い方
1. リポジトリを取得
```bash
git clone <your-repository-url>
cd movie-management-site
```

2. 依存コンテナを起動
```bash
docker compose up -d
```

3. フロントにアクセス
- `http://localhost:3030`

4. 利用フロー
- 未ログインでも映画一覧でデモデータを閲覧可能
- 新規登録またはログイン後、映画の作成・編集・削除が可能
- 映画作成/編集時に画像URLを登録可能

## ライセンスと責任範囲
このプロジェクトは [MIT License](./LICENSE) で公開されています。  
MITライセンスに基づき、本ソフトウェアは **無保証** で提供されます。
