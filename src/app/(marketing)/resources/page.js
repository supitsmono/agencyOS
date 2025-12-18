"use client"

import { motion } from "framer-motion"
import { GraduationCap, BookOpen, Zap, ArrowRight, Video, FileText, Sparkles, Headset, User } from "lucide-react"
import BackButton from '@/components/ui/BackButton'

export default function ResourcesPage() {
    return (
        <>
            <div className="pt-20 pb-0">
                <div className="container mx-auto px-4">
                    <BackButton />
                </div>
            </div>

            {/* Hero */}
            <section className="pt-12 pb-24 md:pt-12 md:pb-32 text-center container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-[800px] mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        The Academy for <br /> Modern Scouting.
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-[600px] mx-auto mb-12">
                        Everything you need to master AgencyOS and scale your scouting business.
                    </p>
                </motion.div>
            </section>

            {/* Main Grid */}
            <section className="pb-32 container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">

                    {/* Scouting Mastery */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-background border border-border p-8 rounded-2xl hover:border-blue-500/30 transition-colors group cursor-pointer relative overflow-hidden"
                    >
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                            <Headset className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Scouting Mastery</h3>
                        <p className="text-muted-foreground mb-6">
                            Don't just use the tool. Master the workflow that saves 20+ hours a week.
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-2 text-sm text-foreground/80">
                                <User className="w-4 h-4 text-blue-600" /> Personal Setup
                            </li>
                            <li className="flex items-center gap-2 text-sm text-foreground/80">
                                <Sparkles className="w-4 h-4 text-blue-600" /> Workflow Configuration
                            </li>
                        </ul>
                        <div className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                            Get Help <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </motion.div>

                    {/* Agency Blueprint */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-background border border-border p-8 rounded-2xl hover:border-teal-500/30 transition-colors group cursor-pointer relative overflow-hidden"
                    >
                        <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center mb-6 text-teal-600 group-hover:scale-110 transition-transform">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Agency Blueprint</h3>
                        <p className="text-muted-foreground mb-6">
                            The playbook for scaling. Permissions, financial flows, and structural optimization.
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-2 text-sm text-foreground/80">
                                <FileText className="w-4 h-4 text-teal-600" /> Setup Guides
                            </li>
                            <li className="flex items-center gap-2 text-sm text-foreground/80">
                                <FileText className="w-4 h-4 text-teal-600" /> FAQs
                            </li>
                        </ul>
                        <div className="flex items-center text-teal-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                            View Documentation <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </motion.div>

                    {/* Innovation Pipeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-background border border-border p-8 rounded-2xl hover:border-indigo-500/30 transition-colors group cursor-pointer relative overflow-hidden"
                    >
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Innovation Pipeline</h3>
                        <p className="text-muted-foreground mb-6">
                            Your agency gets smarter every week. See the latest AI breakthroughs we've shipped.
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-2 text-sm text-foreground/80">
                                <Sparkles className="w-4 h-4 text-indigo-600" /> New: AI Categorization
                            </li>
                            <li className="flex items-center gap-2 text-sm text-foreground/80">
                                <Sparkles className="w-4 h-4 text-indigo-600" /> Performance Updates
                            </li>
                        </ul>
                        <div className="flex items-center text-indigo-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                            Read Updates <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </motion.div>

                </div>
            </section>
        </>
    )
}
