"use client"

import { motion } from "framer-motion"
import { Smartphone, Zap, Eye, Share2, Globe, Users } from "lucide-react"

export default function ScoutWorkflow() {
    return (
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-[900px]">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
                        <Users className="w-4 h-4" />
                        Built for Scouts
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-foreground">
                        Scout. Sort. <span className="text-muted-foreground">Done.</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-[600px] mx-auto font-medium">
                        Zero admin. Pure scouting. <span className="text-foreground">The way it should be.</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={Zap}
                        color="text-amber-600"
                        bg="bg-amber-500/10"
                        title="Rapid Shortlisting"
                        desc="Grade talent with one tap. AI helps you decide."
                    />
                    <FeatureCard
                        icon={Globe}
                        color="text-blue-600"
                        bg="bg-blue-500/10"
                        title="Anywhere Access"
                        desc="Seamlessly switch between any of your devices."
                    />
                    <FeatureCard
                        icon={Share2}
                        color="text-emerald-600"
                        bg="bg-emerald-500/10"
                        title="Instant Handoff"
                        desc="Push top profiles to your team board with one click."
                    />
                </div>
            </div>
        </section>
    )
}

function FeatureCard({ icon: Icon, title, desc, color, bg }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors text-center group"
        >
            <div className={`w-14 h-14 mx-auto rounded-2xl ${bg} ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
            <p className="text-muted-foreground font-medium opacity-80">{desc}</p>
        </motion.div>
    )
}
