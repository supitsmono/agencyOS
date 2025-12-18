"use client"

import BackButton from '@/components/ui/BackButton'
import { Mail, MapPin } from 'lucide-react'

export default function ContactPage() {
    return (
        <div className="pt-20 pb-32">
            <div className="container mx-auto px-4 max-w-[800px]">
                <div className="mb-12">
                    <BackButton />
                </div>

                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    We'd love to hear from you. Here's how to reach us.
                </p>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="p-8 rounded-2xl border border-border bg-card hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                            <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Support & Sales</h3>
                        <p className="text-muted-foreground mb-4">
                            For general inquiries, partnership opportunities, or help with your account.
                        </p>
                        <a href="mailto:help.agencyos@gmail.com" className="text-primary font-medium hover:underline">
                            help.agencyos@gmail.com
                        </a>
                    </div>

                    <div className="p-8 rounded-2xl border border-border bg-card hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                            <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Headquarters</h3>
                        <p className="text-muted-foreground mb-4">
                            AgencyOS B.V.<br />
                            Amsterdam, The Netherlands
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <h3 className="text-lg font-medium mb-2">Need immediate assistance?</h3>
                    <p className="text-muted-foreground">
                        Our support team typically responds within 24 hours during business days.
                    </p>
                </div>
            </div>
        </div>
    )
}
