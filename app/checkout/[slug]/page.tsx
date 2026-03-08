"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Shield, Lock, CreditCard } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
// @ts-ignore
import { load } from "@cashfreepayments/cashfree-js"

const CheckoutPage = () => {
    const { slug } = useParams()
    const router = useRouter()
    const supabase = createClient()

    const [plugin, setPlugin] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [isPageLoading, setIsPageLoading] = useState(true)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    })

    useEffect(() => {
        const fetchPlugin = async () => {
            setIsPageLoading(true)
            const { data, error } = await supabase
                .from('plugins')
                .select('*')
                .eq('slug', slug)
                .single()

            if (error || !data) {
                console.error('Error fetching plugin:', error)
            } else {
                setPlugin(data)
            }
            setIsPageLoading(false)
        }

        if (slug) fetchPlugin()
    }, [slug])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!plugin) return

        setLoading(true)
        try {
            const response = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pluginId: plugin.id, // Using real UUID from DB
                    pluginName: plugin.name,
                    amount: plugin.price,
                    customerName: formData.name,
                    customerEmail: formData.email,
                }),
            })

            const data = await response.json()

            if (data.payment_session_id) {
                const cashfree = await load({
                    mode: process.env.NODE_ENV === "production" ? "production" : "sandbox",
                });
                cashfree.checkout({
                    paymentSessionId: data.payment_session_id
                });
            } else if (data.error) {
                throw new Error(data.error)
            }
        } catch (error) {
            console.error("Checkout error:", error)
            alert("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    if (isPageLoading) {
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
                <Link href="/plugins" className="text-accent font-bold hover:underline">Back to plugins</Link>
            </div>
        )
    }

    return (
        <div className="pt-32 pb-24 min-h-screen bg-background">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <Link
                    href={`/plugins/${plugin.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-10 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to plugin
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Form */}
                    <div className="md:col-span-7">
                        <h1 className="font-heading text-3xl font-black text-white mb-8">Complete your <span className="text-accent">Order</span></h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-surface border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-accent transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-surface border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-accent transition-all"
                                />
                                <p className="text-[10px] text-white/30">Your license key and download link will be sent to this email.</p>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full rounded-2xl bg-accent py-5 text-sm font-black text-white hover:bg-accent/90 transition-all hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Processing..." : `Pay ₹${plugin.price} via Cashfree`}
                            </button>

                            <div className="flex items-center justify-center gap-6 mt-8">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                    <Shield className="h-3 w-3" />
                                    Secure Checkout
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                    <CreditCard className="h-3 w-3" />
                                    UPI / Cards / NetBanking
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Summary */}
                    <div className="md:col-span-5">
                        <div className="rounded-3xl border border-white/5 bg-surface p-8">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Order Summary</h3>
                            <div className="space-y-6">
                                <div className="flex justify-between">
                                    <div>
                                        <div className="text-sm font-bold text-white">{plugin.name}</div>
                                        <div className="text-[10px] text-white/40">Lifetime License · 1 Site</div>
                                    </div>
                                    <div className="text-sm font-bold text-white">₹{plugin.price}</div>
                                </div>
                                <div className="border-t border-white/5 pt-6 flex justify-between items-baseline">
                                    <span className="text-sm font-bold text-white">Total</span>
                                    <span className="text-3xl font-black text-accent">₹{plugin.price}</span>
                                </div>
                            </div>

                            <div className="mt-8 space-y-3">
                                <div className="flex items-center gap-2 text-xs text-white/40">
                                    <Lock className="h-3 w-3" />
                                    No hidden fees
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage
