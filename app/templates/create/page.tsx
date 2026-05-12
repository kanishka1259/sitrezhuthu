'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { ArrowRight, Palette, Zap, Upload, CheckCircle, Sparkles } from 'lucide-react';

const BASE_TEMPLATES = [
  { id: 'minimal',       name: 'Minimal Pro',     desc: 'Clean editorial layout, crisp typography.',        gradient: 'linear-gradient(135deg,#111,#222)', accent: '#3DAA7A' },
  { id: 'cards',         name: 'Modern Cards',     desc: 'Bold cyan/cyan card-based design.',              gradient: 'linear-gradient(135deg,#111,#222)', accent: '#D97706' },
  { id: 'dark',          name: 'Dark Pro',         desc: 'High-contrast dark with gradient accents.',        gradient: 'linear-gradient(135deg,#0d0d1a,#0f1a2e)', accent: '#3DAA7A' },
  { id: 'glassmorphism', name: 'Glassmorphism',    desc: 'Frosted glass cards on deep indigo.',             gradient: 'linear-gradient(135deg,#1a1a2e,#533483)',  accent: '#3DAA7A' },
  { id: 'tech-minimal',  name: 'Terminal',         desc: 'Monospace dev aesthetic with scanlines.',         gradient: 'linear-gradient(135deg,#050505,#0d1a10)',  accent: '#3DAA7A' },
] as const;

const steps = [
  { num: '01', icon: Palette,       title: 'Choose a base template',   desc: 'Pick from 5 professionally designed base templates below.' },
  { num: '02', icon: Zap,           title: 'Customize in the Editor',   desc: 'Use the Style panel to change colors, fonts, shapes and layout in real time.' },
  { num: '03', icon: Upload,        title: 'Share with the Community',  desc: 'Hit "Share Design" in the editor and submit for admin review.' },
  { num: '04', icon: CheckCircle,   title: 'Go live & get credited',    desc: 'Once approved your template appears in the gallery with your name.' },
];

export default function CreateTemplatePage() {
  const { setTemplate } = usePortfolioStore();
  const router = useRouter();

  const handlePick = (id: string) => {
    setTemplate(id as any);
    router.push('/editor');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#09050f,#12082a,#09050f)', color: '#3DAA7A' }}>
      {/* Ambient blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: 600, height: 600, background: 'radial-gradient(circle,rgba(124,58,237,.18) 0%,transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-5%', right: '10%', width: 500, height: 500, background: 'radial-gradient(circle,rgba(168,85,247,.12) 0%,transparent 70%)', borderRadius: '50%' }} />
      </div>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(9,5,15,.8)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(61,170,122,.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '.06em', textDecoration: 'none', background: 'linear-gradient(90deg,#3DAA7A,#3DAA7A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            SITREZHUTHU
          </Link>
          <div style={{ display: 'flex', gap: '.75rem' }}>
            {[['/', 'Home'], ['/templates', 'Templates']].map(([href, label]) => (
              <Link key={href} href={href} style={{ fontSize: '.82rem', fontWeight: 600, textDecoration: 'none', color: 'rgba(61,170,122,.5)', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color  = '#3DAA7A'}
                onMouseLeave={e => e.currentTarget.style.color  = 'rgba(61,170,122,.5)'}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '0 2rem 6rem' }}>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', padding: '5rem 0 3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '.4rem 1.25rem', background: 'rgba(61,170,122,.1)', border: '1px solid rgba(61,170,122,.25)', borderRadius: 999, fontSize: '.75rem', fontWeight: 700, color: '#62C99A', marginBottom: '1.5rem', letterSpacing: '0.02em' }}>
            <Sparkles size={14} /> DESIGN YOUR OWN — FREE FOREVER
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.08, marginBottom: '1.25rem', color: '#FAF9F6' }}>
            Create Your{' '}
            <span style={{ background: 'linear-gradient(135deg,#3DAA7A,#62C99A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Template
            </span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#A0BCAE', maxWidth: 540, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Pick a base template, then customize every color, font, and layout detail in the live editor. Submit your creation to the community gallery.
          </p>
        </motion.div>

        {/* How it works */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
          {steps.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.num} style={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.05)', borderRadius: 20, padding: '1.75rem', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.04)'; e.currentTarget.style.borderColor = 'rgba(61,170,122,.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.05)'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(61,170,122,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} style={{ color: '#3DAA7A' }} />
                  </div>
                  <span style={{ fontSize: '.7rem', fontWeight: 800, color: '#3DAA7A', letterSpacing: '.1em', textTransform: 'uppercase' }}>Step {s.num}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '.5rem', color: '#FAF9F6' }}>{s.title}</h3>
                <p style={{ fontSize: '.85rem', color: '#A0BCAE', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Template picker */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '.75rem', textAlign: 'center', color: '#FAF9F6' }}>
            Choose your starting template
          </h2>
          <p style={{ textAlign: 'center', color: '#A0BCAE', fontSize: '0.95rem', marginBottom: '3rem' }}>
            You can change everything in the editor — this is just the foundation.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
            {BASE_TEMPLATES.map((tpl, idx) => (
              <motion.div key={tpl.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 + idx * .07 }}
                style={{ borderRadius: 24, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', background: 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'all .25s' }}
                onClick={() => handlePick(tpl.id)}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(61,170,122,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>

                {/* Thumbnail */}
                <div style={{ height: 160, background: tpl.gradient, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '.5rem', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: 40, height: 6, borderRadius: 3, background: tpl.accent, opacity: .8 }} />
                    <div style={{ display: 'flex', gap: 4 }}>{[1,2,3].map(i => <div key={i} style={{ width: 16, height: 4, borderRadius: 2, background: tpl.accent, opacity: .3 }} />)}</div>
                  </div>
                  <div style={{ width: '70%', height: 8, borderRadius: 4, background: tpl.accent, opacity: .7 }} />
                  <div style={{ width: '50%', height: 6, borderRadius: 3, background: tpl.accent, opacity: .35 }} />
                  <div style={{ display: 'flex', gap: 4, marginTop: '.5rem' }}>
                    {[1,2].map(i => <div key={i} style={{ flex: 1, borderRadius: 8, height: 40, background: 'rgba(255,255,255,0.1)', border: `1px solid ${tpl.accent}22`, backdropFilter: 'blur(4px)' }} />)}
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(10,10,12,0.4)' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '.25rem', color: '#FAF9F6' }}>{tpl.name}</div>
                    <div style={{ fontSize: '.8rem', color: '#A0BCAE', lineHeight: 1.4 }}>{tpl.desc}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '.6rem 1rem', background: 'rgba(61,170,122,0.1)', border: '1px solid rgba(61,170,122,0.2)', borderRadius: 10, color: '#62C99A', fontSize: '.8rem', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
                    Customize <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(61,170,122,0.1)', borderRadius: 32, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(61,170,122,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(61,170,122,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Palette size={32} style={{ color: '#3DAA7A' }} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#FAF9F6' }}>Already have a design in mind?</h2>
          <p style={{ color: '#A0BCAE', maxWidth: 440, margin: '0 auto 2.5rem', lineHeight: 1.7, fontSize: '1rem' }}>
            Head straight to the editor — choose any base and tweak it to perfection. Then submit it to the community.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/editor" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '1rem 2rem', background: 'linear-gradient(135deg,#3DAA7A,#2D8060)', border: 'none', borderRadius: 14, color: '#fff', fontWeight: 700, fontSize: '.95rem', textDecoration: 'none', boxShadow: '0 8px 30px rgba(61,170,122,0.3)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(61,170,122,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(61,170,122,0.3)'; }}>
              Open Editor <ArrowRight size={18} />
            </Link>
            <Link href="/templates" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '1rem 2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, color: '#FAF9F6', fontWeight: 700, fontSize: '.95rem', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
              Browse Community
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
