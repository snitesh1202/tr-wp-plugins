"use client"

import { useState, useEffect, Suspense, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import PluginCard from "@/components/ui/PluginCard"
import { Search, Filter, ChevronDown } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const categories = ["All", "SEO", "Security", "Forms", "WooCommerce", "Performance"]

function PluginsContent() {
    const supabase = createClient()
    const searchParams = useSearchParams()

    const [plugins, setPlugins] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
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

        fetchPlugins()
    }, [])

    useEffect(() => {
        const query = searchParams.get("search")
        if (query) {
            setSearchQuery(query)
        }
    }, [searchParams])

    const filteredPlugins = useMemo(() => {
        return plugins.filter((plugin) => {
            const matchesCategory = selectedCategory === "All" || plugin.category === selectedCategory
            const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (plugin.description && plugin.description.toLowerCase().includes(searchQuery.toLowerCase()))
            return matchesCategory && matchesSearch
        })
    }, [plugins, selectedCategory, searchQuery])

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

                        {isLoading ? (
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {[1, 2, 3, 4].map((n) => (
                                    <div key={n} className="h-64 bg-surface/50 animate-pulse rounded-3xl border border-white/5" />
                                ))}
                            </div>
                        ) : filteredPlugins.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {filteredPlugins.map((plugin) => (
                                    <PluginCard
                                        key={plugin.id}
                                        {...plugin}
                                        downloads={plugin.downloads?.toString() || "0"}
                                        rating={4.9} // Mock rating for now
                                    />
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
