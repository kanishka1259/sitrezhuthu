'use client';

import Link from 'next/link';
import { useFirebaseAuth } from '@/lib/firebase-auth-context';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';

const JADE_BRIGHT = '#62C99A';

export default function Home() {
  const { user } = useFirebaseAuth();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)', color: 'var(--text)', overflowX: 'hidden', position: 'relative', scrollBehavior: 'smooth' }}>
      <Navbar />

      {/* ═══ BACKGROUND CRYSTALS & GLOWS ═══ */}
      {/* Center huge glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '100vh', background: 'radial-gradient(circle at 50% 30%, rgba(61,170,122,0.12) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
      
      {/* Background Grid Lines to add tech vibe */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(61,170,122,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(61,170,122,0.03) 1px, transparent 1px)', backgroundSize: '100px 100px', pointerEvents: 'none', zIndex: 0 }} />

      {/* Giant Crystal Shard Left */}
      <div style={{
        position: 'absolute', top: '10%', left: '-10%', width: '45vw', height: '70vh',
        background: 'linear-gradient(135deg, rgba(61,170,122,0.1) 0%, rgba(26,92,66,0.02) 100%)',
        clipPath: 'polygon(0 20%, 80% 0, 100% 70%, 20% 100%)',
        boxShadow: 'inset 2px 2px 20px rgba(216,237,226,0.1)',
        backdropFilter: 'blur(5px)', transform: 'rotate(-15deg)', zIndex: 0, border: '1px solid rgba(61,170,122,0.2)'
      }} />
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '45vw', height: '70vh', clipPath: 'polygon(0 20%, 80% 0, 100% 70%, 20% 100%)', border: '1px solid rgba(216,237,226,0.15)', transform: 'rotate(-15deg)', zIndex: 0 }} />

      {/* Giant Crystal Shard Right */}
      <div style={{
        position: 'absolute', top: '15%', right: '-10%', width: '40vw', height: '65vh',
        background: 'linear-gradient(225deg, rgba(61,170,122,0.15) 0%, rgba(26,92,66,0.02) 100%)',
        clipPath: 'polygon(20% 0, 100% 15%, 80% 100%, 0 80%)',
        backdropFilter: 'blur(8px)', transform: 'rotate(10deg)', zIndex: 0
      }} />
      <div style={{ position: 'absolute', top: '15%', right: '-10%', width: '40vw', height: '65vh', clipPath: 'polygon(20% 0, 100% 15%, 80% 100%, 0 80%)', border: '1px solid rgba(216,237,226,0.15)', transform: 'rotate(10deg)', zIndex: 0 }} />

      {/* ═══ HERO SECTION ═══ */}
      <section style={{ position: 'relative', paddingTop: 180, paddingBottom: 60, zIndex: 10, flex: 1 }}>
        
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          
          {/* Top Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
              borderRadius: 999, border: '1px solid rgba(61,170,122,0.3)',
              background: 'rgba(7,12,9,0.5)', backdropFilter: 'blur(10px)',
              color: JADE_BRIGHT, fontSize: 13, fontWeight: 500,
              boxShadow: '0 0 20px rgba(61,170,122,0.2)'
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: JADE_BRIGHT, animation: 'jadePulse 2s infinite' }} />
              Portfolio generator for developers & designers
            </div>
          </div>

          {/* Headline */}
          <div style={{ position: 'relative', textAlign: 'center', zIndex: 10 }}>
            <h1 style={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: 'clamp(40px, 6vw, 76px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 20 }}>
              Your work, beautifully live.
            </h1>

            <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 640, margin: '0 auto 40px', fontWeight: 400 }}>
              Choose from 9 stunning templates, customize every detail,<br />
              and share your professional portfolio — free, forever.
            </p>



            {/* CTAs (Crystal Buttons) */}
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={user ? '/dashboard' : '/signup'} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '14px 32px',
                  background: 'linear-gradient(180deg, rgba(98,201,154,0.4) 0%, rgba(45,128,96,0.8) 100%)',
                  border: '1px solid rgba(216,237,226,0.6)',
                  color: '#fff', fontSize: 15, fontWeight: 600,
                  boxShadow: 'inset 0 1px 10px rgba(255,255,255,0.4), 0 8px 30px rgba(61,170,122,0.4)',
                  clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  transition: 'all 0.2s', textShadow: '0 1px 3px rgba(0,0,0,0.5)'
                }}
                onMouseEnter={e => { (e.currentTarget.style.transform = 'translateY(-2px)'); (e.currentTarget.style.boxShadow = 'inset 0 1px 15px rgba(255,255,255,0.6), 0 12px 40px rgba(61,170,122,0.6)'); }}
                onMouseLeave={e => { (e.currentTarget.style.transform = 'translateY(0)'); (e.currentTarget.style.boxShadow = 'inset 0 1px 10px rgba(255,255,255,0.4), 0 8px 30px rgba(61,170,122,0.4)'); }}
                >
                  {user ? 'Go to Dashboard' : 'Start Building Free'} <ArrowRight size={18} />
                </div>
              </Link>
              
              <Link href="/templates" style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '14px 32px',
                  background: 'rgba(13,21,16,0.6)', backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(61,170,122,0.4)',
                  color: '#D8EDE2', fontSize: 15, fontWeight: 600,
                  boxShadow: 'inset 0 1px 10px rgba(61,170,122,0.2), 0 8px 30px rgba(0,0,0,0.5)',
                  clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { (e.currentTarget.style.transform = 'translateY(-2px)'); (e.currentTarget.style.background = 'rgba(26,92,66,0.4)'); }}
                onMouseLeave={e => { (e.currentTarget.style.transform = 'translateY(0)'); (e.currentTarget.style.background = 'rgba(13,21,16,0.6)'); }}
                >
                  Browse Templates
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Footer minimal */}
      <footer style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '60px 24px', borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          © {new Date().getFullYear()} Sitrezhuthu. Built with <span style={{ color: '#3DAA7A' }}>♥</span> by the team.
        </p>
      </footer>
      
    </div>
  );
}
