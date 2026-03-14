// ── About.jsx ─────────────────────────────────────────────────
// A short "why choose us" / about section
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GiMeat, GiCow, GiMeatCleaver } from 'react-icons/gi';
import { FaLeaf, FaTruck, FaShieldAlt } from 'react-icons/fa';

const FEATURES = [
    {
        icon: <GiCow className="text-3xl text-red-500" />,
        title: 'Farm Sourced',
        desc: 'We partner directly with trusted, humane farms to bring you the freshest beef possible.',
    },
    {
        icon: <GiMeatCleaver className="text-3xl text-red-500" />,
        title: 'Expert Butchers',
        desc: 'Our master butchers bring decades of skill to every cut, ensuring perfect quality every time.',
    },
    {
        icon: <FaLeaf className="text-3xl text-red-500" />,
        title: '100% Halal',
        desc: 'All our beef is certified Halal, prepared with utmost care and respect for our customers.',
    },
    {
        icon: <FaTruck className="text-3xl text-red-500" />,
        title: 'Fresh Delivery',
        desc: 'We deliver straight to your door — cold-packed and fresh the same day as your order.',
    },
    {
        icon: <FaShieldAlt className="text-3xl text-red-500" />,
        title: 'Quality Guarantee',
        desc: 'Not satisfied? We offer a full exchange or refund on every order, no questions asked.',
    },
    {
        icon: <GiMeat className="text-3xl text-red-500" />,
        title: 'Best Price',
        desc: 'Premium quality doesn\'t have to break the bank. Our prices are always competitive and fair.',
    },
];

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <section id="about" className="py-24 bg-[#0d0d0d]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-red-500 text-sm font-semibold uppercase tracking-widest mb-4">
                        Why ADIL BEEF SHOP?
                    </span>
                    <h2
                        className="text-4xl sm:text-5xl font-black text-white mb-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        The <span className="gradient-text">Difference</span> You'll Taste
                    </h2>
                    <div className="mt-6 flex justify-center">
                        <span className="w-16 h-1 bg-red-600 rounded-full" />
                    </div>
                </motion.div>

                {/* Features grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map(({ icon, title, desc }, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 flex gap-4 hover:border-red-600/30 transition-colors"
                        >
                            <div className="mt-1 shrink-0">{icon}</div>
                            <div>
                                <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
