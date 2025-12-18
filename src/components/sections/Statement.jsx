"use client"

import { motion } from "framer-motion"

export default function Statement() {
    return (
        <section className="py-40 bg-zinc-950 text-white overflow-hidden relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]"
                    >
                        Scouting is an art. <br />
                        <span className="text-zinc-500">We just built the brush.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Stop drowning in emails and spreadsheets.
                        Start discovering the faces of tomorrow with tools designed for the future.
                    </motion.p>
                </div>
            </div>

            {/* Abstract background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    )
}
