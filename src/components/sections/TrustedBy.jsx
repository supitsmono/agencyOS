"use client"

import { motion } from "framer-motion"

export default function TrustedBy() {
    return (
        <section className="py-12 border-b border-border/40 bg-zinc-50/50">
            <div className="container mx-auto px-4 text-center">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest"
                >
                    Trusted by top agencies in
                </motion.p>
                <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {['AURA', 'MUSA', 'ZENITH', 'NOVA', 'SCOUTX'].map((agency, i) => (
                        <motion.div
                            key={agency}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-xl font-bold font-serif"
                        >
                            {agency}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
