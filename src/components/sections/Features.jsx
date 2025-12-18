"use client"

import { motion } from "framer-motion"
import { Eye, Star, LayoutDashboard, Users, ShieldCheck, Share2 } from "lucide-react"

export default function Features() {
    return (
        <section className="py-32">
            <div className="container mx-auto px-4 flex flex-col items-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-center mb-32 max-w-[600px] text-foreground"
                >
                    Everything your agency needs — nothing you don’t.
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {[
                        { title: "Instant Profiles", desc: "Applications are automatically converted into professional model cards. Zero data entry.", icon: Eye, color: "text-blue-600", bg: "bg-blue-500/10" },
                        { title: "Smart Talent Ranking", desc: "AI-powered suitability scoring to help prioritize top profiles.", icon: Star, color: "text-indigo-600", bg: "bg-indigo-500/10" },
                        { title: "Applicant Tracking", desc: "A clear pipeline for reviewing and managing applicants.", icon: LayoutDashboard, color: "text-violet-600", bg: "bg-violet-500/10" },
                        { title: "Team Collaboration", desc: "Work together with your scouts in real-time. Comment, rate, and decide.", icon: Users, color: "text-emerald-600", bg: "bg-emerald-500/10" },
                        { title: "Secure & Private", desc: "Encrypted data, protected accounts, and complete agency control.", icon: ShieldCheck, color: "text-slate-600", bg: "bg-slate-500/10" },
                        { title: "One-Click Casting", desc: "Create stunning presentation links that clients actually open.", icon: Share2, color: "text-rose-600", bg: "bg-rose-500/10" }
                    ].map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="h-full"
                        >
                            <div className="h-full p-8 border border-border/50 rounded-2xl bg-muted/20 hover:bg-background transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-2 group relative overflow-hidden select-none cursor-default">
                                <div className={`absolute top-0 right-0 w-32 h-32 ${feature.bg} blur-[60px] rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity`} />

                                <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 text-xl group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                                <p className="text-base text-muted-foreground leading-relaxed font-medium">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
