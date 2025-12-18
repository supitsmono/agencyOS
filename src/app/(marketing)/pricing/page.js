import BackButton from '@/components/ui/BackButton'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import CallToAction from '@/components/sections/CallToAction'

export default function PricingPage() {
    return (
        <>
            <div className="pt-20 pb-0">
                <div className="container mx-auto px-4">
                    <BackButton />
                </div>
                <Pricing className="pt-8 pb-32 border-none" animateOnLoad={true} />
            </div>
            <FAQ />
            <CallToAction />
        </>
    )
}
