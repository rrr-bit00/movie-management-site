"use client"

import { STATUS_FILTERS } from "@/lib/status"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function StatusFilter() {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const selectedStatus = searchParams.get("status") ?? "all"

    function handleChange(nextStatus) {
        const params = new URLSearchParams(searchParams.toString())

        if (nextStatus === "all") {
            params.delete("status")
        } else {
            params.set("status", nextStatus)
        }

        const queryString = params.toString()
        const url = queryString ? `${pathname}?${queryString}` : pathname
        router.replace(url)
    }
    return (
        <div className="flex mb-6 items-center justify-center text-base">
            {STATUS_FILTERS.map((status, index) => (
                <div key={status.code} className="flex items-center">
                    <button
                        type="button"
                        onClick={() => handleChange(status.code)}
                        className={
                            selectedStatus === status.code
                                ? "font-semibold text-amber-200 transition-colors"
                                : "text-slate-300/80 transition-colors hover:text-slate-100"}
                    >
                        {status.label}
                    </button>

                    {index !== STATUS_FILTERS.length - 1 && (
                        <span className="mx-3 text-slate-400/60">|</span>
                    )}
                </div>
            ))}
        </div>
    )
}
