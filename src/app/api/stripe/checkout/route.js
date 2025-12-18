import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"

// Placeholder Price IDs - User needs to replace these with real Stripe Price IDs
const PRICE_IDS = {
    starter: "price_placeholder_starter",
    professional: "price_placeholder_professional",
    agency: "price_placeholder_agency"
}

export async function POST(req) {
    try {
        const { plan, email } = await req.json()
        const priceId = PRICE_IDS[plan?.toLowerCase()] || PRICE_IDS.starter

        // MOCK STRIPE REDIRECT (USER REQUEST: FAKE PAYMENT)
        // const session = await stripe.checkout.sessions.create({ ... }) 

        // Redirect to internal checkout mock
        const mockUrl = `${process.env.NEXT_PUBLIC_APP_URL}/checkout?plan=${plan || 'starter'}&email=${encodeURIComponent(email)}`

        return NextResponse.json({ url: mockUrl })
    } catch (error) {
        console.error("Stripe Error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
