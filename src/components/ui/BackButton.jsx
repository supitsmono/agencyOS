"use client"

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function BackButton({ label = "Go Back", className = "" }) {
    const router = useRouter()

    return (
        <button
            onClick={() => router.back()}
            className={`inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all px-4 py-2 rounded-full border border-transparent hover:border-border hover:bg-muted/50 w-fit group ${className}`}
        >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {label}
        </button>
    )
}
