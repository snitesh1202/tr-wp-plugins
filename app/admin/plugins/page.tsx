"use client"

import { useState } from "react"
import { Plus, Search, MoreVertical, Edit2, Trash2, Eye, Package } from "lucide-react"

const mockPlugins = [
    { id: "1", name: "SpeedMaster SEO", category: "SEO", version: "2.1.0", price: "$49", status: "Active" },
    { id: "2", name: "SecureFlow Shield", category: "Security", version: "1.4.2", price: "$59", status: "Active" },
    { id: "3", name: "FormCraft Pro", category: "Forms", version: "3.0.1", price: "$39", status: "Draft" },
    { id: "4", name: "AssetCleanup Mini", category: "Performance", version: "4.2.0", price: "$29", status: "Active" },
]

export default function AdminPluginsPage() {
    const [plugins, setPlugins] = useState(mockPlugins)

    return (
        <div className="space-y-8">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-heading text-4xl font-black text-white">Manage <span className="text-accent underline underline-offset-8 decoration-white/10">Plugins</span></h1>
                    <p className="mt-2 text-white/40">Add, edit, or remove plugins from your marketplace.</p>
                </div>
                <button className="flex items-center gap-2 rounded-2xl bg-accent px-6 py-4 text-sm font-black text-white hover:bg-accent/90 transition-all hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] active:scale-95">
                    <Plus className="h-5 w-5" />
                    Add New Plugin
                </button>
            </header>

            {/* Search & Filter */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
                <div className="relative group w-full sm:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-accent transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by name or category..."
                        className="w-full bg-surface border border-white/5 rounded-2xl px-12 py-3 text-sm text-white outline-none focus:border-accent transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
                    Showing <span className="text-white">4</span> items
                </div>
            </div>

            {/* table */}
            <div className="rounded-3xl border border-white/5 bg-surface overflow-hidden">
                <table className="w-full text-left">
                    <thead className="border-b border-white/5 bg-white/[0.02]">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Name</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Category</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Version</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Price</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {plugins.map((plugin) => (
                            <tr key={plugin.id} className="group hover:bg-white/[0.01] transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-accent">
                                            <Package className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">{plugin.name}</div>
                                            <div className={`text-[10px] font-bold uppercase ${plugin.status === 'Active' ? 'text-success' : 'text-warning'}`}>
                                                {plugin.status}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-white/40 group-hover:text-white transition-colors">{plugin.category}</td>
                                <td className="px-6 py-4">
                                    <span className="rounded-lg bg-white/5 border border-white/5 px-2 py-1 text-[10px] font-bold text-white/60 uppercase">v{plugin.version}</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-black text-white font-heading">{plugin.price}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all"><Eye className="h-4 w-4" /></button>
                                        <button className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all"><Edit2 className="h-4 w-4" /></button>
                                        <button className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-danger transition-all"><Trash2 className="h-4 w-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
