import { notFound } from "next/navigation";
import Link from "next/link"
import { getMovieById } from "@/lib/search";
import MovieEdit from "@/components/crud/MovieEdit";
import { requireSession } from "@/lib/session";

export default async function Page({ params }) {
    await requireSession()

    const { id } = params;
    const movie = await getMovieById(id);

    if (!movie) notFound(); // 404ページにする

    return (
        <main className="flex-1 bg-[radial-gradient(circle_at_top_right,_rgba(96,165,250,0.18),_transparent_28%),linear-gradient(to_bottom,_rgb(51_65_85),_rgb(71_85_105),_rgb(241_245_249))] px-4 py-8">
            <section className="mx-auto w-full max-w-2xl rounded-2xl border border-white/8 bg-[#11161c]/78 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.25)] sm:p-6 md:p-8">
                <Link
                    href={`/movies/${movie.id}`}
                    className="mb-4 inline-flex text-sm text-slate-300 transition hover:text-slate-100"
                >
                    ← {movie.title}の詳細に戻る
                </Link>
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
