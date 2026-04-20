import AppHeader from "@/app/Layouts/AppHeader";
import { getSessionOrNull } from "@/lib/session";

export default async function MoviesLayout({ children }) {
  const user = await getSessionOrNull();

  return (
    <div className="flex min-h-dvh flex-col bg-[linear-gradient(180deg,_#14181d_0%,_#1a1f26_52%,_#181c22_100%)] text-slate-100">
      <AppHeader user={user} />
      <div className="flex flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
