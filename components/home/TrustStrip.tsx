import { Zap, Shield, RefreshCw, Award } from "lucide-react"

const features = [
    { icon: Zap, label: "One-time payment" },
    { icon: Shield, label: "MIT License" },
    { icon: RefreshCw, label: "Lifetime updates" },
    { icon: Award, label: "Instant download" },
]

const TrustStrip = () => {
    return (
        <div className="bg-surface border-y border-white/5 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                    {features.map((item) => (
                        <div key={item.label} className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                <item.icon className="h-5 w-5" />
                            </div>
                            <span className="font-heading text-sm font-bold tracking-tight text-white/80">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TrustStrip
