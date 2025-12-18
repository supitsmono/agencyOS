"use client"

import { useEffect } from 'react'

export default function ScrollRestorationHelper() {
    useEffect(() => {
        // Enforce browser to handle scroll restoration automatically
        if (typeof window !== 'undefined' && window.history) {
            window.history.scrollRestoration = 'auto'
        }
    }, [])

    return null
}
