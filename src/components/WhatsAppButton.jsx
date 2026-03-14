// ── WhatsAppButton.jsx ────────────────────────────────────────
// Persistent floating WhatsApp button fixed at bottom-right
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '923189156345'; // ← Replace with your WhatsApp number
const WHATSAPP_MSG = encodeURIComponent("Assalam-o-Alaikum, mujhay Beef chahiye.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

export default function WhatsAppButton() {
    return (
        <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
        >
            <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="floating-whatsapp-btn"
                aria-label="Chat on WhatsApp"
                className="relative flex items-center justify-center w-16 h-16 bg-[#25d366] hover:bg-[#1fb055] rounded-full shadow-2xl shadow-green-500/40 transition-colors duration-300"
            >
                {/* Pulse ring */}
                <span className="whatsapp-pulse absolute inset-0 rounded-full" />
                <FaWhatsapp className="text-white text-3xl relative z-10" />
            </a>

            {/* Tooltip */}
            <motion.span
                className="absolute right-20 top-1/2 -translate-y-1/2 bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap pointer-events-none"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.4 }}
            >
                Chat with us!
            </motion.span>
        </motion.div>
    );
}
