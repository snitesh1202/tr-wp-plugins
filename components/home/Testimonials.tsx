import { PlayCircle, Star } from "lucide-react"

export const VideoTestimonials = () => {
    return (
        <section className="py-24 bg-surface relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-6">
                        Join 5,000+ Businesses Growing Faster With Our Plugins
                    </h2>
                    <p className="text-lg text-white/60 font-body">
                        Thousands of marketers already use our plugins to grow their businesses. Here is what they have to say.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Testimonial 1 */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 group cursor-pointer hover:bg-white/10 transition-colors">
                        <div className="aspect-video bg-black/50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center border border-white/5">
                            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=500&q=80" alt="Video cover" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity" />
                            <PlayCircle className="h-12 w-12 text-white/80 z-10 group-hover:scale-110 transition-transform" />
                        </div>
                        <p className="text-white/80 italic mb-6">"After installing this plugin, our lead generation increased by nearly 3X within two months. It replaced three expensive marketing tools."</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 overflow-hidden"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Agency" alt="Avatar" /></div>
                            <div>
                                <div className="text-white font-bold text-sm">Digital Marketing Agency Founder</div>
                                <div className="flex gap-1 text-accent"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 group cursor-pointer hover:bg-white/10 transition-colors">
                        <div className="aspect-video bg-black/50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center border border-white/5">
                            <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500&q=80" alt="Video cover" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity" />
                            <PlayCircle className="h-12 w-12 text-white/80 z-10 group-hover:scale-110 transition-transform" />
                        </div>
                        <p className="text-white/80 italic mb-6">"We were paying hundreds of dollars every month for marketing software. Now everything runs directly on our WordPress site."</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 overflow-hidden"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=SaaS" alt="Avatar" /></div>
                            <div>
                                <div className="text-white font-bold text-sm">SaaS Startup Founder</div>
                                <div className="flex gap-1 text-accent"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 group cursor-pointer hover:bg-white/10 transition-colors">
                        <div className="aspect-video bg-black/50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center border border-white/5">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80" alt="Video cover" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity" />
                            <PlayCircle className="h-12 w-12 text-white/80 z-10 group-hover:scale-110 transition-transform" />
                        </div>
                        <p className="text-white/80 italic mb-6">"This plugin helped us convert more website visitors into customers without changing our entire marketing stack."</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 overflow-hidden"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Ecom" alt="Avatar" /></div>
                            <div>
                                <div className="text-white font-bold text-sm">Ecommerce Store Owner</div>
                                <div className="flex gap-1 text-accent"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center text-white/50 text-sm border-t border-white/5 pt-8">
                    These results are possible because our plugins are designed specifically for <span className="text-white font-bold">conversion-focused marketing</span>.
                </div>
            </div>
        </section>
    )
}

export const WrittenReviews = () => {
    const reviews = [
        { name: "Sarah Mitchell", role: "Marketing Consultant", src: "WordPress", text: "This is one of the best marketing plugins I have used for WordPress. Simple to install and very powerful." },
        { name: "Daniel Rogers", role: "Founder, GrowthLab", src: "Trustpilot", text: "We replaced multiple expensive marketing tools with this plugin. It saved us money and improved conversions." },
        { name: "Anita Sharma", role: "Ecommerce Owner", src: "Google", text: "I love how easy it is to capture leads from our website now. The setup took less than 10 minutes." },
        { name: "Jason Lee", role: "Course Creator", src: "Product Hunt", text: "The funnel builder is incredibly useful. It helped us increase webinar registrations by 40%." },
    ]

    return (
        <section className="py-24 bg-surface border-y border-white/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-6">
                        Why Marketers Consistently Rate Our Plugins <span className="text-accent">4.8/5 Stars</span>
                    </h2>
                    <p className="text-lg text-white/60 font-body">
                        Thousands of users trust our plugins to power their marketing. Here are some recent reviews.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((r, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6">
                            <div className="flex gap-1 text-accent mb-4"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
                            <p className="text-white/80 text-sm mb-6 leading-relaxed">"{r.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-accent/20 overflow-hidden"><img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${r.name}`} alt="Avatar" /></div>
                                <div>
                                    <div className="text-white font-bold text-xs">{r.name}</div>
                                    <div className="text-white/40 text-xs">{r.role}</div>
                                    <div className="text-accent/60 text-[10px] uppercase font-bold tracking-wider mt-1">Via {r.src}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
