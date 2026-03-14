// ── Hero.jsx ──────────────────────────────────────────────────
// Full-screen hero with headline, sub-copy, and WhatsApp CTA
import { motion } from 'framer-motion';
import { FaWhatsapp, FaChevronDown } from 'react-icons/fa';

const WHATSAPP_NUMBER = '923189156345'; // ← Replace with your WhatsApp number
const WHATSAPP_MSG = encodeURIComponent("Hi! I'd like to place an order.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

// Staggered container for children animations
const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/hero_beef.png')" }}
            />
            {/* Dark gradient overlay */}
            <div className="hero-overlay absolute inset-0" />

            {/* Decorative red glow */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-2xl"
                >
                    {/* Badge */}
                    <motion.div variants={fadeUp}>
                        <span className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse inline-block" />
                            100% Halal · Freshly Sourced
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeUp}
                        className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Premium Quality{' '}
                        <span className="gradient-text">Beef,</span>
                        <br />
                        Delivered{' '}
                        <span className="text-white">Fresh.</span>
                    </motion.h1>

                    {/* Sub-headline */}
                    <motion.p
                        variants={fadeUp}
                        className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
                    >
                        Hand-selected cuts from our master butchers. Whether you need
                        rich bone-in pieces, lean boneless fillets, or specialty ribs —
                        we deliver restaurant-grade beef straight to your door.
                    </motion.p>

                    {/* CTA buttons */}
                    <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="hero-order-btn"
                            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-red-600/40 hover:shadow-red-500/50 hover:-translate-y-1 transition-all duration-300"
                        >
                            <FaWhatsapp className="text-xl" />
                            Order on WhatsApp
                        </a>
                        <a
                            href="#products"
                            id="hero-view-products-btn"
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base px-8 py-4 rounded-full backdrop-blur-sm hover:-translate-y-1 transition-all duration-300"
                        >
                            View Products
                        </a>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap gap-6 mt-12 text-gray-400 text-sm"
                    >
                        {['Farm to Table', 'Fresh Daily', 'Best Price Guaranteed'].map((t) => (
                            <span key={t} className="flex items-center gap-1.5">
                                <span className="text-red-500">✓</span> {t}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll chevron */}
            <motion.a
                href="#products"
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-red-400 transition-colors"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                aria-label="Scroll down"
            >
                <FaChevronDown className="text-2xl" />
            </motion.a>
        </section>
    );
}
