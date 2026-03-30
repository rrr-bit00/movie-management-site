import Link from "next/link"
import LoginForm from "@/components/ui/login-form"

export default function page() {
    return (
        <>
            <LoginForm />
            <div>
                <Link href={`/register/`} className="text-blue-600">アカウントをお持ちでない方はこちら</Link>
            </div>
        </>
    )
}
