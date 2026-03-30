import * as z from "zod";

// Zodによるバリデーション
export const SignupFormSchema = z.object({
    // usernameとpasswordのバリデーションスキーマ
    // 型・長さを決める
    username: z
        .string()
        .min(2, { error: "ユーザー名は1文字以上である必要があります" })
        .trim(),

    // emailは型のみ
    email: z.email({ error: "有効なメールアドレスを入力してください" }).trim(),

    // passwordはregexで正規化
    password: z
        .string()
        .min(8, { error: "パスワードは8文字以上である必要があります" })
        .regex(/[a-zA-Z]/, { error: "少なくとも1つの文字を含みます" })
        .regex(/[0-9]/, { error: "少なくとも1つの数字を含みます" })
        .regex(/[^a-zA-Z0-9]/, { error: "少なくとも1つの特殊文字を含みます" })
        .trim()
})

export const LoginFormSchema = z.object({
    email: z.email({ error: "有効なメールアドレスを入力してください" }).trim(),
    password: z.string().min(1, { error: "パスワードを入力してください" }).trim(),
})
