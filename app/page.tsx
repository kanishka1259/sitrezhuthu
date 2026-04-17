'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Play, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function BrushLogo() {
  return (
    <div className="relative w-96 h-96 drop-shadow-[0_20px_60px_rgba(168,85,247,0.4)]">
      <Image
        src="/logo.png"
        alt="SITREZHUTHU Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

function NavbarLogo() {
  return (
    <div className="relative w-8 h-8 shrink-0">
      <Image
        src="/logo.png"
        alt="SITREZHUTHU"
        fill
        className="object-contain"
      />
    </div>
  );
}

function TypewriterText() {
  const roles = ['Developer', 'Designer', 'Problem Solver', 'Creator'];
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentRole.length) {
          setDisplayText(currentRole.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentRole.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, roles]);

  return (
    <div className="h-20 flex items-center">
      <span className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
        I'm a {displayText}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  );
}

function StatCounter({ number, label }: { number: number; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const timer = setInterval(() => {
      if (start < number) {
        start += Math.ceil(number / 30);
        setCount(Math.min(start, number));
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [number]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-4xl font-bold text-purple-400">{count}+</div>
      <div className="text-sm text-white/60 mt-2">{label}</div>
    </motion.div>
  );
}

export default function Home() {
  const { data: session } = useSession();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Gradient background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/3 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <nav className="relative border-b border-white/10 bg-slate-950/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <NavbarLogo />
            <span className="font-gotu text-lg font-bold tracking-wider">SITREZHUTHU</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            {session ? (
              <Link
                href="/editor"
                className="rounded-full bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500"
              >
                Go to Editor
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 text-sm font-medium text-white/70 transition hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 text-sm font-medium text-white shadow-lg transition hover:shadow-xl"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="relative mx-auto flex max-w-7xl flex-1 items-center justify-between px-5 py-16 sm:px-8 sm:py-24 lg:py-32 min-h-[calc(100vh-120px)]">
        <section className="grid w-full items-center gap-12 lg:grid-cols-2">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <TypewriterText />

            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
              Showcase your work. Stand out from the crowd. Build your online presence in minutes.
            </p>

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-2 mb-10"
            >
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-400">Available for freelance work</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {session ? (
                <Link
                  href="/editor"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:shadow-2xl hover:-translate-y-1"
                >
                  Continue Creating
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:shadow-2xl hover:-translate-y-1"
                >
                  Get Started
                </Link>
              )}
              <Link
                href={session ? '/editor' : '#'}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10 hover:border-white/40"
              >
                <Play className="h-5 w-5 fill-current" />
                See how it works
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10"
            >
              <StatCounter number={50} label="Portfolios Created" />
              <StatCounter number={1000} label="Happy Users" />
              <StatCounter number={99} label="Satisfaction Rate" />
            </motion.div>
          </motion.div>

          {/* Right side - Logo */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
            <BrushLogo />
          </motion.div>
        </section>
      </main>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      <section className="relative border-t border-white/10 bg-white/5 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Explore the Platform</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Discover what you can create with SITREZHUTHU
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                title: 'About',
                description: 'Showcase your story, experience, and career timeline',
                href: '/about',
                icon: '📖'
              },
              {
                title: 'Projects',
                description: 'Display your work with detailed project information and filters',
                href: '/projects',
                icon: '💼'
              },
              {
                title: 'Skills',
                description: 'Visualize your expertise with interactive skill cards and charts',
                href: '/skills',
                icon: '⚡'
              },
              {
                title: 'Experience',
                description: 'Highlight work history, education, and certifications',
                href: '/experience',
                icon: '🎯'
              },
              {
                title: 'Services',
                description: 'Showcase your services with pricing and FAQ',
                href: '/services',
                icon: '🛍️'
              },
              {
                title: 'Testimonials',
                description: 'Display client reviews and social proof',
                href: '/testimonials',
                icon: '⭐'
              },
              {
                title: 'Blog',
                description: 'Share your insights with articles and posts',
                href: '/blog',
                icon: '📝'
              },
              {
                title: 'Contact',
                description: 'Multi-step contact form for inquiries',
                href: '/contact',
                icon: '📧'
              },
              {
                title: 'Templates',
                description: '8 professionally designed portfolio templates',
                href: '/dashboard',
                icon: '🎨'
              },
              {
                title: 'Create Template',
                description: 'Design and share your own template with the community',
                href: '/templates/create',
                icon: '✨'
              },
              {
                title: 'Community',
                description: 'Discover templates created by our community members',
                href: '/templates/community',
                icon: '👥'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
              >
                <Link href={item.href}>
                  <div className="group h-full bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition cursor-pointer hover:bg-white/10">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm">{item.description}</p>
                    <div className="mt-4 inline-flex items-center text-purple-400 group-hover:translate-x-2 transition text-sm">
                      Explore <span className="ml-2">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-white/10 bg-white/5 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 text-center text-sm text-white/60">
          <p>© 2024 SITREZHUTHU. Built for creators and professionals.</p>
        </div>
      </section>
    </div>
  );
}
