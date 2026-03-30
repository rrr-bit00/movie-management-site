import Link from "next/link";
import SignupForm from "@/components/ui/signup-form";

export default function page() {
    return (
        <>
            <SignupForm />
            <div>
                <Link href={`/login/`} className="text-blue-600">すでにアカウントをお持ちの方はこちら</Link>
            </div>
        </>
    )
}
