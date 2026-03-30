import "server-only"
import { cookies } from "next/headers"

// clientとserver両方に対応
const API = typeof window === (process.env.API_INTERNAL_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL) ?
    process.env.NEXT_PUBLIC_API_BASE_URL : "";

// セッションの確認
export async function getSession() {
    // Cookieにアクセストークンがあるか確認
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value

    if (!token) {
        throw new Error("セッションが切れました。再度ログインしてください。")
    }

    const res = await fetch(
        `${API}/users/me`, {
        method: "GET",
        headers: {
            "Authorization": `Breaer${token}`,
        },
        cache: "no-store"
    }
    )
}


// セッションの作成
export async function createSession({ email, password }) {
    const res = await fetch(
        `${API}/login/access-token`, {
        method: "POST",
        headers: {
            // FastAPI側のOAuth2では、form-dataに送る必要があるため、フォーム送信用にする
            "Content-Type": "application/x-www-form-urlencoded",
        },
        // バックエンドの受け取りがusernameとpasswordで固定なので、usernameにemailを入れる
        body: new URLSearchParams({
            username: email,
            password,
        })
    })
    if (!res.ok) {
        throw new Error("ログインに失敗しました")
    }
    // tokenにFastAPIから返ってきたTokenを格納
    const token = await res.json()

    // Cookieの有効期限をDateで設定
    const expires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)

    // cookieの操作を行う変数を作成
    const cookieStore = await cookies()

    // set(name, value, options)でcookieを記述
    cookieStore.set("access_token", token.access_token, {
        httpOnly: true,     // HTTPリクエストに制限(XSS対策としてJavaScriptからCookieを読めなくする)
        secure: process.env.NODE_ENV === "production",      // 本番環境の場合にHTTPSの時だけCookieを送る
        expires: expires,       // 有効期限を与える
        sameSite: "lax",     // クロスサイトリクエストの動作を制限(strict > lax > noneの順に厳しい)
        path: "/",      // Cookieを送るURLパスを設定(設定したルート以下のページでのみCookieが送られる)
    })
}

// セッションの削除
export async function deleteSession() {
    const cookieStore = await cookies()
    // .delete(name)でnameのセッションを削除
    cookieStore.delete("access_token")
}
