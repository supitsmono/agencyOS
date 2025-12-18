"use client"

import {
    Users,
    LayoutDashboard,
    MessageSquare,
    Calendar,
    Settings,
    Search,
    Bell,
    Plus,
    MoreHorizontal,
    Share,
    TrendingUp,
    Filter
} from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const TALENT_DATA = [
    { id: 1, name: "Lena K.", age: "21", imageColor: "bg-stone-200", date: "Just now", status: "Applications" },
    { id: 2, name: "Marco R.", age: "23", imageColor: "bg-zinc-300", date: "2m ago", status: "Applications" },
    { id: 5, name: "David L.", age: "22", imageColor: "bg-blue-100", date: "2d ago", status: "Shortlist" },
    { id: 6, name: "Elena V.", age: "24", imageColor: "bg-rose-100", date: "3d ago", status: "Shortlist" },
]

export default function DashboardPreview() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredTalent = TALENT_DATA.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const applicationsTalent = filteredTalent.filter(t => t.status === "Applications")
    const shortlistTalent = filteredTalent.filter(t => t.status === "Shortlist")

    return (
        <div className="w-full h-full bg-background flex flex-col md:flex-row overflow-hidden text-left border-none font-sans relative group/dashboard">

            {/* Sidebar */}
            <div className="w-60 border-r border-border bg-muted/30 hidden md:flex flex-col">
                <div className="h-14 flex items-center px-4 border-b border-border/50">
                    <div className="flex items-center gap-2 font-bold text-base tracking-tight">
                        <div className="w-5 h-5 rounded-sm bg-primary" />
                        AGENCY
                    </div>
                </div>
                <div className="p-2 gap-1 flex flex-col mt-2">
                    <SidebarItem icon={LayoutDashboard} label="Overview" />
                    <SidebarItem icon={Users} label="Applications" active />

                    <SidebarItem icon={Calendar} label="Schedule" />
                    <SidebarItem icon={Settings} label="Settings" />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-background">
                {/* Header */}
                <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-background">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground w-full max-w-md bg-muted/30 px-3 py-1.5 rounded-md transition-all focus-within:ring-1 focus-within:ring-primary/20 focus-within:bg-background">
                        <Search className="w-4 h-4 opacity-50" />
                        <input
                            type="text"
                            placeholder="Search applications..."
                            className="bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/50 text-foreground"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Online Team Avatars */}
                        <div className="flex -space-x-2 mr-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`w-8 h-8 rounded-full border-2 border-background bg-zinc-${i * 200 + 100}`} title="Online Scout" />
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">+4</div>
                        </div>
                        <div className="w-px h-6 bg-border mx-2" />
                        <Bell className="w-4 h-4 text-muted-foreground" />
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">YOU</div>
                    </div>
                </header>

                {/* Dashboard View */}
                <div className="flex-1 p-4 overflow-hidden flex flex-col">
                    {/* Metrics Strip */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <MetricCard label="Total Applications" value="124" trend="+12%" />
                        <MetricCard label="Shortlisted" value="8" trend="+2" />
                        <MetricCard label="Open Roles" value="3" trend="Active" />
                    </div>

                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Applications</h2>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-background border border-border text-foreground px-3 py-1.5 rounded-md text-sm font-medium shadow-sm hover:bg-muted/50 flex items-center gap-2">
                                <Share className="w-4 h-4" />
                                Share Selection
                            </button>
                            <button className="bg-background border border-border text-foreground px-3 py-1.5 rounded-md text-sm font-medium shadow-sm hover:bg-muted/50 flex items-center gap-2">
                                <Filter className="w-4 h-4" />
                                Filter
                            </button>
                            <button className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium shadow-sm flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Add New
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 h-full flex-1 min-h-0">
                        <KanbanColumn title="Applications" count={applicationsTalent.length}>
                            {applicationsTalent.map((t, i) => (
                                <TalentCard key={t.id} {...t} index={i} />
                            ))}
                        </KanbanColumn>

                        <KanbanColumn title="Shortlist" count={shortlistTalent.length}>
                            {shortlistTalent.map((t, i) => (
                                <TalentCard key={t.id} {...t} index={i} />
                            ))}
                        </KanbanColumn>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MetricCard({ label, value, trend }) {
    return (
        <div className="bg-background border border-border rounded-md p-3 shadow-sm flex items-center justify-between">
            <div>
                <div className="text-xs text-muted-foreground font-medium mb-0.5">{label}</div>
                <div className="text-xl font-bold text-foreground leading-none">{value}</div>
            </div>
            <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {trend}
            </div>
        </div>
    )
}

function SidebarItem({ icon: Icon, label, active, badge }) {
    return (
        <div className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium cursor-default transition-colors ${active ? 'bg-white shadow-sm text-foreground ring-1 ring-border/50' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}>
            <Icon className="w-4 h-4" />
            <span className="flex-1">{label}</span>
            {badge && <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{badge}</span>}
        </div>
    )
}

function KanbanColumn({ title, count, children, className }) {
    return (
        <div className={`flex flex-col h-full bg-muted/20 rounded-lg border border-border/40 p-3 ${className} overflow-hidden`}>
            <div className="flex items-center justify-between mb-3 pl-1 pr-0.5 min-h-[24px]">
                <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider truncate mr-2">{title}</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] font-semibold bg-background text-muted-foreground border border-border/50 px-2 py-0.5 rounded-full shadow-sm">{count}</span>
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                </div>
            </div>
            <div className="flex flex-col gap-2.5 overflow-y-auto pr-1 pb-2 flex-1">
                {children}
                {children.length === 0 && (
                    <div className="text-center py-8 text-xs text-muted-foreground italic">No applications found</div>
                )}
            </div>
        </div>
    )
}



function TalentCard({ name, age, imageColor, date, index }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
            className="bg-background border border-border/60 rounded-md p-3 shadow-sm flex gap-4 hover:shadow-md hover:border-border transition-all cursor-default group items-center min-h-[80px]"
        >
            {/* Rectangular Model photo */}
            <div className={`w-12 h-16 rounded-sm ${imageColor} group-hover:brightness-95 transition-all duration-300 flex-shrink-0`} />

            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5 py-1">
                <div className="font-semibold text-sm leading-tight text-foreground truncate">{name}</div>
                <div className="text-xs leading-none text-muted-foreground">{age} years</div>
                <div className="text-[10px] leading-none text-muted-foreground/70 pt-0.5">{date}</div>
            </div>
        </motion.div>
    )
}
