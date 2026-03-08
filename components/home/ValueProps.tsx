import { Users, TrendingUp, Settings, Filter, PieChart, CheckCircle2 } from "lucide-react"

const ValueProps = () => {
    const props = [
        {
            title: "Capture More Leads From Every Visitor",
            desc: "Most visitors will not buy immediately. The key is capturing their information before they leave. Turn more visitors into potential customers with smart forms.",
            icon: Users,
            features: ["Email subscribers", "Customer inquiries", "Demo requests", "Newsletter signups", "Consultation bookings"],
            extra: "Forms appear as: Popups, Embedded forms, Slide-ins, Landing pages."
        },
        {
            title: "Improve Conversion Rates Without Increasing Traffic",
            desc: "Traffic alone does not grow a business. Conversions do. Even a small increase in conversion rate can significantly increase revenue.",
            icon: TrendingUp,
            features: ["Call-to-action buttons", "Landing page layout", "Lead capture forms", "Sales funnels"],
            extra: ""
        },
        {
            title: "Automate Your Marketing Workflows",
            desc: "Marketing automation saves time and increases efficiency. Scale your marketing efforts without increasing your workload.",
            icon: Settings,
            features: ["Trigger email follow-ups", "Segment users", "Send personalized offers", "Nurture leads automatically"],
            extra: ""
        },
        {
            title: "Build High-Converting Marketing Funnels",
            desc: "Funnels guide visitors toward a specific action. Without a funnel, most visitors leave your website without converting.",
            icon: Filter,
            features: ["Product sales", "Lead generation", "Webinar registrations", "Consultation bookings"],
            extra: ""
        },
        {
            title: "Understand Your Visitors With Powerful Analytics",
            desc: "Data helps you make better marketing decisions. Optimize your marketing campaigns with clear, actionable insights.",
            icon: PieChart,
            features: ["Traffic sources", "High-converting pages", "User interactions", "Drop-off points"],
            extra: ""
        }
    ]

    return (
        <section className="py-24 bg-surface relative">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="space-y-24">
                    {props.map((p, index) => {
                        const isEven = index % 2 === 0
                        return (
                            <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                                <div className="flex-1 space-y-6">
                                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
                                        <p.icon className="w-8 h-8 text-accent" />
                                    </div>
                                    <h2 className="font-heading text-3xl sm:text-4xl font-black text-white leading-tight">
                                        {p.title}
                                    </h2>
                                    <p className="text-lg text-white/60 font-body">
                                        {p.desc}
                                    </p>
                                    <ul className="space-y-3 pt-4">
                                        {p.features.map((f, i) => (
                                            <li key={i} className="flex items-center gap-3 text-white/80 font-medium">
                                                <CheckCircle2 className="w-5 h-5 text-accent" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    {p.extra && (
                                        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm">
                                            {p.extra}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="aspect-[4/3] rounded-3xl bg-gradient-to-tr from-accent/5 to-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl">
                                        {/* Mockup Placeholder */}
                                        <div className="absolute inset-x-8 inset-y-8 border border-white/5 rounded-2xl bg-surface/50 backdrop-blur-sm flex flex-col p-6">
                                            <div className="h-4 w-32 bg-white/10 rounded mb-8"></div>
                                            <div className="space-y-4 flex-1">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="h-12 bg-white/5 rounded-xl border border-white/5 flex items-center px-4 gap-4">
                                                        <div className="w-6 h-6 rounded bg-white/10"></div>
                                                        <div className="h-2 w-24 bg-white/20 rounded"></div>
                                                        <div className="ml-auto h-4 w-12 bg-accent/20 rounded-full"></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default ValueProps
