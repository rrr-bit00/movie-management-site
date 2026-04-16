// 映画ステータスの定義
export const STATUS_FILTERS = [
    { label: "全部", code: "all" },
    { label: "見たい", code: "want_to_watch" },
    { label: "鑑賞中", code: "watching" },
    { label: "鑑賞済み", code: "watched" },
]


// ステータス毎の色
export function getStatusClass(code) {
    switch (code) {
        case "want_to_watch":
            return "border-slate-300/45 bg-slate-300/20 text-slate-50"
        case "watching":
            return "border-amber-300/55 bg-amber-300/20 text-amber-50"
        case "watched":
            return "border-emerald-300/55 bg-emerald-300/20 text-emerald-50"
        default:
            return "border-slate-300/30 bg-slate-200/10 text-slate-100"
    }
}
