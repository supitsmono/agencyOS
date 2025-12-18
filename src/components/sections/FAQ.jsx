"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const FAQS = [
    {
        q: "How does the AI filtering work?",
        a: "Our AI analyzes applicant photos and measurements against industry standards and your specific agency preferences. It learns from your decisions to get smarter over time."
    },
    {
        q: "Is my data secure?",
        a: "Absolutely. We use bank-level encryption for all data storage and transfer. Your talent database is completely private to your agency."
    },
    {
        q: "Can I import existing data?",
        a: "Yes! We offer a one-click import for Excel, CSV, and Notion databases. Our support team can also help migrate data from legacy agency software."
    },
    {
        q: "Is there a limit to team members?",
        a: "The Starter plan includes 4 seats, while Professional includes 8. The Agency plan allows for unlimited team members and custom roles."
    }
]

export default function FAQ() {
    return (
        <section className="py-24 bg-muted/20 border-t border-border/40">
            <div className="container mx-auto px-4 max-w-[800px]">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter mb-4">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground">Everything you need to know about the platform.</p>
                </div>

                <div className="flex flex-col gap-4">
                    {FAQS.map((faq, i) => (
                        <AccordionItem key={i} question={faq.q} answer={faq.a} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function AccordionItem({ question, answer, index }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group bg-background border rounded-lg overflow-hidden transition-all duration-200 ${isOpen ? 'border-primary/50 shadow-md ring-1 ring-primary/10' : 'border-border hover:border-border/80 hover:shadow-sm'}`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-primary' : 'text-foreground'}`}>{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`p-1 rounded-full ${isOpen ? 'bg-primary/10 text-primary' : 'text-muted-foreground group-hover:bg-muted'}`}
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
