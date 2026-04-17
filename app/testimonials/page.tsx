'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: 'The portfolio platform is absolutely incredible. It transformed how I showcase my work. Highly recommended!',
    author: 'Sarah Mitchell',
    role: 'UX Designer',
    company: 'Creative Studios',
    avatar: '👩‍💼',
    rating: 5
  },
  {
    id: 2,
    quote: 'Best investment I made for my freelance business. The customization options are endless and the support is amazing.',
    author: 'James Chen',
    role: 'Full Stack Developer',
    company: 'Tech Innovations',
    avatar: '👨‍💻',
    rating: 5
  },
  {
    id: 3,
    quote: 'I went from scattered portfolio pieces to having a cohesive, professional online presence. Total game-changer.',
    author: 'Emma Rodriguez',
    role: 'Digital Strategist',
    company: 'Growth Marketing Co',
    avatar: '👩‍🔬',
    rating: 5
  },
  {
    id: 4,
    quote: 'The platform is so intuitive, I had my portfolio live in just a few hours. Impressive work!',
    author: 'Michael Thompson',
    role: 'Product Manager',
    company: 'StartUp Ventures',
    avatar: '👨‍💼',
    rating: 5
  },
  {
    id: 5,
    quote: 'Outstanding experience from start to finish. The team is responsive and the product keeps improving. Love it!',
    author: 'Lisa Anderson',
    role: 'Brand Designer',
    company: 'Design Agency',
    avatar: '👩‍🎨',
    rating: 5
  },
  {
    id: 6,
    quote: 'Finally, a portfolio builder that takes design seriously. This is the standard everyone should aspire to.',
    author: 'David Kumar',
    role: 'Creative Director',
    company: 'Pixel Perfect Studios',
    avatar: '👨‍🎨',
    rating: 5
  }
];

const companies = [
  { name: 'Google', logo: '🔍' },
  { name: 'Microsoft', logo: '🪟' },
  { name: 'Amazon', logo: '📦' },
  { name: 'Apple', logo: '🍎' },
  { name: 'Meta', logo: '📱' },
  { name: 'Netflix', logo: '🎬' }
];

export default function TestimonialsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative border-b border-white/10 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="text-lg font-gotu font-bold tracking-wider hover:text-purple-400 transition">
            SITREZHUTHU
          </Link>
          <div className="flex gap-8">
            <Link href="/" className="text-sm text-white/70 hover:text-white transition">Home</Link>
            <Link href="/testimonials" className="text-sm text-purple-400 transition font-medium">Testimonials</Link>
            <Link href="/contact" className="text-sm text-white/70 hover:text-white transition">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="text-6xl lg:text-7xl font-bold mb-6">Testimonials</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            What clients and users say about working with me
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-96 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 mb-20 flex items-center justify-center overflow-hidden"
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="absolute w-full px-8"
            >
              <div className="text-center space-y-6">
                {/* Quote */}
                <div className="text-4xl text-white/40 mb-4">❝</div>
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                  {testimonials[currentIndex].quote}
                </p>

                {/* Author */}
                <div className="pt-6 border-t border-white/10">
                  <div className="text-2xl mb-3">{testimonials[currentIndex].avatar}</div>
                  <h3 className="font-bold text-lg">{testimonials[currentIndex].author}</h3>
                  <p className="text-white/60 text-sm">
                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                  </p>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mt-3">
                    {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-purple-600 rounded-full transition z-20"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-purple-600 rounded-full transition z-20"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition ${
                  idx === currentIndex ? 'bg-purple-500 w-6' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {[
            { label: 'Happy Clients', value: '200+' },
            { label: 'Projects Completed', value: '500+' },
            { label: 'Client Satisfaction', value: '98%' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8 text-center hover:border-purple-500/50 transition"
            >
              <div className="text-4xl font-bold text-purple-400 mb-2">{stat.value}</div>
              <p className="text-white/60">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trusted By */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Trusted By Leading Companies</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {companies.map((company, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 text-center hover:border-purple-500/50 hover:bg-white/10 transition cursor-pointer group"
              >
                <div className="text-4xl mb-3 group-hover:scale-125 transition">{company.logo}</div>
                <p className="text-sm text-white/60 group-hover:text-white transition">{company.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h3 className="text-3xl font-bold mb-6">Ready to join our community?</h3>
          <Link
            href="/signup"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition font-medium"
          >
            Get Started Today
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
