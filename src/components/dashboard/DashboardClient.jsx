"use client"

import * as React from "react"
import { Suspense } from "react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Inbox,
    File,
    Archive,
    Trash2,
    Search,
    MapPin,
    Mail,
    Star,
    Instagram,
    Smartphone,
    Copy,
    ChevronLeft,
    ChevronRight,
    X,
    Loader2,
    Settings
} from "lucide-react"

import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { updateApplicationFolder } from "@/app/actions"

function DashboardClientInner({ initialApplications = [], userRole = 'owner' }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const isDebugMode = searchParams.get('debug') === '1'
    console.log("DASHBOARD CLIENT INITIALIZED")

    // Ensure we have data
    const safeApps = initialApplications || []

    const [selectedId, setSelectedId] = React.useState(safeApps.length > 0 ? safeApps[0].id : null)
    const [selectedFolder, setSelectedFolder] = React.useState("inbox")
    const [lightboxIndex, setLightboxIndex] = React.useState(null)
    const [selectedCategory, setSelectedCategory] = React.useState("all")
    const [displayCount, setDisplayCount] = React.useState(15)

    // Filter logic
    const filteredApps = React.useMemo(() => {
        return safeApps.filter(app => {
            // Folder filter
            const appFolder = app.folder || "inbox";
            if (appFolder !== selectedFolder) return false;

            // Category filter
            if (selectedCategory !== "all" && app.category !== selectedCategory) return false;

            return true;
        }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [safeApps, selectedFolder, selectedCategory]);

    const visibleApps = filteredApps.slice(0, displayCount)

    // Select first app if selection is invalid or empty when filtered results change
    React.useEffect(() => {
        if (visibleApps.length > 0 && (!selectedId || !visibleApps.find(a => a.id === selectedId))) {
            setSelectedId(visibleApps[0].id)
        } else if (visibleApps.length === 0) {
            setSelectedId(null)
        }
    }, [filteredApps, selectedId])

    // Infinite Scroll Observer
    const observerTarget = React.useRef(null)
    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setDisplayCount((prev) => Math.min(prev + 10, filteredApps.length))
                }
            },
            { threshold: 1.0 }
        )
        if (observerTarget.current) observer.observe(observerTarget.current)
        return () => observer.disconnect()
    }, [filteredApps.length])

    // Lightbox Keyboard Support
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (lightboxIndex === null) return
            if (e.key === "Escape") setLightboxIndex(null)
            if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev - 1 + 4) % 4)
            if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev + 1) % 4)
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [lightboxIndex])

    // Counts
    const inboxCount = safeApps.filter(app => (app.folder || "inbox") === "inbox").length
    const shortlistCount = safeApps.filter(app => app.folder === "shortlist").length
    const archivedCount = safeApps.filter(app => app.folder === "archived").length
    const trashCount = safeApps.filter(app => app.folder === "trash").length

    const selectedApp = safeApps.find(app => app.id === selectedId)

    // Helper to format date
    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
    }

    // Defensive helper: safely parse JSON strings to objects/arrays
    const safeParseObject = (value) => {
        if (value === null || value === undefined) return null;
        if (typeof value === 'object' && !Array.isArray(value) && value.constructor === Object) {
            return value; // Already a plain object
        }
        if (Array.isArray(value)) {
            return value; // Already an array
        }
        if (typeof value === 'string') {
            try {
                const parsed = JSON.parse(value);
                // Only return if it's an object or array
                if (typeof parsed === 'object' && parsed !== null) {
                    return parsed;
                }
            } catch (e) {
                // Invalid JSON, return null
            }
        }
        return null;
    }

    // Helper for images (handle both JSON parsed and raw strings if any)
    const getImages = (app) => {
        if (!app || !app.images) return [];
        const parsed = safeParseObject(app.images);
        if (Array.isArray(parsed)) return parsed;
        return [];
    }
    const currentImages = selectedApp ? getImages(selectedApp) : [];

    // Helper for stats (safely parse JSON string to object)
    const getStats = (app) => {
        if (!app || !app.stats) return null;
        const parsed = safeParseObject(app.stats);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            return parsed;
        }
        return null;
    }
    const currentStats = selectedApp ? getStats(selectedApp) : null;

    // Canonical Preview Snapshot: Merges root-level (legacy) + nested (new) applicant data
    // This ensures ALL applicants render consistently regardless of data structure
    const buildApplicantPreviewSnapshot = (app) => {
        if (!app) return null;

        // Parse nested data if it exists (for new applicants)
        const parsedStats = getStats(app); // Already safely parsed
        
        // Helper to safely parse JSON string to object
        const safeParseJSON = (value) => {
            if (!value) return null;
            if (typeof value === 'object') return value;
            if (typeof value !== 'string') return null;
            try {
                return JSON.parse(value);
            } catch {
                return null;
            }
        };

        // Check for nested data structures (formData, metadata, applyData)
        const formData = safeParseJSON(app.formData) || app.formData;
        const metadata = safeParseJSON(app.metadata) || app.metadata;
        const applyData = safeParseJSON(app.applyData) || app.applyData;

        // Helper to safely get nested value from any object path
        const getNestedValue = (obj, path, fallback = null) => {
            if (!obj || typeof obj !== 'object') return fallback;
            const keys = path.split('.');
            let value = obj;
            for (const key of keys) {
                if (value && typeof value === 'object' && key in value) {
                    value = value[key];
                } else {
                    return fallback;
                }
            }
            return value ?? fallback;
        };

        // Helper to search across all potential nested locations
        const findField = (fieldName, altNames = []) => {
            // 1. Try root level first (legacy)
            if (app[fieldName] != null) return app[fieldName];
            
            // 2. Try formData
            if (formData) {
                const val = getNestedValue(formData, fieldName) || altNames.map(alt => getNestedValue(formData, alt)).find(v => v != null);
                if (val != null) return val;
            }
            
            // 3. Try metadata
            if (metadata) {
                const val = getNestedValue(metadata, fieldName) || altNames.map(alt => getNestedValue(metadata, alt)).find(v => v != null);
                if (val != null) return val;
            }
            
            // 4. Try applyData
            if (applyData) {
                const val = getNestedValue(applyData, fieldName) || altNames.map(alt => getNestedValue(applyData, alt)).find(v => v != null);
                if (val != null) return val;
            }
            
            // 5. Try stats (for measurements that might be there)
            if (parsedStats && typeof parsedStats === 'object') {
                const val = getNestedValue(parsedStats, fieldName);
                if (val != null) return val;
            }
            
            return null;
        };

        // Merge strategy: Prefer root-level (legacy), fallback to nested (new applicants)
        return {
            // Identity
            name: app.name || findField('name', ['fullName', 'displayName']) || null,
            
            // Core snapshot - root level first, then nested
            age: findField('age') ?? null,
            height: findField('height') ?? null,
            location: findField('location', ['city', 'address']) ?? null,
            category: app.category || "all", // AI Priority Tag
            status: app.status || "new",
            board: app.board || null,
            
            // Professional snapshot - root level first, then nested
            email: findField('email') ?? null,
            phone: findField('phone', ['phoneNumber', 'tel']) ?? null,
            instagram: findField('instagram', ['instagramHandle', 'social']) ?? null,
            message: findField('message', ['statement', 'bio', 'about']) ?? null,
            
            // Additional fields that might be nested
            experienceLevel: findField('experienceLevel', ['experience', 'level']) ?? null,
            currentAgency: findField('currentAgency', ['agency', 'representation']) ?? null,
            availability: findField('availability', ['available', 'status']) ?? null,
            city: app.location?.split(',')[0]?.trim() ?? findField('city') ?? null,
            country: app.location?.includes(',') ? app.location.split(',')[1]?.trim() : null ?? findField('country') ?? null,
        };
    };
    const previewSnapshot = selectedApp ? buildApplicantPreviewSnapshot(selectedApp) : null;

    const handleMoveTo = async (folder) => {
        if (!selectedApp) return;
        await updateApplicationFolder(selectedApp.id, folder);
    };

    return (
        <div className="flex-1 min-h-0 group/dashboard p-0" style={{ height: 'calc(100vh - 5.5rem)' }}>
            <div className="flex h-full items-stretch overflow-hidden bg-background shadow-sm" style={{ maxWidth: '100vw' }}>

                {/* 1. LEFT SIDEBAR (Fixed Width) */}
                <div className="w-[180px] flex flex-col border-r bg-white hidden md:flex shrink-0">
                    <div className="flex items-center pl-4 h-[68px]">
                        <h1 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900">Agency</h1>
                    </div>
                    <Separator className="opacity-50" />
                    <div className="px-3 py-4 space-y-1">
                        <div className="mb-4 px-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Overview</div>
                        <NavButton
                            icon={Inbox}
                            title="Inbox"
                            count={inboxCount}
                            isActive={selectedFolder === "inbox"}
                            onClick={() => setSelectedFolder("inbox")}
                        />
                        <NavButton
                            icon={Star}
                            title="Shortlist"
                            count={shortlistCount}
                            isActive={selectedFolder === "shortlist"}
                            onClick={() => setSelectedFolder("shortlist")}
                        />
                        <NavButton
                            icon={Archive}
                            title="Archived"
                            count={archivedCount}
                            isActive={selectedFolder === "archived"}
                            onClick={() => setSelectedFolder("archived")}
                        />
                        <NavButton
                            icon={Trash2}
                            title="Trash"
                            count={trashCount}
                            isActive={selectedFolder === "trash"}
                            onClick={() => setSelectedFolder("trash")}
                        />
                    </div>
                    <Separator className="my-2" />
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Talent Pools
                    </div>
                    <div className="px-2 py-1 space-y-1">
                        <NavButton icon={File} title="New Faces" />
                        <NavButton icon={File} title="Mainboard" />
                    </div>

                    <div className="mt-auto px-3 pb-4">
                        <Separator className="mb-2 opacity-50" />
                        <NavButton
                            icon={Settings}
                            title="Settings"
                            onClick={() => router.push('/settings')}
                        />
                    </div>
                </div>

                {/* 2. MIDDLE COLUMN (Fixed Width) */}
                <div className="w-[300px] flex flex-col border-r shrink-0">
                    <div className="flex items-center px-4 py-2 h-[52px] gap-2">
                        <div className="relative w-full">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search talent..." className="pl-8 bg-muted/50 border-none shadow-none focus-visible:ring-1" />
                        </div>
                    </div>
                    <Separator />
                    <ScrollArea className="h-full [&_[data-orientation=vertical]]:hidden">
                        <div className="flex flex-col gap-2 p-3 pt-0">
                            {/* Filter Tabs */}
                            <div className="flex items-center justify-between py-3 ml-1 mr-1">
                                <span className="text-xs font-medium text-muted-foreground">Today</span>
                                <div className="flex bg-muted/50 p-0.5 rounded-lg">
                                    {["all", "gold", "silver", "bronze"].map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={(e) => { e.stopPropagation(); setSelectedCategory(cat) }}
                                            className={cn(
                                                "px-2 py-0.5 text-[10px] uppercase font-bold rounded-md transition-all",
                                                selectedCategory === cat
                                                    ? "bg-white text-foreground shadow-sm"
                                                    : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {cat === "all" ? "All" : cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {visibleApps.map((app) => (
                                <button
                                    key={app.id}
                                    onClick={() => setSelectedId(app.id)}
                                    className={cn(
                                        "flex flex-col items-start gap-1 rounded-lg border p-2 text-left text-sm transition-all hover:bg-zinc-100 group",
                                        selectedId === app.id && "bg-zinc-100 border-zinc-200 shadow-sm"
                                    )}
                                >
                                    <div className="flex w-full flex-col">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <span className="font-semibold truncate">{app.name}</span>
                                                {app.category === 'gold' && (
                                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-yellow-100 text-yellow-700 uppercase tracking-tight border border-yellow-200">Gold</span>
                                                )}
                                                {app.category === 'silver' && (
                                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-zinc-100 text-zinc-600 uppercase tracking-tight border border-zinc-200">Silver</span>
                                                )}
                                                {app.category === 'bronze' && (
                                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-700 uppercase tracking-tight border border-amber-200">Bronze</span>
                                                )}
                                                {/* Read status indicator can be implemented later */}
                                            </div>
                                            <span className={cn(
                                                "text-[10px]",
                                                selectedId === app.id ? "text-foreground" : "text-muted-foreground"
                                            )} suppressHydrationWarning>
                                                {formatDate(app.createdAt)}
                                            </span>
                                        </div>
                                        <div className="text-[11px] font-medium text-zinc-500 truncate w-full">
                                            {app.gender || "Model"} • {app.height} • {app.age} yrs
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-0.5 w-full">
                                        <Badge variant={getBadgeVariant(app.status)} className="rounded-[4px] px-1.5 py-0 text-[9px] font-semibold uppercase h-4 tracking-tight border-zinc-200">
                                            {app.status}
                                        </Badge>
                                        <span className="text-[10px] text-zinc-400 flex items-center gap-0.5 truncate">
                                            <MapPin className="w-2.5 h-2.5 shrink-0" /> {app.location}
                                        </span>
                                    </div>
                                </button>
                            ))}
                            {/* Infinite Scroll Trigger */}
                            <div ref={observerTarget} className="h-4 w-full" />
                        </div>
                    </ScrollArea>
                </div>

                {/* 3. RIGHT COLUMN (Fluid - Analysis Hub) */}
                <div className="flex-1 min-w-0 bg-white flex flex-col h-full overflow-hidden" style={{ maxWidth: 'calc(100vw - 480px)' }}>
                    {selectedApp ? (
                        <div className="flex flex-col h-full w-full">

                            {/* DEBUG BANNER - Only show when ?debug=1 */}
                            {isDebugMode && (
                                <div className="bg-red-600 text-white p-2 text-xs font-mono border-b-2 border-red-800">
                                    <div className="font-bold">DEBUG: Application ID = {selectedApp.id}</div>
                                    <div className="text-[10px] mt-1 opacity-90">Component: DashboardClient.jsx - Preview Panel</div>
                                </div>
                            )}

                            {/* Header (Fixed Height) */}
                            <div className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-zinc-100 bg-white">
                                <div>
                                    <div className="flex items-center gap-3 mb-0.5">
                                        <h2 className="text-xl font-bold uppercase tracking-tight text-zinc-900">{previewSnapshot?.name || selectedApp.name}</h2>
                                        {selectedApp.category === 'gold' && <div className="h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]" />}
                                        {selectedApp.category === 'silver' && <div className="h-2 w-2 rounded-full bg-zinc-400 shadow-[0_0_8px_rgba(161,161,170,0.5)]" />}
                                        {selectedApp.category === 'bronze' && <div className="h-2 w-2 rounded-full bg-amber-700 shadow-[0_0_8px_rgba(180,83,9,0.5)]" />}
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
                                        {previewSnapshot?.location && (
                                            <>
                                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {previewSnapshot.location}</span>
                                                <span className="w-px h-3 bg-zinc-200" />
                                            </>
                                        )}
                                        {previewSnapshot?.age && (
                                            <>
                                                <span>{previewSnapshot.age} Years</span>
                                                {previewSnapshot?.height && <span className="w-px h-3 bg-zinc-200" />}
                                            </>
                                        )}
                                        {previewSnapshot?.height && <span>{previewSnapshot.height}</span>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Approve Decision Action - Only show if not already approved/shortlisted */}
                                    {selectedFolder !== "shortlist" && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                                            onClick={() => handleMoveTo("shortlist")}
                                        >
                                            <Star className="w-3 h-3 mr-1.5" />
                                            Approve
                                        </Button>
                                    )}
                                    {/* Archive Folder Move - Only show for approved/shortlisted items */}
                                    {selectedFolder === "shortlist" && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 text-xs text-zinc-500 hover:text-zinc-900"
                                            onClick={() => handleMoveTo("archived")}
                                        >
                                            <Archive className="w-3 h-3 mr-1.5" />
                                            Archive
                                        </Button>
                                    )}
                                    {selectedFolder !== "trash" && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-zinc-400 hover:text-red-600 hover:bg-red-50"
                                            title="Move to Trash"
                                            onClick={() => handleMoveTo("trash")}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                    <div className="w-px h-4 bg-zinc-200 mx-1" />
                                    <Button
                                        className="bg-zinc-900 text-white hover:bg-black h-8 px-4 rounded-sm"
                                        onClick={() => navigator.clipboard.writeText(previewSnapshot?.email || selectedApp.email || '')}
                                    >
                                        <span className="text-[9px] uppercase tracking-widest font-bold mr-2">Copy Email</span>
                                        <Copy className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">

                                {/* LEFT: Photos (55% Width, Full Height) */}
                                <div className="lg:w-[55%] h-1/2 lg:h-full relative shrink-0 border-b lg:border-b-0 lg:border-r border-zinc-100">
                                    {currentImages && currentImages.length > 0 ? (
                                        <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                                            {['Headshot', 'Side Profile', 'Full Body', '3/4 Hips'].map((label, i) => (
                                                <div
                                                    key={label}
                                                    className="relative w-full h-full bg-zinc-50 overflow-hidden group border-[0.5px] border-white/20 cursor-pointer"
                                                    onClick={(e) => {
                                                        setLightboxIndex(i);
                                                    }}
                                                >
                                                    {currentImages[i] ? (
                                                        <img
                                                            src={currentImages[i]}
                                                            alt={label}
                                                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 select-none"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                                            <span className="text-[9px] uppercase tracking-widest">No Image</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                                                    <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pointer-events-none">
                                                        <span className="text-[9px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{label}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-zinc-50">
                                            <div className="text-center p-6">
                                                <div className="text-zinc-400 mb-2">
                                                    <File className="w-12 h-12 mx-auto" />
                                                </div>
                                                <p className="text-xs font-medium text-zinc-600 uppercase tracking-wider">No photos uploaded</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* RIGHT: Data */}
                                <div className="flex-1 h-1/2 lg:h-full flex flex-col min-h-0 bg-zinc-50/30 overflow-hidden">
                                    <div className="flex-1 p-4 flex flex-col gap-3 min-h-0 overflow-y-auto">

                                        {/* DEBUG: Full Application Object - Only show when ?debug=1 */}
                                        {isDebugMode && (
                                            <>
                                                <div className="shrink-0 bg-yellow-100 border-2 border-yellow-600 rounded p-3 text-[9px] font-mono overflow-auto max-h-[200px]">
                                                    <div className="font-bold text-yellow-900 mb-2">DEBUG: Full Application Object (selectedApp)</div>
                                                    <pre className="whitespace-pre-wrap break-words text-[8px]">
                                                        {JSON.stringify(selectedApp, null, 2)}
                                                    </pre>
                                                </div>

                                                {/* DEBUG: Preview Snapshot */}
                                                <div className="shrink-0 bg-blue-100 border-2 border-blue-600 rounded p-3 text-[9px] font-mono overflow-auto max-h-[200px]">
                                                    <div className="font-bold text-blue-900 mb-2">DEBUG: Preview Snapshot (buildApplicantPreviewSnapshot result)</div>
                                                    <pre className="whitespace-pre-wrap break-words text-[8px]">
                                                        {JSON.stringify(previewSnapshot, null, 2)}
                                                    </pre>
                                                </div>

                                                {/* DEBUG: Field Detection */}
                                                <div className="shrink-0 bg-green-100 border-2 border-green-600 rounded p-3 text-[9px] font-mono">
                                                    <div className="font-bold text-green-900 mb-2">DEBUG: Field Detection</div>
                                                    <div className="space-y-1 text-[8px]">
                                                        <div>Root level email: {selectedApp.email ? `✓ "${selectedApp.email}"` : '✗ NULL'}</div>
                                                        <div>Root level phone: {selectedApp.phone ? `✓ "${selectedApp.phone}"` : '✗ NULL'}</div>
                                                        <div>Root level instagram: {selectedApp.instagram ? `✓ "${selectedApp.instagram}"` : '✗ NULL'}</div>
                                                        <div>Root level message: {selectedApp.message ? `✓ "${selectedApp.message.substring(0, 50)}..."` : '✗ NULL'}</div>
                                                        <div>formData exists: {selectedApp.formData ? '✓ YES' : '✗ NO'}</div>
                                                        <div>metadata exists: {selectedApp.metadata ? '✓ YES' : '✗ NO'}</div>
                                                        <div>applyData exists: {selectedApp.applyData ? '✓ YES' : '✗ NO'}</div>
                                                        <div className="mt-2 font-bold">Snapshot email: {previewSnapshot?.email ? `✓ "${previewSnapshot.email}"` : '✗ NULL'}</div>
                                                        <div>Snapshot phone: {previewSnapshot?.phone ? `✓ "${previewSnapshot.phone}"` : '✗ NULL'}</div>
                                                        <div>Snapshot instagram: {previewSnapshot?.instagram ? `✓ "${previewSnapshot.instagram}"` : '✗ NULL'}</div>
                                                        <div>Snapshot message: {previewSnapshot?.message ? `✓ "${previewSnapshot.message.substring(0, 50)}..."` : '✗ NULL'}</div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* 1. Stats Grid */}
                                        {currentStats && Object.keys(currentStats).length > 0 ? (
                                            <div className="shrink-0 grid grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-sm overflow-hidden">
                                                {Object.entries(currentStats).map(([key, value]) => (
                                                    <div key={key} className="bg-white p-2.5 flex flex-col justify-center hover:bg-zinc-50 transition-colors">
                                                        <span className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold mb-0.5">{key}</span>
                                                        <span className="text-xs font-bold text-zinc-900 font-mono tracking-tight">{String(value)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}

                                        {/* 2. Statement */}
                                        {previewSnapshot?.message ? (
                                            <div className="shrink-0 bg-white border border-zinc-200/60 rounded-sm p-4 shadow-sm flex flex-col max-h-[200px] overflow-hidden">
                                                <div className="flex-1 overflow-y-auto pr-1">
                                                    <p className="text-xs text-zinc-600 leading-relaxed font-serif italic">
                                                        "{previewSnapshot.message}"
                                                    </p>
                                                </div>
                                            </div>
                                        ) : null}

                                        {/* 3. Contact */}
                                        <div className="shrink-0 grid grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 rounded-sm overflow-hidden">
                                            {[
                                                { icon: Mail, label: 'Email', value: previewSnapshot?.email, href: previewSnapshot?.email ? `mailto:${previewSnapshot.email}` : null },
                                                { icon: Smartphone, label: 'Phone', value: previewSnapshot?.phone, href: previewSnapshot?.phone ? `tel:${previewSnapshot.phone}` : null },
                                                { icon: Instagram, label: 'IG', value: previewSnapshot?.instagram, href: previewSnapshot?.instagram ? `https://instagram.com/${previewSnapshot.instagram.replace('@', '')}` : null }
                                            ].map((item, idx) => {
                                                if (!item.value) return null;
                                                const content = (
                                                    <div className="bg-white p-2 flex flex-col justify-center gap-1 hover:bg-zinc-50 group">
                                                        <div className="flex items-center gap-1.5 text-zinc-400 group-hover:text-zinc-600">
                                                            <item.icon className="w-3 h-3" />
                                                            <span className="text-[8px] font-bold uppercase tracking-wider">{item.label}</span>
                                                        </div>
                                                        <span className="text-[9px] font-semibold text-zinc-900 font-mono truncate" title={item.value}>{item.value}</span>
                                                    </div>
                                                );
                                                return item.href ? (
                                                    <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                                                        {content}
                                                    </a>
                                                ) : (
                                                    <div key={idx}>{content}</div>
                                                );
                                            })}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground h-full">
                            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                                <Inbox className="w-8 h-8 text-zinc-300" />
                            </div>
                            <p className="font-medium text-zinc-900">No Application Selected</p>
                            <p className="text-sm mt-1">Select an applicant to view analysis</p>
                        </div>
                    )}
                </div>
            </div>

            {/* LIGHTBOX OVERLAY */}
            {lightboxIndex !== null && selectedApp && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-200">
                    <button
                        onClick={() => setLightboxIndex(null)}
                        className="absolute top-6 left-6 text-white/50 hover:text-white transition-colors p-2 z-[110]"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev - 1 + 4) % 4); }}
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors p-4 z-[110] hover:bg-white/10 rounded-full hidden lg:block"
                    >
                        <ChevronLeft className="w-10 h-10" />
                    </button>

                    <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center gap-4">
                        <img
                            src={currentImages[lightboxIndex]}
                            alt="Lightbox"
                            className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm select-none"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="text-white/50 text-xs font-medium tracking-widest uppercase">
                            {['Headshot', 'Side Profile', 'Full Body', '3/4 Hips'][lightboxIndex]}
                        </div>
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev + 1) % 4); }}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors p-4 z-[110] hover:bg-white/10 rounded-full hidden lg:block"
                    >
                        <ChevronRight className="w-10 h-10" />
                    </button>

                    <div className="absolute inset-0 z-[90]" onClick={() => setLightboxIndex(null)} />
                </div>
            )}
        </div>
    )
}

function NavButton({ icon: Icon, title, count, isActive, onClick }) {
    return (
        <Button
            variant="ghost"
            className={cn(
                "w-full justify-start pl-2 pr-2 h-8 text-xs font-medium tracking-tight transition-all mb-0.5",
                isActive ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
            )}
            onClick={onClick}
            title={title}
        >
            <Icon className={cn("h-3.5 w-3.5 shrink-0 mr-2", isActive ? "text-zinc-900" : "text-zinc-400 group-hover:text-zinc-900")} />
            <span className="flex-1 truncate text-left">{title}</span>
            {count && (
                <span className={cn(
                    "ml-auto text-[10px] font-medium shrink-0 py-0.5 px-1.5 rounded-full",
                    isActive ? "bg-zinc-200 text-zinc-900" : "text-zinc-400"
                )}>
                    {count}
                </span>
            )}
        </Button>
    )
}

function getBadgeVariant(status) {
    if (status === "work") return "default"
    if (status === "shortlist") return "secondary"
    return "outline"
}

export default function DashboardClient(props) {
    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-zinc-400 text-sm">Loading Dashboard...</div>}>
            <DashboardClientInner {...props} />
        </Suspense>
    )
}
