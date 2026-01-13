import Link from "next/link"
import SearchInput from "@/components/ui/search-input"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export default function PublicHeader() {
  return (
    <div>
      <header className="border-b bg-blue-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="mx-4">
                <NavigationMenuLink className="font-bold text-xl" asChild>
                  <Link href="/movies">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="mx-4">
                <NavigationMenuLink className="font-bold text-lg" asChild>
                  <Link href="/movies/new">
                    映画登録
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-4">
            <SearchInput placeholder="作品や監督、公開年から検索" className="w-[200px] lg:w-[300px]" />
          </div>
        </div>
      </header >
    </div >

  )
}
