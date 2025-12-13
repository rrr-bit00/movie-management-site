'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from 'react'
import { Input } from "./input"

export default function SearchInput({className, ...props}) {
    // URLの可変化やURLの生成、ルーティングを管理する
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    // 初期値をSearchParamsから渡す
    const [value, setValue] = useState(searchParams.get('q') ?? "")

    // URLの更新
    function updateSearch(term) {
        const params = new URLSearchParams(searchParams.toString())
        term ? params.set('q', term) : params.delete("q")
        router.replace(`${pathname}?${params.toString()}`, { scroll: false})

    }

    // Stateの更新
    function handleChange(e) {
        setValue(e.target.value)
    }

    // 3秒のデバウンス
    useEffect(() => {
        const handler = setTimeout(() => {
            updateSearch(value)
        }, 300)

        return () => clearTimeout(handler)
    }, [value])

  return (
    <Input
        className={className}
        defaultValue={searchParams.get('q') ?? ""}
        onChange={handleChange}
        {...props}
    />
  )
}
