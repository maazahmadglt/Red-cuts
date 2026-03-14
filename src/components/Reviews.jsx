import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ReviewFormModal from './ReviewFormModal';

const REVIEWS = [
    {
        id: 1,
        name: 'Ahmed K.',
        role: 'Grill Enthusiast',
        text: 'The best quality beef I have found in the city. The cuts were perfect for our weekend BBQ, and the delivery was incredibly fast. Highly recommended!',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?u=ahmed' // Placeholder avatar
    },
    {
        id: 2,
        name: 'Sarah M.',
        role: 'Home Chef',
        text: 'I ordered the special pieces for a family gathering, and everyone kept asking where I bought the meat. It was incredibly tender and flavorful. I am definitely ordering again.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    {
        id: 3,
        name: 'Usman R.',
        role: 'Regular Customer',
        text: 'Consistent quality every single time. Their boneless beef makes my everyday cooking so much easier and tastier. Great service and fair prices.',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?u=usman'
    }
];

export default function Reviews() {
    const headRef = useRef(null);
    const headInView = useInView(headRef, { once: true, margin: '-60px' });

    const [reviews, setReviews] = useState(() => {
        const saved = localStorage.getItem('beef_shop_reviews');
        let initialData = REVIEWS;
        if (saved) {
            try {
                initialData = JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse reviews from localStorage", e);
            }
        }
        // Ensure all reviews have a consistent string ID
        return initialData.map((r, index) => ({
            ...r,
            id: (r.id || r.name || `review-${index}`).toString()
        }));
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState(null);

    useEffect(() => {
        localStorage.setItem('beef_shop_reviews', JSON.stringify(reviews));
    }, [reviews]);

    const handleEditClick = (review) => {
        console.log("Editing review:", review);
        setEditingReview(review);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        const targetId = id?.toString();
        console.log("Delete request for review ID:", targetId);
        if (window.confirm("Are you sure you want to delete this review?")) {
            setReviews(prev => {
                const beforeCount = prev.length;
                const filtered = prev.filter(r => r.id !== targetId);
                console.log(`Review deletion result: ${beforeCount} -> ${filtered.length} reviews`);
                return filtered;
            });
        }
    };

    const handleSaveReview = (reviewData) => {
        if (editingReview) {
            setReviews(prev => prev.map(r =>
                r.id === editingReview.id ? { ...reviewData, id: r.id } : r
            ));
        } else {
            const newReview = {
                ...reviewData,
                id: Date.now().toString()
            };
            setReviews(prev => [...prev, newReview]);
        }
        setEditingReview(null);
    };

    const handleAddNew = () => {
        setEditingReview(null);
        setIsModalOpen(true);
    };

    return (
        <section id="reviews" className="py-24 bg-[#111111]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    ref={headRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={headInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 relative"
                >
                    {/* Admin Toggle Button */}
                    <div className="absolute top-0 right-0 z-10">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${isEditing
                                ? 'bg-red-600 text-white hover:bg-red-500'
                                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <FaEdit />
                            {isEditing ? 'Done Editing' : 'Edit Reviews'}
                        </button>
                    </div>
                    <span className="inline-block text-red-500 text-sm font-semibold uppercase tracking-widest mb-4">
                        Testimonials
                    </span>
                    <h2
                        className="text-4xl sm:text-5xl font-black text-white mb-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        What Our <span className="gradient-text">Customers</span> Say
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Don't just take our word for it. Here is what other meat lovers have to say about our premium cuts.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <span className="w-16 h-1 bg-red-600 rounded-full" />
                    </div>
                </motion.div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            index={i}
                            isEditing={isEditing}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                        />
                    ))}

                    {/* Add New Review Card (Visible only in edit mode) */}
                    {isEditing && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#1e1e1e] rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center p-8 min-h-[300px] cursor-pointer hover:bg-white/5 hover:border-white/40 transition-all group"
                            onClick={handleAddNew}
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-red-600/20 flex items-center justify-center mb-4 transition-colors">
                                <FaPlus className="text-gray-400 group-hover:text-red-500 text-2xl transition-colors" />
                            </div>
                            <h3 className="text-white font-bold text-xl mb-2">Add Review</h3>
                            <p className="text-gray-500 text-center text-sm">Create a new customer testimonial</p>
                        </motion.div>
                    )}
                </div>

            </div>

            {/* Modal */}
            <ReviewFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveReview}
                review={editingReview}
            />
        </section>
    );
}

function ReviewCard({ review, index, isEditing, onEdit, onDelete }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5 hover:border-red-600/30 transition-colors relative group"
        >
            {/* Edit / Delete overlay buttons */}
            {isEditing && (
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button
                        onClick={() => onEdit(review)}
                        className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full shadow-lg transition-colors"
                        title="Edit Review"
                    >
                        <FaEdit size={14} />
                    </button>
                    <button
                        onClick={() => onDelete(review.id)}
                        className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-full shadow-lg transition-colors"
                        title="Delete Review"
                    >
                        <FaTrash size={14} />
                    </button>
                </div>
            )}

            {/* Quote Icon Background */}
            <FaQuoteLeft className="absolute top-6 right-8 text-6xl text-white/5 group-hover:text-red-600/10 transition-colors" />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
                {Array(review.rating).fill(0).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
            </div>

            {/* Review Text */}
            <p className="text-gray-300 text-lg leading-relaxed mb-8 relative z-10 italic">
                "{review.text}"
            </p>

            {/* Customer Info */}
            <div className="flex items-center gap-4 mt-auto">
                <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-red-600/30"
                />
                <div>
                    <h4 className="text-white font-bold">{review.name}</h4>
                    <span className="text-red-500 text-sm">{review.role}</span>
                </div>
            </div>
        </motion.div>
    );
}
