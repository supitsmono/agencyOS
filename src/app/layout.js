import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Scouting Platform for Modern Agencies',
  description: 'Manage talent, streamline your scouting workflow, and discover new models with intelligent AI support.',
}

import RedirectOnRefresh from '@/components/ui/RedirectOnRefresh'
import ScrollRestorationHelper from '@/components/ui/ScrollRestorationHelper'
import { Toaster } from 'sonner'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} h-full`}>
        <ScrollRestorationHelper />
        <RedirectOnRefresh />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
