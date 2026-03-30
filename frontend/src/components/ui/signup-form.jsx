'use client'

import { signup } from "@/lib/actions/auth";
import { useActionState } from "react";

export default function SignupForm() {
    // ActionStateでフォーム管理理
    // actionに関数を渡すと、フォームの送信時などに関数を走らせる
    const [state, action, pending] = useActionState(signup, undefined)

    return (
        // signupでフィールドの検証を行う
        <form action={action}>
            <div className="">
                <label htmlFor="username">ユーザー名：</label>
                <input id="username" name="username" placeholder="ユーザー名" className="bg-cyan-700" />
            </div>
            {/* nameのエラーを出力 */}
            {state?.errors?.username && <p>{state.errors.username}</p>}

            <div>
                <label htmlFor="email">E-mail：</label>
                <input id="email" name="email" placeholder="メールアドレス" type="email" className="bg-red-100" />
            </div>
            {/* E-mailのエラーを出力 */}
            {state?.errors?.email && <p>{state.errors.email}</p>}

            <div className="">
                <label htmlFor="password">パスワード：</label>
                <input id="password" name="password" placeholder="password" type="password" className="bg-gray-400" />
            </div>
            {/* passwordのエラーを出力 */}
            {state?.errors?.password && (
                <div>
                    <p>パスワードは以下を含む必要があります</p>
                    <ul>
                        {/* エラーの数に合わせて出力させる */}
                        {state.errors.password.map((error) => (
                            <li key={error}>- {error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* アカウント作成時のエラーがあれば出力 */}
            {state?.message && <p>{state.message}</p>}

            <button disabled={pending} type="submit" className="bg-green-200">サインアップ</button>
        </form>
    )
}
