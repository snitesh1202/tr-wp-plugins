"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Check, Star, Download, Globe, Shield, Clock, ArrowLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"

const PluginDetailPage = () => {
    const { slug } = useParams()
    const router = useRouter()
    const supabase = createClient()

    const [plugin, setPlugin] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("overview")

    useEffect(() => {
        const fetchPlugin = async () => {
            setIsLoading(true)
            const { data, error } = await supabase
                .from('plugins')
                .select('*')
                .eq('slug', slug)
                .single()

            if (error || !data) {
                console.error('Error fetching plugin:', error)
                // Fallback or 404
            } else {
                setPlugin(data)
            }
            setIsLoading(false)
        }

        if (slug) fetchPlugin()
    }, [slug])

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "changelog", label: "Changelog" },
        { id: "reviews", label: "Reviews" },
        { id: "faq", label: "FAQ" },
    ]

    if (isLoading) {
        return (
            <div className="pt-32 pb-24 min-h-screen bg-background flex items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
            </div>
        )
    }

    if (!plugin) {
        return (
            <div className="pt-32 pb-24 min-h-screen bg-background text-center">
                <h1 className="text-4xl font-black text-white mb-4">Plugin not found</h1>
                <Link href="/plugins" className="text-accent font-bold hover:underline">Back to all plugins</Link>
            </div>
        )
    }

    return (
        <div className="pt-32 pb-24 min-h-screen bg-background text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-white/40 mb-10">
                    <Link href="/" className="hover:text-white">Home</Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href="/plugins" className="hover:text-white">Plugins</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-white font-medium">{plugin.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Content */}
                    <div className="lg:col-span-8">
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h1 className="font-heading text-5xl font-black mb-4">{plugin.name}</h1>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-1.5 text-accent">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span className="font-bold text-sm">4.9 (14 reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-white/40 text-sm">
                                        <Download className="h-4 w-4" />
                                        <span className="font-bold">{plugin.downloads || 0} downloads</span>
                                    </div>
                                    <div className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/60">
                                        v{plugin.version}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs Nav */}
                        <div className="border-b border-white/5 mb-10 overflow-x-auto">
                            <div className="flex gap-8 min-w-max">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === tab.id ? "text-accent" : "text-white/40 hover:text-white"
                                            }`}
                                    >
                                        {tab.label}
                                        {activeTab === tab.id && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="space-y-12">
                            <AnimatePresence mode="wait">
                                {activeTab === "overview" && (
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-12"
                                    >
                                        <div className="rounded-3xl border border-white/5 bg-surface aspect-video flex items-center justify-center text-white/20 text-sm font-bold uppercase tracking-[0.2em]">
                                            Plugin Interface Screenshot
                                        </div>

                                        <section>
                                            <h3 className="font-heading text-2xl font-bold mb-4">Description</h3>
                                            <p className="text-white/60 leading-relaxed font-body text-lg">
                                                {plugin.description || "No description provided."}
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="font-heading text-2xl font-bold mb-6">Key Features</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {(plugin.features || ["Performance Optimized", "Regular Updates", "Premium Support", "Easy Configuration"]).map((feature: string) => (
                                                    <div key={feature} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/20 text-success">
                                                            <Check className="h-3.5 w-3.5" />
                                                        </div>
                                                        <span className="text-sm font-medium text-white/80">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </motion.div>
                                )}

                                {activeTab === "changelog" && (
                                    <motion.div
                                        key="changelog"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-8"
                                    >
                                        <div className="border-l-2 border-accent/20 pl-8 relative">
                                            <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-accent border-4 border-background" />
                                            <div className="mb-2 flex items-center gap-4">
                                                <span className="text-xl font-black">v{plugin.version}</span>
                                                <span className="text-xs text-white/40 font-bold uppercase">Latest version</span>
                                            </div>
                                            <ul className="space-y-2 text-white/60 text-sm list-disc list-inside">
                                                {plugin.changelog ? (
                                                    typeof plugin.changelog === 'string' ? <li>{plugin.changelog}</li> :
                                                        Array.isArray(plugin.changelog) ? plugin.changelog.map((item: string, i: number) => <li key={i}>{item}</li>) :
                                                            <li>Stable release</li>
                                                ) : (
                                                    <li>Initial stable release</li>
                                                )}
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Column: Sticky CTA */}
                    <div className="lg:col-span-4 relative">
                        <div className="sticky top-24 space-y-6">
                            <div className="rounded-3xl border border-white/10 bg-surface p-8 shadow-2xl overflow-hidden relative group">
                                <div className="absolute top-0 right-0 p-4">
                                    <div className="h-10 w-10 rotate-12 bg-accent/20 blur-2xl rounded-full group-hover:bg-accent/40 transition-colors" />
                                </div>
                                <div className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2">Lifetime Access</div>
                                <div className="flex items-baseline gap-2 mb-8">
                                    <span className="text-5xl font-black font-heading">₹{plugin.price}</span>
                                    <span className="text-white/30 font-medium">INR</span>
                                </div>

                                <Link
                                    href={`/checkout/${plugin.slug}`}
                                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-accent py-5 text-sm font-black text-white hover:bg-accent/90 transition-all hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] active:scale-95 mb-8"
                                >
                                    Get {plugin.name}
                                    <ArrowLeft className="h-4 w-4 rotate-180" />
                                </Link>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-white/60">
                                        <Check className="h-4 w-4 text-success" />
                                        <span>Use on <span className="text-white font-bold">1 Site</span></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-white/60">
                                        <Check className="h-4 w-4 text-success" />
                                        <span>Lifetime Updates</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-white/60">
                                        <Check className="h-4 w-4 text-success" />
                                        <span>1 Year Premium Support</span>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-[10px] font-bold text-white/30 uppercase mb-1">WP Version</div>
                                        <div className="text-sm font-bold">5.6+</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-white/30 uppercase mb-1">PHP Version</div>
                                        <div className="text-sm font-bold">7.4+</div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Signals */}
                            <div className="rounded-3xl border border-white/5 bg-white/5 p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Shield className="h-5 w-5 text-accent" />
                                    <span className="text-sm font-medium text-white/80">Secure checkout via Cashfree</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-accent" />
                                    <span className="text-sm font-medium text-white/80">Instant digital delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PluginDetailPage
