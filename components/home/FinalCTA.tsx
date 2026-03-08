"use client"

import { CheckCircle2, ArrowRight } from "lucide-react"

const FinalCTA = () => {
    return (
        <section className="py-32 bg-surface relative overflow-hidden border-t border-white/10">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-surface to-surface pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/20 blur-[150px] rounded-full pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Content */}
                    <div>
                        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
                            Turn Your WordPress Website Into a <span className="text-accent text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">Powerful Marketing Engine</span>
                        </h2>

                        <p className="text-xl text-white/70 font-body mb-8">
                            Your website should not just exist. It should generate leads, customers, and revenue. Our marketing plugins help you achieve exactly that.
                        </p>

                        <div className="space-y-4 mb-10">
                            {[
                                "Capture more leads from your website",
                                "Improve conversion rates",
                                "Automate marketing tasks",
                                "Build high-performing funnels"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-white/90 font-medium">
                                    <CheckCircle2 className="w-6 h-6 text-accent" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-lg text-white/60 mt-8">
                            Stop relying on expensive marketing software. Start growing your business directly from your WordPress website.
                        </p>
                    </div>

                    {/* Lead Form */}
                    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl relative">
                        {/* Decorative glow behind form */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl z-[-1]" />

                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-white">Download Your First Plugin Today</h3>
                            <p className="text-white/60 mt-2">Start improving performance in minutes.</p>
                        </div>

                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-accent transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-accent transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Website URL</label>
                                <input
                                    type="url"
                                    placeholder="https://yourwebsite.com"
                                    className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-accent transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">What marketing challenge do you want to solve?</label>
                                <textarea
                                    rows={3}
                                    placeholder="Briefly describe your challenge..."
                                    className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-accent transition-colors resize-none"
                                />
                            </div>

                            <button className="w-full bg-accent text-white font-bold text-lg rounded-xl px-8 py-4 mt-6 hover:bg-accent/90 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                                Get Started
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default FinalCTA
