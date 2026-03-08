import { Target, CreditCard, Zap, Smile, Briefcase } from "lucide-react"

const Differentiators = () => {
    const items = [
        {
            icon: Target,
            title: "Built Specifically for Marketing",
            desc: "Most plugins focus on design or technical features. Our plugins focus on marketing results. Everything is designed to increase leads, conversions, and revenue."
        },
        {
            icon: CreditCard,
            title: "No Expensive Monthly Subscriptions",
            desc: "Most marketing software requires recurring payments, which quickly become expensive. Our plugins use simple one-time pricing. Buy once, use forever."
        },
        {
            icon: Zap,
            title: "Lightweight and Fast",
            desc: "Website speed affects SEO and conversions. Heavy plugins slow down your website. Our plugins are built to be lightweight and optimized for maximum performance."
        },
        {
            icon: Smile,
            title: "Beginner Friendly",
            desc: "You do not need coding knowledge. Our plugins include simple dashboards and easy configuration. Even beginners can set everything up quickly."
        },
        {
            icon: Briefcase,
            title: "Designed for Real Businesses",
            desc: "Our plugins are built using real marketing strategies. They are tested on real websites and real campaigns to ensure every feature solves an actual problem."
        }
    ]

    return (
        <section className="py-24 bg-accent/5 border-y border-white/5 relative">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-6">
                        Why Our WordPress Marketing Plugins <span className="text-accent">Are Different</span>
                    </h2>
                    <p className="text-lg text-white/60 font-body">
                        There are thousands of plugins available for WordPress. But very few focus specifically on marketing growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, i) => (
                        <div key={i} className={`bg-surface border border-white/10 rounded-3xl p-8 hover:border-accent/50 transition-colors ${i === 4 ? 'lg:col-span-2' : ''}`}>
                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                                <item.icon className="h-6 w-6 text-accent" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-white/60 leading-relaxed font-body">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Differentiators
