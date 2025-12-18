"use client"

import { motion } from "framer-motion"

export default function AIHighlight() {
    return (
        <section className="py-32 bg-muted/30">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-16 md:gap-32 text-center md:text-left">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 max-w-[500px]"
                >
                    <h2 className="text-4xl font-bold mb-8 text-foreground leading-[1.1]">Your Unfair Advantage.</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        While other agencies drown in emails, your AI is already flagging the next star.
                        Automated sorting means you never miss a face — and you spend zero time on admin.
                    </p>
                </motion.div>
                <div className="flex-1 flex justify-center">
                    {/* Visual simulation of AI Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-background p-8 rounded-md shadow-md w-[300px] border border-border"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-muted rounded-full"></div>
                            <div className="flex-1">
                                <div className="w-20 h-2.5 bg-muted mb-1.5 rounded-sm"></div>
                                <div className="w-12 h-2 bg-muted/50 rounded-sm"></div>
                            </div>
                            <div className="bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wide">Perfect Fit</div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <div className="bg-muted/50 text-muted-foreground text-xs px-2 py-1 rounded-full border border-border">Tall</div>
                            <div className="bg-muted/50 text-muted-foreground text-xs px-2 py-1 rounded-full border border-border">Unique Look</div>
                            <div className="bg-muted/50 text-muted-foreground text-xs px-2 py-1 rounded-full border border-border">High Potential</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
