import Link from 'next/link'

export default function CallToAction() {
    return (
        <section className="py-24 bg-stone-50 border-t border-border/40 text-center">
            <div className="container mx-auto px-4 flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">Stop managing. Start scouting.</h2>
                <p className="text-muted-foreground max-w-2xl mb-10 text-lg">
                    Join the top 1% of agencies scaling with AgencyOS.
                </p>
                <div className="flex flex-col items-center gap-4">
                    <Link href="/signup" className="bg-primary text-primary-foreground px-8 py-4 rounded-md font-semibold hover:opacity-90 transition-opacity shadow-lg">Start Free Trial</Link>
                    <p className="text-sm text-muted-foreground/60">
                        14-day free trial • Cancel anytime
                    </p>
                </div>
            </div>
        </section>
    )
}
