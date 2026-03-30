import "server-only"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"

function getApiBaseUrl() {
    const apiBaseUrl =
        process.env.API_INTERNAL_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL
    if (!apiBaseUrl) {
        notFound()
    }
    return apiBaseUrl
}

function buildAuthHeaders(token, headers = {}) {
    return {
        ...headers,
        Authorization: `Bearer ${token}`,
    }
}

export async function getAccessToken() {
    const cookieStore = await cookies()
    return cookieStore.get("access_token")?.value
}

export async function getAccessTokenOrThrow() {
    const token = await getAccessToken()
    if (!token) {
        throw new Error("認証が必要です。再度ログインしてください。")
    }
    return token
}

export async function fetchWithAuth(path, init = {}) {
    const apiBaseUrl = getApiBaseUrl()
    const token = await getAccessTokenOrThrow()
    const headers = buildAuthHeaders(token, init.headers)

    return fetch(`${apiBaseUrl}${path}`, {
        ...init,
        headers,
        cache: init.cache ?? "no-store",
    })
}

// セッションの確認
export async function getSession() {
    const res = await fetchWithAuth("/users/me", {
        method: "GET",
    })

    if (res.status === 401) {
        throw new Error("セッションが無効です。再度ログインしてください。")
    }

    if (!res.ok) {
        throw new Error("セッション情報の取得に失敗しました。")
    }

    return res.json()
}

export async function requireSession() {
    try {
        return await getSession()
    } catch {
        redirect("/login")
    }
}


// セッションの作成
export async function createSession({ email, password }) {
    const apiBaseUrl = getApiBaseUrl()
    const res = await fetch(
        `${apiBaseUrl}/login/access-token`, {
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
        const errorData = await res.json().catch(() => null)
        throw new Error(errorData?.detail || "ログインに失敗しました")
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
