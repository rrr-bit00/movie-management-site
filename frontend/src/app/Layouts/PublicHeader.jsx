import Link from "next/link"
import { Input } from "@/components/ui/input"

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
              <NavigationMenuItem>
                <NavigationMenuLink className="font-bold text-xl" asChild>
                  <Link href="/movies">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {/* <NavigationMenuItem className="flex justify-end">
                <Link href="/">
                  <NavigationMenuLink className="font-medium text-base">Movies</NavigationMenuLink>
                </Link>
              </NavigationMenuItem> */}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-4">
            <Input placeholder="作品や監督、公開年から検索" className="w-[200px] lg:w-[300px]" />
          </div>
        </div>
      </header >
    </div >

  )
}
