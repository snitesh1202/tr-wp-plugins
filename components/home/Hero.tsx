"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const Hero = () => {
    const [query, setQuery] = useState("")
    const router = useRouter()

    const handleSearch = () => {
        if (query.trim()) {
            router.push(`/plugins?search=${encodeURIComponent(query.trim())}`)
        } else {
            router.push('/plugins')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent mb-8">
                        <Sparkles className="h-3.5 w-3.5" />
                        Instant Download & Lifetime Updates
                    </span>
                    <h1 className="font-heading text-5xl font-black tracking-tight text-white sm:text-7xl mb-6 max-w-4xl mx-auto leading-[1.1]">
                        Elevate Your WordPress Site with <span className="text-accent">Premium Plugins</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-white/60 mb-10 leading-relaxed font-body">
                        Hand-crafted, lightweight, and performance-optimized plugins for developers who value quality. No subscriptions—just one-time payments.
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mx-auto max-w-xl relative mb-12"
                >
                    <div className="group relative flex items-center">
                        <Search className="absolute left-4 h-5 w-5 text-white/30 group-focus-within:text-accent transition-colors" />
                        <input
                            type="text"
                            placeholder="Search for SEO, Forms, Security..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full rounded-2xl border border-white/10 bg-surface px-12 py-4 text-white placeholder-white/30 outline-none focus:border-accent transition-all shadow-2xl"
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent/90 transition-all active:scale-95"
                        >
                            Search
                        </button>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-8 md:gap-16 border-t border-white/5 pt-10"
                >
                    <div className="text-center">
                        <div className="text-2xl font-black text-white font-heading">15+</div>
                        <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Total Plugins</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-black text-white font-heading">12k+</div>
                        <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Downloads</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-black text-white font-heading">4.9/5</div>
                        <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Avg Rating</div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero
