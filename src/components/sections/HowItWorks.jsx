"use client"

import { motion } from "framer-motion"

export default function HowItWorks() {
    return (
        <section className="py-32 bg-stone-50/50">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-3xl font-bold mb-4 text-foreground">How AgencyOS Works</h2>
                        <p className="text-muted-foreground">Streamline your entire workflow in three simple steps.</p>
                    </motion.div>

                    <div className="relative border-l border-border/50 ml-6 md:ml-12 pl-12 md:pl-16 space-y-16">
                        {[
                            { step: "1", title: "Create your workspace", desc: "Set up your agency profile, invite scouts, and configure your pipeline stages." },
                            { step: "2", title: "Import your talent", desc: "Bulk upload portfolios or connect your application form directly to the dashboard." },
                            { step: "3", title: "Scout with AI-powered insights", desc: "Get automated categorization, portfolio comparisons, and intelligent recommendations." }
                        ].map((item, i) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.5 }}
                                className="relative"
                            >
                                <div className="absolute -left-[66px] md:-left-[82px] top-0 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center font-semibold text-sm shadow-sm z-10 transition-colors hover:border-primary/50">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                                    <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
