// ── Navbar.jsx ────────────────────────────────────────────────
// Sticky navigation bar with brand name and CTA link
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { GiMeat } from 'react-icons/gi';

const WHATSAPP_NUMBER = '923189156345'; // ← Replace with your WhatsApp number
const WHATSAPP_MSG = encodeURIComponent("Hi! I'd like to place an order.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'Products', href: '#products' },
    { label: 'About', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-[#0d0d0d]/95 backdrop-blur-md shadow-lg shadow-red-900/20'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-4">
                {/* Brand */}
                <a href="#home" className="flex items-center gap-2 group">
                    <GiMeat className="text-red-500 text-3xl group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-xl tracking-tight">
                        <span className="text-white">ADIL </span>
                        <span className="text-red-500">BEEF </span>
                        <span className="text-white-500">SHOP </span>
                    </span>
                </a>

                {/* Desktop links */}
                <ul className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map(({ label, href }) => (
                        <li key={label}>
                            <a
                                href={href}
                                className="text-gray-300 hover:text-red-400 text-sm font-medium tracking-wide transition-colors duration-200 relative group"
                            >
                                {label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Desktop CTA */}
                <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5"
                    id="nav-order-btn"
                >
                    Order Now
                </a>

                {/* Mobile hamburger */}
                <button
                    id="mobile-menu-btn"
                    className="md:hidden text-gray-200 text-2xl focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden bg-[#0d0d0d]/98 border-t border-red-900/30"
                    >
                        <ul className="flex flex-col px-6 py-4 gap-4">
                            {NAV_LINKS.map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-gray-300 hover:text-red-400 text-base font-medium block transition-colors"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setMenuOpen(false)}
                                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all"
                                    id="mobile-order-btn"
                                >
                                    Order Now
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
