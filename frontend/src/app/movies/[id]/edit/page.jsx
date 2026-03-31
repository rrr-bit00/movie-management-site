import { notFound } from "next/navigation";
import { getMovieById } from "@/lib/search";
import MovieEdit from "@/components/crud/MovieEdit";
import { requireSession } from "@/lib/session";

export default async function Page({ params }) {
    await requireSession()

    const { id } = await params;
    const movie = await getMovieById(id);

    if (!movie) notFound(); // 404ページにする

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-10">
            <section className="mx-auto w-full max-w-2xl border border-slate-300 bg-white p-6 shadow-sm">
                <h1 className="mb-1 text-xl font-bold text-slate-900">映画情報の更新</h1>
                <p className="mb-6 text-sm text-slate-500">変更したい項目だけを編集して保存してください。</p>

                <MovieEdit movie={movie} />

            </section>
        </main>
    );
}
