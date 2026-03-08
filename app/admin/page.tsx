"use client"

import { useState, useEffect } from "react"
import { DollarSign, Download, Users, Package, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, Loader2 } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from "@/lib/supabase/client"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export default function AdminDashboard() {
    const supabase = createClient()
    const [isLoading, setIsLoading] = useState(true)
    const [stats, setStats] = useState<any[]>([])
    const [recentOrders, setRecentOrders] = useState<any[]>([])
    const [successRate, setSuccessRate] = useState("0%")

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true)
            try {
                // 1. Fetch Stats
                // Revenue from paid orders
                const { data: revenueData } = await supabase
                    .from('orders')
                    .select('amount')
                    .eq('status', 'paid')

                const totalRevenue = revenueData?.reduce((sum, order) => sum + Number(order.amount), 0) || 0

                // Total Downloads from plugins
                const { data: pluginsData } = await supabase
                    .from('plugins')
                    .select('downloads')

                const totalDownloads = pluginsData?.reduce((sum, plugin) => sum + (plugin.downloads || 0), 0) || 0

                // Count of paid orders as 'Active Support' or similar metric
                const { count: activeCount } = await supabase
                    .from('orders')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'paid')

                // Update counts (new/pending)
                const { count: updateCount } = await supabase
                    .from('orders')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'pending')

                setStats([
                    { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, change: "+12.5%", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10", trend: "up" },
                    { label: "Total Downloads", value: totalDownloads.toLocaleString(), change: "+5.2%", icon: Download, color: "text-blue-400", bg: "bg-blue-500/10", trend: "up" },
                    { label: "Active Nodes", value: activeCount?.toString() || "0", change: "-2.4%", icon: Users, color: "text-amber-400", bg: "bg-amber-500/10", trend: "down" },
                    { label: "Pending Orders", value: updateCount?.toString() || "0", change: "New", icon: Package, color: "text-purple-400", bg: "bg-purple-500/10", trend: "neutral" },
                ])

                // 2. Fetch Recent Orders
                const { data: orders } = await supabase
                    .from('orders')
                    .select(`
                        id,
                        buyer_name,
                        buyer_email,
                        amount,
                        status,
                        created_at,
                        plugins (name)
                    `)
                    .order('created_at', { ascending: false })
                    .limit(5)

                if (orders) {
                    setRecentOrders(orders.map(order => ({
                        id: order.id.slice(0, 8),
                        customer: order.buyer_name,
                        email: order.buyer_email,
                        plugin: (order.plugins as any)?.name || 'Unknown Plugin',
                        amount: `$${Number(order.amount).toLocaleString()}`,
                        status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
                        date: new Date(order.created_at).toLocaleDateString()
                    })))
                }

                // 3. Success Rate
                const { count: totalOrders } = await supabase.from('orders').select('*', { count: 'exact', head: true })
                const { count: paidOrders } = await supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'paid')

                if (totalOrders && totalOrders > 0) {
                    const rate = ((paidOrders || 0) / totalOrders) * 100
                    setSuccessRate(`${rate.toFixed(1)}%`)
                }

            } catch (error) {
                console.error('Error loading dashboard data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    const handleStatClick = (label: string) => {
        alert(`Navigating to detailed ${label} analytics...`)
    }

    const handleOrderClick = (id: string) => {
        alert(`Viewing order: ${id}`)
    }

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
        )
    }

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <header className="space-y-2">
                <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-[0.2em]">
                    <Clock className="h-3 w-3" />
                    Real-time Overview
                </div>
                <h1 className="font-heading text-4xl lg:text-5xl font-black text-white tracking-tight">
                    Dashboard <span className="text-accent underline underline-offset-[12px] decoration-white/10">Summary</span>
                </h1>
                <p className="text-white/40 max-w-2xl font-medium leading-relaxed">
                    Everything you need to know about your marketplace performance. Track sales, downloads, and customer activity in real-time.
                </p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        onClick={() => handleStatClick(stat.label)}
                        className="group relative overflow-hidden rounded-[2rem] border border-white/[0.05] bg-surface/50 p-8 transition-all hover:border-white/10 hover:bg-surface/80 cursor-pointer active:scale-[0.98]"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="relative z-10 flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <div className={cn(
                                    "flex h-14 w-14 items-center justify-center rounded-2xl shadow-inner transition-transform group-hover:scale-110 duration-500",
                                    stat.bg,
                                    stat.color
                                )}>
                                    <stat.icon className="h-7 w-7" />
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold",
                                    stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' :
                                        stat.trend === 'down' ? 'bg-red-500/10 text-red-400' :
                                            'bg-accent/10 text-accent'
                                )}>
                                    {stat.trend === 'up' && <ArrowUpRight className="h-3 w-3" />}
                                    {stat.trend === 'down' && <ArrowDownRight className="h-3 w-3" />}
                                    {stat.change}
                                </div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-white mb-2 font-heading tracking-tight">{stat.value}</div>
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{stat.label}</div>
                            </div>
                        </div>
                        {/* Decorative gradient */}
                        <div className={cn(
                            "absolute -right-8 -bottom-8 h-32 w-32 rounded-full blur-[80px] opacity-20 transition-opacity group-hover:opacity-40",
                            stat.bg.replace('/10', '/40')
                        )} />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Recent Orders Table */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex flex-col gap-1">
                            <h3 className="font-heading text-2xl font-bold text-white tracking-tight">Recent Sales</h3>
                            <p className="text-xs text-white/30 font-medium">Monitoring the latest transactions</p>
                        </div>
                        <button
                            onClick={() => alert('Opening full analytics report...')}
                            className="rounded-xl px-4 py-2 text-xs font-bold text-accent bg-accent/5 hover:bg-accent/10 transition-all active:scale-95"
                        >
                            View Analytics
                        </button>
                    </div>

                    <div className="overflow-hidden rounded-[2.5rem] border border-white/[0.05] bg-surface/30 backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Customer</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Product</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.05]">
                                    {recentOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            onClick={() => handleOrderClick(order.id)}
                                            className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white group-hover:text-accent transition-colors">{order.customer}</span>
                                                    <span className="text-[11px] text-white/30 font-medium">{order.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-accent/40" />
                                                    <span className="text-sm font-semibold text-white/60 group-hover:text-white transition-colors">{order.plugin}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={cn(
                                                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase",
                                                    order.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' :
                                                        order.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                                                )}>
                                                    <div className={cn(
                                                        "h-1 w-1 rounded-full",
                                                        order.status === 'Paid' ? "bg-emerald-400" :
                                                            order.status === 'Pending' ? "bg-amber-400" : "bg-red-400"
                                                    )} />
                                                    {order.status}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-sm font-black text-white font-heading">{order.amount}</span>
                                                    <span className="text-[10px] text-white/20 font-bold uppercase">{order.date}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Conversion Card */}
                <div className="lg:col-span-4 space-y-6">
                    <h3 className="font-heading text-2xl font-bold text-white px-2 tracking-tight transition-transform">Success Rate</h3>
                    <div
                        onClick={() => alert('Conversion rate data sync required...')}
                        className="group relative aspect-square rounded-[3rem] border border-white/[0.05] bg-gradient-to-br from-surface/80 to-accent/5 p-1 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-accent/20 cursor-pointer active:scale-[0.98]"
                    >
                        <TrendingUp className="h-48 w-48 text-accent/[0.03] absolute -right-12 -bottom-12 transition-transform duration-1000 group-hover:scale-110 group-hover:-rotate-12" />
                        <div className="relative text-center space-y-4">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-accent shadow-2xl shadow-accent/40 mb-6 group-hover:shadow-accent/60 transition-all">
                                <TrendingUp className="h-10 w-10 text-white" />
                            </div>
                            <div className="text-7xl font-black text-white font-heading tracking-tighter">{successRate}</div>
                            <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-[10px] font-black uppercase text-emerald-400">
                                <ArrowUpRight className="h-3 w-3" />
                                Real-time Data
                            </div>
                        </div>
                        {/* Glass overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    )
}

