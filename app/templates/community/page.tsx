'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2, Eye, Flame, TrendingUp, Sparkles } from 'lucide-react';

const communityTemplates = [
  {
    id: 1,
    name: 'Startup Showcase',
    description: 'Modern template designed for tech startups',
    creator: 'Alex Chen',
    category: 'Startup',
    color: 'from-blue-500 to-cyan-500',
    votes: 342,
    comments: 28,
    views: 1240,
    status: 'trending',
    badge: '🔥',
    createdAt: '2 days ago',
    preview: '🚀'
  },
  {
    id: 2,
    name: 'Creative Portfolio',
    description: 'Artistic template for designers and artists',
    creator: 'Sarah Artist',
    category: 'Creative',
    color: 'from-purple-500 to-pink-500',
    votes: 285,
    comments: 42,
    views: 892,
    status: 'popular',
    badge: '⭐',
    createdAt: '5 days ago',
    preview: '🎨'
  },
  {
    id: 3,
    name: 'Enterprise Pro',
    description: 'Professional corporate portfolio template',
    creator: 'John Corporate',
    category: 'Professional',
    color: 'from-slate-600 to-blue-700',
    votes: 198,
    comments: 15,
    views: 654,
    status: 'featured',
    badge: '✨',
    createdAt: '1 week ago',
    preview: '👔'
  },
  {
    id: 4,
    name: 'Dev Portfolio',
    description: 'Tech-focused portfolio for developers',
    creator: 'Tech Dev',
    category: 'Tech',
    color: 'from-green-500 to-emerald-600',
    votes: 156,
    comments: 22,
    views: 523,
    status: 'new',
    badge: '🆕',
    createdAt: '1 day ago',
    preview: '⚙️'
  },
  {
    id: 5,
    name: 'Minimal Clean',
    description: 'Minimalist design with focus on content',
    creator: 'Min Designer',
    category: 'Minimal',
    color: 'from-gray-400 to-gray-600',
    votes: 127,
    comments: 8,
    views: 421,
    status: 'popular',
    badge: '⭐',
    createdAt: '3 days ago',
    preview: '✨'
  },
  {
    id: 6,
    name: 'Freelancer Hub',
    description: 'Perfect for showcasing freelance projects',
    creator: 'Freelancer Pro',
    category: 'Freelancer',
    color: 'from-orange-400 to-red-500',
    votes: 243,
    comments: 34,
    views: 789,
    status: 'trending',
    badge: '🔥',
    createdAt: '4 days ago',
    preview: '💼'
  }
];

export default function CommunityTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('trending');
  const [votedTemplates, setVotedTemplates] = useState<Set<number>>(new Set());

  const categories = ['All', 'Startup', 'Creative', 'Professional', 'Tech', 'Minimal', 'Freelancer'];

  const handleVote = (id: number) => {
    const newVoted = new Set(votedTemplates);
    if (newVoted.has(id)) {
      newVoted.delete(id);
    } else {
      newVoted.add(id);
    }
    setVotedTemplates(newVoted);
  };

  let filteredTemplates = selectedCategory === 'All'
    ? communityTemplates
    : communityTemplates.filter(t => t.category === selectedCategory);

  if (sortBy === 'trending') {
    filteredTemplates.sort((a, b) => b.votes - a.votes);
  } else if (sortBy === 'recent') {
    filteredTemplates.reverse();
  } else if (sortBy === 'views') {
    filteredTemplates.sort((a, b) => b.views - a.views);
  }

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
            <Link href="/dashboard" className="text-sm text-white/70 hover:text-white transition">Templates</Link>
            <Link href="/templates/community" className="text-sm text-purple-400 transition font-medium">Community</Link>
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
          <h1 className="text-6xl lg:text-7xl font-bold mb-6">Community Templates</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Discover templates created by our amazing community. Vote for your favorites!
          </p>
          <Link
            href="/templates/create"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition font-medium"
          >
            <Sparkles size={18} /> Create Your Template
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {[
            { label: 'Community Templates', value: '127' },
            { label: 'Total Votes', value: '12.4K' },
            { label: 'Active Creators', value: '89' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 text-center hover:border-purple-500/50 transition">
              <div className="text-3xl font-bold text-purple-400 mb-2">{stat.value}</div>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between mb-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
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

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="trending" className="bg-slate-950">🔥 Trending</option>
              <option value="recent" className="bg-slate-950">📅 Recent</option>
              <option value="views" className="bg-slate-950">👁️ Most Viewed</option>
            </select>
          </div>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 transition cursor-pointer h-full flex flex-col">
                {/* Header with Color */}
                <div className={`h-32 bg-gradient-to-br ${template.color} relative p-6 flex items-end`}>
                  {/* Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur rounded-full text-sm font-bold flex items-center gap-1">
                    {template.badge} {template.status === 'trending' && 'Trending'}
                    {template.status === 'popular' && 'Popular'}
                    {template.status === 'featured' && 'Featured'}
                    {template.status === 'new' && 'New'}
                  </div>

                  {/* Preview Icon */}
                  <div className="text-5xl">{template.preview}</div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition">{template.name}</h3>
                  <p className="text-white/70 text-sm mb-4 flex-1">{template.description}</p>

                  {/* Creator Info */}
                  <div className="mb-4 pb-4 border-b border-white/10">
                    <p className="text-xs text-white/50">By <span className="text-white">{template.creator}</span></p>
                    <p className="text-xs text-white/50">{template.createdAt}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <div className="text-sm font-bold text-purple-400">{template.votes}</div>
                      <p className="text-xs text-white/60">Votes</p>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-pink-400">{template.views}</div>
                      <p className="text-xs text-white/60">Views</p>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-blue-400">{template.comments}</div>
                      <p className="text-xs text-white/60">Comments</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleVote(template.id)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-1 ${
                        votedTemplates.has(template.id)
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      <ThumbsUp size={14} /> Vote
                    </button>
                    <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition flex items-center justify-center gap-1">
                      <MessageCircle size={14} /> Comment
                    </button>
                    <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition flex items-center justify-center gap-1">
                      <Share2 size={14} /> Share
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Creator Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-4xl font-bold mb-8 text-center">Featured Creators</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Alex Chen', templates: 5, followers: 342, badge: '⭐' },
              { name: 'Sarah Artist', templates: 8, followers: 528, badge: '🎨' },
              { name: 'John Corporate', templates: 3, followers: 214, badge: '👔' }
            ].map((creator, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center hover:border-purple-500/50 transition"
              >
                <div className="text-5xl mb-4">{creator.badge}</div>
                <h3 className="font-bold text-lg mb-2">{creator.name}</h3>
                <div className="space-y-2 text-sm text-white/70 mb-4">
                  <p>📊 {creator.templates} Templates</p>
                  <p>👥 {creator.followers} Followers</p>
                </div>
                <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition">
                  View Profile
                </button>
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
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold mb-6">Have a great template idea?</h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Share your creativity with our community! Create and submit your template, get feedback from users, and see it become part of our gallery.
          </p>
          <Link
            href="/templates/create"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition font-medium"
          >
            <Sparkles size={18} /> Start Creating
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
