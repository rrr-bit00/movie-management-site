import { notFound } from "next/navigation";
import { getMovieById } from "@/lib/search";
import MovieEdit from "@/components/crud/MovieEdit";
import { requireSession } from "@/lib/session";

export default async function Page({ params }) {
    await requireSession()

    const { id } = params;
    const movie = await getMovieById(id);

    if (!movie) notFound(); // 404ページにする

    return (
        <main className="min-h-[calc(100dvh-77px)] bg-[radial-gradient(circle_at_top_right,_rgba(96,165,250,0.18),_transparent_28%),linear-gradient(to_bottom,_rgb(51_65_85),_rgb(71_85_105),_rgb(241_245_249))] px-4 py-10">
            <section className="mx-auto w-full max-w-2xl rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-sm md:p-8">
                <div className="mb-6">
                    <h1 className="mb-1 text-2xl font-bold text-sky-400">映画情報の更新</h1>
                    <p className="text-sm text-slate-200">変更したい項目だけを編集して保存してください。</p>
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-white/85 p-5 shadow-sm md:p-6">
                    <MovieEdit movie={movie} />
                </div>
            </section>
        </main>
    );
}
