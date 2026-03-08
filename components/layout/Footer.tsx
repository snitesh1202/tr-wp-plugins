import Link from "next/link"
import { ShoppingBag } from "lucide-react"

const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-background py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Logo & Info */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                                <ShoppingBag className="h-5 w-5" />
                            </div>
                            <span className="font-heading text-xl font-bold tracking-tight text-white">
                                Plugin<span className="text-accent">Market</span>
                            </span>
                        </Link>
                        <p className="max-w-xs text-sm text-white/50 leading-relaxed">
                            Premium WordPress plugins built for performance and security. One-time payment, lifetime updates.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-white/50">
                            <li><Link href="/plugins" className="hover:text-accent transition-colors">Browse Plugins</Link></li>
                            <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                            <li><Link href="/support" className="hover:text-accent transition-colors">Support</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-white/50">
                            <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
                            <li><Link href="/license" className="hover:text-accent transition-colors">Plugin License</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/40">
                        © {new Date().getFullYear()} TR WP Plugins. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Secured by Cashfree</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
