import Link from "next/link";
import { requireSession } from "@/lib/session";
import DeleteAccountForm from "@/components/crud/account/DeleteAccountForm";
import { Button } from "@/components/ui/button";

export default async function AccountPage() {
  const user = await requireSession();

  return (
    <main className="flex-1 bg-[linear-gradient(180deg,_#171b21_0%,_#1c2129_48%,_#181c22_100%)] px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link
            href="/movies"
            className="inline-flex text-sm text-slate-400 transition hover:text-slate-200"
          >
            ← 映画一覧に戻る
          </Link>
        </div>

        <section className="overflow-hidden rounded-2xl border border-white/8 bg-[#11161c]/85 shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
          <div className="border-b border-white/8 px-6 py-5 md:px-8">
            <h1 className="text-2xl font-bold text-slate-100 md:text-3xl">
              アカウント設定
            </h1>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              登録情報の確認と、アカウントに関する操作を行えます。
            </p>
          </div>

          <div className="px-6 py-6 md:px-8">
            <div className="grid gap-y-4 text-sm md:grid-cols-[140px_1fr] md:gap-x-6">
              <p className="text-slate-500">ユーザー名</p>
              <p className="text-slate-200">{user.username}</p>

              <p className="text-slate-500">メールアドレス</p>
              <p className="break-all text-slate-200">{user.email}</p>
            </div>

            <div className="mt-8 border-t border-white/8 pt-6">
              <h2 className="text-sm font-semibold tracking-[0.04em] text-slate-200">
                プライバシー
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                本サービスにおける個人情報の取り扱いは、プライバシーポリシーをご確認ください。
              </p>

              <div className="mt-4">
                <Button
                  asChild
                  variant="ghost"
                  className="inline-flex rounded-md border border-sky-300/20 bg-sky-300/12 px-4 py-2 text-sm text-sky-100 transition hover:bg-sky-300/18"
                >
                  <Link href="/privacy">プライバシーポリシーを見る</Link>
                </Button>
              </div>
            </div>

            <div className="mt-8 border-t border-white/8 pt-6">
              <h2 className="text-sm font-semibold tracking-[0.04em] text-slate-200">
                アカウント削除
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                アカウントを削除すると、登録した情報は元に戻せません。内容を確認のうえ操作してください。
              </p>

              <div className="mt-5 rounded-xl border border-white/8 bg-white/[0.03] p-4 md:p-5">
                <DeleteAccountForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
