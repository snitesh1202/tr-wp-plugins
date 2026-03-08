import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import FeaturedPlugins from "@/components/home/FeaturedPlugins";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedPlugins />

      {/* Newsletter or CTA Section */}
      <section className="py-24 bg-accent/5 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl font-black text-white mb-6">
            Ready to <span className="text-accent">Boost</span> Your WordPress?
          </h2>
          <p className="max-w-xl mx-auto text-lg text-white/50 mb-10 font-body">
            Join 12,000+ developers receiving our latest plugin updates and development tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-surface border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent text-white min-w-[300px]"
            />
            <button className="bg-white text-black font-bold px-8 py-4 rounded-2xl hover:bg-white/90 transition-all active:scale-95 text-sm">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
