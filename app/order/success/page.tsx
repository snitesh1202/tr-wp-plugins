"use client"

import Link from "next/link"
import { CheckCircle2, Mail, Download, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const SuccessPage = () => {
    return (
        <div className="pt-32 pb-24 min-h-screen bg-background flex items-center justify-center">
            <div className="mx-auto max-w-md px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-center mb-8">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-success">
                            <CheckCircle2 className="h-10 w-10" />
                        </div>
                    </div>

                    <h1 className="font-heading text-4xl font-black text-white mb-4">Payment Successful!</h1>
                    <p className="text-white/50 mb-10 leading-relaxed font-body">
                        Your order has been processed. We've sent your license key and download link to your email address.
                    </p>

                    <div className="bg-surface border border-white/5 rounded-3xl p-8 mb-10 space-y-6">
                        <div className="flex items-center gap-4 text-left">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">Check your Inbox</div>
                                <div className="text-xs text-white/40">Don't forget to check your spam folder.</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-left">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                <Download className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">Instant Download</div>
                                <div className="text-xs text-white/40">A secure link has been generated for you.</div>
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/plugins"
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/5 py-4 text-sm font-bold text-white transition-all hover:bg-white/10"
                    >
                        ← Browse More Plugins
                    </Link>

                    <p className="mt-10 text-[10px] text-white/20 uppercase tracking-[0.2em]">
                        Order ID: CF-2024-${Math.floor(Math.random() * 100000)}
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default SuccessPage
