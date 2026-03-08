"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Download, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"

const DownloadPage = () => {
    const { token } = useParams()
    const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
    const [errorMsg, setErrorMsg] = useState("")

    useEffect(() => {
        // Automatically trigger download after 2 seconds
        const timer = setTimeout(() => {
            window.location.href = `/api/download?token=${token}`
        }, 2000)

        return () => clearTimeout(timer)
    }, [token])

    return (
        <div className="pt-32 pb-24 min-h-screen bg-background flex items-center justify-center">
            <div className="mx-auto max-w-md px-4 text-center">
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-accent">
                            <Download className="h-10 w-10 animate-bounce" />
                        </div>
                        <div className="absolute -bottom-1 -right-1">
                            <Loader2 className="h-6 w-6 text-accent animate-spin" />
                        </div>
                    </div>
                </div>

                <h1 className="font-heading text-4xl font-black text-white mb-4">Your Download</h1>
                <p className="text-white/50 mb-10 leading-relaxed font-body">
                    Preparing your secure download. Your plugin ZIP file should start downloading automatically in a few seconds.
                </p>

                <div className="rounded-3xl border border-white/5 bg-surface p-8 mb-8">
                    <div className="text-xs font-bold uppercase tracking-widest text-white/30 mb-2">Security Hash</div>
                    <div className="text-[10px] font-mono text-white/60 break-all">{token}</div>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-white/40">
                        Didn't start downloading?
                        <a href={`/api/download?token=${token}`} className="text-accent font-bold hover:underline ml-1">Click here to try again</a>
                    </p>

                    <Link
                        href="/plugins"
                        className="inline-block text-xs font-bold text-white/20 uppercase tracking-widest hover:text-white transition-colors"
                    >
                        ← Return to plugins
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DownloadPage
