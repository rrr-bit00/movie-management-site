import Link from "next/link"
import LoginForm from "@/components/ui/login-form"

export default function Page() {
    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#ffe8cc,_transparent_35%),linear-gradient(140deg,_#10131a,_#1a2532_55%,_#0f1117)] px-4 py-10 text-slate-100 md:px-8 md:py-14">
            <section className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
                    <p className="text-xs uppercase tracking-[0.35em] text-amber-300">Now Showing</p>
                    <h1 className="mt-4 text-4xl font-black leading-tight text-amber-100 md:text-5xl">
                        CINEMA
                        <br />
                        VAULT
                    </h1>
                    <p className="mt-5 max-w-md text-sm leading-7 text-slate-200/90">
                        お気に入りの作品を記録し、監督や公開年で整理。
                        あなた専用の映画アーカイブを育てるための場所です。
                    </p>
                    <div className="mt-8 flex gap-2">
                        <span className="h-2 w-14 rounded-full bg-amber-300" />
                        <span className="h-2 w-6 rounded-full bg-slate-500" />
                        <span className="h-2 w-3 rounded-full bg-slate-600" />
                    </div>
                </div>

                <section className="auth-panel-right rounded-3xl border border-white/20 bg-[#f6f1e8] p-8 text-slate-900 shadow-2xl md:p-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">Member Entrance</p>
                    <h2 className="mt-3 text-3xl font-black">ログイン</h2>
                    <p className="mt-2 text-sm text-slate-600">ユーザー名またはメールアドレスでログインできます。</p>

                    <div className="mt-6">
                        <LoginForm />
                    </div>

                    <p className="mt-6 text-center text-sm text-slate-600">
                        アカウントをお持ちでないですか？{" "}
                        <Link href="/register" className="font-semibold text-amber-700 hover:underline">
                            新規登録はこちら
                        </Link>
                    </p>
                </section>
            </section>
        </main>
    )
}
