import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

export default function ProductFormModal({ isOpen, onClose, onSave, product }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        unit: 'kg',
        image: '/beef_with_bones.png', // Default or placeholder
        badge: ''
    });

    useEffect(() => {
        if (!isOpen) return;

        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                unit: product.unit || 'kg',
                image: product.image || '',
                badge: product.badge || ''
            });
        } else {
            setFormData({
                name: '',
                description: '',
                price: '',
                unit: 'kg',
                image: '',
                badge: ''
            });
        }
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                            {product ? 'Edit Product' : 'Add New Product'}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                placeholder="e.g., Premium Ribeye"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                required
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none"
                                placeholder="Describe the product..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Price *
                                </label>
                                <input
                                    type="text"
                                    name="price"
                                    required
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                    placeholder="e.g., 2000 PKR"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Unit *
                                </label>
                                <input
                                    type="text"
                                    name="unit"
                                    required
                                    value={formData.unit}
                                    onChange={handleChange}
                                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                    placeholder="e.g., kg or piece"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Image URL *
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    required
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                    placeholder="/image.png or https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Badge (Optional)
                                </label>
                                <input
                                    type="text"
                                    name="badge"
                                    value={formData.badge}
                                    onChange={handleChange}
                                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                    placeholder="e.g., Popular, Premium"
                                />
                            </div>
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
                                {product ? 'Save Changes' : 'Add Product'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
