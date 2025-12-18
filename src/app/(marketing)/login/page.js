"use client"

import { useState } from "react"
import { signIn } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await signIn.email({
            email,
            password,
            callbackURL: "/dashboard",
            fetchOptions: {
                onSuccess: () => {
                    router.push("/dashboard")
                },
                onError: (ctx) => {
                    alert(ctx.error.message)
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
                    className="h-full w-full object-cover opacity-100" // Full visibility
                />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" /> {/* Slight blur for focus on card */}
            </div>

            {/* Centered Glass Card */}
            <div className="relative z-10 w-full max-w-[420px] mx-4">
                <div className="bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-8 md:p-10 space-y-8 ring-1 ring-black/5">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="font-bold text-2xl tracking-tighter mb-4">
                            Agency<span className="text-primary">OS</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Welcome back</h1>
                        <p className="text-sm text-zinc-500">
                            Enter your email to access your workspace.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@agency.com"
                                className="bg-white/50 border-zinc-200 focus:bg-white transition-colors"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="/forgot-password" className="text-xs text-primary hover:underline font-medium">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                className="bg-white/50 border-zinc-200 focus:bg-white transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full h-11 font-medium text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="text-center text-sm text-zinc-500 pt-2">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-zinc-900 font-semibold hover:text-primary transition-colors hover:underline">
                            Start free trial
                        </Link>
                    </div>
                </div>

                {/* System Text (Optional floating below) */}
                <div className="mt-8 text-center text-xs text-white/60 font-medium">
                    Protected by AgencyOS Secure Auth
                </div>
            </div>
        </div>
    )
}
