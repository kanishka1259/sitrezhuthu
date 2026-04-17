'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const tabs = [
  {
    name: 'My Story',
    content: 'I started my journey as a curious developer with a passion for solving problems through code. Over the years, I have evolved into a full-stack designer and developer, combining technical expertise with creative vision. Every project I work on is an opportunity to learn, grow, and make a meaningful impact.'
  },
  {
    name: 'My Approach',
    content: 'I believe in putting the user first. My process starts with understanding the problem deeply, then crafting elegant solutions that are both beautiful and functional. I collaborate closely with teams and clients to ensure the final product exceeds expectations. Quality and attention to detail are non-negotiable.'
  },
  {
    name: 'Outside Work',
    content: 'When I am not coding or designing, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge through writing and speaking. I am a lifelong learner who believes in continuous improvement and giving back to the community.'
  }
];

const milestones = [
  { year: '2018', event: 'Started my web development journey' },
  { year: '2019', event: 'First freelance project completed' },
  { year: '2020', event: 'Launched 10+ production applications' },
  { year: '2021', event: 'Started mentoring junior developers' },
  { year: '2022', event: 'Reached 100+ satisfied clients' },
  { year: '2023', event: 'Expanded into full-stack development' },
  { year: '2024', event: 'Built SITREZHUTHU platform' },
  { year: '2025', event: 'Scaling to help 1000s of creators' }
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
            <Link href="/about" className="text-sm text-purple-400 transition font-medium">About</Link>
            <Link href="/projects" className="text-sm text-white/70 hover:text-white transition">Projects</Link>
          </div>
        </div>
      </nav>

      <main className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.h1 variants={itemVariants} className="text-6xl lg:text-7xl font-bold mb-6">
            About Me
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-white/80 max-w-2xl">
            Passionate creator dedicated to building beautiful, functional digital experiences that make a difference.
          </motion.p>
        </motion.div>

        {/* Two Column Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 mb-20"
        >
          {/* Left: Image with stats */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="relative h-96 rounded-2xl overflow-hidden border-2 border-purple-500/50 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Years', value: '6+' },
                { label: 'Projects', value: '150+' },
                { label: 'Clients', value: '100+' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4 text-center hover:border-purple-500/50 transition"
                >
                  <div className="text-2xl font-bold text-purple-400">{stat.value}</div>
                  <div className="text-xs text-white/60 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio and Tabs */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Tabs */}
            <div className="flex gap-2 border-b border-white/10">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`pb-3 text-sm font-medium transition border-b-2 ${
                    activeTab === idx
                      ? 'border-purple-500 text-purple-400'
                      : 'border-transparent text-white/60 hover:text-white'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <p className="text-white/80 leading-relaxed text-lg">{tabs[activeTab].content}</p>
            </motion.div>

            {/* Pull Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="border-l-4 border-purple-500 pl-6 py-4"
            >
              <p className="text-lg italic text-white/80">
                "The best products are built with empathy, passion, and a relentless focus on user needs."
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-12">Career Timeline</h2>
          
          <div className="space-y-4">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex gap-6 items-center cursor-pointer group"
                onClick={() => setExpandedMilestone(expandedMilestone === idx ? null : idx)}
              >
                {/* Timeline dot */}
                <div className="relative flex items-center">
                  <div className="w-4 h-4 rounded-full bg-purple-500 group-hover:bg-pink-500 transition relative z-10" />
                  {idx !== milestones.length - 1 && (
                    <div className="absolute top-4 w-1 h-12 bg-gradient-to-b from-purple-500 to-transparent -ml-1.5" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-4 hover:border-purple-500/50 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-bold text-purple-400">{milestone.year}</div>
                      <div className="text-white font-medium">{milestone.event}</div>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`transition transform ${expandedMilestone === idx ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
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
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-6">Ready to work together?</h3>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/projects"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition font-medium"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border border-white/20 text-white rounded-full hover:border-purple-500 transition font-medium"
            >
              Get In Touch
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
