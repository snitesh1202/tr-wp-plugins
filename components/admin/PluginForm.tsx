"use client"

import * as React from "react"
import { Package, DollarSign, Tag, Info, Layers, Save } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface PluginFormProps {
    initialData?: any
    onSubmit: (data: any) => void
    isLoading?: boolean
}

export function PluginForm({ initialData, onSubmit, isLoading }: PluginFormProps) {
    const [formData, setFormData] = React.useState({
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        category: initialData?.category || "SEO",
        version: initialData?.version || "1.0.0",
        price: initialData?.price?.toString().replace('$', '') || "",
        description: initialData?.description || "",
        status: initialData?.status || "Active"
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => {
            const newData = { ...prev, [name]: value }
            // Auto-generate slug from name if creating new
            if (name === 'name' && !initialData) {
                newData.slug = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            }
            return newData
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {/* Plugin Name */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                        <Package className="h-3 w-3" />
                        Plugin Name
                    </label>
                    <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Master SEO Pro"
                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl px-5 py-4 text-sm text-white placeholder:text-white/10 outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all"
                    />
                </div>

                {/* Slug */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                        <Tag className="h-3 w-3" />
                        Slug (URL identifier)
                    </label>
                    <input
                        required
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="master-seo-pro"
                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl px-5 py-4 text-sm text-white/40 placeholder:text-white/10 outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all cursor-not-allowed"
                        disabled={!!initialData}
                    />
                </div>

                {/* Category */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                        <Layers className="h-3 w-3" />
                        Category
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all appearance-none"
                    >
                        <option value="SEO">SEO</option>
                        <option value="Security">Security</option>
                        <option value="Performance">Performance</option>
                        <option value="Forms">Forms</option>
                        <option value="WooCommerce">WooCommerce</option>
                    </select>
                </div>

                {/* Price */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                        <DollarSign className="h-3 w-3" />
                        Price (USD)
                    </label>
                    <div className="relative group">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 font-bold">$</span>
                        <input
                            required
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="49"
                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl pl-10 pr-5 py-4 text-sm text-white placeholder:text-white/10 outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all"
                        />
                    </div>
                </div>

                {/* Version */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                        <Info className="h-3 w-3" />
                        Version
                    </label>
                    <input
                        required
                        name="version"
                        value={formData.version}
                        onChange={handleChange}
                        placeholder="1.0.0"
                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl px-5 py-4 text-sm text-white placeholder:text-white/10 outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all"
                    />
                </div>

                {/* Status */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                        <Save className="h-3 w-3" />
                        Listing Status
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all appearance-none"
                    >
                        <option value="Active">Active</option>
                        <option value="Draft">Draft</option>
                        <option value="Archived">Archived</option>
                    </select>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                    <Info className="h-3 w-3" />
                    Plugin Description
                </label>
                <textarea
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter a compelling description for your plugin..."
                    className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem] px-5 py-4 text-sm text-white placeholder:text-white/10 outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all resize-none"
                />
            </div>

            {/* File Upload Placeholder Notification */}
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-6 text-center">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                    ZIP & Screenshot uploads will be integrated with Supabase Storage.
                </p>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-accent px-8 py-5 text-sm font-black text-white hover:bg-accent/90 transition-all hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
            >
                {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                    <>
                        <Save className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        {initialData ? "Save Changes" : "Create Plugin"}
                    </>
                )}
            </button>
        </form>
    )
}
