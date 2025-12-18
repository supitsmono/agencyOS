"use client"

import BackButton from '@/components/ui/BackButton'

export default function TermsPage() {
    return (
        <div className="pt-20 pb-32">
            <div className="container mx-auto px-4 max-w-[800px]">
                <div className="mb-12">
                    <BackButton />
                </div>

                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-stone dark:prose-invert max-w-none">
                    <p className="text-xl text-muted-foreground mb-8">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        These Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and AgencyOS ("we," "us" or "our"), concerning your access to and use of the AgencyOS website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                    </p>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">2. Intellectual Property Rights</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                    </p>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">3. User Representations</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.
                    </p>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">4. Fees and Payment</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        We accept the following forms of payment: Visa, Mastercard, American Express. You may be required to purchase or pay a fee to access some of our services. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.
                    </p>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">5. Cancellation</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        All purchases are non-refundable. You can cancel your subscription at any time by logging into your account. Your cancellation will take effect at the end of the current paid term. If you are unsatisfied with our services, please email us at help.agencyos@gmail.com.
                    </p>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">6. Limitation of Liability</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
                    </p>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">7. Governing Law</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        These Terms shall be governed by and defined following the laws of The Netherlands. AgencyOS and yourself irrevocably consent that the courts of The Netherlands shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                    </p>
                </div>
            </div>
        </div>
    )
}
