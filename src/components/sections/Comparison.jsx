"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

export default function Comparison() {
    return (
        <section className="py-32 bg-stone-50/50 border-t border-border/40">
            <div className="container mx-auto px-4 max-w-[1000px]">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 text-foreground">Stop working in the past.</h2>
                    <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">The old way is slowing you down. AgencyOS is built for speed and scale.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* The Old Way */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-muted/30 border border-border/50 p-8 rounded-2xl flex flex-col justify-center"
                    >
                        <h3 className="text-2xl font-bold mb-8 text-muted-foreground flex items-center gap-3 opacity-80">
                            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 text-red-500">
                                <X className="w-6 h-6" />
                            </span>
                            The Hard Way
                        </h3>
                        <ul className="space-y-5">
                            <ListItem negative>Chaotic WhatsApp groups</ListItem>
                            <ListItem negative>Lost files in Drive</ListItem>
                            <ListItem negative>Slow email replies</ListItem>
                            <ListItem negative>Manual data entry</ListItem>
                            <ListItem negative>Guesswork</ListItem>
                        </ul>
                    </motion.div>

                    {/* AgencyOS */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-background to-primary/5 border-2 border-primary p-8 rounded-2xl shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)] relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full -mr-10 -mt-10" />

                        <h3 className="text-3xl font-bold mb-8 text-foreground flex items-center gap-3">
                            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                                <Check className="w-6 h-6" />
                            </span>
                            AgencyOS
                        </h3>
                        <ul className="space-y-5">
                            <ListItem active>One Central Inbox</ListItem>
                            <ListItem active>AI-Sorted Portfolios</ListItem>
                            <ListItem active>Real-time Team Sync</ListItem>
                            <ListItem active>One-Click Sharing</ListItem>
                            <ListItem active><strong>Scout in Seconds</strong></ListItem>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

function ListItem({ children, negative, active }) {
    return (
        <li className={`flex items-center gap-4 text-base md:text-lg ${negative ? 'text-muted-foreground/60 line-through decoration-red-500/30' : 'text-foreground font-medium'} ${active ? 'text-lg tracking-tight' : ''}`}>
            {negative ? (
                <X className="w-5 h-5 text-red-500/50 flex-shrink-0" />
            ) : (
                <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-500 stroke-[3px]" />
                </div>
            )}
            {children}
        </li>
    )
}
