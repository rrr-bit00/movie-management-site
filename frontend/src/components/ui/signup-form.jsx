'use client'

import { signup } from "@/lib/actions/auth";
import { useActionState } from "react";
import Link from "next/link"

function ConstraintItem({ children }) {
    return <li className="text-xs text-slate-600">{children}</li>
}

export default function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined)

    return (
        <form action={action} className="space-y-5">
            <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-semibold text-slate-700">ユーザー名</label>
                <input
                    id="username"
                    name="username"
                    placeholder="example_user"
                    minLength={1}
                    maxLength={20}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
                <ul className="space-y-1">
                    <ConstraintItem>1文字以上20文字以下</ConstraintItem>
                    <ConstraintItem>他ユーザーと重複しないユーザー名</ConstraintItem>
                </ul>
                {state?.errors?.username && <p className="text-xs text-red-600">{state.errors.username}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">メールアドレス</label>
                <input
                    id="email"
                    name="email"
                    placeholder="user@example.com"
                    type="email"
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
                <ul className="space-y-1">
                    <ConstraintItem>有効なメールアドレス形式</ConstraintItem>
                    <ConstraintItem>他ユーザーと重複しないメールアドレス</ConstraintItem>
                </ul>
                {state?.errors?.email && <p className="text-xs text-red-600">{state.errors.email}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700">パスワード</label>
                <input
                    id="password"
                    name="password"
                    placeholder="password"
                    type="password"
                    minLength={8}
                    maxLength={20}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
                <ul className="space-y-1">
                    <ConstraintItem>8文字以上20文字以下</ConstraintItem>
                    <ConstraintItem>英字を1文字以上含む</ConstraintItem>
                    <ConstraintItem>数字を1文字以上含む</ConstraintItem>
                    <ConstraintItem>記号を1文字以上含む</ConstraintItem>
                </ul>
                {state?.errors?.password && (
                    <ul className="space-y-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                        {state.errors.password.map((error) => (
                            <li key={error} className="text-xs text-red-700">{error}</li>
                        ))}
                    </ul>
                )}
            </div>

            {state?.message && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{state.message}</p>
            )}

            <button
                disabled={pending}
                type="submit"
                className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
            >
                {pending ? "登録中..." : "サインアップ"}
            </button>
            <p className="text-xs leading-6 text-slate-500">
                登録前に{" "}
                <Link
                    href="/privacy"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-emerald-700 underline underline-offset-4 hover:text-emerald-800"
                >
                    プライバシーポリシー
                </Link>
                {" "}をご確認ください。
            </p>
        </form>
    )
}
