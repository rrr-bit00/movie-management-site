'use server'

// serverに対応
const API = typeof window === "undefined" ?
    (process.env.API_INTERNAL_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL)
    : process.env.NEXT_PUBLIC_API_BASE_URL;

// User関連のAPI
export async function createUser({ username, email, password }) {
    const res = await fetch(
        `${API}/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // FastAPIに渡す形式を伝える
            "Accept": "application/json"
        },
        // アカウント情報をオブジェクトとして渡す
        body: JSON.stringify({ username, email, password })
    }
    )
    if (!res.ok) {
        // うまくいかなかった場合に、resにあるerrorログの取得を試みる
        const errorData = await res.json().catch(() => null)
        const detail = errorData?.detail

        if (typeof detail === "string") {
            throw new Error(detail)
        }

        if (Array.isArray(detail) && detail.length > 0) {
            const firstMessage = detail[0]?.msg
            if (typeof firstMessage === "string") {
                throw new Error(firstMessage)
            }
        }

        throw new Error("アカウントの作成に失敗しました")
    }
    return res.json()
}
