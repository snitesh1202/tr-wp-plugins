"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const faqs = [
        {
            q: "Do I need technical knowledge to use these plugins?",
            a: "No. Our plugins are designed for beginners. You can install and configure everything without coding knowledge."
        },
        {
            q: "Are these plugins compatible with all WordPress themes?",
            a: "Yes. Our plugins are built to work with most modern WordPress themes and page builders."
        },
        {
            q: "Do I need to pay monthly fees?",
            a: "No. Most of our plugins use one-time pricing. You pay once and use the plugin permanently."
        },
        {
            q: "Will the plugins slow down my website?",
            a: "No. Our plugins are lightweight and optimized for performance. They are designed to maintain fast website speed."
        },
        {
            q: "Do you provide updates?",
            a: "Yes. We regularly release updates to improve features, performance, and security."
        },
        {
            q: "Can agencies use these plugins for client websites?",
            a: "Yes. Many digital marketing agencies use our plugins for client projects. They help implement marketing strategies quickly."
        },
        {
            q: "What if the plugin does not work for my website?",
            a: "We offer a 30-day money back guarantee. If the plugin does not meet your expectations, you can request a refund."
        }
    ]

    return (
        <section className="py-24 bg-surface">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-6">
                        Frequently Asked <span className="text-accent">Questions</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full text-left px-6 py-6 flex items-center justify-between font-bold text-white hover:text-accent transition-colors"
                            >
                                <span className="pr-8 text-lg">{faq.q}</span>
                                <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 text-white/50 ${openIndex === i ? 'rotate-180 text-accent' : ''}`} />
                            </button>
                            <AnimatePresence initial={false}>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-white/60 font-body leading-relaxed border-t border-white/5 pt-4">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQ
