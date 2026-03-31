# Movie Management Site

映画情報を管理するためのフルスタックアプリです。
Next.js（フロントエンド）と FastAPI（バックエンド）、PostgreSQL（DB）で構成されています。

## 公開URL
- App: `https://movie-management-site-one.vercel.app/`

## 使用技術
- Frontend: Next.js (App Router), React, Tailwind CSS
- Backend: FastAPI, SQLModel
- Database: PostgreSQL
- Auth: JWT + httpOnly Cookie セッション
- Infrastructure: Vercel / Render or Railway

## デザインについて（Codex使用）
本プロジェクトのログインページ・登録ページ・ルートページのスタイル調整の一部には **Codex** を使用しています。
UI 方針や実装内容は最終的に作者の意図で調整しています。

## 使い方
1. App にアクセスして映画一覧を開く
2. 未ログイン状態ではデモデータを閲覧可能
3. ログイン/新規登録後、ユーザー別に映画の作成・編集・削除が可能
4. 映画作成/編集時に画像URLを登録可能

## 注意
- 本プロジェクトはポートフォリオ用途のデモアプリです。

## ライセンスと責任範囲
このプロジェクトは [MIT License](./LICENSE) で公開されています。
MITライセンスに基づき、本ソフトウェアは **無保証** で提供されます。
