import Link from "next/link"

export default function page() {
    return (
        <>
            <div>ログインページ</div>
            <div>
                <Link href={`/register/`} className="text-blue-600">アカウントをお持ちでない方はこちら</Link>
            </div>
        </>
    )
}
