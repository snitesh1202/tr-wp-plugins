"use client"

import { DollarSign, Download, Users, Package, TrendingUp } from "lucide-react"

const stats = [
    { label: "Total Revenue", value: "$4,290", change: "+12.5%", icon: DollarSign, color: "text-success", bg: "bg-success/10" },
    { label: "Total Downloads", value: "842", change: "+5.2%", icon: Download, color: "text-accent", bg: "bg-accent/10" },
    { label: "Active Support", value: "14", change: "-2.4%", icon: Users, color: "text-warning", bg: "bg-warning/10" },
    { label: "Plugin Updates", value: "3", change: "New", icon: Package, color: "text-white", bg: "bg-white/10" },
]

const recentOrders = [
    { id: "ORD001", customer: "John Doe", plugin: "SpeedMaster SEO", amount: "$49", status: "Completed" },
    { id: "ORD002", customer: "Sarah Smith", plugin: "SecureFlow Shield", amount: "$59", status: "Completed" },
    { id: "ORD003", customer: "Mike Johnson", plugin: "FormCraft Pro", amount: "$39", status: "Pending" },
    { id: "ORD004", customer: "Elena Ross", plugin: "SpeedMaster SEO", amount: "$49", status: "Completed" },
]

export default function AdminDashboard() {
    return (
        <div className="space-y-12">
            <header>
                <h1 className="font-heading text-4xl font-black text-white">Dashboard <span className="text-accent underline underline-offset-8 decoration-white/10">Overview</span></h1>
                <p className="mt-2 text-white/40">Welcome back. Here's what's happening with your marketplace.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-3xl border border-white/5 bg-surface p-6 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-success' : stat.change === 'New' ? 'text-accent' : 'text-danger'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-white mb-1 font-heading">{stat.value}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-white/30">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Recent Orders Table */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-heading text-xl font-bold text-white">Recent Sales</h3>
                        <button className="text-xs font-bold text-accent hover:underline">View All Orders</button>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-white/5 bg-surface">
                        <table className="w-full text-left">
                            <thead className="border-b border-white/5 bg-white/[0.02]">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Order ID</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Customer</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Product</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="group hover:bg-white/[0.01] transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-white/60 group-hover:text-white">{order.id}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-white">{order.customer}</td>
                                        <td className="px-6 py-4 text-sm text-white/40 group-hover:text-white transition-colors">{order.plugin}</td>
                                        <td className="px-6 py-4 text-sm font-black text-white text-right font-heading">{order.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sales Chart Placeholder */}
                <div className="lg:col-span-4 space-y-6">
                    <h3 className="font-heading text-xl font-bold text-white">Conversion Rate</h3>
                    <div className="aspect-square rounded-3xl border border-white/5 bg-surface flex items-center justify-center relative overflow-hidden group">
                        <TrendingUp className="h-32 w-32 text-white/[0.02] absolute scale-150 group-hover:scale-[1.7] transition-transform duration-1000" />
                        <div className="text-center relative">
                            <div className="text-6xl font-black text-white font-heading">14.2%</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-success mt-2">↑ 3.1% this week</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
