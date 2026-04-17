'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

const services = [
  {
    name: 'Starter',
    price: '$2,999',
    description: 'Perfect for small projects',
    features: [
      '5-page website',
      'Responsive design',
      '3 rounds of revisions',
      'Contact form integration',
      '30 days support',
      'Basic SEO optimization'
    ],
    cta: 'Get Started',
    highlighted: false
  },
  {
    name: 'Professional',
    price: '$5,999',
    description: 'Most popular for growing businesses',
    features: [
      'Custom website design',
      'Up to 20 pages',
      'Advanced animations',
      'Database integration',
      'E-commerce functionality',
      'Unlimited revisions',
      '90 days support',
      'Advanced SEO',
      'Analytics setup'
    ],
    cta: 'Start Now',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale projects',
    features: [
      'Unlimited pages',
      'Full custom development',
      'API integrations',
      'High-performance optimization',
      'Advanced security',
      'Dedicated support',
      '6 months maintenance',
      'Team collaboration',
      'Deployment & DevOps',
      'Custom reporting'
    ],
    cta: 'Contact for Quote',
    highlighted: false
  }
];

const faqs = [
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. Small projects (5-10 pages) typically take 2-4 weeks. Medium projects (10-20 pages) take 4-8 weeks. Large custom projects are negotiated individually. I always provide a detailed timeline after the initial consultation.'
  },
  {
    question: 'Do you provide support after project completion?',
    answer: 'Yes! All packages include post-launch support. Starter includes 30 days, Professional includes 90 days, and Enterprise includes 6 months. This covers bug fixes, minor updates, and technical support.'
  },
  {
    question: 'Can you work on existing websites?',
    answer: 'Absolutely! I can redesign, rebuild, or enhance existing websites. I can migrate your content, improve performance, add new features, or modernize outdated designs. Let\'s discuss your specific needs.'
  },
  {
    question: 'What technologies do you use?',
    answer: 'I primarily work with modern JavaScript frameworks (React, Next.js, Vue), Node.js for backend, MongoDB and PostgreSQL for databases, and Tailwind CSS for styling. I can also work with other tech stacks based on project requirements.'
  },
  {
    question: 'Do you offer revision rounds?',
    answer: 'Yes! Starter includes 3 revisions, Professional includes unlimited revisions, and Enterprise includes unlimited revisions with a dedicated account manager. Revisions are major changes to design/functionality, not minor tweaks.'
  },
  {
    question: 'What is your payment structure?',
    answer: 'I typically use a 50/50 payment structure: 50% upfront to start the project, and 50% upon completion. For larger projects, I can arrange a 3-payment plan or weekly milestones depending on the scope.'
  }
];

const workSteps = [
  {
    step: '01',
    title: 'Discovery & Planning',
    description: 'We discuss your vision, goals, target audience, and project requirements. I create a detailed project plan and timeline.'
  },
  {
    step: '02',
    title: 'Design & Prototyping',
    description: 'I create wireframes and high-fidelity designs. You review and provide feedback. We refine until you\'re happy.'
  },
  {
    step: '03',
    title: 'Development & Build',
    description: 'I develop your project using cutting-edge technologies. Regular updates keep you informed of progress.'
  },
  {
    step: '04',
    title: 'Testing & Launch',
    description: 'Thorough testing ensures everything works perfectly. Then we deploy to production and provide ongoing support.'
  }
];

export default function ServicesPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
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
            <Link href="/services" className="text-sm text-purple-400 transition font-medium">Services</Link>
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
          <h1 className="text-6xl lg:text-7xl font-bold mb-6">Services & Pricing</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Flexible packages designed to fit your project needs and budget
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`relative rounded-2xl p-8 transition transform ${
                service.highlighted
                  ? 'md:-translate-y-8 bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl shadow-purple-500/50'
                  : 'bg-white/5 backdrop-blur border border-white/10 hover:border-purple-500/50'
              }`}
            >
              {/* Most Popular Badge */}
              {service.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
              <p className={`text-sm mb-6 ${service.highlighted ? 'text-white/90' : 'text-white/60'}`}>
                {service.description}
              </p>

              <div className="mb-8">
                <div className={`text-4xl font-bold mb-2 ${service.highlighted ? 'text-white' : 'text-purple-400'}`}>
                  {service.price}
                </div>
                {service.price !== 'Custom' && (
                  <p className={`text-sm ${service.highlighted ? 'text-white/80' : 'text-white/60'}`}>
                    One-time project fee
                  </p>
                )}
              </div>

              <button
                className={`w-full py-3 rounded-lg font-bold mb-8 transition ${
                  service.highlighted
                    ? 'bg-white text-purple-600 hover:bg-white/90'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {service.cta}
              </button>

              <div className="space-y-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check
                      size={20}
                      className={service.highlighted ? 'text-white flex-shrink-0' : 'text-purple-400 flex-shrink-0'}
                    />
                    <span className={service.highlighted ? 'text-white/90' : 'text-white/70'}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* How I Work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12">How I Work</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {workSteps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative"
              >
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition h-full">
                  <div className="text-4xl font-bold text-purple-400 mb-4">{step.step}</div>
                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-white/70 text-sm">{step.description}</p>
                </div>
                {idx < workSteps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 w-6 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-lg overflow-hidden hover:border-purple-500/50 transition"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3 className="font-bold text-lg">{faq.question}</h3>
                  <ChevronDown
                    size={20}
                    className={`transition transform ${expandedFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>

                {expandedFaq === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-white/70 border-t border-white/10"
                  >
                    {faq.answer}
                  </motion.div>
                )}
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
          <h3 className="text-3xl font-bold mb-6">Ready to start your next project?</h3>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/contact"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition font-medium"
            >
              Get a Custom Quote
            </Link>
            <Link
              href="/projects"
              className="px-8 py-3 border border-white/20 text-white rounded-full hover:border-purple-500 transition font-medium"
            >
              View My Work
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
