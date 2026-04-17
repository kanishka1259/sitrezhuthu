'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Eye, Edit, Copy, Lock, Star, Zap, Layers } from 'lucide-react';

const templates = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple portfolio with focus on content',
    category: 'Classic',
    color: 'from-blue-500 to-cyan-500',
    features: ['Minimalist Design', 'Fast Loading', 'SEO Optimized'],
    preview: '🎯',
    status: 'active',
    usedCount: 234
  },
  {
    id: 'modern-cards',
    name: 'Modern Cards',
    description: 'Contemporary design with card-based layout',
    category: 'Modern',
    color: 'from-purple-500 to-pink-500',
    features: ['Card Layout', 'Animations', 'Responsive'],
    preview: '✨',
    status: 'active',
    usedCount: 567
  },
  {
    id: 'dark-theme',
    name: 'Dark Theme',
    description: 'Bold dark portfolio perfect for creative professionals',
    category: 'Dark',
    color: 'from-slate-600 to-slate-800',
    features: ['Dark Mode', 'High Contrast', 'Modern Vibe'],
    preview: '🌙',
    status: 'active',
    usedCount: 892
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Frosted glass effect with modern aesthetic',
    category: 'Advanced',
    color: 'from-indigo-400 to-purple-400',
    features: ['Glass Effect', 'Blur Effects', 'Layered Design'],
    preview: '💎',
    status: 'new',
    usedCount: 145
  },
  {
    id: 'gradient-flow',
    name: 'Gradient Flow',
    description: 'Smooth gradient transitions with flowing animations',
    category: 'Creative',
    color: 'from-orange-400 to-red-500',
    features: ['Gradients', 'Smooth Transitions', 'Dynamic'],
    preview: '🌈',
    status: 'active',
    usedCount: 378
  },
  {
    id: 'tech-minimal',
    name: 'Tech Minimal',
    description: 'Sleek tech-focused portfolio with tech aesthetics',
    category: 'Tech',
    color: 'from-green-500 to-emerald-600',
    features: ['Tech Vibe', 'Code Blocks', 'Terminal Style'],
    preview: '⚙️',
    status: 'active',
    usedCount: 456
  },
  {
    id: 'portfolio-pro',
    name: 'Portfolio Pro',
    description: 'Professional portfolio with advanced features',
    category: 'Professional',
    color: 'from-amber-500 to-orange-600',
    features: ['Pro Features', 'Analytics', 'CMS Ready'],
    preview: '👔',
    status: 'premium',
    usedCount: 623
  },
  {
    id: 'artistic-showcase',
    name: 'Artistic Showcase',
    description: 'Gallery-focused template for creative works',
    category: 'Creative',
    color: 'from-rose-400 to-pink-500',
    features: ['Gallery Grid', 'Image Focused', 'Lightbox'],
    preview: '🎨',
    status: 'active',
    usedCount: 289
  }
];

const categories = ['All', 'Classic', 'Modern', 'Dark', 'Advanced', 'Creative', 'Tech', 'Professional'];

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const filteredTemplates = selectedCategory === 'All'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

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
            <Link href="/dashboard" className="text-sm text-purple-400 transition font-medium">Templates</Link>
            <Link href="/templates/create" className="text-sm text-white/70 hover:text-white transition">Create</Link>
            <Link href="/templates/community" className="text-sm text-white/70 hover:text-white transition">Community</Link>
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
          <h1 className="text-6xl lg:text-7xl font-bold mb-6">Portfolio Templates</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Choose from our collection of professionally designed templates to create your unique portfolio
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: 'Templates', value: '8' },
            { label: 'Active Users', value: '3.5K+' },
            { label: 'Total Portfolios', value: '4,584' },
            { label: 'Avg. Rating', value: '4.8★' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 text-center hover:border-purple-500/50 transition">
              <div className="text-3xl font-bold text-purple-400 mb-2">{stat.value}</div>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-12 flex flex-wrap gap-3 justify-center"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-white/70 hover:text-white border border-white/20 hover:border-purple-500/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition overflow-hidden cursor-pointer h-full flex flex-col"
                onMouseEnter={() => setPreviewTemplate(template.id)}
                onMouseLeave={() => setPreviewTemplate(null)}
              >
                {/* Status Badge */}
                {template.status === 'new' && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-green-500/20 text-green-300 text-xs font-bold rounded-full border border-green-500/50">
                    NEW
                  </div>
                )}
                {template.status === 'premium' && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-bold rounded-full border border-yellow-500/50 flex items-center gap-1">
                    <Star size={12} /> PREMIUM
                  </div>
                )}

                {/* Preview Circle */}
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition`}>
                  {template.preview}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition">{template.name}</h3>
                <p className="text-white/70 text-sm mb-4 flex-1">{template.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Usage Info */}
                <div className="text-xs text-white/50 mb-4 flex items-center gap-1">
                  <Zap size={14} /> {template.usedCount.toLocaleString()} portfolios created
                </div>

                {/* Buttons */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                  <button className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition">
                    <Eye size={16} /> Preview
                  </button>
                  <button className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition border border-white/20">
                    <Copy size={16} /> Use
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-8 text-center">Featured Template</h2>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur border border-purple-500/30 rounded-2xl p-12 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 text-6xl">👔</div>
              <h3 className="text-3xl font-bold mb-4">Portfolio Pro</h3>
              <p className="text-white/80 mb-6">
                The most feature-rich template designed for professionals looking to make an impact. Includes advanced analytics, SEO optimization, and CMS integration.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Built-in Analytics Dashboard',
                  'SEO Optimization Tools',
                  'Blog Integration',
                  'Email Marketing',
                  'Social Media Integration',
                  '24/7 Premium Support'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-white/80">
                    <span className="w-2 h-2 bg-purple-400 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition font-medium">
                  Try Pro Template
                </button>
                <button className="px-8 py-3 border border-white/20 text-white rounded-lg hover:border-white/40 transition font-medium">
                  Learn More
                </button>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-8 border border-white/10">
              <div className="space-y-4">
                <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-50" />
                <div className="h-4 bg-white/20 rounded w-3/4" />
                <div className="h-4 bg-white/20 rounded w-1/2" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-8 text-center">Features Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white/5 backdrop-blur border border-white/10 rounded-xl overflow-hidden">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left font-bold">Feature</th>
                  <th className="px-6 py-4 text-center font-bold">Minimal</th>
                  <th className="px-6 py-4 text-center font-bold">Modern</th>
                  <th className="px-6 py-4 text-center font-bold">Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Responsive Design', minimal: '✓', modern: '✓', pro: '✓' },
                  { name: 'Animations', minimal: '✗', modern: '✓', pro: '✓' },
                  { name: 'Dark Mode', minimal: '✓', modern: '✓', pro: '✓' },
                  { name: 'Blog System', minimal: '✗', modern: '✗', pro: '✓' },
                  { name: 'Analytics', minimal: '✗', modern: '✗', pro: '✓' },
                  { name: 'Email Marketing', minimal: '✗', modern: '✗', pro: '✓' },
                  { name: 'SEO Tools', minimal: '✗', modern: '✓', pro: '✓' },
                  { name: 'Support', minimal: 'Community', modern: 'Email', pro: '24/7' }
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-6 py-4 font-medium">{row.name}</td>
                    <td className="px-6 py-4 text-center">{row.minimal === '✓' ? <span className="text-green-400">✓</span> : row.minimal === '✗' ? <span className="text-red-400">✗</span> : row.minimal}</td>
                    <td className="px-6 py-4 text-center">{row.modern === '✓' ? <span className="text-green-400">✓</span> : row.modern === '✗' ? <span className="text-red-400">✗</span> : row.modern}</td>
                    <td className="px-6 py-4 text-center">{row.pro === '✓' ? <span className="text-green-400">✓</span> : row.pro === '✗' ? <span className="text-red-400">✗</span> : row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-4xl font-bold mb-6">Ready to create your portfolio?</h3>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Pick a template, customize it to match your style, and launch your professional portfolio in minutes. Or create your own template!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition font-medium">
              Start Creating
            </button>
            <Link
              href="/templates/create"
              className="px-8 py-3 border border-white/20 text-white rounded-full hover:border-white/40 transition font-medium"
            >
              Create Template
            </Link>
            <Link
              href="/templates/community"
              className="px-8 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition font-medium"
            >
              Community Templates
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
