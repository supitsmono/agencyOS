import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-stone-50 border-t border-border/40 py-16 text-sm">
            <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-10 text-muted-foreground">
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-foreground mb-2">Product</h3>
                    <Link href="/" className="hover:text-primary transition-colors">Features</Link>
                    <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
                    <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-foreground mb-2">Agencies</h3>
                    <Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
                    <Link href="/signup" className="hover:text-primary transition-colors">Get Started</Link>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-foreground mb-2">Company</h3>
                    <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
                    <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-foreground mb-2">Legal</h3>
                    <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-16 pt-8 border-t border-border/40 text-muted-foreground flex justify-between items-center">
                <div>&copy; {new Date().getFullYear()} AgencyOS. All rights reserved.</div>
            </div>
        </footer>
    )
}
