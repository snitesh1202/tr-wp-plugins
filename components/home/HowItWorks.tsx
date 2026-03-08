import { Download, Sliders, LineChart } from "lucide-react"

const HowItWorks = () => {
    return (
        <section className="py-24 bg-surface relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-6">
                        Start Growing Your WordPress Website in <span className="text-accent">3 Simple Steps</span>
                    </h2>
                    <p className="text-lg text-white/60 font-body">
                        Getting started is simple. You do not need complicated setups. Just follow these steps.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="mx-auto w-24 h-24 rounded-3xl bg-surface border-2 border-accent flex items-center justify-center shadow-[0_0_30px_rgba(var(--color-accent),0.2)] mb-8">
                                <Download className="w-10 h-10 text-accent" />
                            </div>
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-bold text-sm mb-4">1</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Download & Install</h3>
                            <p className="text-white/60 leading-relaxed">
                                Choose the plugin that solves your marketing challenge. Install it like any other plugin. Activation takes less than a minute.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="mx-auto w-24 h-24 rounded-3xl bg-surface border-2 border-accent flex items-center justify-center shadow-[0_0_30px_rgba(var(--color-accent),0.2)] mb-8">
                                <Sliders className="w-10 h-10 text-accent" />
                            </div>
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-bold text-sm mb-4">2</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Configure Tools</h3>
                            <p className="text-white/60 leading-relaxed">
                                Use the simple dashboard to configure lead forms, funnels, or automation. Most settings require only a few clicks. Start collecting immediately.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="mx-auto w-24 h-24 rounded-3xl bg-surface border-2 border-accent flex items-center justify-center shadow-[0_0_30px_rgba(var(--color-accent),0.2)] mb-8">
                                <LineChart className="w-10 h-10 text-accent" />
                            </div>
                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-bold text-sm mb-4">3</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Watch Leads Grow</h3>
                            <p className="text-white/60 leading-relaxed">
                                Once active, your website becomes a marketing engine. Capture more leads, improve conversions, and watch your revenue increase.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
