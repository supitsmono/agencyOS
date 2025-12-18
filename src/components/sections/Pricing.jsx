"use client"

import { Check, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"

const TIERS = [
    {
        name: "Starter",
        price: "€249",
        desc: "Perfect for boutique agencies starting their digital journey.",
        features: ["Up to 500 Applicants", "4 Team Seats", "Basic AI Sorting", "Standard Support"]
    },
    {
        name: "Professional",
        price: "€599",
        desc: "For unparalleled scouting efficiency at scale.",
        features: ["Unlimited Applicants", "8 Team Seats", "Advanced AI Ranking", "Priority Support", "Client Sharing Mode"],
        highlight: true
    },
    {
        name: "Agency",
        price: "Custom",
        desc: "Tailored solutions for global scouting networks.",
        features: ["Unlimited Everything", "Unlimited Seats", "Custom AI Models", "Dedicated Account Manager", "SSO & API Access"]
    }
]

export default function Pricing({ className, animateOnLoad = false }) {
    return (
        <section className={cn("py-32 bg-background border-t border-border/40", className)}>
            <div className="container mx-auto px-4 text-center max-w-[800px] mb-20">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-6">Simple, transparent pricing.</h2>
                <p className="text-xl text-muted-foreground">Choose the plan that fits your agency's scale.</p>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
                    {TIERS.map((tier, i) => (
                        <PricingCard key={i} {...tier} index={i} animateOnLoad={animateOnLoad} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function PricingCard({ name, price, desc, features, highlight, index, animateOnLoad }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={animateOnLoad ? undefined : { opacity: 1, y: 0 }}
            animate={animateOnLoad ? { opacity: 1, y: 0 } : undefined}
            whileHover={{ y: -8, scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4, type: "spring", stiffness: 200, damping: 25 }}
            className={`cursor-default select-none relative p-8 rounded-xl border flex flex-col h-full transition-colors duration-300 ${highlight ? 'bg-foreground text-background border-foreground ring-4 ring-foreground/10 shadow-2xl scale-105 z-10' : 'bg-background border-border text-foreground hover:shadow-xl hover:border-foreground/20 hover:bg-muted/20'}`}
        >
            <div className="mb-8 pl-2">
                <h3 className={`font-bold text-lg mb-2 ${highlight ? 'text-background/80' : 'text-muted-foreground'}`}>{name}</h3>
                <div className="text-5xl font-bold tracking-tight mb-4 flex items-baseline gap-1">{price}<span className="text-lg font-normal opacity-60 whitespace-nowrap">/month</span></div>
                <p className={`text-sm leading-relaxed ${highlight ? 'text-background/70' : 'text-muted-foreground'}`}>{desc}</p>
            </div>

            <ul className="flex-1 space-y-4 mb-8 pl-2">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className={`w-5 h-5 flex-shrink-0 ${highlight ? 'text-primary-foreground' : 'text-primary'}`} />
                        <span className="leading-tight pt-0.5">{feature}</span>
                    </li>
                ))}
            </ul>

            <Link href={`/signup?plan=${name.toLowerCase()}`} className={`w-full py-4 rounded-md font-bold text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer ${highlight ? 'bg-background text-foreground hover:bg-background/90' : 'bg-foreground text-background hover:opacity-90'}`}>
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
        </motion.div>
    )
}
