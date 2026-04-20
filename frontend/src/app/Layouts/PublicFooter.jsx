import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="mt-8 border-t border-white/10 pt-4 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <p>© movie-management-site</p>
        <Link
          href="/privacy"
          className="transition hover:text-slate-200"
        >
          プライバシーポリシー
        </Link>
      </div>
    </footer>
  );
}
