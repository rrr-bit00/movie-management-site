'use client'

import { useActionState } from "react";
import { login } from "@/lib/actions/auth";

export default function LoginForm() {
    const [state, action, pending] = useActionState(login, undefined)

    return (
        <form action={action} className="space-y-5">
            <div className="space-y-2">
                <label htmlFor="identifier" className="text-sm font-semibold text-slate-700">
                    ユーザー名 または メールアドレス
                </label>
                <input
                    id="identifier"
                    name="identifier"
                    placeholder="example_user または user@example.com"
                    type="text"
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
                <p className="text-xs text-slate-500">登録時のユーザー名かメールアドレスを入力してください。</p>
                {state?.errors?.identifier && <p className="text-xs text-red-600">{state.errors.identifier}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700">パスワード</label>
                <input
                    id="password"
                    name="password"
                    placeholder="password"
                    type="password"
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
                {state?.errors?.password && <p className="text-xs text-red-600">{state.errors.password}</p>}
            </div>

            {state?.message && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{state.message}</p>
            )}

            <button
                disabled={pending}
                type="submit"
                className="w-full rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300"
            >
                {pending ? "ログイン中..." : "ログイン"}
            </button>
        </form>
    )
}
