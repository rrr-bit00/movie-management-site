"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/search-input";

function navClass({ active, tone }) {
  const base =
    "rounded-md border px-3 py-2 text-sm transition";

  if (tone === "movies") {
    return active
      ? `${base} border-sky-300/10 bg-sky-300/[0.06] text-sky-100/90 hover:bg-sky-300/[0.1]`
      : `${base} border-sky-300/20 bg-sky-300/15 text-sky-50`
  }

  if (tone === "new") {
    return active
      ? `${base} border-amber-200/10 bg-amber-200/[0.06] text-amber-100/90 hover:bg-amber-200/[0.1]`
      : `${base} border-amber-200/20 bg-amber-200/14 text-amber-50`
  }

  return `${base} border-white/10 bg-white/5 text-slate-300 hover:bg-white/8 hover:text-slate-100`;
}

export default function AppHeader({ user }) {
  const pathname = usePathname();

  const isMoviesPage = pathname === "/movies";
  const isNewPage = pathname === "/movies/new";
  const isAccountPage = pathname === "/movies/account";

  return (
    <header className="border-b border-white/8 bg-[#0f1318]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.16em] text-slate-100 transition hover:text-slate-300"
          >
            MOVIE MANAGEMENT SITE
          </Link>

          <nav className="flex flex-wrap items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className={navClass({
                active: isMoviesPage,
                tone: "movies",
              })}
            >
              <Link href="/movies">映画一覧</Link>
            </Button>

            {user && (
              <Button
                asChild
                variant="ghost"
                className={navClass({
                  active: isNewPage,
                  tone: "new",
                })}
              >
                <Link href="/movies/new">映画を登録</Link>
              </Button>
            )}
          </nav>
        </div>

        {isMoviesPage ? (
        <SearchInput
            placeholder="作品や監督、公開年から検索"
            className="w-full border border-slate-200/15 bg-white/10 text-slate-100 placeholder:text-slate-300/70 sm:w-[220px] lg:w-[300px]"
          />
        ) : (
          <div className="hidden md:block"/>
        )


}

        {user ? (
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-slate-500 md:inline">
              {user.username}
            </span>

            <Button
              asChild
              variant="ghost"
              className={navClass({
                active: isAccountPage,
                tone: "neutral",
              })}
            >
              <Link href="/movies/account">アカウント</Link>
            </Button>

            <form action={logout}>
              <Button
                type="submit"
                variant="ghost"
                className="rounded-md px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-slate-100"
              >
                ログアウト
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className="rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-slate-100"
            >
              <Link href="/login">ログイン</Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="rounded-md border border-amber-200/10 bg-amber-200/[0.06] px-3 py-2 text-sm text-amber-100/90 transition hover:bg-amber-200/[0.1]"
            >
              <Link href="/register">新規登録</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
