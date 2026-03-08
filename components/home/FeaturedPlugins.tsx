import PluginCard from "../ui/PluginCard"

const demoPlugins = [
    {
        name: "SpeedMaster SEO",
        slug: "speedmaster-seo",
        description: "The lightweight SEO suite for WordPress that doesn't bloat your database. Lightning fast results.",
        price: "49",
        downloads: "2.4k",
        rating: 4.9,
        version: "2.1.0",
        category: "SEO"
    },
    {
        name: "SecureFlow Shield",
        slug: "secureflow-shield",
        description: "Enterprise-grade security simplified. Protect your site from brute force and malware with one click.",
        price: "59",
        downloads: "1.8k",
        rating: 5.0,
        version: "1.4.2",
        category: "Security"
    },
    {
        name: "FormCraft Pro",
        slug: "formcraft-pro",
        description: "Build beautiful, high-converting forms in seconds. Drag-and-drop simplicity with advanced logic.",
        price: "39",
        downloads: "3.1k",
        rating: 4.8,
        version: "3.0.1",
        category: "Forms"
    }
]

const FeaturedPlugins = () => {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="font-heading text-4xl font-black text-white mb-4">
                            Featured <span className="text-accent">Plugins</span>
                        </h2>
                        <p className="text-lg text-white/50 font-body">
                            Discover our most popular plugins, trusted by thousands of WordPress developers worldwide.
                        </p>
                    </div>
                    <button className="rounded-full border border-white/10 px-8 py-3 text-sm font-bold text-white hover:bg-white/5 transition-all">
                        View All Plugins
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {demoPlugins.map((plugin) => (
                        <PluginCard key={plugin.slug} {...plugin} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturedPlugins
