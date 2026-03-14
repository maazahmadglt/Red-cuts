// ── Footer.jsx ────────────────────────────────────────────────
// Footer with social links, quick nav, and copyright
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaHeart, FaMapMarkerAlt } from 'react-icons/fa';
import { GiMeat } from 'react-icons/gi';

// ── Customize these links ──
const SOCIAL = [
    {
        icon: <FaWhatsapp />,
        href: 'https://wa.me/923189156345',
        label: 'WhatsApp',
        color: 'hover:bg-green-600',
    },
    {
        icon: <FaFacebookF />,
        href: 'https://facebook.com/yourpage',   // ← Replace with your Facebook page URL
        label: 'Facebook',
        color: 'hover:bg-blue-600',
    },
    {
        icon: <FaInstagram />,
        href: 'https://instagram.com/yourpage',  // ← Replace with your Instagram page URL
        label: 'Instagram',
        color: 'hover:bg-pink-600',
    },
];

const LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'Products', href: '#products' },
    { label: 'Why Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export default function Footer() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });

    return (
        <footer
            id="contact"
            ref={ref}
            className="bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/5">

                    {/* Brand block */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <a href="#home" className="flex items-center gap-2 mb-4">
                            <GiMeat className="text-red-500 text-3xl" />
                            <span className="font-bold text-xl">
                                <span className="text-white">ADIL </span>
                                <span className="text-red-500">BEEF </span>
                                <span className="text-white-500">SHOP</span>
                            </span>
                        </a>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Farm-fresh, 100% Halal premium beef delivered to your door.
                            Quality you can taste. Service you can trust.
                        </p>

                        {/* Social icons */}
                        <div className="flex gap-3 mt-6">
                            {SOCIAL.map(({ icon, href, label, color }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    id={`footer-${label.toLowerCase()}`}
                                    className={`w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-gray-400 hover:text-white ${color} transition-all duration-300 hover:scale-110`}
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {LINKS.map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="text-gray-500 hover:text-red-400 text-sm transition-colors"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact block */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
                            Get in Touch
                        </h4>
                        <div className="space-y-5">
                            <div>
                                <p className="text-gray-500 text-sm mb-3">
                                    Place your order directly on WhatsApp:
                                </p>
                                <a
                                    href="https://wa.me/923189156345"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-red-600/40"
                                    id="footer-order-btn"
                                >
                                    <FaWhatsapp />
                                    Order Now
                                </a>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-3">
                                    Visit our store:
                                </p>
                                <a
                                    href="https://maps.app.goo.gl/dSp45PWuxfdCyhpp7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all"
                                >
                                    <FaMapMarkerAlt />
                                    View on Map
                                </a>
                            </div>
                        </div>
                        <p className="text-gray-600 text-xs mt-6">
                            Available: Mon – Sat · 8:00 AM – 8:00 PM
                        </p>
                    </motion.div>
                </div>

                {/* Bottom strip */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 text-gray-600 text-xs">
                    <p>© 2024 ADIL BEEF SHOP. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <FaHeart className="text-red-600 text-xs" /> for meat lovers.
                    </p>
                </div>
            </div >
        </footer >
    );
}
