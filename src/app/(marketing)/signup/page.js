"use client"

import { useState, Suspense } from "react"
import { signUp } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, Check } from "lucide-react"

function SignupContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const plan = searchParams.get("plan")

    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSignup = async (e) => {
        e.preventDefault()

        if (password.length < 8) {
            alert("Password must be at least 8 characters long.")
            return
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.")
            return
        }

        setIsLoading(true)

        // 1. Create User Account
        await signUp.email({
            email,
            password,
            name,
            callbackURL: "/dashboard", // Fallback
            fetchOptions: {
                onSuccess: async () => {
                    try {
                        // 2. Create Stripe Checkout Session
                        const response = await fetch("/api/stripe/checkout", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                plan: plan || "starter", // Default to starter if no plan selected
                                email
                            })
                        })

                        const data = await response.json()

                        if (data.url) {
                            // 3. Redirect to Stripe
                            window.location.href = data.url
                        } else {
                            // Fallback if no URL (free plan?)
                            router.push("/dashboard")
                        }
                    } catch (err) {
                        console.error("Stripe Redirect Error:", err)
                        // If payment fails, still allow access for now or show error?
                        // For now, let's redirect to dashboard but log error
                        router.push("/dashboard")
                    }
                },
                onError: (ctx) => {
                    console.error("Signup Error:", ctx)
                    alert(ctx.error?.message || "Something went wrong during signup. Please try again.")
                    setIsLoading(false)
                }
            }
        })
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-zinc-50">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/auth-bg.png"
                    alt="Background"
                    className="h-full w-full object-cover opacity-100"
                />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
            </div>

            {/* Centered Glass Card */}
            <div className="relative z-10 w-full max-w-[480px] mx-4">
                <div className="bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-8 md:p-10 space-y-6 ring-1 ring-black/5">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="font-bold text-2xl tracking-tighter mb-4">
                            Agency<span className="text-primary">OS</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Start your free trial</h1>
                        {plan && (
                            <div className="flex justify-center mb-2">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/20">
                                    {plan} Plan Selected
                                </span>
                            </div>
                        )}
                        <p className="text-sm text-zinc-500 text-balance">
                            Join elite agencies managing talent with AgencyOS.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Agency Name</Label>
                            <Input
                                id="name"
                                placeholder="Elite Models"
                                className="bg-white/50 border-zinc-200 focus:bg-white transition-colors"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Work Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="scout@agency.com"
                                className="bg-white/50 border-zinc-200 focus:bg-white transition-colors"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    className="bg-white/50 border-zinc-200 focus:bg-white transition-colors"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    className="bg-white/50 border-zinc-200 focus:bg-white transition-colors"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <p className="text-xs text-zinc-500">Must be at least 8 characters.</p>

                        <Button type="submit" className="w-full h-11 font-medium text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Start 14-Day Free Trial"
                            )}
                        </Button>
                    </form>

                    {/* Trust Signals */}
                    <div className="pt-2">
                        <div className="flex items-center gap-2 text-xs text-zinc-500 justify-center">
                            <Check className="w-3.5 h-3.5 text-primary" />
                            <span>14-day free trial</span>
                            <span className="mx-2 text-zinc-300">•</span>
                            <Check className="w-3.5 h-3.5 text-primary" />
                            <span>Cancel anytime</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-sm text-zinc-500 border-t border-zinc-100 pt-6 mt-4">
                        Already have an account?{" "}
                        <Link href="/login" className="text-zinc-900 font-semibold hover:text-primary transition-colors hover:underline">
                            Log in
                        </Link>
                    </div>
                </div>

                {/* Social Proof (Optional floating below) */}
                <div className="mt-8 text-center px-8">
                    <p className="text-sm text-white/80 italic font-medium">
                        &ldquo;The best decision we made this year.&rdquo;
                    </p>
                    <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">
                        — Head of Scouting, Elite Paris
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div className="min-h-screen w-full flex items-center justify-center bg-zinc-50"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
            <SignupContent />
        </Suspense>
    )
}
