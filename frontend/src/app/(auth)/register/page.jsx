import Link from "next/link";
import SignupForm from "@/components/ui/signup-form";

export default function Page() {
    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#ffe4c7,_transparent_35%),linear-gradient(225deg,_#10131a,_#1a2532_55%,_#0f1117)] px-4 py-10 text-slate-100 md:px-8 md:py-14">
            <section className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2">
                <section className="auth-panel-left rounded-3xl border border-white/20 bg-[#f6f1e8] p-8 text-slate-900 shadow-2xl md:p-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">Create Account</p>
                    <h2 className="mt-3 text-3xl font-black">アカウント登録</h2>
                    <p className="mt-2 text-sm text-slate-600">制約を確認しながら入力してください。</p>

                    <div className="mt-6">
                        <SignupForm />
                    </div>

                    <p className="mt-6 text-center text-sm text-slate-600">
                        すでにアカウントをお持ちですか？{" "}
                        <Link href="/login" className="font-semibold text-emerald-700 hover:underline">
                            ログインはこちら
                        </Link>
                    </p>
                </section>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
                    <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">Open Archive</p>
                    <h1 className="mt-4 text-4xl font-black leading-tight text-emerald-100 md:text-5xl">
                        BUILD
                        <br />
                        YOUR LIST
                    </h1>
                    <p className="mt-5 max-w-md text-sm leading-7 text-slate-200/90">
                        登録すると、あなたの映画リストを保存して管理できます。
                        未ログイン時はデモデータ閲覧、ログイン後は自分のコレクションを編集可能です。
                    </p>
                    <div className="mt-8 flex gap-2">
                        <span className="h-2 w-14 rounded-full bg-emerald-300" />
                        <span className="h-2 w-6 rounded-full bg-slate-500" />
                        <span className="h-2 w-3 rounded-full bg-slate-600" />
                    </div>
                </div>
            </section>
        </main>
    )
}
