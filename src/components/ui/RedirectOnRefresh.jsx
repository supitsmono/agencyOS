"use client"

import { useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function RedirectOnRefresh() {
    const router = useRouter()
    const pathname = usePathname()
    const processed = useRef(false)

    useEffect(() => {
        if (processed.current) return
        processed.current = true

        // Check if the navigation type is 'reload'
        const navigationEntries = performance.getEntriesByType("navigation")
        if (navigationEntries.length > 0 && navigationEntries[0].type === "reload") {
            // Force scroll to top on reload
            window.scrollTo(0, 0)

            // Only redirect if we are NOT on the homepage AND not on auth/app routes
            const protectedRoutes = ['/login', '/signup']
            const isProtectedRoute = protectedRoutes.includes(pathname) || pathname.startsWith('/dashboard')

            if (pathname !== '/' && !isProtectedRoute) {
                router.replace('/')
            }
        }
    }, []) // Run once on mount

    return null
}
