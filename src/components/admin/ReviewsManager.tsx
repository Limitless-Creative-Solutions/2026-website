import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, Plus, Edit2, Trash2, Save, X, Award, Calendar } from "lucide-react";

interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  comment: string;
  image?: string;
  featured: boolean;
  date: string;
}

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState<Partial<Review>>({
    name: "",
    role: "",
    company: "",
    rating: 5,
    comment: "",
    image: "",
    featured: false,
  });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    try {
      const saved = localStorage.getItem("clientReviews");
      if (saved) {
        const parsed = JSON.parse(saved);
        setReviews(parsed.sort((a: Review, b: Review) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }));
      } else {
        // Initialize with default reviews
        const defaultReviews = getDefaultReviews();
        localStorage.setItem("clientReviews", JSON.stringify(defaultReviews));
        setReviews(defaultReviews);
      }
    } catch (e) {
      console.error("Error loading reviews:", e);
    }
  };

  const saveReviews = (updatedReviews: Review[]) => {
    localStorage.setItem("clientReviews", JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    window.dispatchEvent(new Event("reviewsUpdated"));
  };

  const handleAdd = () => {
    setIsEditing(true);
    setEditingReview(null);
    setFormData({
      name: "",
      role: "",
      company: "",
      rating: 5,
      comment: "",
      image: "",
      featured: false,
    });
  };

  const handleEdit = (review: Review) => {
    setIsEditing(true);
    setEditingReview(review);
    setFormData(review);
  };

  const handleSave = () => {
    if (!formData.name || !formData.comment) {
      alert("Please fill in name and comment!");
      return;
    }

    const newReview: Review = {
      id: editingReview?.id || `review_${Date.now()}`,
      name: formData.name || "",
      role: formData.role || "",
      company: formData.company || "",
      rating: formData.rating || 5,
      comment: formData.comment || "",
      image: formData.image || "",
      featured: formData.featured || false,
      date: editingReview?.date || new Date().toISOString(),
    };

    let updatedReviews;
    if (editingReview) {
      updatedReviews = reviews.map((r) => (r.id === editingReview.id ? newReview : r));
    } else {
      updatedReviews = [newReview, ...reviews];
    }

    saveReviews(updatedReviews);
    setIsEditing(false);
    setEditingReview(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      const updatedReviews = reviews.filter((r) => r.id !== id);
      saveReviews(updatedReviews);
    }
  };

  const handleToggleFeatured = (id: string) => {
    const updatedReviews = reviews.map((r) =>
      r.id === id ? { ...r, featured: !r.featured } : r
    );
    saveReviews(updatedReviews);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingReview(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <Star className="w-6 h-6 text-primary fill-primary" />
              Client Reviews Manager
            </h2>
            <p className="text-white/60">
              Manage client testimonials and reviews ({reviews.length} total)
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Review
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold mb-6">
            {editingReview ? "Edit Review" : "Add New Review"}
          </h3>

          <div className="space-y-6">
            {/* Client Name */}
            <div>
              <label className="block text-sm font-bold mb-2 text-white/80">
                Client Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Smith"
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
              />
            </div>

            {/* Role & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-white/80">
                  Role/Position
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="CEO, Marketing Director, etc."
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-white/80">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Company Inc."
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-bold mb-3 text-white/80">
                Rating: {formData.rating}/5
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="transition-all hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (formData.rating || 0)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-white/20"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-bold mb-2 text-white/80">
                Review Comment *
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Write the client's review here..."
                rows={5}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all resize-none"
              />
              <p className="text-xs text-white/40 mt-2">
                {formData.comment?.length || 0} characters
              </p>
            </div>

            {/* Image URL (Optional) */}
            <div>
              <label className="block text-sm font-bold mb-2 text-white/80">
                Profile Image URL (Optional)
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
              />
              <p className="text-xs text-white/40 mt-2">
                Leave empty to use first letter of name as avatar
              </p>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5">
              <div>
                <p className="font-bold text-white/80 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Featured Review
                </p>
                <p className="text-xs text-white/40 mt-1">
                  Featured reviews appear first and highlighted
                </p>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                </div>
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 py-4 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Review
              </button>
              <button
                onClick={handleCancel}
                className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest transition-all flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
            <Star className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/60 mb-4">No reviews yet</p>
            <button
              onClick={handleAdd}
              className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest transition-all"
            >
              Add First Review
            </button>
          </div>
        ) : (
          reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-black/40 backdrop-blur-xl border rounded-3xl p-6 ${
                review.featured ? "border-primary/50 bg-primary/5" : "border-white/10"
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold flex-shrink-0">
                      {review.image ? (
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        review.name.charAt(0).toUpperCase()
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">{review.name}</h3>
                        {review.featured && (
                          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/60 mb-3">
                        {review.role}
                        {review.company && (
                          <span className="text-primary"> @ {review.company}</span>
                        )}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-white/20"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Comment */}
                      <p className="text-white/80 leading-relaxed mb-3">
                        "{review.comment}"
                      </p>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <Calendar className="w-3 h-3" />
                        {formatDate(review.date)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleToggleFeatured(review.id)}
                    className={`p-3 rounded-xl transition-all ${
                      review.featured
                        ? "bg-primary/20 text-primary hover:bg-primary/30"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                    title={review.featured ? "Remove from featured" : "Mark as featured"}
                  >
                    <Award className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(review)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                    title="Edit review"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all"
                    title="Delete review"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

// Default reviews
function getDefaultReviews(): Review[] {
  return [
    {
      id: "1",
      name: "John Smith",
      role: "CEO",
      company: "Tech Solutions Inc",
      rating: 5,
      comment:
        "Outstanding service! They delivered exactly what we needed, on time and within budget. Highly recommended!",
      featured: true,
      date: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "Digital Agency",
      rating: 5,
      comment:
        "Professional, creative, and responsive. Our website looks amazing and our conversions have doubled!",
      featured: false,
      date: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "Founder",
      company: "StartupXYZ",
      rating: 5,
      comment:
        "Best decision we made for our business. The team understood our vision and brought it to life perfectly.",
      featured: false,
      date: new Date(Date.now() - 172800000).toISOString(),
    },
  ];
}
