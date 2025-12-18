"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2, Lock, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function CheckoutContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const plan = searchParams.get("plan") || "Starter"
    const email = searchParams.get("email") || "user@example.com"
    const [isProcessing, setIsProcessing] = useState(false)

    const handlePay = (e) => {
        e.preventDefault()
        setIsProcessing(true)

        // Simulate payment delay
        setTimeout(() => {
            router.push("/dashboard?checkout_success=true")
        }, 1500)
    }

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
            {/* Left Column: Product Info */}
            <div className="bg-zinc-50 p-8 md:p-12 lg:p-16 flex flex-col justify-between border-r border-zinc-200">
                <div className="space-y-6">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <div className="w-8 h-8 bg-zinc-900 rounded-md flex items-center justify-center text-white text-xs">A</div>
                        AgencyOS
                    </div>

                    <div className="space-y-2">
                        <div className="text-zinc-500 text-sm font-medium uppercase tracking-wide">Subscribe to</div>
                        <h1 className="text-3xl font-bold text-zinc-900">{plan} Plan</h1>
                        <div className="text-4xl font-bold tracking-tight mt-2 flex items-baseline">
                            €0.00 <span className="text-base font-normal text-zinc-500 ml-2">for 14 days</span>
                        </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-zinc-200/50">
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-600">Starting today</span>
                            <span className="font-medium text-zinc-900">€0.00</span>
                        </div>
                        <div className="flex justify-between text-base font-medium pt-2 border-t border-zinc-200/50">
                            <span>Total due today</span>
                            <span>€0.00</span>
                        </div>
                    </div>
                </div>

                <div className="text-xs text-zinc-400 mt-12">
                    Powered by <span className="font-bold text-zinc-500">Stripe (Test Mode)</span>
                </div>
            </div>

            {/* Right Column: Payment Form */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <form onSubmit={handlePay} className="max-w-[420px] mx-auto w-full space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-zinc-900">Pay with card</h2>
                        <p className="text-sm text-zinc-500">Enter your payment details to start the trial.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <div className="text-sm text-zinc-900 font-medium">{email}</div>
                        </div>

                        <div className="space-y-3">
                            <div className="space-y-1.5">
                                <Label htmlFor="card">Card Information</Label>
                                <div className="relative">
                                    <Input
                                        id="card"
                                        placeholder="4242 4242 4242 4242"
                                        defaultValue="4242 4242 4242 4242"
                                        className="pl-10 font-mono tracking-wide"
                                        required
                                    />
                                    <CreditCard className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="expiry">Expiry</Label>
                                    <Input id="expiry" placeholder="MM/YY" defaultValue="12/26" required className="font-mono" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" defaultValue="123" required className="font-mono" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="name">Name on card</Label>
                            <Input id="name" placeholder="John Doe" required />
                        </div>
                    </div>

                    <Button type="submit" className="w-full h-12 bg-[#00D97E] hover:bg-[#00D97E]/90 text-white font-bold text-lg shadow-sm" disabled={isProcessing}>
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Start Trial"}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
                        <Lock className="w-3 h-3" />
                        Payments are secure and encrypted
                    </div>
                </form>
            </div>
        </div>
    )
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    )
}
