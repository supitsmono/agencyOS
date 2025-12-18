"use client"

import BackButton from '@/components/ui/BackButton'

export default function PrivacyPage() {
    return (
        <div className="pt-20 pb-32">
            <div className="container mx-auto px-4 max-w-[800px]">
                <div className="mb-12">
                    <BackButton />
                </div>

                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-stone dark:prose-invert max-w-none">
                    <p className="text-xl text-muted-foreground mb-8">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        Welcome to AgencyOS. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at help.agencyos@gmail.com.
                    </p>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        We collect personal information that you voluntarily provide to us when you register on the website, expressed an interest in obtaining information about us or our products and Services, when you participate in activities on the website, or otherwise when you contact us.
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                        <li><strong>Personal Information Provided by You:</strong> Names; phone numbers; email addresses; job titles; passwords; and similar information.</li>
                        <li><strong>Payment Data:</strong> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is stored by our payment processor (Stripe).</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                        <li>To facilitate account creation and logon process.</li>
                        <li>To send you marketing and promotional communications.</li>
                        <li>To fulfill and manage your orders.</li>
                        <li>To protect our Services.</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                    </p>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">5. Your Privacy Rights</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        In some regions (like the EEA and California), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information.
                    </p>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">6. Contact Us</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        If you have questions or comments about this policy, you may email us at help.agencyos@gmail.com.
                    </p>
                </div>
            </div>
        </div>
    )
}
