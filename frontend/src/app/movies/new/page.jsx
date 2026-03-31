import NewMovieForm from "@/components/crud/NewMovieForm";
import { requireSession } from "@/lib/session";

export default async function Page() {
    await requireSession()
    return (
        <main className="min-h-screen bg-slate-100 px-4 py-10">
            <section className="mx-auto w-full max-w-2xl border border-slate-300 bg-white p-6 shadow-sm">
                <h1 className="mb-1 text-xl font-bold text-slate-900">映画情報の作成</h1>
                <p className="mb-6 text-sm text-slate-500">必要な項目だけ入力して保存してください。</p>

                <NewMovieForm />

            </section>
        </main>
    )
}
