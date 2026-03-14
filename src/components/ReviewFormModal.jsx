import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaStar } from 'react-icons/fa';

export default function ReviewFormModal({ isOpen, onClose, onSave, review }) {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        text: '',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150' // Default placeholder
    });

    useEffect(() => {
        if (!isOpen) return; // Only update when opening

        if (review) {
            setFormData({
                name: review.name || '',
                role: review.role || '',
                text: review.text || '',
                rating: review.rating || 5,
                avatar: review.avatar || 'https://i.pravatar.cc/150'
            });
        } else {
            setFormData({
                name: '',
                role: '',
                text: '',
                rating: 5,
                avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
            });
        }
    }, [review, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleRatingClick = (ratingValue) => {
        setFormData(prev => ({ ...prev, rating: ratingValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#1e1e1e] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-white/10"
                >
                    <div className="flex justify-between items-center p-6 border-b border-white/10">
                        <h3 className="text-xl font-bold text-white">
                            {review ? 'Edit Review' : 'Add New Review'}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Customer Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                    placeholder="e.g., Ahmed K."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Role / Title (Optional)
                                </label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                    placeholder="e.g., Home Chef"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Review Text *
                            </label>
                            <textarea
                                name="text"
                                required
                                value={formData.text}
                                onChange={handleChange}
                                rows={4}
                                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none"
                                placeholder="Write the customer's review here..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Rating *
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleRatingClick(star)}
                                        className="text-2xl focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <FaStar
                                            className={star <= formData.rating ? "text-yellow-400" : "text-gray-600"}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Avatar Image URL *
                            </label>
                            <input
                                type="url"
                                name="avatar"
                                required
                                value={formData.avatar}
                                onChange={handleChange}
                                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                placeholder="https://..."
                            />
                            <p className="text-xs text-gray-500 mt-1">Leave as is for a random placeholder avatar.</p>
                        </div>

                        <div className="pt-4 flex justify-end gap-3 border-t border-white/10 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors shadow-lg shadow-red-600/20"
                            >
                                {review ? 'Save Changes' : 'Add Review'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
