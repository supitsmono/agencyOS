"use client"

import { motion } from "framer-motion"
import { ArrowRight, Smartphone, LayoutDashboard, Share2 } from "lucide-react"
import Link from "next/link"
import BackButton from '@/components/ui/BackButton'

export default function HowItWorksPage() {
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
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary mb-8 select-none">
                        The Workflow
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        From chaos to <br />
                        <span className="text-primary">controlled scaling.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-[700px] mx-auto mb-12">
                        Most agencies drown in WhatsApp groups and messy Excels. AgencyOS introduces a linear, professional workflow that saves you 20 hours a week.
                    </p>
                </motion.div>
            </section>

            {/* The 3 Steps */}
            <section className="py-20 bg-muted/20 border-y border-border/40">
                <div className="container mx-auto px-4 max-w-[1000px]">

                    {/* Step 1: AI Analysis */}
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-32">
                        <div className="flex-1 order-2 md:order-1">
                            <div className="p-8 bg-background border border-border rounded-2xl shadow-lg relative">
                                <div className="absolute top-4 right-4 bg-teal-500/10 text-teal-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">The Intelligent Layer</div>
                                <Smartphone className="w-12 h-12 text-teal-600 mb-6" />
                                <h3 className="text-3xl font-bold mb-4">AI Categorization</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    Every application is analyzed instantly. Our AI sorts raw profiles into three clear buckets so you focus only on the best.
                                </p>
                                <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-background mb-4">
                                    <div className="bg-emerald-500 py-2 rounded-md shadow-sm">Top Potential</div>
                                    <div className="bg-amber-500 py-2 rounded-md shadow-sm">Review</div>
                                    <div className="bg-rose-500 py-2 rounded-md shadow-sm">Archive</div>
                                </div>
                                <p className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600" /> Auto-sorted by measurements & look
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 order-1 md:order-2">
                            <span className="text-9xl font-bold text-muted/30 select-none">01</span>
                        </div>
                    </div>

                    {/* Step 2: The CRM */}
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-32">
                        <div className="flex-1 text-right hidden md:block">
                            <span className="text-9xl font-bold text-muted/30 select-none">02</span>
                        </div>
                        <div className="flex-1">
                            <div className="p-8 bg-background border border-border rounded-2xl shadow-lg relative">
                                <div className="absolute top-4 right-4 bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">The Engine</div>
                                <LayoutDashboard className="w-12 h-12 text-blue-600 mb-6" />
                                <h3 className="text-3xl font-bold mb-4">Centralized Agency CRM</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    A powerful database for your entire network. All your scouts work in one shared workspace, accessing the same real-time data.
                                </p>
                                <ul className="space-y-2 text-sm font-medium text-foreground/80">
                                    <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Unlimited Scout Accounts</li>
                                    <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Global Search & Filtering</li>
                                    <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Drag-and-Drop Pipeline</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex-1 text-right md:hidden">
                            <span className="text-9xl font-bold text-muted/30 select-none">02</span>
                        </div>
                    </div>

                    {/* Step 3: Teamwork */}
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                        <div className="flex-1 order-2 md:order-1">
                            <div className="p-8 bg-background border border-border rounded-2xl shadow-lg relative">
                                <div className="absolute top-4 right-4 bg-indigo-500/10 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Collaboration</div>
                                <Share2 className="w-12 h-12 text-indigo-600 mb-6" />
                                <h3 className="text-3xl font-bold mb-4">Multi-User Workflow</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    Stop emailing screenshots. Your team comments, rates, and votes directly on profiles. Decisions happen in seconds, not days.
                                </p>
                                <ul className="space-y-2 text-sm font-medium text-foreground/80">
                                    <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600" /> Live Team Chat</li>
                                    <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600" /> Internal Voting System</li>
                                    <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600" /> Activity History Logs</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex-1 order-1 md:order-2">
                            <span className="text-9xl font-bold text-muted/30 select-none">03</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* The Offer */}
            <section className="py-32 container mx-auto px-4 text-center max-w-[800px]">
                <h2 className="text-4xl font-bold mb-8">Stop working like it's 2010.</h2>
                <p className="text-xl text-muted-foreground mb-12">
                    AgencyOS isn't just software. It's a new way of running your agency.
                    <br className="hidden md:block" /> Less admin. More scouting. Better bookings.
                </p>
                <div className="flex justify-center flex-col sm:flex-row gap-4">
                    <Link href="/signup" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
                        Get Started Free <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link href="/pricing" className="px-8 py-4 rounded-full font-medium text-lg text-muted-foreground hover:text-foreground transition-colors">
                        View Pricing
                    </Link>
                </div>
            </section>
        </>
    )
}
