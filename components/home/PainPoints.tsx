import { motion } from "framer-motion"
import { AlertCircle, Target, TrendingDown, ArrowRight, Zap } from "lucide-react"

const PainPoints = () => {
    return (
        <section className="py-24 bg-surface relative overflow-hidden border-y border-white/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-6">
                        Why Most WordPress Websites <span className="text-red-400">Fail</span> to Generate Leads
                    </h2>
                    <p className="text-lg text-white/60 font-body">
                        Many businesses build websites expecting traffic, leads, and sales. But the reality is different. Most websites struggle to generate meaningful results.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
                        <TrendingDown className="h-10 w-10 text-red-400 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-4">Visitors Leave Without Action</h3>
                        <p className="text-white/60">They browse. Then they leave. No signups. No inquiries. No purchases. You lose potential revenue simply because the right marketing systems are missing.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
                        <AlertCircle className="h-10 w-10 text-yellow-500 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-4">Expensive SaaS Tools</h3>
                        <p className="text-white/60">Businesses often rely on expensive outside software. These tools cost $50 to $500 per month and are too complex for small businesses or solo founders.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
                        <Target className="h-10 w-10 text-accent mb-6" />
                        <h3 className="text-xl font-bold text-white mb-4">The Missing Link</h3>
                        <p className="text-white/60">WordPress is powerful, but it lacks advanced marketing tools by default. Bridging that gap requires messy integrations that slow down your website.</p>
                    </div>
                </div>

                {/* The Solution */}
                <div className="bg-gradient-to-r from-accent/20 to-surface border border-accent/20 rounded-3xl p-8 sm:p-12 text-center md:text-left flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent mb-4">
                            <Zap className="h-3.5 w-3.5 bg" />
                            A Better Solution
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            Bring Powerful Marketing Features Directly Into WordPress
                        </h3>
                        <p className="text-white/70 max-w-2xl text-lg">
                            Our WordPress marketing plugins help you generate leads, track visitors, and improve conversions without ever leaving your dashboard. No expensive software. No complicated integrations. Just simple tools that perform.
                        </p>
                    </div>
                </div>
            </div>

            {/* Ambient Background */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/2" />
        </section>
    )
}

export default PainPoints
