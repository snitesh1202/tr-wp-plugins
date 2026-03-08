"use client"

import { useState, useMemo } from "react"
import { Search, Key, ShieldCheck, ShieldAlert, Copy, RefreshCw, User, Package, ExternalLink, MoreVertical, CheckCircle2, History, X } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const mockLicenses = [
    { id: "lic-1", key: "TR-SEO-9421-XB82", owner: "John Doe", email: "john@example.com", plugin: "SpeedMaster SEO", status: "Active", activations: "1/1", expires: "Lifetime", created: "Mar 08, 2024" },
    { id: "lic-2", key: "TR-SEC-8422-QR15", owner: "Sarah Smith", email: "sarah@tech.io", plugin: "SecureFlow Shield", status: "Active", activations: "1/5", expires: "Lifetime", created: "Mar 08, 2024" },
    { id: "lic-3", key: "TR-FRM-8423-MK90", owner: "Mike Johnson", email: "mike@dev.net", plugin: "FormCraft Pro", status: "Inactive", activations: "0/1", expires: "Mar 08, 2025", created: "Mar 08, 2024" },
    { id: "lic-4", key: "TR-SEO-9424-LX44", owner: "Elena Ross", email: "elena@design.com", plugin: "SpeedMaster SEO", status: "Active", activations: "1/1", expires: "Lifetime", created: "Mar 07, 2024" },
    { id: "lic-5", key: "TR-AST-8425-DV12", owner: "David Chen", email: "david@startup.co", plugin: "AssetCleanup Mini", status: "Active", activations: "1/1", expires: "Lifetime", created: "Mar 07, 2024" },
    { id: "lic-6", key: "TR-SEC-1620-LW02", owner: "Lisa Wang", email: "lisa@studio.com", plugin: "SecureFlow Shield", status: "Revoked", activations: "0/5", expires: "N/A", created: "Mar 07, 2024" },
]

export default function AdminLicensesPage() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredLicenses = useMemo(() => {
        return mockLicenses.filter(license =>
            license.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
            license.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
            license.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            license.plugin.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery])

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        alert("License key copied to clipboard!")
    }

    const handleSync = () => {
        alert("Syncing licenses with backend...")
    }

    const handleAction = (action: string, id: string) => {
        alert(`${action} triggered for license: ${id}`)
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between px-2">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-[0.2em]">
                        <Key className="h-3 w-3" />
                        Authentication Management
                    </div>
                    <h1 className="font-heading text-4xl lg:text-5xl font-black text-white tracking-tight">
                        License <span className="text-accent underline underline-offset-[12px] decoration-white/10">Control</span>
                    </h1>
                    <p className="text-white/40 font-medium max-w-xl">
                        Validate, revoke, and manage authorization keys for all marketplace plugins. Ensure secure distribution and usage monitoring.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleAction('History', 'All')}
                        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.05] text-white/40 hover:text-white transition-all group"
                    >
                        <History className="h-6 w-6 transition-transform group-hover:rotate-[-45deg]" />
                    </button>
                    <button
                        onClick={handleSync}
                        className="flex items-center justify-center gap-3 rounded-2xl bg-accent px-8 py-5 text-sm font-black text-white hover:bg-accent/90 transition-all hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] active:scale-95 group focus:outline-none focus:ring-2 focus:ring-accent/40"
                    >
                        <RefreshCw className="h-5 w-5 transition-transform group-hover:rotate-180 duration-500" />
                        Sync Licenses
                    </button>
                </div>
            </header>

            {/* Search & Stats Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between px-2">
                <div className="relative group w-full sm:w-[28rem]">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within:text-accent transition-all" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by license key, name, email or plugin..."
                        className="w-full bg-surface/50 border border-white/[0.05] rounded-[1.5rem] pl-14 pr-12 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-accent/40 focus:bg-surface transition-all backdrop-blur-sm"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/20 hover:text-white transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Active Nodes</span>
                        <span className="text-sm font-black text-emerald-400">1,204 Verified</span>
                    </div>
                    <div className="h-8 w-px bg-white/[0.05]" />
                    <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                        Showing <span className="text-white font-black">{filteredLicenses.length}</span> keys
                    </div>
                </div>
            </div>

            {/* Licenses Table */}
            <div className="rounded-[2.5rem] border border-white/[0.05] bg-surface/30 backdrop-blur-md overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">License Key</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Owner</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Product</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 text-center">Activations</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {filteredLicenses.length > 0 ? (
                                filteredLicenses.map((license) => (
                                    <tr key={license.id} className="group hover:bg-white/[0.015] transition-all">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110",
                                                    license.status === 'Active' ? "bg-emerald-500/10 text-emerald-400" :
                                                        license.status === 'Revoked' ? "bg-red-500/10 text-red-400" :
                                                            "bg-white/[0.03] text-white/20"
                                                )}>
                                                    {license.status === 'Active' ? <ShieldCheck className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <code className="text-[11px] font-black text-white/90 font-mono tracking-tight">{license.key}</code>
                                                        <button
                                                            onClick={() => copyToClipboard(license.key)}
                                                            className="p-1.5 rounded-lg bg-white/[0.03] text-white/20 hover:text-accent hover:bg-accent/10 transition-all opacity-0 group-hover:opacity-100"
                                                        >
                                                            <Copy className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Issued on {license.created}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] text-white/20 group-hover:bg-white/[0.05] transition-colors">
                                                    <User className="h-4 w-4" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{license.owner}</span>
                                                    <span className="text-[11px] text-white/20 font-medium group-hover:text-white/30 transition-colors lowercase italic">{license.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-accent/40" />
                                                <span className="text-sm font-semibold text-white/60 group-hover:text-white/80 transition-colors">{license.plugin}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="flex h-1.5 w-12 overflow-hidden rounded-full bg-white/[0.03]">
                                                    <div
                                                        className={cn(
                                                            "h-full rounded-full transition-all duration-1000",
                                                            license.status === 'Active' ? "bg-accent" : "bg-white/10"
                                                        )}
                                                        style={{ width: license.activations.split('/')[0] === '1' ? '100%' : '0%' }}
                                                    />
                                                </div>
                                                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{license.activations} Limit</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleAction('View', license.id)}
                                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-white/30 hover:bg-accent/10 hover:text-accent transition-all cursor-pointer"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleAction('Manage', license.id)}
                                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-white/30 hover:bg-white/[0.1] hover:text-white transition-all cursor-pointer"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-white/20 font-medium">
                                        No licenses found matching "{searchQuery}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="flex items-center justify-between border-t border-white/[0.05] bg-white/[0.01] px-8 py-6">
                    <div
                        onClick={() => alert('Status: All systems operational.')}
                        className="flex items-center gap-2 text-[10px] font-black text-emerald-400/60 uppercase tracking-[0.2em] group cursor-pointer"
                    >
                        <CheckCircle2 className="h-4 w-4 transition-transform group-hover:scale-125" />
                        System fully operational. All hash keys verified.
                    </div>
                    <div className="flex items-center gap-2 text-xs font-black text-white/20 font-heading">
                        Last sync: <span className="text-white/40 uppercase ml-1">Today at 17:34</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
