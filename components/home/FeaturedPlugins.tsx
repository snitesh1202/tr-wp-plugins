import PluginCard from "../ui/PluginCard"
import { createClient } from "@/lib/supabase/server"

const FeaturedPlugins = async () => {
    const supabase = await createClient()
    const { data: plugins, error } = await supabase
        .from('plugins')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)

    if (error) {
        console.error('Error fetching featured plugins:', error)
        return null
    }

    if (!plugins || plugins.length === 0) return null

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
                    {plugins.map((plugin) => (
                        <PluginCard
                            key={plugin.id}
                            {...plugin}
                            downloads={plugin.downloads?.toString() || "0"}
                            rating={4.9} // Mock rating
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturedPlugins
