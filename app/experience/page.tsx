'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';

const experiences = [
  {
    id: 1,
    company: 'Tech Innovations Inc.',
    logo: '🚀',
    position: 'Senior Full Stack Developer',
    period: '2022 - Present',
    description: 'Leading development of scalable web applications using modern tech stack',
    achievements: [
      'Led team of 5 developers on flagship product',
      'Reduced app load time by 65%',
      'Mentored 3 junior developers',
      'Implemented CI/CD pipeline increasing deployment speed by 80%'
    ]
  },
  {
    id: 2,
    company: 'Digital Solutions Co.',
    logo: '💡',
    position: 'Full Stack Developer',
    period: '2020 - 2022',
    description: 'Developed and maintained multiple client projects',
    achievements: [
      'Built 15+ production applications',
      'Improved application performance by 45%',
      'Implemented automated testing suite',
      'Successfully managed client relationships and delivery'
    ]
  },
  {
    id: 3,
    company: 'StartUp Ventures',
    logo: '🎯',
    position: 'Junior Developer',
    period: '2018 - 2020',
    description: 'Started career working on full stack development',
    achievements: [
      'Developed responsive web applications',
      'Contributed to 8+ projects',
      'Learned modern JavaScript frameworks',
      'Built strong foundation in web development'
    ]
  }
];

const education = [
  {
    school: 'University of Technology',
    degree: 'Bachelor in Computer Science',
    year: '2018',
    grade: 'GPA: 3.8/4.0'
  },
  {
    school: 'Online Learning Platform',
    degree: 'Full Stack Web Development',
    year: '2017',
    grade: 'Certified'
  }
];

const certifications = [
  {
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    year: '2023',
    badge: '☁️'
  },
  {
    title: 'Google Cloud Professional',
    issuer: 'Google Cloud',
    year: '2022',
    badge: '🔷'
  },
  {
    title: 'Kubernetes for Developers',
    issuer: 'Linux Foundation',
    year: '2022',
    badge: '📦'
  }
];

export default function ExperiencePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
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
            <Link href="/experience" className="text-sm text-purple-400 transition font-medium">Experience</Link>
          </div>
        </div>
      </nav>

      <main className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        {/* Header with Download Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex justify-between items-start"
        >
          <div>
            <h1 className="text-6xl lg:text-7xl font-bold mb-6">Experience & Resume</h1>
            <p className="text-xl text-white/80 max-w-2xl">
              A comprehensive overview of my professional journey and achievements.
            </p>
          </div>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition font-medium flex items-center gap-2"
          >
            <Download size={18} /> Download Resume
          </motion.a>
        </motion.div>

        {/* Work Experience Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-12">Work Experience</h2>

          <div className="space-y-8 relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500" />

            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`flex gap-8 ${idx % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center mt-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl border-4 border-slate-950 relative z-10">
                    {exp.logo}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8 hover:border-purple-500/50 transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-purple-400">{exp.position}</h3>
                      <p className="text-lg text-white/80">{exp.company}</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-white/70 mb-6">{exp.description}</p>

                  <div className="space-y-2">
                    <p className="text-sm font-bold text-white/60">Key Achievements:</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/80">
                          <span className="text-purple-400 mt-1">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Education */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Education</h2>
            <div className="space-y-4">
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 hover:border-purple-500/50 transition"
                >
                  <h3 className="font-bold text-lg text-purple-400">{edu.school}</h3>
                  <p className="text-white/80 mt-1">{edu.degree}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-white/60">{edu.year}</span>
                    <span className="text-sm text-pink-400 font-medium">{edu.grade}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Certifications</h2>
            <div className="space-y-4">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-purple-500/20 to-pink-500/10 backdrop-blur border border-purple-500/30 rounded-lg p-6 hover:border-purple-500/60 transition"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{cert.badge}</span>
                    <div>
                      <h3 className="font-bold text-lg text-white">{cert.title}</h3>
                      <p className="text-white/70 text-sm">{cert.issuer}</p>
                      <p className="text-purple-400 text-sm mt-2">{cert.year}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
          <h3 className="text-3xl font-bold mb-6">Let's create something amazing together</h3>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition font-medium"
          >
            Start a Project
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
