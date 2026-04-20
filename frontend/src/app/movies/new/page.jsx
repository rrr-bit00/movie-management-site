import Link from "next/link";
import NewMovieForm from "@/components/crud/NewMovieForm";
import { requireSession } from "@/lib/session";

export default async function Page() {
  await requireSession();

  return (
    <main className="flex-1 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.10),_transparent_22%),radial-gradient(circle_at_top_right,_rgba(99,102,241,0.16),_transparent_24%),linear-gradient(160deg,_rgb(15_23_42),_rgb(30_41_59)_42%,_rgb(67_56_202)_74%,_rgb(226_232_240))] px-3 py-6 sm:px-4 sm:py-8 md:py-8">
      <section className="mx-auto w-full max-w-2xl rounded-2xl border border-white/8 bg-[#11161c]/78 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.25)] sm:p-6 md:p-8">
        <Link
          href="/movies"
          className="mb-4 inline-flex text-sm text-slate-300 transition hover:text-slate-100"
        >
          ← 映画一覧に戻る
        </Link>

        <div className="mb-4 sm:mb-5 md:mb-6">
          <h1 className="mb-1 text-xl font-bold text-slate-100 sm:text-2xl">
            映画情報の作成
          </h1>
          <p className="text-sm leading-6 text-slate-300">
            新しく残す作品情報をここから登録します。
          </p>
        </div>

        <div className="rounded-xl border border-slate-200/70 bg-[#f5f2ea] p-4 shadow-sm sm:p-5 md:p-6">
          <NewMovieForm />
        </div>
      </section>
    </main>
  );
}
