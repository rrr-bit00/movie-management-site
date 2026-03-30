'use server'

import * as z from "zod";

import { SignupFormSchema } from "../validation";
import { createUser } from "../api/auth";
import { createSession, deleteSession } from "../session";
import { redirect } from "next/navigation";

export async function signup(state, formData) {
    // フォームフィールドの検証
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password")
    })

    // フォームフィールドで無効な場合に早期に返す
    if (!validatedFields.success) {
        const flattened = z.flattenError(validatedFields.error);

        return {
            errors: flattened.fieldErrors,
        }
    }

    // アカウント作成
    const { username, email, password } = validatedFields.data

    // try・catchでcreateUserのthrowを受け取る
    try {
        await createUser({ username, email, password })
    } catch (error) {
        return {
            message: error.message          // instanceofでErrorか確認できる
        }
    }

    // Sessionを作成する関数を呼び出す
    await createSession({ email, password })

    // Session作成後にHOMEにリダイレクト
    redirect(`/movies`)

}

// ログアウト
export async function logout() {
    // Sessionを削除
    await deleteSession()

    // Session削除後にログインページにリダイレクト
    redirect(`/login`)
}
