export const Stats = () => {
    const stats = [
        { value: "5,000+", label: "Active Users", desc: "Businesses across multiple industries use our plugins daily." },
        { value: "98%", label: "Satisfaction", desc: "Users consistently rate our plugins highly for performance and simplicity." },
        { value: "Millions", label: "Leads Captured", desc: "Our plugins have helped generate millions of leads for businesses." },
        { value: "Thousands", label: "Websites Powered", desc: "From small blogs to large businesses worldwide." }
    ]

    return (
        <section className="py-24 bg-surface border-y border-white/5 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-6">
                        Trusted by <span className="text-accent">Thousands</span> of Businesses Worldwide
                    </h2>
                    <p className="text-lg text-white/60 font-body">
                        Our plugins power marketing systems for businesses around the world. Companies trust our tools because they deliver consistent results.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {stats.map((s, i) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl sm:text-5xl font-black text-white font-heading mb-4 drop-shadow-[0_0_15px_rgba(var(--color-accent),0.5)]">
                                {s.value}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{s.label}</h3>
                            <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center border-t border-white/10 pt-16 mt-8">
                    <div className="text-sm font-bold tracking-widest uppercase text-white/40 mb-8">
                        Trusted by teams in these industries
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {["Digital Marketing Agencies", "Ecommerce Brands", "SaaS Companies", "Online Educators", "Local Service Businesses"].map((industry, i) => (
                            <span key={i} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 font-medium text-sm hover:bg-white/10 transition-colors">
                                {industry}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Stats
