"use client"

import { motion } from "framer-motion"

export default function Metrics() {
    return (
        <section className="py-24 bg-background border-y border-border/40">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    <MetricItem value="1M+" label="Applications Scanned" />
                    <MetricItem value="500+" label="Agencies Onboarded" />
                    <MetricItem value="40%" label="Efficiency Increase" />
                    <MetricItem value="24/7" label="Automated Scouting" />
                </div>
            </div>
        </section>
    )
}

function MetricItem({ value, label }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center text-center"
        >
            <div className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-2">
                {value}
            </div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                {label}
            </div>
        </motion.div>
    )
}
