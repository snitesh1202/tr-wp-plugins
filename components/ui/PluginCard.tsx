"use client"

import Link from "next/link"
import { Download, Star, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface PluginCardProps {
    name: string
    slug: string
    description: string
    price: string
    downloads: string
    rating: number
    version: string
    category: string
}

const PluginCard = ({ name, slug, description, price, downloads, rating, version, category }: PluginCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="group relative rounded-3xl border border-white/5 bg-surface p-6 hover:border-accent/30 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)]"
        >
            {/* Category & Version */}
            <div className="flex items-center justify-between mb-6">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                    {category}
                </span>
                <span className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest">
                    v{version}
                </span>
            </div>

            {/* Content */}
            <div className="mb-8">
                <h3 className="font-heading text-2xl font-black text-white mb-2 group-hover:text-accent transition-colors">
                    {name}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed font-body min-h-[4rem]">
                    {description}
                </p>
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div className="flex flex-col">
                    <span className="text-xs text-white/30 font-bold uppercase tracking-wider mb-1">Price</span>
                    <span className="text-xl font-black text-white">${price}</span>
                </div>

                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white/40 mb-1">
                        <Download className="h-3 w-3" />
                        {downloads} downloads
                    </div>
                    <div className="flex items-center gap-1 text-accent">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-[10px] font-bold">{rating}</span>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <Link
                href={`/plugins/${slug}`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/5 py-4 text-sm font-bold text-white transition-all hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/20"
            >
                View Plugin
                <ArrowRight className="h-4 w-4" />
            </Link>
        </motion.div>
    )
}

export default PluginCard
