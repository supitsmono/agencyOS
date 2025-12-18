"use client"

import { motion } from "framer-motion"

const TESTIMONIALS = [
    {
        quote: "We save 15+ hours a week on data entry alone. It's not just a tool, it's our entire backend.",
        author: "Sarah Jenkins",
        role: "Head Booker, Aura Models",
        logo: "AURA"
    },
    {
        quote: "The AI found us a New Face that booked a Prada exclusive. That one booking paid for the software for 10 years.",
        author: "Marc O'Connor",
        role: "Director, Zenith Mgmt",
        logo: "ZENITH"
    },
    {
        quote: "AgencyOS is the industry standard. If you aren't using it, you're simply slower than everyone else.",
        author: "Elena Rossi",
        role: "Scouting Lead, Musa Talents",
        logo: "MUSA"
    }
]

export default function Testimonials() {
    return (
        <section className="py-32 bg-muted/30 overflow-hidden">
            <div className="container mx-auto px-4 mb-20 text-center max-w-[800px]">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-6">Trusted by the world's best agencies.</h2>
                <p className="text-xl text-muted-foreground">Join hundreds of top scouting teams who have switched to a smarter workflow.</p>
            </div>

            <div className="container mx-auto px-4 sticky">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-background border border-border p-8 rounded-lg shadow-sm flex flex-col justify-between h-full min-h-[280px]"
                        >
                            <div className="mb-8">
                                <div className="font-bold text-xl tracking-tighter text-foreground/20 mb-6">{t.logo}</div>
                                <p className="text-lg leading-relaxed text-foreground/90">"{t.quote}"</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-muted border border-border" />
                                <div>
                                    <div className="font-bold text-sm text-foreground">{t.author}</div>
                                    <div className="text-xs text-muted-foreground">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
