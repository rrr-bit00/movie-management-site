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
        // errorDataのdetailが文字列ならば、そのままdetailを返す
        throw new Error(errorData?.detail || "アカウントの作成に失敗しました")
    }
    return res.json()
}
