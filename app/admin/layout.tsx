"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, Key, Settings, LogOut, ExternalLink } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

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

    if (pathname === "/admin/login") return <>{children}</>

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push("/admin/login")
        router.refresh()
    }

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 border-r border-white/5 bg-surface p-6 hidden lg:block">
                <div className="flex items-center gap-3 mb-12">
                    <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center text-white font-black text-xs">A</div>
                    <span className="font-heading text-lg font-black text-white uppercase tracking-tighter">Market <span className="text-accent underline decoration-white/20 underline-offset-4">Admin</span></span>
                </div>

                <nav className="space-y-1">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${pathname === item.href
                                    ? "bg-accent text-white"
                                    : "text-white/40 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/40 hover:bg-white/5 hover:text-white transition-all"
                    >
                        <ExternalLink className="h-4 w-4" />
                        View Site
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-danger/60 hover:bg-danger/5 hover:text-danger transition-all"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 flex-1 p-8">
                <div className="mx-auto max-w-6xl">
                    {children}
                </div>
            </main>
        </div>
    )
}
