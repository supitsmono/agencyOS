"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
    ArrowLeft,
    Upload,
    User,
    CreditCard,
    Bell,
    Shield,
    Check,
    Plus,
    Loader2,
    Building2,
    Users,
    Settings,
    Brain,
    Eye,
    EyeOff
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { updateOrganization, inviteMember, updateMemberRole } from "@/app/(app)/settings/actions"

export default function SettingsClient({ initialOrg, initialMembers }) {
    const router = useRouter()
    const [activeTab, setActiveTab] = React.useState("general")
    const [loading, setLoading] = React.useState(false)

    // Form State
    const [orgName, setOrgName] = React.useState(initialOrg?.name || "")
    const [orgEmail, setOrgEmail] = React.useState(initialOrg?.email || "")

    // Scouting Logic State
    const initialSettings = initialOrg?.settings || {
        strictness: 50,
        autoReject: { underAge: false, minHeight: false },
        biasPrevention: true
    };
    const [scoutingSettings, setScoutingSettings] = React.useState(initialSettings);

    const handleSave = async () => {
        setLoading(true)
        const result = await updateOrganization({
            id: initialOrg.id,
            name: orgName,
            email: orgEmail,
            settings: scoutingSettings
        })
        setLoading(false)
        if (result.success) {
            alert("Saved successfully!")
        } else {
            alert("Error: " + result.error)
        }
    }

    const handleInvite = async () => {
        const email = prompt("Enter email to invite:")
        if (!email) return;

        const formData = new FormData();
        formData.append("email", email);
        formData.append("role", "member");
        formData.append("organizationId", initialOrg.id);

        const res = await inviteMember(formData);
        if (res.success) {
            alert(res.message);
        } else {
            alert(res.error);
        }
    }

    const handleRoleChange = async (memberId, newRole) => {
        const res = await updateMemberRole(memberId, newRole);
        if (!res.success) {
            alert("Failed to update role");
        } else {
            // Optimistic update could go here, or depend on revalidation
            alert("Role updated to " + newRole);
        }
    }

    const NavItem = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                activeTab === id
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
            )}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    )

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="h-16 border-b flex items-center px-8 bg-white fixed top-0 w-full z-10">
                <Button
                    variant="ghost"
                    className="mr-4 -ml-2 text-zinc-500 hover:text-zinc-900"
                    onClick={() => router.push('/dashboard')}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-900">Settings</h1>
            </div>

            {/* Main Layout */}
            <div className="flex-1 pt-16 flex max-w-6xl mx-auto w-full">

                {/* Sidebar */}
                <aside className="w-64 pt-8 pb-12 pr-8 hidden md:block shrink-0">
                    <nav className="space-y-1">
                        <NavItem id="general" label="General" icon={Building2} />
                        <NavItem id="scouting" label="Scouting Logic" icon={Brain} />
                        <NavItem id="team" label="Team Members" icon={Users} />
                        <NavItem id="billing" label="Billing" icon={CreditCard} />
                        <NavItem id="notifications" label="Notifications" icon={Bell} />
                    </nav>
                </aside>

                {/* Content Area */}
                <main className="flex-1 pt-8 pb-20 px-8 min-w-0 border-l border-zinc-100 min-h-[calc(100vh-4rem)]">

                    {/* GENERAL TAB */}
                    {activeTab === "general" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div>
                                <h2 className="text-lg font-bold text-zinc-900 mb-1">Agency Profile</h2>
                                <p className="text-sm text-zinc-500">Manage your agency branding and public details.</p>
                            </div>

                            <Separator />

                            <div className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <Avatar className="w-20 h-20 border">
                                        <AvatarImage src={initialOrg.logo || "https://github.com/shadcn.png"} />
                                        <AvatarFallback>AG</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-sm font-medium mb-2">Agency Logo</h3>
                                        <div className="flex gap-3">
                                            <Button variant="outline" size="sm" className="h-8 text-xs">
                                                <Upload className="w-3 h-3 mr-2" /> Upload New
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 text-xs text-red-500 hover:text-red-600 hover:bg-red-50">
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="max-w-md space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Agency Name</label>
                                        <Input
                                            value={orgName}
                                            onChange={(e) => setOrgName(e.target.value)}
                                            className="bg-zinc-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Contact Email</label>
                                        <Input
                                            value={orgEmail}
                                            onChange={(e) => setOrgEmail(e.target.value)}
                                            className="bg-zinc-50"
                                        />
                                    </div>
                                    <div className="pt-4">
                                        <Button
                                            onClick={handleSave}
                                            disabled={loading}
                                            className="bg-zinc-900 hover:bg-black text-white"
                                        >
                                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SCOUTING LOGIC TAB */}
                    {activeTab === "scouting" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div>
                                <h2 className="text-lg font-bold text-zinc-900 mb-1">Scouting Logic (AI Control)</h2>
                                <p className="text-sm text-zinc-500">Configure how the AI analyzes and filters new applications.</p>
                            </div>

                            <Separator />

                            <div className="space-y-8 max-w-lg">
                                {/* Strictness Slider */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <label className="text-sm font-medium text-zinc-900">AI Strictness</label>
                                            <p className="text-xs text-zinc-500">Higher values mean fewer candidates reach 'Silver'/'Gold'.</p>
                                        </div>
                                        <span className="text-sm font-bold bg-zinc-100 px-2 py-1 rounded">{scoutingSettings.strictness}%</span>
                                    </div>
                                    <Slider
                                        value={[scoutingSettings.strictness || 50]}
                                        max={100}
                                        step={1}
                                        onValueChange={(val) => setScoutingSettings(prev => ({ ...prev, strictness: val[0] }))}
                                    />
                                    <div className="flex justify-between text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                                        <span>Lenient</span>
                                        <span>Balanced</span>
                                        <span>Strict</span>
                                    </div>
                                </div>

                                <Separator />

                                {/* Auto-Reject Criteria */}
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-zinc-900">Auto-Reject Criteria</label>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <Checkbox
                                                id="underAge"
                                                checked={scoutingSettings.autoReject?.underAge}
                                                onCheckedChange={(checked) => setScoutingSettings(prev => ({
                                                    ...prev,
                                                    autoReject: { ...prev.autoReject, underAge: checked }
                                                }))}
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                                <label htmlFor="underAge" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    Under 16 Years Old
                                                </label>
                                                <p className="text-xs text-zinc-500">Automatically archive applicants under 16.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Checkbox
                                                id="minHeight"
                                                checked={scoutingSettings.autoReject?.minHeight}
                                                onCheckedChange={(checked) => setScoutingSettings(prev => ({
                                                    ...prev,
                                                    autoReject: { ...prev.autoReject, minHeight: checked }
                                                }))}
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                                <label htmlFor="minHeight" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    Height Requirement
                                                </label>
                                                <p className="text-xs text-zinc-500">Archive applicants shorter than 170cm (5'7").</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Bias Prevention */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-sm font-medium text-zinc-900">Diversity Focus</label>
                                        <p className="text-xs text-zinc-500">Ensure AI does not over-index on a specific look.</p>
                                    </div>
                                    <Switch
                                        checked={scoutingSettings.biasPrevention}
                                        onCheckedChange={(checked) => setScoutingSettings(prev => ({ ...prev, biasPrevention: checked }))}
                                    />
                                </div>

                                <div className="pt-4">
                                    <Button
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="bg-zinc-900 hover:bg-black text-white"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                        Save Configuration
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TEAM TAB */}
                    {activeTab === "team" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-zinc-900 mb-1">Team Members</h2>
                                    <p className="text-sm text-zinc-500">Manage access and roles for your team.</p>
                                </div>
                                <Button className="bg-black text-white hover:bg-zinc-800 h-9" onClick={handleInvite}>
                                    <Plus className="w-4 h-4 mr-2" /> Invite Member
                                </Button>
                            </div>

                            <Separator />

                            <div className="border rounded-lg divide-y">
                                {initialMembers.length > 0 ? initialMembers.map((member) => (
                                    <div key={member.id} className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="w-10 h-10 bg-zinc-100 text-zinc-500">
                                                <AvatarFallback>{(member.name || "?")[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium text-zinc-900">{member.name || "Unknown User"}</p>
                                                <p className="text-xs text-zinc-500">{member.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {/* Role Selector */}
                                            {member.role === 'owner' ? (
                                                <span className="text-xs font-bold px-2 py-1 bg-zinc-100 rounded text-zinc-600 uppercase tracking-wide">Owner</span>
                                            ) : (
                                                <Select defaultValue={member.role} onValueChange={(val) => handleRoleChange(member.id, val)}>
                                                    <SelectTrigger className="w-[130px] h-8 text-xs">
                                                        <SelectValue placeholder="Role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="admin">Admin</SelectItem>
                                                        <SelectItem value="scout">Scout</SelectItem>
                                                        <SelectItem value="junior">Junior (Blind)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}

                                            {/* Blind Mode Indicator */}
                                            {(member.role === 'junior' || member.role === 'Junior') && (
                                                <div className="flex items-center gap-1 text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 font-medium">
                                                    <EyeOff className="w-3 h-3" /> Blind Mode
                                                </div>
                                            )}

                                            {member.role !== "owner" && (
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400 hover:text-red-600">
                                                    <Shield className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )) : (
                                    <div className="p-8 text-center text-zinc-500 text-sm">
                                        No members found. Invite your team!
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* BILLING TAB */}
                    {activeTab === "billing" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div>
                                <h2 className="text-lg font-bold text-zinc-900 mb-1">Billing & Plan</h2>
                                <p className="text-sm text-zinc-500">Manage your subscription and payment methods.</p>
                            </div>

                            <Separator />

                            <div className="bg-zinc-900 text-white rounded-lg p-6 flex items-center justify-between shadow-lg">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-bold capitalize">{initialOrg.plan} Plan</h3>
                                        <span className="bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>
                                    </div>
                                    <p className="text-zinc-400 text-sm">Next billing date: January 12, 2026</p>
                                </div>
                                <Button variant="outline" className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800 hover:text-white">
                                    <CreditCard className="w-4 h-4 mr-2" /> Manage Subscription
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* NOTIFICATIONS TAB */}
                    {activeTab === "notifications" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div>
                                <h2 className="text-lg font-bold text-zinc-900 mb-1">Notifications</h2>
                                <p className="text-sm text-zinc-500">Choose what you want to be notified about.</p>
                            </div>

                            <Separator />

                            <div className="border rounded-lg divide-y">
                                {[
                                    { title: "New Applications", desc: "Receive an email when a new model applies." },
                                    { title: "Weekly Report", desc: "Get a summary of your agency's performance." },
                                    { title: "Team Activity", desc: "Notify me when a team member comments on a profile." }
                                ].map((item, i) => (
                                    <div key={i} className="p-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-zinc-900">{item.title}</p>
                                            <p className="text-xs text-zinc-500">{item.desc}</p>
                                        </div>
                                        <Switch defaultChecked={i === 0} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    )
}
