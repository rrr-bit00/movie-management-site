import Link from "next/link"
import LoginForm from "@/components/ui/login-form"

export default function Page() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-emerald-100 px-4 py-12">
            <section className="mx-auto w-full max-w-md rounded-2xl border border-white/70 bg-white/85 p-8 shadow-xl backdrop-blur">
                <div className="mb-6 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">Movie Manager</p>
                    <h1 className="text-2xl font-bold text-slate-900">ログイン</h1>
                    <p className="text-sm text-slate-600">ユーザー名またはメールアドレスでログインできます。</p>
                </div>

                <LoginForm />

                <p className="mt-6 text-center text-sm text-slate-600">
                    アカウントをお持ちでないですか？{" "}
                    <Link href="/register" className="font-semibold text-sky-700 hover:underline">
                        新規登録はこちら
                    </Link>
                </p>
            </section>
        </main>
    )
}
