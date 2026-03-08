"use client"

import { useState, useMemo, useEffect } from "react"
import { Plus, Search, MoreVertical, Edit2, Trash2, Eye, Package, SlidersHorizontal, ChevronRight, X, AlertTriangle } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from "@/lib/supabase/client"
import { Modal } from "@/components/ui/Modal"
import { PluginForm } from "@/components/admin/PluginForm"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export default function AdminPluginsPage() {
    const supabase = createClient()
    const [plugins, setPlugins] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    // Modal states
    const [isFormModalOpen, setIsFormModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [editingPlugin, setEditingPlugin] = useState<any>(null)
    const [pluginToDelete, setPluginToDelete] = useState<any>(null)
    const [isActionLoading, setIsActionLoading] = useState(false)

    useEffect(() => {
        fetchPlugins()
    }, [])

    const fetchPlugins = async () => {
        setIsLoading(true)
        const { data, error } = await supabase
            .from('plugins')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching plugins:', error)
        } else {
            setPlugins(data || [])
        }
        setIsLoading(false)
    }

    const filteredPlugins = useMemo(() => {
        return plugins.filter(plugin =>
            plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (plugin.category && plugin.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
            plugin.version.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [plugins, searchQuery])

    const handleFormSubmit = async (formData: any) => {
        setIsActionLoading(true)
        try {
            if (editingPlugin) {
                // Update
                const { error } = await supabase
                    .from('plugins')
                    .update({
                        name: formData.name,
                        category: formData.category,
                        version: formData.version,
                        price: parseFloat(formData.price),
                        description: formData.description,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', editingPlugin.id)

                if (error) throw error
            } else {
                // Create
                const { error } = await supabase
                    .from('plugins')
                    .insert([{
                        name: formData.name,
                        slug: formData.slug,
                        category: formData.category,
                        version: formData.version,
                        price: parseFloat(formData.price),
                        description: formData.description
                    }])

                if (error) throw error
            }

            await fetchPlugins()
            setIsFormModalOpen(false)
            setEditingPlugin(null)
        } catch (error) {
            console.error('Error saving plugin:', error)
            alert('Failed to save plugin. Please try again.')
        } finally {
            setIsActionLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!pluginToDelete) return

        setIsActionLoading(true)
        try {
            const { error } = await supabase
                .from('plugins')
                .delete()
                .eq('id', pluginToDelete.id)

            if (error) throw error

            await fetchPlugins()
            setIsDeleteModalOpen(false)
            setPluginToDelete(null)
        } catch (error) {
            console.error('Error deleting plugin:', error)
            alert('Failed to delete plugin.')
        } finally {
            setIsActionLoading(false)
        }
    }

    const openEditModal = (plugin: any) => {
        setEditingPlugin(plugin)
        setIsFormModalOpen(true)
    }

    const openDeleteModal = (plugin: any) => {
        setPluginToDelete(plugin)
        setIsDeleteModalOpen(true)
    }

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
                <button
                    onClick={() => {
                        setEditingPlugin(null);
                        setIsFormModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-3 rounded-2xl bg-accent px-8 py-5 text-sm font-black text-white hover:bg-accent/90 transition-all hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] active:scale-95 group focus:outline-none focus:ring-2 focus:ring-accent/40"
                >
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, category or version..."
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
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/[0.05] px-4 py-3 text-xs font-black text-white/40 hover:text-white hover:bg-white/[0.08] transition-all">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                    </button>
                    <div className="h-8 w-px bg-white/[0.05]" />
                    <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                        Showing <span className="text-white font-black">{filteredPlugins.length}</span> entries
                    </div>
                </div>
            </div>

            {/* Plugins Table */}
            <div className="rounded-[2.5rem] border border-white/[0.05] bg-surface/30 backdrop-blur-md overflow-hidden min-h-[400px]">
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
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Loading catalog...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredPlugins.length > 0 ? (
                                filteredPlugins.map((plugin) => (
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
                                                        "w-fit rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400"
                                                    )}>
                                                        Active
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="inline-flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-1.5 text-[11px] font-bold text-white/40 group-hover:text-white/60 transition-colors">
                                                {plugin.category || 'Uncategorized'}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-1.5 text-[11px] font-black text-white/30 group-hover:text-white/60 group-hover:border-white/10 transition-all uppercase">
                                                v{plugin.version}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className="text-base font-black text-white font-heading tracking-tight">${plugin.price}</div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => window.open(`/plugins/${plugin.slug}`, '_blank')}
                                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-white/30 hover:bg-accent/10 hover:text-accent transition-all cursor-pointer"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(plugin)}
                                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-white/30 hover:bg-blue-500/10 hover:text-blue-400 transition-all cursor-pointer"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(plugin)}
                                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-white/30 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-white/20 font-medium">
                                        No plugins found matching "{searchQuery}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between border-t border-white/[0.05] bg-white/[0.01] px-8 py-5">
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                        Use keys <kbd className="rounded bg-white/5 px-1.5 py-0.5 border border-white/10">ESC</kbd> to exit detail view
                    </p>
                    <div
                        onClick={() => alert('Exporting as CSV...')}
                        className="flex items-center gap-2 text-xs font-bold text-accent hover:underline cursor-pointer group"
                    >
                        Export as CSV
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </div>

            {/* Plugin Form Modal */}
            <Modal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                title={editingPlugin ? "Edit Plugin" : "Add New Plugin"}
            >
                <PluginForm
                    initialData={editingPlugin}
                    onSubmit={handleFormSubmit}
                    isLoading={isActionLoading}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Confirm Deletion"
                footer={
                    <div className="flex items-center justify-end gap-4">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isActionLoading}
                            className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-white transition-all shadow-lg shadow-red-500/20 active:scale-95 disabled:opacity-50"
                        >
                            {isActionLoading ? "Deleting..." : "Delete Permanently"}
                        </button>
                    </div>
                }
            >
                <div className="flex flex-col items-center gap-6 text-center py-4">
                    <div className="h-20 w-20 rounded-3xl bg-red-500/10 flex items-center justify-center text-red-500">
                        <AlertTriangle className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-xl font-black text-white">Are you absolutely sure?</h4>
                        <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                            You are about to delete <span className="text-white font-bold">"{pluginToDelete?.name}"</span>. This action is irreversible and will remove all associated data.
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
