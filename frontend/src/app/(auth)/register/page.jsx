import Link from "next/link";
import SignupForm from "@/components/ui/signup-form";

export default function Page() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-lime-50 to-sky-100 px-4 py-12">
            <section className="mx-auto w-full max-w-md rounded-2xl border border-white/70 bg-white/85 p-8 shadow-xl backdrop-blur">
                <div className="mb-6 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Movie Manager</p>
                    <h1 className="text-2xl font-bold text-slate-900">アカウント登録</h1>
                    <p className="text-sm text-slate-600">下の制約を確認しながら入力してください。</p>
                </div>

                <SignupForm />

                <p className="mt-6 text-center text-sm text-slate-600">
                    すでにアカウントをお持ちですか？{" "}
                    <Link href="/login" className="font-semibold text-emerald-700 hover:underline">
                        ログインはこちら
                    </Link>
                </p>
            </section>
        </main>
    )
}
