'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Clock, Calendar, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Art of Building Scalable Web Applications',
    excerpt: 'Learn the principles and best practices for building web applications that can handle growth.',
    category: 'Development',
    readTime: '8 min read',
    date: 'April 10, 2024',
    author: 'Jane Doe',
    featured: true,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'UI/UX Design Trends for 2024',
    excerpt: 'Exploring the latest design trends that are shaping the digital landscape this year.',
    category: 'Design',
    readTime: '6 min read',
    date: 'April 8, 2024',
    author: 'John Smith',
    featured: false,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    title: 'Frontend Performance Optimization Tips',
    excerpt: 'Practical strategies to improve your website\'s performance and user experience.',
    category: 'Development',
    readTime: '7 min read',
    date: 'April 5, 2024',
    author: 'Jane Doe',
    featured: false,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6f7?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    title: 'Building a Strong Personal Brand Online',
    excerpt: 'How to establish and maintain a powerful professional presence on the internet.',
    category: 'Branding',
    readTime: '5 min read',
    date: 'April 2, 2024',
    author: 'Sarah Johnson',
    featured: false,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    title: 'The Future of Web Development',
    excerpt: 'Exploring emerging technologies and methodologies in web development.',
    category: 'Technology',
    readTime: '10 min read',
    date: 'March 30, 2024',
    author: 'Mike Chen',
    featured: false,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70a504f0?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    title: 'Managing Remote Development Teams',
    excerpt: 'Best practices for leading and coordinating distributed development teams.',
    category: 'Management',
    readTime: '6 min read',
    date: 'March 28, 2024',
    author: 'Emma Wilson',
    featured: false,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
  }
];

const categories = ['All', 'Development', 'Design', 'Branding', 'Technology', 'Management'];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
            <Link href="/blog" className="text-sm text-purple-400 transition font-medium">Blog</Link>
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
          <h1 className="text-6xl lg:text-7xl font-bold mb-6">Blog & Articles</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Insights, tips, and stories from my journey in web development and design
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          {/* Search Bar */}
          <div className="mb-6 relative">
            <Search size={20} className="absolute left-4 top-3.5 text-white/40" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/10 text-white/70 hover:text-white border border-white/20 hover:border-purple-500/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-16"
          >
            <Link href={`/blog/${featuredPost.id}`}>
              <div className="group relative h-96 rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition cursor-pointer">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Featured Badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                    FEATURED
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="text-sm text-purple-400 mb-3">{featuredPost.category}</div>
                  <h2 className="text-4xl font-bold mb-4 group-hover:text-purple-400 transition">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/80 mb-6 line-clamp-2">{featuredPost.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-6 text-sm text-white/60">
                      <span className="flex items-center gap-2">
                        <Calendar size={16} /> {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock size={16} /> {featuredPost.readTime}
                      </span>
                    </div>
                    <ArrowRight size={24} className="group-hover:translate-x-2 transition" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {regularPosts.slice(0, 6).map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
            >
              <Link href={`/blog/${post.id}`}>
                <div className="group bg-white/5 backdrop-blur border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 transition cursor-pointer h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-xs text-purple-400 mb-3">{post.category}</div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-purple-400 transition line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2 flex-1">{post.excerpt}</p>

                    <div className="flex justify-between items-center text-xs text-white/60 border-t border-white/10 pt-4 mt-auto">
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {post.readTime}
                        </span>
                      </div>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-white/60">No articles found matching your search.</p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-6">Subscribe to our newsletter</h3>
          <p className="text-white/70 mb-6">Get the latest articles delivered to your inbox</p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition font-medium">
              Subscribe
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
