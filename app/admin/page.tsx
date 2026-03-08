"use client"

import { DollarSign, Download, Users, Package, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const stats = [
    { label: "Total Revenue", value: "$4,290", change: "+12.5%", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10", trend: "up" },
    { label: "Total Downloads", value: "842", change: "+5.2%", icon: Download, color: "text-blue-400", bg: "bg-blue-500/10", trend: "up" },
    { label: "Active Support", value: "14", change: "-2.4%", icon: Users, color: "text-amber-400", bg: "bg-amber-500/10", trend: "down" },
    { label: "Plugin Updates", value: "3", change: "New", icon: Package, color: "text-purple-400", bg: "bg-purple-500/10", trend: "neutral" },
]

const recentOrders = [
    { id: "ORD001", customer: "John Doe", email: "john@example.com", plugin: "SpeedMaster SEO", amount: "$49", status: "Completed", date: "2 mins ago" },
    { id: "ORD002", customer: "Sarah Smith", email: "sarah@tech.io", plugin: "SecureFlow Shield", amount: "$59", status: "Completed", date: "45 mins ago" },
    { id: "ORD003", customer: "Mike Johnson", email: "mike@dev.net", plugin: "FormCraft Pro", amount: "$39", status: "Pending", date: "2 hours ago" },
    { id: "ORD004", customer: "Elena Ross", email: "elena@design.com", plugin: "SpeedMaster SEO", amount: "$49", status: "Completed", date: "5 hours ago" },
]

export default function AdminDashboard() {
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
                        className="group relative overflow-hidden rounded-[2rem] border border-white/[0.05] bg-surface/50 p-8 transition-all hover:border-white/10 hover:bg-surface/80"
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
                        <button className="rounded-xl px-4 py-2 text-xs font-bold text-accent bg-accent/5 hover:bg-accent/10 transition-all active:scale-95">
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
                                        <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors">
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
                                                    order.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                                )}>
                                                    <div className={cn(
                                                        "h-1 w-1 rounded-full",
                                                        order.status === 'Completed' ? "bg-emerald-400" : "bg-amber-400"
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
                    <div className="group relative aspect-square rounded-[3rem] border border-white/[0.05] bg-gradient-to-br from-surface/80 to-accent/5 p-1 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-accent/20">
                        <TrendingUp className="h-48 w-48 text-accent/[0.03] absolute -right-12 -bottom-12 transition-transform duration-1000 group-hover:scale-110 group-hover:-rotate-12" />
                        <div className="relative text-center space-y-4">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-accent shadow-2xl shadow-accent/40 mb-6">
                                <TrendingUp className="h-10 w-10 text-white" />
                            </div>
                            <div className="text-7xl font-black text-white font-heading tracking-tighter">14.2%</div>
                            <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-[10px] font-black uppercase text-emerald-400">
                                <ArrowUpRight className="h-3 w-3" />
                                3.1% Since last week
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
