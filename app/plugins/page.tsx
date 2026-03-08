"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import PluginCard from "@/components/ui/PluginCard"
import { Search, Filter, ChevronDown } from "lucide-react"

const allPlugins = [
    {
        name: "SpeedMaster SEO",
        slug: "speedmaster-seo",
        description: "The lightweight SEO suite for WordPress that doesn't bloat your database. Lightning fast results.",
        price: "49",
        downloads: "2.4k",
        rating: 4.9,
        version: "2.1.0",
        category: "SEO"
    },
    {
        name: "SecureFlow Shield",
        slug: "secureflow-shield",
        description: "Enterprise-grade security simplified. Protect your site from brute force and malware with one click.",
        price: "59",
        downloads: "1.8k",
        rating: 5.0,
        version: "1.4.2",
        category: "Security"
    },
    {
        name: "FormCraft Pro",
        slug: "formcraft-pro",
        description: "Build beautiful, high-converting forms in seconds. Drag-and-drop simplicity with advanced logic.",
        price: "39",
        downloads: "3.1k",
        rating: 4.8,
        version: "3.0.1",
        category: "Forms"
    },
    {
        name: "WooAnalytics Hub",
        slug: "woo-analytics",
        description: "Advanced analytics for your WooCommerce store. Understand your customers and boost sales.",
        price: "69",
        downloads: "900",
        rating: 4.7,
        version: "1.0.5",
        category: "WooCommerce"
    },
    {
        name: "AssetCleanup Mini",
        slug: "asset-cleanup",
        description: "Remove unnecessary CSS and JS files from your pages to achieve perfect Core Web Vitals.",
        price: "29",
        downloads: "5.2k",
        rating: 4.9,
        version: "4.2.0",
        category: "Performance"
    }
]

const categories = ["All", "SEO", "Security", "Forms", "WooCommerce", "Performance"]

function PluginsContent() {
    const searchParams = useSearchParams()
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const query = searchParams.get("search")
        if (query) {
            setSearchQuery(query)
        }
    }, [searchParams])

    const filteredPlugins = allPlugins.filter((plugin) => {
        const matchesCategory = selectedCategory === "All" || plugin.category === selectedCategory
        const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            plugin.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="pt-32 pb-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8 md:flex-row md:items-start">
                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-64 space-y-8 shrink-0 md:sticky md:top-24">
                        <div>
                            <h3 className="font-heading text-lg font-bold text-white mb-4">Search</h3>
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-accent transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Filter plugins..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-surface border border-white/5 rounded-xl px-10 py-3 text-sm text-white outline-none focus:border-accent transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-heading text-lg font-bold text-white mb-4">Categories</h3>
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat
                                            ? "bg-accent text-white"
                                            : "text-white/40 hover:bg-white/5 hover:text-white"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Grid */}
                    <main className="flex-1">
                        <div className="flex justify-between items-center mb-8">
                            <div className="text-white/40 text-sm">
                                Showing <span className="text-white font-bold">{filteredPlugins.length}</span> plugins
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white/60">
                                <Filter className="h-4 w-4" />
                                Sort by: <span className="text-white font-bold cursor-pointer hover:text-accent inline-flex items-center gap-1">Newest <ChevronDown className="h-3 w-3" /></span>
                            </div>
                        </div>

                        {filteredPlugins.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {filteredPlugins.map((plugin) => (
                                    <PluginCard key={plugin.slug} {...plugin} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center rounded-3xl border border-white/5 bg-surface">
                                <div className="text-4xl mb-4">🔍</div>
                                <h3 className="text-xl font-bold text-white mb-2 font-heading">No plugins found</h3>
                                <p className="text-white/40">Try adjusting your filters or search query.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default function PluginsPage() {
    return (
        <Suspense fallback={<div className="pt-32 text-center text-white/40">Loading plugins...</div>}>
            <PluginsContent />
        </Suspense>
    )
}
