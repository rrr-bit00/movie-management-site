'use client'

import { useEffect } from "react";

export default function BackendWarmup() {
    useEffect(() => {
        if (sessionStorage.getItem("backend-warmed") === "1") return

        const warmupUrl = process.env.NEXT_PUBLIC_WARMUP_URL
        fetch(`${warmupUrl}/warmup`, {
            method: "GET",
            cache: "no-store",
        }).then(() => {
            sessionStorage.setItem("backend-warmed", "1")
        }).catch(() => { })
    }, [])
    return null
}
