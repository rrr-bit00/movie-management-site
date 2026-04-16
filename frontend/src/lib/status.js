// 映画ステータスの定義
export const STATUS_FILTERS = [
    { label: "全部", code: "all" },
    { label: "未視聴", code: "unwatched" },
    { label: "鑑賞中", code: "watching" },
    { label: "鑑賞済み", code: "watched" },
]

// 映画登録に使用するステータスのオプション
export const MOVIE_STATUS_OPTIONS = STATUS_FILTERS.filter(
    (status) => status.code !== "all"
)


// ステータス毎の色
export function getStatusClass(code) {
    switch (code) {
        case "unwatched":
            return "border-slate-300/45 bg-slate-300/20 text-slate-50"
        case "watching":
            return "border-amber-300/55 bg-amber-300/20 text-amber-50"
        case "watched":
            return "border-emerald-300/55 bg-emerald-300/20 text-emerald-50"
        default:
            return "border-slate-300/30 bg-slate-200/10 text-slate-100"
    }
}
