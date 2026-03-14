// ── ProductCard.jsx ───────────────────────────────────────────
// Reusable product card with Framer Motion float-up animation
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaWhatsapp, FaStar, FaEdit, FaTrash } from 'react-icons/fa';

const WHATSAPP_NUMBER = '923189156345'; // ← Replace with your WhatsApp number

export default function ProductCard({ product, index, isEditing, onEdit, onDelete }) {
    const ref = useRef(null);
    // Trigger animation when card enters viewport
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    const { id, name, description, price, unit, image, badge } = product;

    const whatsappMsg = encodeURIComponent(
        `Hi! I'd like to order: ${name} (${price}/${unit})`
    );
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

    return (
        <motion.div
            ref={ref}
            // Float up from below when scrolled into view
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            className="relative bg-[#1e1e1e] rounded-2xl overflow-hidden border border-white/5 card-hover group flex flex-col"
            id={`product-card-${index}`}
        >
            {/* Badge */}
            {badge && (
                <span className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                    {badge}
                </span>
            )}

            {/* Edit / Delete overlay buttons */}
            {isEditing && (
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button
                        onClick={() => onEdit(product)}
                        className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full shadow-lg transition-colors"
                        title="Edit Product"
                    >
                        <FaEdit size={14} />
                    </button>
                    <button
                        onClick={() => onDelete(product.id)}
                        className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-full shadow-lg transition-colors"
                        title="Delete Product"
                    >
                        <FaTrash size={14} />
                    </button>
                </div>
            )}

            {/* Product image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
                {/* Image gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-transparent to-transparent opacity-60" />
            </div>

            {/* Card content */}
            <div className="flex flex-col flex-1 p-6">
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                    {Array(5).fill(0).map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-xs" />
                    ))}
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl mb-2 leading-tight">
                    {name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">
                    {description}
                </p>

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto">
                    <div>
                        <span className="text-red-400 text-2xl font-black">{price}</span>
                        <span className="text-gray-500 text-sm">/{unit}</span>
                    </div>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-600/40"
                        id={`order-btn-${index}`}
                    >
                        <FaWhatsapp />
                        Order
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
