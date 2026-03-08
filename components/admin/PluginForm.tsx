"use client"

import * as React from "react"
import {
    Package, DollarSign, Tag, Info, Layers, Save,
    Upload, FileArchive, Image as ImageIcon, X, CheckCircle2, Loader2
} from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface PluginFormProps {
    initialData?: any
    onSubmit: (data: any, files: { zipFile?: File; screenshotFile?: File }) => void
    isLoading?: boolean
}

export function PluginForm({ initialData, onSubmit, isLoading }: PluginFormProps) {
    const [formData, setFormData] = React.useState({
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        category: initialData?.category || "SEO",
        version: initialData?.version || "1.0.0",
        price: initialData?.price?.toString().replace('₹', '') || "",
        description: initialData?.description || "",
        status: initialData?.status || "Active"
    })

    const [zipFile, setZipFile] = React.useState<File | null>(null)
    const [screenshotFile, setScreenshotFile] = React.useState<File | null>(null)
    const [screenshotPreview, setScreenshotPreview] = React.useState<string | null>(
        initialData?.screenshots?.[0] || null
    )

    const zipInputRef = React.useRef<HTMLInputElement>(null)
    const screenshotInputRef = React.useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => {
            const newData = { ...prev, [name]: value }
            if (name === 'name' && !initialData) {
                newData.slug = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            }
            return newData
        })
    }

    const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) setZipFile(file)
    }

    const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setScreenshotFile(file)
            const reader = new FileReader()
            reader.onload = (ev) => setScreenshotPreview(ev.target?.result as string)
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData, {
            zipFile: zipFile ?? undefined,
            screenshotFile: screenshotFile ?? undefined
        })
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
                        Price (INR)
                    </label>
                    <div className="relative group">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 font-bold">₹</span>
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

            {/* File Uploads */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                {/* ZIP Upload */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                        <FileArchive className="h-3 w-3" />
                        Plugin ZIP File
                    </label>
                    <input
                        ref={zipInputRef}
                        type="file"
                        accept=".zip"
                        onChange={handleZipChange}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => zipInputRef.current?.click()}
                        className={cn(
                            "w-full rounded-2xl border border-dashed px-5 py-5 text-center transition-all group cursor-pointer hover:border-accent/40 hover:bg-accent/5",
                            zipFile
                                ? "border-emerald-500/40 bg-emerald-500/5"
                                : "border-white/10 bg-white/[0.02]"
                        )}
                    >
                        {zipFile ? (
                            <div className="flex items-center justify-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                                <span className="text-xs font-bold text-emerald-400 truncate max-w-[160px]">
                                    {zipFile.name}
                                </span>
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); setZipFile(null); if (zipInputRef.current) zipInputRef.current.value = "" }}
                                    className="ml-auto text-white/30 hover:text-white transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <Upload className="h-6 w-6 text-white/20 group-hover:text-accent transition-colors" />
                                <span className="text-[11px] font-bold text-white/30 group-hover:text-white/60 transition-colors">
                                    Click to upload <span className="text-white/50">.zip</span>
                                </span>
                                {initialData?.zip_path && (
                                    <span className="text-[10px] text-emerald-400/60 font-bold">✓ File already uploaded</span>
                                )}
                            </div>
                        )}
                    </button>
                </div>

                {/* Screenshot Upload */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                        <ImageIcon className="h-3 w-3" />
                        Screenshot
                    </label>
                    <input
                        ref={screenshotInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotChange}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => screenshotInputRef.current?.click()}
                        className={cn(
                            "w-full rounded-2xl border border-dashed transition-all group cursor-pointer hover:border-accent/40 overflow-hidden",
                            screenshotPreview
                                ? "border-accent/20 p-0"
                                : "border-white/10 bg-white/[0.02] px-5 py-5"
                        )}
                    >
                        {screenshotPreview ? (
                            <div className="relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={screenshotPreview}
                                    alt="Screenshot preview"
                                    className="w-full h-32 object-cover rounded-2xl"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl gap-2">
                                    <Upload className="h-5 w-5 text-white" />
                                    <span className="text-xs font-bold text-white">Change</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <ImageIcon className="h-6 w-6 text-white/20 group-hover:text-accent transition-colors" />
                                <span className="text-[11px] font-bold text-white/30 group-hover:text-white/60 transition-colors">
                                    Click to upload image
                                </span>
                            </div>
                        )}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-accent px-8 py-5 text-sm font-black text-white hover:bg-accent/90 transition-all hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Uploading & Saving...
                    </>
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
