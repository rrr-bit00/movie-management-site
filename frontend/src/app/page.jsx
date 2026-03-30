import Link from "next/link"

export default function page() {
  return (
    <>
      <div className="text-center">ここでは、映画情報を管理するAPIを使用できます。
        <br />
        <Link href={`/movies/`} className="text-blue-600">映画情報管理APIに飛ぶ（閲覧専用）</Link>
      </div>
      <div className="text-center p-5">
        <Link href={`/login/`} className="text-blue-600 mr-4">ログインページへ</Link>
      </div>
    </>
  )
}
