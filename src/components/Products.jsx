// ── Products.jsx ──────────────────────────────────────────────
// Product categories grid section
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductFormModal from './ProductFormModal';
import { FaEdit, FaPlus } from 'react-icons/fa';

// ── Product data ──────────────────────────────────────────────
// Customize prices, descriptions, and images here freely
const PRODUCTS = [
    {
        name: 'Beef with Bones',
        description:
            'Rich, deep flavour perfect for slow-cooking, hearty broths, and traditional curries. Ideal for family meals.',
        price: '1100 PKR',
        unit: 'kg',
        image: '/beef_with_bones.png',
        badge: 'Popular',
    },
    {
        name: 'Boneless Beef',
        description:
            'Lean, tender, and carefully trimmed — ready for your favourite stir-fries, steaks, and everyday recipes.',
        price: '1500 PKR',
        unit: 'kg',
        image: '/boneless_beef.png',
        badge: null,
    },
    {
        name: 'Special Pieces',
        description:
            'Premium cuts hand-selected by our master butcher. The finest marbled pieces reserved for the discerning cook.',
        price: '2000 PKR',
        unit: 'kg',
        image: '/special_cuts.png',
        badge: 'Premium',
    },
    {
        name: 'Beef Ribs',
        description:
            'Juicy, meaty ribs bursting with flavour. Perfect for the grill, smoker, or slow braising over an open fire.',
        price: '1200 PKR',
        unit: 'kg',
        image: '/beef_ribs.png',
        badge: null,
    },
    {
        name: 'Special Beef Paya',
        description:
            'Premium trotters rich in collagen and deep flavour. Perfect for a hearty, traditional slow-cooked broth.',
        price: '1000 PKR',
        unit: 'kg',
        image: '/beef_paya.png',
        badge: 'Special',
    },
];

export default function Products() {
    const headRef = useRef(null);
    const headInView = useInView(headRef, { once: true, margin: '-60px' });

    // State for products, initialized from localStorage or fallback to PRODUCTS
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('beef_shop_products');
        let initialData = PRODUCTS;
        if (saved) {
            try {
                initialData = JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse products from localStorage", e);
            }
        }
        // Ensure every product has a unique string ID
        return initialData.map((p, index) => ({
            ...p,
            id: (p.id || p.name || `product-${index}`).toString()
        }));
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Save to localStorage whenever products change
    useEffect(() => {
        localStorage.setItem('beef_shop_products', JSON.stringify(products));
    }, [products]);

    const handleEditClick = (product) => {
        console.log("Editing product:", product);
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        const targetId = id?.toString();
        console.log("Delete request for ID:", targetId);
        if (window.confirm("Are you sure you want to delete this product?")) {
            setProducts(prev => {
                const beforeCount = prev.length;
                const filtered = prev.filter(p => p.id !== targetId);
                console.log(`Deletion result: ${beforeCount} -> ${filtered.length} items`);
                return filtered;
            });
        }
    };

    const handleSaveProduct = (productData) => {
        if (editingProduct) {
            setProducts(prev => prev.map(p =>
                p.id === editingProduct.id
                    ? { ...productData, id: p.id }
                    : p
            ));
        } else {
            setProducts(prev => [...prev, {
                ...productData,
                id: Date.now().toString()
            }]);
        }
        setEditingProduct(null);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    return (
        <section id="products" className="py-24 bg-[#111111]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section header */}
                <motion.div
                    ref={headRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={headInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 relative"
                >
                    {/* Admin Toggle Button */}
                    <div className="absolute top-0 right-0">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${isEditing
                                ? 'bg-red-600 text-white hover:bg-red-500'
                                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <FaEdit />
                            {isEditing ? 'Done Editing' : 'Edit Products'}
                        </button>
                    </div>

                    <span className="inline-block text-red-500 text-sm font-semibold uppercase tracking-widest mb-4">
                        Our Selection
                    </span>
                    <h2
                        className="text-4xl sm:text-5xl font-black text-white mb-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Premium <span className="gradient-text">Cuts</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Every cut is sourced fresh from trusted farms and prepared by our
                        expert butchers to the highest standard.
                    </p>
                    {/* Decorative underline */}
                    <div className="mt-6 flex justify-center">
                        <span className="w-16 h-1 bg-red-600 rounded-full" />
                    </div>
                </motion.div>

                {/* Product cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, i) => (
                        <ProductCard
                            key={product.id || product.name}
                            product={product}
                            index={i}
                            isEditing={isEditing}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                        />
                    ))}

                    {/* Add New Product Card (Visible only in edit mode) */}
                    {isEditing && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#1e1e1e] rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center p-8 min-h-[400px] cursor-pointer hover:bg-white/5 hover:border-white/40 transition-all group"
                            onClick={handleAddNew}
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-red-600/20 flex items-center justify-center mb-4 transition-colors">
                                <FaPlus className="text-gray-400 group-hover:text-red-500 text-2xl transition-colors" />
                            </div>
                            <h3 className="text-white font-bold text-xl mb-2">Add Product</h3>
                            <p className="text-gray-500 text-center text-sm">Create a new product listing</p>
                        </motion.div>
                    )}
                </div>

            </div>

            {/* Modal */}
            <ProductFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProduct}
                product={editingProduct}
            />
        </section>
    );
}
