import BackendWarmup from "@/components/ui/backend-warmup"
import Link from "next/link"

export default function Page() {
  return (
    <>
      <BackendWarmup /> //コールドスタート対策

      <main className="min-h-screen bg-[radial-gradient(circle_at_10%_0%,_#ffe6c9,_transparent_35%),radial-gradient(circle_at_90%_20%,_#c9e6ff,_transparent_30%),linear-gradient(165deg,_#0f1218,_#192333_55%,_#12161d)] px-6 py-14 text-slate-100">
        <section className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-white/15 bg-white/5 p-8 shadow-2xl backdrop-blur-sm md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Movie Management Site</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-amber-100 md:text-6xl">
              Your Private
              <br />
              Movie Theater Log
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-200/90 md:text-base">
              セッションCookieで認証し、あなたの映画データだけを安全に管理できます。
              <br />
              ログイン前でも「映画一覧へ」からデモデータを見られます。
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <Link
                href="/login"
                className="rounded-xl border border-amber-300/40 bg-amber-100/10 px-5 py-4 text-sm font-semibold text-amber-100 transition hover:-translate-y-0.5 hover:bg-amber-100/20"
              >
                ログイン
              </Link>
              <Link
                href="/register"
                className="rounded-xl border border-emerald-300/40 bg-emerald-100/10 px-5 py-4 text-sm font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-100/20"
              >
                新規登録
              </Link>
              <Link
                href="/movies"
                className="rounded-xl border border-sky-300/40 bg-sky-100/10 px-5 py-4 text-sm font-semibold text-sky-100 transition hover:-translate-y-0.5 hover:bg-sky-100/20"
              >
                映画一覧へ
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
