import Link from "next/link"

export default function page() {
  return (
    <div className="text-center">ここでは、映画情報を管理するAPIを使用できます。
      <br />
      <Link href={`/movies/`} className="text-blue-600">映画情報管理APIに飛ぶ</Link>
    </div>
  )
}
