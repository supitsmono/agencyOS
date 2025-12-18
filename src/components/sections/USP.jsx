
"use client"

import { Search, FolderOpen, Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function USP() {
    return (
        <section className="py-24 bg-background border-b border-border/40">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {[
                        { icon: Search, title: "AI Scouting", desc: "Scout with AI-powered insights. Get automated categorization, portfolio comparisons, and intelligent recommendations." },
                        { icon: FolderOpen, title: "Portfolio Management", desc: "Organize models, photos, and videos in one secure cloud platform. Accessible from anywhere, anytime." },
                        { icon: Zap, title: "Fast Workflows", desc: "Reduce manual work and focus on what truly matters — discovering great talent." }
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.5 }}
                            className="p-6 rounded-lg hover:bg-muted/30 transition-colors"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <item.icon className="w-6 h-6" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
