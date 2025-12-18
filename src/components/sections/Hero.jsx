"use client"

import Link from 'next/link'
import DashboardPreview from '../previews/DashboardPreview'
import { motion } from "framer-motion"

export default function Hero() {
    return (
        <section className="py-32 text-center overflow-hidden">
            <div className="container mx-auto px-4 flex flex-col items-center max-w-[800px]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-6xl font-bold leading-[1.1] tracking-tighter mb-8 text-foreground">
                        The Operating System for <br />
                        <span className="text-muted-foreground">Elite Scouting Agencies.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-[650px] mb-16 mx-auto">
                        Centralize your workflow. Automate your intake. Scale your board. <br className="hidden md:block" />
                        Stop juggling emails and spreadsheets — bring your entire agency into one clear view.
                    </p>
                    <div className="flex justify-center gap-4 mb-32">
                        <Link href="/signup" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 text-lg">Start Free Trial</Link>
                        <Link href="/how-it-works" className="bg-background text-foreground px-8 py-4 border border-input rounded-full font-medium hover:bg-muted transition-colors text-lg">How It Works</Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-[1000px] h-[400px] bg-muted border border-border rounded-md shadow-2xl flex items-center justify-center relative overflow-hidden ring-1 ring-border/50"
                >
                    <DashboardPreview />
                </motion.div>
            </div>
        </section>
    )
}
