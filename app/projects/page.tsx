'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { GitBranch, ExternalLink, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'SITREZHUTHU',
    description: 'Portfolio generator platform with live editing and one-click sharing',
    category: 'web',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=500&h=500&fit=crop',
    github: '#',
    live: '#',
    featured: true,
    problemSolved: 'Needed a way to help creators easily build and share beautiful portfolios without coding',
    role: 'Full Stack Developer',
    features: ['Live preview', 'Multiple templates', 'Easy customization', 'One-click sharing']
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory',
    category: 'web',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70a504f0?w=500&h=500&fit=crop',
    github: '#',
    live: '#',
    featured: false,
    problemSolved: 'Created a scalable platform for small businesses to sell online',
    role: 'Backend Lead',
    features: ['Payment integration', 'Inventory management', 'Analytics', 'Order tracking']
  },
  {
    id: 3,
    title: 'Mobile Task Manager',
    description: 'Cross-platform task management app with real-time sync',
    category: 'mobile',
    tech: ['React Native', 'Firebase', 'Redux'],
    image: 'https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=500&h=500&fit=crop',
    github: '#',
    live: '#',
    featured: false,
    problemSolved: 'Solved productivity issues with a seamless cross-platform experience',
    role: 'Full Stack Developer',
    features: ['Cross-platform', 'Real-time sync', 'Collaboration', 'Reminders']
  },
  {
    id: 4,
    title: 'Design System',
    description: 'Comprehensive UI component library with documentation',
    category: 'design',
    tech: ['Figma', 'React', 'Storybook'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
    github: '#',
    live: '#',
    featured: false,
    problemSolved: 'Standardized design across products for consistency and speed',
    role: 'Design Lead',
    features: ['150+ components', 'Accessibility', 'Documentation', 'Figma library']
  },
  {
    id: 5,
    title: 'Open Source CLI Tool',
    description: 'Developer tool for automating repetitive tasks',
    category: 'opensource',
    tech: ['Node.js', 'TypeScript', 'NPM'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
    github: '#',
    live: '#',
    featured: false,
    problemSolved: 'Reduced development setup time by 80% for teams',
    role: 'Creator & Maintainer',
    features: ['Installation templates', 'Auto-configuration', 'CLI guides', '5K+ downloads']
  },
  {
    id: 6,
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization and reporting platform',
    category: 'web',
    tech: ['Vue.js', 'D3.js', 'Python'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop',
    github: '#',
    live: '#',
    featured: false,
    problemSolved: 'Gave businesses actionable insights from their data',
    role: 'Full Stack Developer',
    features: ['Real-time updates', 'Custom reports', 'Data export', 'Integrations']
  }
];

const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'design', label: 'Design' },
  { value: 'opensource', label: 'Open Source' }
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

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
            <Link href="/about" className="text-sm text-white/70 hover:text-white transition">About</Link>
            <Link href="/projects" className="text-sm text-purple-400 transition font-medium">Projects</Link>
          </div>
        </div>
      </nav>

      <main className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-6xl lg:text-7xl font-bold mb-6">My Projects</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            A selection of projects I'm proud of. Each one taught me something new.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat.value
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-white/70 hover:text-white border border-white/20 hover:border-purple-500/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 auto-rows-max"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                className={`group cursor-pointer ${project.featured && activeCategory === 'all' ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-full bg-white/5 backdrop-blur border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 transition group-hover:shadow-xl group-hover:shadow-purple-500/20">
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-bold rounded-full">
                        FEATURED
                      </span>
                    </div>
                  )}

                  {/* Image */}
                  <div className={`relative overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/10 ${project.featured ? 'h-64' : 'h-40'}`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className={`p-6 ${project.featured ? 'space-y-4' : 'space-y-3'}`}>
                    <h3 className={`font-bold text-white group-hover:text-purple-400 transition ${project.featured ? 'text-2xl' : 'text-lg'}`}>
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-2">{project.description}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded border border-purple-500/30">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-2">
                      <a
                        href={project.github}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-white/10 hover:bg-purple-600 rounded-lg transition"
                      >
                        <GitBranch size={16} />
                      </a>
                      <a
                        href={project.live}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-white/10 hover:bg-purple-600 rounded-lg transition"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="ml-auto px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 rounded-lg text-sm transition"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-6">Interested in collaborating?</h3>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition font-medium"
          >
            Get In Touch
          </Link>
        </motion.div>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header Image */}
              <div className="relative h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/10">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                  <p className="text-white/70">{selectedProject.description}</p>
                </div>

                {/* Problem Solved */}
                <div>
                  <h3 className="text-sm font-bold text-purple-400 mb-2">PROBLEM SOLVED</h3>
                  <p className="text-white/80">{selectedProject.problemSolved}</p>
                </div>

                {/* Role */}
                <div>
                  <h3 className="text-sm font-bold text-purple-400 mb-2">MY ROLE</h3>
                  <p className="text-white/80">{selectedProject.role}</p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-sm font-bold text-purple-400 mb-3">KEY FEATURES</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="text-white/80 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-sm font-bold text-purple-400 mb-3">TECH STACK</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded border border-purple-500/30">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4">
                  <a
                    href={selectedProject.github}
                    className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-center transition flex items-center justify-center gap-2"
                  >
                    <GitBranch size={18} /> View Code
                  </a>
                  <a
                    href={selectedProject.live}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 rounded-lg text-center transition flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
