'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useFirebaseAuth } from '@/lib/firebase-auth-context';
import { useState, useRef, useEffect } from 'react';
import { LayoutDashboard, Settings, LogOut, ChevronDown, Menu, X, Zap, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import logoPic from '@/public/logo.png';
const JADE       = '#3DAA7A';
const JADE_BRIGHT = '#62C99A';

export function Navbar() {
  const { user, signOut } = useFirebaseAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const isLight = document.documentElement.classList.contains('light-theme');
    const timer = setTimeout(() => {
      setTheme(isLight ? 'light' : 'dark');
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleSync = () => {
      const isLight = document.documentElement.classList.contains('light-theme');
      setTheme(isLight ? 'light' : 'dark');
    };
    window.addEventListener('site-theme-change', handleSync);
    return () => window.removeEventListener('site-theme-change', handleSync);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('site-theme', next);
    document.documentElement.classList.toggle('light-theme', next === 'light');
    window.dispatchEvent(new Event('site-theme-change'));
  };

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const navLinks = [
    { href: '/templates', label: 'Templates' },
    ...(user ? [{ href: '/dashboard', label: 'My Projects' }] : []),
  ];

  const active = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const handleSignOut = async () => { await signOut(); setUserOpen(false); router.push('/'); };

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      borderBottom: '1px solid var(--border-lit)',
      background: theme === 'dark' ? 'rgba(7,12,9,0.9)' : 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 66, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
          <div style={{ position: 'relative', width: 46, height: 46, flexShrink: 0 }}>
            <Image 
              src={logoPic} 
              alt="Sitrezhuthu" 
              fill 
              sizes="46px"
              style={{ objectFit: 'contain', zIndex: 1 }} 
            />
          </div>
          <div>
            <span style={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 800, fontSize: 15, letterSpacing: '0.1em', color: JADE_BRIGHT, textTransform: 'uppercase', display: 'block', lineHeight: 1.1 }}>SITREZHUTHU</span>
            <span style={{ fontSize: 10, color: 'var(--text)', letterSpacing: '0.18em', display: 'block', textTransform: 'uppercase', opacity: 0.8 }}>Portfolio Generator</span>
          </div>
        </Link>

        {/* Center Desktop Nav (Glass Pill) */}
        <nav style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 999, padding: '4px',
          boxShadow: 'inset 0 0 10px rgba(61,170,122,0.1), 0 0 20px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)'
        }} className="hide-mobile">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              padding: '6px 16px', borderRadius: 999, fontSize: 13,
              fontWeight: active(href) ? 600 : 400,
              color: active(href) ? 'var(--text)' : 'var(--text-muted)',
              textDecoration: 'none', transition: 'all 0.15s',
              background: active(href) ? 'var(--border-lit)' : 'transparent',
              border: active(href) ? `1px solid var(--border-lit)` : '1px solid transparent',
              boxShadow: active(href) ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
            }}
              onMouseEnter={e => { if (!active(href)) { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--border)'; } }}
              onMouseLeave={e => { if (!active(href)) { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; } }}
            >{label}</Link>
          ))}
        </nav>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {user ? (
            <>
              <Link href="/editor" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 20px', borderRadius: 999, background: 'linear-gradient(180deg, rgba(98,201,154,0.6) 0%, rgba(45,128,96,0.9) 100%)', color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s', boxShadow: 'inset 0 1px 5px rgba(255,255,255,0.4), 0 4px 15px rgba(61,170,122,0.4)', border: '1px solid rgba(216,237,226,0.5)', letterSpacing: '0.01em', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'inset 0 1px 8px rgba(255,255,255,0.6), 0 6px 20px rgba(61,170,122,0.6)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'inset 0 1px 5px rgba(255,255,255,0.4), 0 4px 15px rgba(61,170,122,0.4)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <Zap size={14} /> Open Editor
              </Link>

              <div style={{ position: 'relative' }} ref={dropRef}>
                <button id="user-menu-btn" onClick={() => setUserOpen(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, border: '1px solid var(--border-lit)', background: 'var(--bg-surface)', color: 'var(--text)', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--jade)'; e.currentTarget.style.background = 'var(--bg-hover)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-lit)'; e.currentTarget.style.background = 'var(--bg-surface)'; }}
                >
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#3DAA7A,#1A5C42)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#060D09', flexShrink: 0 }}>
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                  <span style={{ fontSize: 13, maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.displayName || user.email?.split('@')[0]}</span>
                  <ChevronDown size={13} style={{ opacity: 0.4, transition: 'transform 0.2s', transform: userOpen ? 'rotate(180deg)' : 'none' }} />
                </button>

                {userOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0, minWidth: 210, borderRadius: 14,
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-lit)',
                    boxShadow: theme === 'dark' ? '0 20px 60px rgba(0,0,0,0.7)' : '0 12px 30px rgba(0,0,0,0.1)',
                    overflow: 'hidden', zIndex: 200
                  }}>
                    <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--jade-bright)' }}>{user.displayName || 'User'}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 2 }}>{user.email}</div>
                    </div>
                    {[{ icon: LayoutDashboard, label: 'My Projects', href: '/dashboard' }, { icon: Settings, label: 'Settings', href: '/settings' }].map(({ icon: Icon, label, href }) => (
                      <Link key={href} href={href} onClick={() => setUserOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 18px', fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.15s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)'; (e.currentTarget as HTMLElement).style.color = 'var(--jade-bright)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
                      >
                        <Icon size={15} style={{ color: 'var(--jade)', opacity: 0.7 }} /> {label}
                      </Link>
                    ))}
                    <div style={{ borderTop: '1px solid var(--border)' }}>
                      <button onClick={handleSignOut} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '11px 18px', fontSize: 14, color: '#B05555', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'background 0.15s', textAlign: 'left' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = theme === 'dark' ? 'rgba(176,85,85,0.08)' : 'rgba(239,68,68,0.08)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                      ><LogOut size={15} /> Sign Out</button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', padding: '8px 14px', borderRadius: 8, transition: 'color 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = JADE_BRIGHT; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
              >Sign In</Link>
              <Link href="/signup" style={{ padding: '9px 20px', borderRadius: 9, background: 'linear-gradient(140deg,#3DAA7A,#2D8060)', color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 2px 12px rgba(61,170,122,0.28)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 22px rgba(61,170,122,0.48)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(61,170,122,0.28)'; }}
              >Get Started</Link>
            </>
          )}

          {/* Day / Night Theme Toggle */}
          <button onClick={toggleTheme} title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 38, height: 38, borderRadius: '50%',
              border: '1px solid var(--border-lit)',
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--text)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--border)'; e.currentTarget.style.borderColor = 'var(--jade)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'var(--border-lit)'; }}
          >
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button onClick={() => setMenuOpen(v => !v)} className="show-mobile" aria-label="Menu"
            style={{ display: 'none', padding: 8, background: 'transparent', border: 'none', color: JADE_BRIGHT, cursor: 'pointer' }}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ borderTop: '1px solid rgba(61,170,122,0.1)', background: 'rgba(7,12,9,0.98)', padding: '16px 24px 24px' }}>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '11px 0', fontSize: 15, color: active(href) ? JADE_BRIGHT : 'rgba(216,237,226,0.6)', textDecoration: 'none', borderBottom: '1px solid rgba(61,170,122,0.06)' }}>{label}</Link>
          ))}
          {!user && (
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <Link href="/login" onClick={() => setMenuOpen(false)} style={{ flex: 1, padding: '11px', textAlign: 'center', border: '1px solid rgba(61,170,122,0.22)', borderRadius: 8, color: JADE_BRIGHT, textDecoration: 'none', fontSize: 14 }}>Sign In</Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)} style={{ flex: 1, padding: '11px', textAlign: 'center', background: 'linear-gradient(140deg,#3DAA7A,#2D8060)', borderRadius: 8, color: '#060D09', textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>Get Started</Link>
            </div>
          )}
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
