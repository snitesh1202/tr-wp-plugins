"use client"

import { useState } from "react"
import { Search, ShoppingCart, Filter, Download, ArrowUpRight, User, Package, Calendar, Clock, ChevronRight } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const mockOrders = [
    { id: "ORD-8421", customer: "John Doe", email: "john@example.com", plugin: "SpeedMaster SEO", amount: "$49", status: "Completed", date: "Mar 08, 2024", time: "14:20" },
    { id: "ORD-8422", customer: "Sarah Smith", email: "sarah@tech.io", plugin: "SecureFlow Shield", amount: "$59", status: "Completed", date: "Mar 08, 2024", time: "13:45" },
    { id: "ORD-8423", customer: "Mike Johnson", email: "mike@dev.net", plugin: "FormCraft Pro", amount: "$39", status: "Pending", date: "Mar 08, 2024", time: "11:12" },
    { id: "ORD-8424", customer: "Elena Ross", email: "elena@design.com", plugin: "SpeedMaster SEO", amount: "$49", status: "Completed", date: "Mar 07, 2024", time: "22:05" },
    { id: "ORD-8425", customer: "David Chen", email: "david@startup.co", plugin: "AssetCleanup Mini", amount: "$29", status: "Failed", date: "Mar 07, 2024", time: "19:30" },
    { id: "ORD-8426", customer: "Lisa Wang", email: "lisa@studio.com", plugin: "SecureFlow Shield", amount: "$59", status: "Completed", date: "Mar 07, 2024", time: "16:20" },
]

export default function AdminOrdersPage() {
    const [orders] = useState(mockOrders)

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between px-2">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-[0.2em]">
                        <ShoppingCart className="h-3 w-3" />
                        Transactional Records
                    </div>
                    <h1 className="font-heading text-4xl lg:text-5xl font-black text-white tracking-tight">
                        Marketplace <span className="text-accent underline underline-offset-[12px] decoration-white/10">Orders</span>
                    </h1>
                    <p className="text-white/40 font-medium max-w-xl">
                        Monitor and manage all customer transactions. Track payment statuses, customer details, and revenue generation in real-time.
                    </p>
                </div>
                <button className="flex items-center justify-center gap-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] px-8 py-5 text-sm font-black text-white hover:bg-white/[0.08] transition-all hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)] active:scale-95 group focus:outline-none focus:ring-2 focus:ring-white/10">
                    <Download className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
                    Export Report
                </button>
            </header>

            {/* Search & Filter Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between px-2">
                <div className="relative group w-full sm:w-[28rem]">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within:text-accent transition-all" />
                    <input
                        type="text"
                        placeholder="Search by order ID, email or name..."
                        className="w-full bg-surface/50 border border-white/[0.05] rounded-[1.5rem] pl-14 pr-6 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-accent/40 focus:bg-surface transition-all backdrop-blur-sm"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/[0.05] px-4 py-3 text-xs font-black text-white/40 hover:text-white hover:bg-white/[0.08] transition-all">
                        <Filter className="h-4 w-4" />
                        Filter Status
                    </button>
                    <div className="h-8 w-px bg-white/[0.05]" />
                    <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                        Total <span className="text-white font-black">{orders.length}</span> sales
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="rounded-[2.5rem] border border-white/[0.05] bg-surface/30 backdrop-blur-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Order Details</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Customer</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Product</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {orders.map((order) => (
                                <tr key={order.id} className="group hover:bg-white/[0.015] transition-all">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-black text-white group-hover:text-accent transition-colors">#{order.id}</span>
                                            <div className="flex items-center gap-2 text-[10px] text-white/20 font-bold uppercase tracking-wider">
                                                <Calendar className="h-3 w-3" />
                                                {order.date}
                                                <span className="h-1 w-1 rounded-full bg-white/10" />
                                                <Clock className="h-3 w-3" />
                                                {order.time}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.03] text-white/20 group-hover:text-white/40 transition-colors">
                                                <User className="h-4 w-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{order.customer}</span>
                                                <span className="text-[11px] text-white/20 font-medium lowercase italic group-hover:text-white/30 transition-colors">{order.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <Package className="h-4 w-4 text-white/20" />
                                            <span className="text-sm font-semibold text-white/60 group-hover:text-white/80 transition-colors">{order.plugin}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-wider",
                                            order.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' :
                                                order.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' :
                                                    'bg-red-500/10 text-red-400'
                                        )}>
                                            <div className={cn(
                                                "h-1 w-1 rounded-full",
                                                order.status === 'Completed' ? "bg-emerald-400" :
                                                    order.status === 'Pending' ? "bg-amber-400" :
                                                        "bg-red-400"
                                            )} />
                                            {order.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-base font-black text-white font-heading tracking-tight">{order.amount}</span>
                                            <span className="text-[10px] text-emerald-400/60 font-black uppercase tracking-widest">Paid</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="flex items-center justify-between border-t border-white/[0.05] bg-white/[0.01] px-8 py-6">
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-6 w-6 rounded-full border-2 border-[#13131a] bg-white/5 flex items-center justify-center text-[8px] font-bold text-white/20">
                                    {i}
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">
                            Recent transactions from 14 unique locations
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-lg bg-white/[0.03] text-white/20 hover:text-white transition-colors disabled:opacity-30" disabled>
                            <ChevronRight className="h-4 w-4 rotate-180" />
                        </button>
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Page 1 of 12</span>
                        <button className="p-2 rounded-lg bg-white/[0.03] text-white/20 hover:text-white transition-colors">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
