import { notFound } from "next/navigation";

// clientとserver両方に対応
const API = typeof window === "undefined" ?
    (process.env.API_INTERNAL_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL)
    : process.env.NEXT_PUBLIC_API_BASE_URL;

export async function searchMoviesApi(q) {
    const res = await fetch(
        `${API}/movies?query=${encodeURIComponent(q)}`,
        { cache: "no-store" }
    )

    if (!res.ok) {
        throw new Error("検索に失敗しました")
    }
    return res.json()
}

export async function getMovieIdApi(id) {
    const res = await fetch(
        `${API}/movies/${id}`,
        { cache: "no-store" }
    )
    if (res.status === 404) notFound();
    if (!res.ok) {
        throw new Error("詳細の取得に失敗しました")
    }
    return res.json()
}

export async function createMovieApi(body) {
    const res = await fetch(
        `${API}/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // メタデータの宣言(JSONを渡す)
        body: JSON.stringify(body),
    }
    )
    if (!res.ok) {
        throw new Error("作成に失敗しました")
    }
    return res.json()
}

export async function updateMovieApi(id, body) {
    const res = await fetch(
        `${API}/movies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
    )
    if (!res.ok) {
        throw new Error("更新に失敗しました")
    }
    return res.json()
}

export async function deleteMovieApi(id) {
    const res = await fetch(
        `${API}/movies/${id}`, {
        method: "DELETE",
    }
    )
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`削除に失敗しました (${res.status}) ${text}`);
        // throw new Error("削除に失敗しました")
    }
}
