import Link from "next/link"
import SearchInput from "@/components/ui/search-input"
import { logout } from "@/lib/actions/auth"
import { getSessionOrNull } from "@/lib/session"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

const navLinkClass =
  "rounded-md px-3 py-2 text-xl font-bold text-slate-100 transition-colors duration-200 hover:bg-white/8 hover:text-slate-200 focus:bg-white/8 focus:text-slate-200 data-[active]:bg-white/8 data-[active]:text-slate-200"

export default async function PublicHeader() {
  const session = await getSessionOrNull()
  const isLoggedIn = Boolean(session)

  return (
    <header className="border-b border-amber-200/15 bg-[radial-gradient(circle_at_20%_20%,_#fca5a522,_transparent_20%),radial-gradient(circle_at_80%_18%,_#93c5fd22,_transparent_18%),linear-gradient(165deg,_#1f2937,_#374151_58%,_#4b5563)] text-slate-100 shadow-md backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="ml-4">
              <NavigationMenuLink className={navLinkClass} asChild>
                <Link href="/">TOP</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="mx-4">
              <NavigationMenuLink className={navLinkClass} asChild>
                <Link href="/movies">映画一覧</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {isLoggedIn && (
              <NavigationMenuItem className="mx-4">
                <NavigationMenuLink
                  className="rounded-md px-3 py-2 text-lg font-bold text-slate-200 transition-colors duration-200 hover:bg-white/8 hover:text-slate-100 focus:bg-white/8 focus:text-slate-100 data-[active]:bg-white/8 data-[active]:text-slate-100"
                  asChild
                >
                  <Link href="/movies/new">映画登録</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <SearchInput
            placeholder="作品や監督、公開年から検索"
            className="w-[200px] border border-slate-200/15 bg-white/10 text-slate-100 placeholder:text-slate-300/70 lg:w-[300px]"
          />

          {isLoggedIn ? (
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full border border-amber-200/25 bg-amber-100/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-200/20 hover:text-white"
              >
                ログアウト
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Link
                href="/login"
                className="rounded-full border border-slate-200/15 bg-white/5 px-4 py-2 text-slate-100 transition hover:bg-white/10 hover:text-white"
              >
                ログイン
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-amber-200/25 bg-amber-100/10 px-4 py-2 text-amber-100 transition hover:bg-amber-200/20 hover:text-white"
              >
                新規登録
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
