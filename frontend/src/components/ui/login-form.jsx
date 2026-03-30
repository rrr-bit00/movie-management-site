'use client'

import { useActionState } from "react";
import { login } from "@/lib/actions/auth";

export default function LoginForm() {
    const [state, action, pending] = useActionState(login, undefined)

    return (
        <form action={action} className="space-y-4">
            <div>
                <label htmlFor="email">E-mail：</label>
                <input
                    id="email"
                    name="email"
                    placeholder="メールアドレス"
                    type="email"
                    className="bg-red-100"
                />
                {state?.errors?.email && <p>{state.errors.email}</p>}
            </div>

            <div>
                <label htmlFor="password">パスワード：</label>
                <input
                    id="password"
                    name="password"
                    placeholder="password"
                    type="password"
                    className="bg-gray-400"
                />
                {state?.errors?.password && <p>{state.errors.password}</p>}
            </div>

            {state?.message && <p>{state.message}</p>}

            <button disabled={pending} type="submit" className="bg-green-200">
                {pending ? "ログイン中..." : "ログイン"}
            </button>
        </form>
    )
}
