"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, ShoppingBag, Github, Package } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const Navbar = () => {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        { label: "Browse", href: "/plugins", icon: LayoutGrid },
        { label: "Github", href: "https://github.com", icon: Github, external: true },
    ]

    return (
        <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? "py-4" : "py-8"
            }`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className={cn(
                    "relative flex items-center justify-between rounded-full border px-8 py-3 transition-all duration-500",
                    isScrolled
                        ? "border-white/10 bg-surface/80 shadow-2xl backdrop-blur-xl"
                        : "border-transparent bg-transparent"
                )}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white group-hover:scale-110 transition-transform">
                            <ShoppingBag className="h-5 w-5" />
                        </div>
                        <span className="font-heading text-xl font-bold tracking-tight text-white">
                            Plugin<span className="text-accent">Market</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                className={cn(
                                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent",
                                    pathname === item.href ? "text-accent" : "text-white/60"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/plugins"
                            className="rounded-full bg-white text-black px-5 py-2 text-sm font-bold hover:bg-white/90 transition-all active:scale-95"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Nav Button */}
                    <div className="flex md:hidden">
                        <button className="text-white/60 hover:text-white">
                            <LayoutGrid className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
