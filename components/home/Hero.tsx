"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, CheckCircle2, PlayCircle, ArrowRight, ShieldCheck, Download, Users } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-left"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent mb-6">
                            <Sparkles className="h-3.5 w-3.5" />
                            WordPress Marketing Plugins
                        </span>

                        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
                            Get Up to <span className="text-accent text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">3X More Leads</span>, Conversions, and Sales From Your WordPress Website — Without Expensive Marketing Tools
                        </h1>

                        <div className="space-y-4 text-lg text-white/70 mb-8 font-body">
                            <p>Stop relying on expensive SaaS marketing tools. Stop losing visitors who never convert. Stop struggling with complicated marketing setups.</p>
                            <p>Our powerful WordPress plugins help you capture leads, optimize conversions, and automate marketing directly inside your website.</p>
                            <p className="font-bold text-white/90">No monthly subscriptions. No technical setup. Just install the plugin and start growing your business.</p>
                            <p className="text-sm">Perfect for business owners, digital marketers, bloggers, agencies, and startups who want more results.</p>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Link href="/plugins" className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-8 py-4 text-base font-bold text-white hover:bg-accent/90 transition-all shadow-lg shadow-accent/25 active:scale-95">
                                <Download className="h-5 w-5" />
                                Download Free Plugin
                            </Link>
                            <Link href="/plugins" className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-surface px-8 py-4 text-base font-bold text-white hover:bg-white/5 transition-all active:scale-95">
                                Explore Marketing Plugins
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>

                        {/* Reduce FUDs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/60 font-medium">
                            {["30-day money back guarantee", "One-time payment — no subscription", "Beginner-friendly setup", "Works with any WordPress theme"].map((fud, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-accent/80" />
                                    <span>{fud}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Visual Element & Social Proof */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Mock Dashboard / Video Placeholder */}
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-surface/50 backdrop-blur-sm shadow-2xl aspect-[4/3] group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent z-0" />

                            {/* Dashboard Mockup UI */}
                            <div className="absolute inset-0 flex flex-col z-10 p-6">
                                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                    </div>
                                    <div className="text-xs font-bold text-white/30 uppercase tracking-widest">Growth Dashboard</div>
                                </div>
                                <div className="flex-1 grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <div className="h-2 w-16 bg-white/20 rounded mb-4" />
                                        <div className="h-8 w-24 bg-accent/20 rounded mb-2" />
                                        <div className="h-2 w-32 bg-white/10 rounded" />
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <div className="h-2 w-16 bg-white/20 rounded mb-4" />
                                        <div className="h-8 w-24 bg-green-500/20 rounded mb-2" />
                                        <div className="h-2 w-32 bg-white/10 rounded" />
                                    </div>
                                    <div className="col-span-2 bg-white/5 rounded-2xl p-4 border border-white/5 flex-1 relative overflow-hidden flex items-center justify-center group-hover:bg-white/10 transition-colors cursor-pointer">
                                        <div className="absolute inset-0 bg-accent/5" />
                                        <PlayCircle className="h-16 w-16 text-accent/80 group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Social Proof */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="absolute -bottom-6 -left-6 bg-surface border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-4 z-20"
                        >
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-surface bg-white/10 flex items-center justify-center text-xs font-bold overflow-hidden">
                                        <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=transparent`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white flex items-center gap-1">
                                    <Users className="h-3.5 w-3.5 text-accent" />
                                    Trusted by 5,000+
                                </div>
                                <div className="text-xs text-white/50">marketers & agencies</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Hero
