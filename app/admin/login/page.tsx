"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Lock, Mail, Loader2, ShieldCheck } from "lucide-react"

export default function AdminLoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const supabase = createClient()
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push("/admin")
            router.refresh()
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-6">
                        <ShieldCheck className="h-10 w-10" />
                    </div>
                    <h1 className="font-heading text-4xl font-black text-white">Admin <span className="text-accent">Login</span></h1>
                    <p className="mt-2 text-sm text-white/40">Secure access to Marketplace management</p>
                </div>

                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div className="space-y-4 rounded-3xl border border-white/5 bg-surface p-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-2xl border border-white/5 bg-background px-11 py-4 text-sm text-white placeholder-white/20 outline-none focus:border-accent transition-all"
                                    placeholder="admin@example.com"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-2xl border border-white/5 bg-background px-11 py-4 text-sm text-white placeholder-white/20 outline-none focus:border-accent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-xl bg-danger/10 p-3 text-xs font-bold text-danger text-center">
                                {error}
                            </div>
                        )}

                        <button
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-4 text-sm font-black text-white transition-all hover:bg-accent/90 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
