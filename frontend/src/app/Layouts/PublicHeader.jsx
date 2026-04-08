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

export default async function PublicHeader() {
  const session = await getSessionOrNull()
  const isLoggedIn = Boolean(session)

  return (
    <div>
      <header className="border-b bg-[linear-gradient(90deg,#0f1218_0%,#22202a_55%,#4a2f1c_100%)] bg-slate-950/80 border-amber-300/25 text-slate-100 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="ml-4">
                <NavigationMenuLink className="font-bold text-xl" asChild>
                  <Link href="/">
                    TOP
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="mx-4">
                <NavigationMenuLink className="font-bold text-xl" asChild>
                  <Link href="/movies">
                    映画一覧
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {isLoggedIn && (
                <NavigationMenuItem className="mx-4">
                  <NavigationMenuLink className="font-bold text-lg" asChild>
                    <Link href="/movies/new">
                      映画登録
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-4">
            <SearchInput placeholder="作品や監督、公開年から検索" className="w-[200px] lg:w-[300px]" />
            {isLoggedIn ? (
              <form action={logout}>
                <button type="submit" className="text-sm font-semibold text-blue-700 hover:underline">
                  ログアウト
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3 text-sm font-semibold">
                <Link href="/login" className="text-blue-700 hover:underline">
                  ログイン
                </Link>
                <Link href="/register" className="text-emerald-700 hover:underline">
                  新規登録
                </Link>
              </div>
            )}
          </div>
        </div>
      </header >
    </div >

  )
}
