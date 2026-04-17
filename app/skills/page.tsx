'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const skillsData = [
  { category: 'Frontend', value: 95 },
  { category: 'Backend', value: 88 },
  { category: 'Design', value: 82 },
  { category: 'DevOps', value: 75 },
  { category: 'Leadership', value: 80 }
];

const skillsByCategory = {
  frontend: [
    { name: 'React', years: '5+', projects: '45+', level: 98 },
    { name: 'TypeScript', years: '4+', projects: '40+', level: 96 },
    { name: 'Next.js', years: '3+', projects: '30+', level: 94 },
    { name: 'Tailwind CSS', years: '3+', projects: '35+', level: 95 },
    { name: 'Vue.js', years: '2+', projects: '12+', level: 88 },
    { name: 'JavaScript', years: '6+', projects: '50+', level: 98 }
  ],
  backend: [
    { name: 'Node.js', years: '5+', projects: '35+', level: 92 },
    { name: 'MongoDB', years: '4+', projects: '30+', level: 90 },
    { name: 'PostgreSQL', years: '4+', projects: '25+', level: 88 },
    { name: 'Express.js', years: '5+', projects: '35+', level: 91 },
    { name: 'Python', years: '3+', projects: '15+', level: 82 },
    { name: 'GraphQL', years: '2+', projects: '10+', level: 85 }
  ],
  design: [
    { name: 'Figma', years: '3+', projects: '40+', level: 90 },
    { name: 'UI/UX Design', years: '4+', projects: '35+', level: 88 },
    { name: 'Adobe XD', years: '2+', projects: '15+', level: 80 },
    { name: 'Prototyping', years: '3+', projects: '30+', level: 85 },
    { name: 'Animation', years: '2+', projects: '20+', level: 82 },
    { name: 'Brand Strategy', years: '3+', projects: '12+', level: 80 }
  ],
  devops: [
    { name: 'Docker', years: '3+', projects: '20+', level: 85 },
    { name: 'AWS', years: '2+', projects: '12+', level: 78 },
    { name: 'CI/CD', years: '3+', projects: '18+', level: 82 },
    { name: 'Linux', years: '4+', projects: '25+', level: 88 },
    { name: 'Git', years: '6+', projects: '50+', level: 95 },
    { name: 'Kubernetes', years: '1+', projects: '5+', level: 70 }
  ]
};

type CategoryKey = keyof typeof skillsByCategory;

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('frontend');
  const [selectedSkill, setSelectedSkill] = useState<typeof skillsByCategory.frontend[0] | null>(null);

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

  const currentSkills = skillsByCategory[activeCategory];

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
            <Link href="/projects" className="text-sm text-white/70 hover:text-white transition">Projects</Link>
          </div>
        </div>
      </nav>

      <main className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-6xl lg:text-7xl font-bold mb-6">Skills & Expertise</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            A comprehensive overview of my technical expertise and the technologies I use to build amazing products.
          </p>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-8">Skill Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={skillsData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="category" stroke="rgba(255,255,255,0.5)" />
              <PolarRadiusAxis stroke="rgba(255,255,255,0.2)" />
              <Radar
                name="Proficiency"
                dataKey="value"
                stroke="#a855f7"
                fill="#a855f7"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {(Object.keys(skillsByCategory) as CategoryKey[]).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedSkill(null);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition capitalize ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-white/70 hover:text-white border border-white/20 hover:border-purple-500/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {currentSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              layoutId={`skill-${skill.name}`}
              onClick={() => setSelectedSkill(skill)}
              className="group cursor-pointer h-full"
            >
              <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur border border-white/20 rounded-xl p-6 hover:border-purple-500/50 transition transform hover:scale-105 overflow-hidden">
                {/* Hex background effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500" />
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition">
                    {skill.name}
                  </h3>

                  {/* Skill Bar */}
                  <div className="mb-6 flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-white/60">Proficiency</span>
                      <span className="text-sm font-bold text-purple-400">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <div className="text-xs text-white/60 mb-1">Experience</div>
                      <div className="font-bold text-sm text-purple-400">{skill.years}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/60 mb-1">Projects</div>
                      <div className="font-bold text-sm text-pink-400">{skill.projects}</div>
                    </div>
                  </div>

                  {/* Flip Indicator */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                    <div className="text-xs text-purple-400">Click for more</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 mb-20"
        >
          <h2 className="text-2xl font-bold mb-8">Soft Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Problem Solving',
              'Team Leadership',
              'Communication',
              'Project Management',
              'Creative Thinking',
              'Adaptability',
              'Mentoring',
              'Strategic Planning'
            ].map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-lg border border-purple-500/30 text-center hover:border-purple-500/60 transition"
              >
                <span className="font-medium text-white">{skill}</span>
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
          <h3 className="text-3xl font-bold mb-6">Ready to work on a project together?</h3>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition font-medium"
          >
            Let's Talk
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
