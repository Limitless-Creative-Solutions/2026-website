import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

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

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    loadReviews();
    
    // Listen for updates
    const handleUpdate = () => loadReviews();
    window.addEventListener("reviewsUpdated", handleUpdate);
    
    return () => window.removeEventListener("reviewsUpdated", handleUpdate);
  }, []);

  useEffect(() => {
    // Check visibility
    const content = localStorage.getItem("siteContent");
    if (content) {
      try {
        const parsed = JSON.parse(content);
        setIsVisible(parsed.testimonialsEnabled !== false);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    // Listen for visibility changes
    const handleVisibilityChange = () => {
      const content = localStorage.getItem("siteContent");
      if (content) {
        try {
          const parsed = JSON.parse(content);
          setIsVisible(parsed.testimonialsEnabled !== false);
        } catch (e) {}
      }
    };
    
    window.addEventListener("contentUpdated", handleVisibilityChange);
    return () => window.removeEventListener("contentUpdated", handleVisibilityChange);
  }, []);

  const loadReviews = () => {
    try {
      const saved = localStorage.getItem("clientReviews");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Sort: featured first, then by date
        const sorted = parsed.sort((a: Review, b: Review) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        setReviews(sorted);
      } else {
        // Default reviews
        setReviews(defaultReviews);
      }
    } catch (e) {
      console.error("Error loading reviews:", e);
      setReviews(defaultReviews);
    }
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    if (reviews.length > 1) {
      const interval = setInterval(nextReview, 5000);
      return () => clearInterval(interval);
    }
  }, [reviews.length]);

  if (!isVisible || reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Star className="w-5 h-5 text-primary fill-primary" />
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Client Reviews
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black mb-6">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Real feedback from real clients who trusted us with their projects
          </p>
        </motion.div>

        {/* Main Review Card */}
        <motion.div
          key={currentReview.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16">
            {/* Featured Badge */}
            {currentReview.featured && (
              <div className="absolute top-6 right-6">
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Star className="w-4 h-4 fill-white" />
                  Featured
                </div>
              </div>
            )}

            {/* Quote Icon */}
            <div className="absolute top-8 left-8 opacity-10">
              <Quote className="w-24 h-24 text-primary" />
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < currentReview.rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-white/20"
                  }`}
                />
              ))}
            </div>

            {/* Comment */}
            <p className="text-2xl md:text-3xl font-medium text-center mb-12 leading-relaxed relative z-10">
              "{currentReview.comment}"
            </p>

            {/* Client Info */}
            <div className="flex items-center justify-center gap-6">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold">
                {currentReview.image ? (
                  <img
                    src={currentReview.image}
                    alt={currentReview.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  currentReview.name.charAt(0).toUpperCase()
                )}
              </div>

              {/* Details */}
              <div className="text-left">
                <h4 className="text-xl font-bold">{currentReview.name}</h4>
                <p className="text-white/60">
                  {currentReview.role}
                  {currentReview.company && (
                    <span className="text-primary"> @ {currentReview.company}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        {reviews.length > 1 && (
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prevReview}
              className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-3">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all ${
                    index === currentIndex
                      ? "w-12 h-3 bg-primary rounded-full"
                      : "w-3 h-3 bg-white/20 rounded-full hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* All Reviews Grid (Optional - shows 3 recent) */}
        {reviews.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {reviews.slice(0, 3).map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setCurrentIndex(reviews.indexOf(review))}
                className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer hover:bg-black/40 transition-all group"
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
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

                {/* Comment Preview */}
                <p className="text-sm text-white/80 mb-4 line-clamp-3">
                  "{review.comment}"
                </p>

                {/* Client */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold">
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
                  <div>
                    <p className="font-bold text-sm">{review.name}</p>
                    <p className="text-xs text-white/60">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Default reviews
const defaultReviews: Review[] = [
  {
    id: "1",
    name: "John Smith",
    role: "CEO",
    company: "Tech Solutions Inc",
    rating: 5,
    comment: "Outstanding service! They delivered exactly what we needed, on time and within budget. Highly recommended!",
    featured: true,
    date: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "Digital Agency",
    rating: 5,
    comment: "Professional, creative, and responsive. Our website looks amazing and our conversions have doubled!",
    featured: false,
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    name: "Michael Chen",
    role: "Founder",
    company: "StartupXYZ",
    rating: 5,
    comment: "Best decision we made for our business. The team understood our vision and brought it to life perfectly.",
    featured: false,
    date: new Date(Date.now() - 172800000).toISOString(),
  },
];
