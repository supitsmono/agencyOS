"use client"

import dynamic from 'next/dynamic'

const DashboardClient = dynamic(() => import('@/components/dashboard/DashboardClient'), {
    ssr: false,
    loading: () => <div className="h-screen w-full flex items-center justify-center text-zinc-400 text-sm">Loading Dashboard...</div>
})

export default function DashboardWrapper(props) {
    return <DashboardClient {...props} />
}
