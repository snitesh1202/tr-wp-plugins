"use client"

import { useState } from "react"
import { Plus, Search, MoreVertical, Edit2, Trash2, Eye, Package, SlidersHorizontal, ChevronRight } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const mockPlugins = [
    { id: "1", name: "SpeedMaster SEO", category: "SEO", version: "2.1.0", price: "$49", status: "Active" },
    { id: "2", name: "SecureFlow Shield", category: "Security", version: "1.4.2", price: "$59", status: "Active" },
    { id: "3", name: "FormCraft Pro", category: "Forms", version: "3.0.1", price: "$39", status: "Draft" },
    { id: "4", name: "AssetCleanup Mini", category: "Performance", version: "4.2.0", price: "$29", status: "Active" },
]

export default function AdminPluginsPage() {
    const [plugins, setPlugins] = useState(mockPlugins)

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between px-2">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-[0.2em]">
                        <Package className="h-3 w-3" />
                        Inventory Control
                    </div>
                    <h1 className="font-heading text-4xl lg:text-5xl font-black text-white tracking-tight">
                        Manage <span className="text-accent underline underline-offset-[12px] decoration-white/10">Plugins</span>
                    </h1>
                    <p className="text-white/40 font-medium max-w-xl">
                        Centralized control for your marketplace offerings. Update versions, adjust pricing, and curate your plugin catalog.
                    </p>
                </div>
                <button className="flex items-center justify-center gap-3 rounded-2xl bg-accent px-8 py-5 text-sm font-black text-white hover:bg-accent/90 transition-all hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] active:scale-95 group">
                    <Plus className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
                    Add New Plugin
                </button>
            </header>

            {/* Search & Filter Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between px-2">
                <div className="relative group w-full sm:w-[28rem]">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within:text-accent transition-all" />
                    <input
                        type="text"
                        placeholder="Search by name, category or version..."
                        className="w-full bg-surface/50 border border-white/[0.05] rounded-[1.5rem] pl-14 pr-6 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-accent/40 focus:bg-surface transition-all backdrop-blur-sm"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/[0.05] px-4 py-3 text-xs font-black text-white/40 hover:text-white hover:bg-white/[0.08] transition-all">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                    </button>
                    <div className="h-8 w-px bg-white/[0.05]" />
                    <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                        Total <span className="text-white font-black">{plugins.length}</span> entries
                    </div>
                </div>
            </div>

            {/* Plugins Table */}
            <div className="rounded-[2.5rem] border border-white/[0.05] bg-surface/30 backdrop-blur-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Product</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Category</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 text-center">Version</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 text-center">Price</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {plugins.map((plugin) => (
                                <tr key={plugin.id} className="group hover:bg-white/[0.015] transition-all">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent p-px group-hover:from-accent/20 transition-all">
                                                <div className="flex h-full w-full items-center justify-center rounded-[0.9rem] bg-[#1a1a24] text-accent group-hover:scale-110 transition-transform">
                                                    <Package className="h-6 w-6" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="text-sm font-black text-white tracking-tight group-hover:text-accent transition-colors">{plugin.name}</div>
                                                <div className={cn(
                                                    "w-fit rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider",
                                                    plugin.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400 underline decoration-amber-400/20 underline-offset-2'
                                                )}>
                                                    {plugin.status}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="inline-flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-1.5 text-[11px] font-bold text-white/40 group-hover:text-white/60 transition-colors">
                                            {plugin.category}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-1.5 text-[11px] font-black text-white/30 group-hover:text-white/60 group-hover:border-white/10 transition-all uppercase">
                                            v{plugin.version}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <div className="text-base font-black text-white font-heading tracking-tight">{plugin.price}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-white/30 hover:bg-accent/10 hover:text-accent transition-all">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-white/30 hover:bg-blue-500/10 hover:text-blue-400 transition-all">
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-white/30 hover:bg-red-500/10 hover:text-red-400 transition-all">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Empty state or footer if needed */}
                <div className="flex items-center justify-between border-t border-white/[0.05] bg-white/[0.01] px-8 py-5">
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                        Use keys <kbd className="rounded bg-white/5 px-1.5 py-0.5 border border-white/10">ESC</kbd> to exit detail view
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-accent hover:underline cursor-pointer group">
                        Export as CSV
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </div>
    )
}
