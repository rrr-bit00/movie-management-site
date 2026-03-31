import Link from "next/link"

export default function Page() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#dff4ff,_#f3fff8_55%,_#fff5eb)] px-6 py-14">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-xl backdrop-blur md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Movie Management Site</p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-slate-900 md:text-5xl">
            映画情報を、ログインして安全に管理する
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-700 md:text-base">
            このアプリはセッションCookieを使って認証し、あなたの映画データだけを操作できるように設計されています。
            <br />
            ログイン前でも「映画一覧へ」からデモデータを見られます。
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Link
              href="/login"
              className="rounded-xl border border-sky-200 bg-sky-50 px-5 py-4 text-sm font-semibold text-sky-800 transition hover:-translate-y-0.5 hover:bg-sky-100"
            >
              ログインする
            </Link>
            <Link
              href="/register"
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-800 transition hover:-translate-y-0.5 hover:bg-emerald-100"
            >
              新規登録する
            </Link>
            <Link
              href="/movies"
              className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-800 transition hover:-translate-y-0.5 hover:bg-amber-100"
            >
              映画一覧へ
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
