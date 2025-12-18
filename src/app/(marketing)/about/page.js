"use client"

import BackButton from '@/components/ui/BackButton'

export default function AboutPage() {
    return (
        <div className="pt-20 pb-32">
            <div className="container mx-auto px-4 max-w-[800px]">
                <div className="mb-12">
                    <BackButton />
                </div>

                <h1 className="text-4xl font-bold mb-8">About AgencyOS</h1>
                <div className="prose prose-stone dark:prose-invert max-w-none">
                    <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        AgencyOS is the operating system for modern modeling agencies. We build tools that help scouts and agents focus on what matters: discovering and developing talent.
                    </p>

                    <h3 className="text-2xl font-semibold mt-12 mb-4">Our Mission</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        The modeling industry moves fast, but agency software has been stuck in the past. We are changing that. Our mission is to provide agencies with the same caliber of software that powers the world's leading tech companies—centralized, intelligent, and designed for speed.
                    </p>

                    <h3 className="text-2xl font-semibold mt-12 mb-4">Why We Built This</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        We saw agencies struggling with fragmented workflows—spreadsheets, email threads, WhatsApp groups, and disconnected databases. Talent was falling through the cracks, and valuable time was lost on admin.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        AgencyOS brings everything into one unified platform. From scouting to signing, we streamline the entire lifecycle so you can scale your roster without scaling your chaos.
                    </p>

                    <div className="mt-12 p-8 bg-muted/50 rounded-2xl border border-border">
                        <h4 className="text-xl font-semibold mb-2">Built for the Future</h4>
                        <p className="text-muted-foreground">
                            We are constantly innovating, using AI to help you find the hidden gems and data analytics to help you make smarter signing decisions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
