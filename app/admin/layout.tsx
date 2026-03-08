"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, Key, Settings, LogOut, ExternalLink, Menu, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/admin" },
    { icon: Package, label: "Plugins", href: "/admin/plugins" },
    { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
    { icon: Key, label: "Licenses", href: "/admin/licenses" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    if (pathname === "/admin/login") return <>{children}</>

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/admin/login")
        router.refresh()
    }

    return (
        <div className="flex min-h-screen bg-background font-inter selection:bg-accent/30">
            {/* Sidebar Desktop */}
            <aside className="fixed inset-y-0 left-0 w-72 border-r border-white/[0.05] bg-surface/30 backdrop-blur-3xl p-8 hidden lg:flex flex-col z-50">
                <div className="flex items-center gap-4 mb-14 px-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-blue-600 shadow-lg shadow-accent/20">
                        <Package className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-heading text-xl font-black text-white leading-tight">Admin<span className="text-accent">Portal</span></span>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Marketplace v2.0</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "group flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-semibold transition-all duration-300",
                                    isActive
                                        ? "bg-accent text-white shadow-xl shadow-accent/20"
                                        : "text-white/40 hover:bg-white/[0.03] hover:text-white"
                                )}
                            >
                                <item.icon className={cn(
                                    "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                                    isActive ? "text-white" : "text-white/20 group-hover:text-accent"
                                )} />
                                {item.label}
                                {isActive && (
                                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                <div className="mt-auto pt-8 space-y-2 border-t border-white/[0.05]">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-semibold text-white/40 hover:bg-white/[0.03] hover:text-white transition-all group"
                    >
                        <ExternalLink className="h-5 w-5 text-white/20 group-hover:text-accent transition-colors" />
                        View Storefront
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-sm font-semibold text-red-400/60 hover:bg-red-500/5 hover:text-red-400 transition-all group"
                    >
                        <LogOut className="h-5 w-5 text-red-500/20 group-hover:text-red-500 transition-colors" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 w-full z-50 bg-surface/50 backdrop-blur-xl border-b border-white/[0.05] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-white">
                        <Package className="h-4 w-4" />
                    </div>
                    <span className="font-heading font-black text-white text-lg">Admin</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-xl bg-white/[0.05] text-white/60"
                >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </header>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 w-72 bg-surface z-[70] p-8 lg:hidden transition-transform duration-500 ease-in-out",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Same sidebar content but for mobile */}
                <div className="flex items-center gap-4 mb-14">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-white">
                        <Package className="h-5 w-5" />
                    </div>
                    <span className="font-heading text-xl font-black text-white leading-tight">Admin<span className="text-accent">Portal</span></span>
                </div>

                <nav className="space-y-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-semibold transition-all",
                                    isActive ? "bg-accent text-white" : "text-white/40"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="absolute bottom-8 left-8 right-8 pt-8 space-y-2 border-t border-white/[0.05]">
                    <Link
                        href="/"
                        className="flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-semibold text-white/40"
                    >
                        <ExternalLink className="h-5 w-5" />
                        View Site
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-sm font-semibold text-red-500/60"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-72 flex-1 min-h-screen pt-24 lg:pt-0">
                <div className="p-8 lg:p-12 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
