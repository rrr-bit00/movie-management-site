'use client'

import { useState } from "react";
import { deleteAccount } from "@/lib/actions/account";
import { Button } from "@/components/ui/button";

export default function DeleteAccountForm() {
  const [checked, setChecked] = useState(false);

  return (
    <form action={deleteAccount} className="space-y-4">
      <label className="flex items-start gap-3 text-sm leading-6 text-slate-300">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
        />
        <span>
          アカウントを削除すると、登録した情報にアクセスできなくなることを理解しました。
        </span>
      </label>

      <Button
        type="submit"
        variant="ghost"
        disabled={!checked}
        className="rounded-md border border-red-500 bg-red-200/5 px-4 py-2.5 text-sm font-medium text-red-100 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        アカウントを削除する
      </Button>
    </form>
  );
}
