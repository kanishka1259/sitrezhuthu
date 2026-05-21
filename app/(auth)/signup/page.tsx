'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, Loader2, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { useFirebaseAuth } from '@/lib/firebase-auth-context';
import Image from 'next/image';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

const PERKS = [
  'Free forever — no credit card needed',
  'Instant public portfolio URL',
  'Professional templates included',
  'Custom freeform canvas editor',
];

export default function SignupPage() {
  const { signUp, signInGoogle } = useFirebaseAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) return setError('All fields are required.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    setLoading(true);
    try {
      await signUp(email, password, name);
      router.push('/dashboard');
    } catch (err) {
      const errorObj = err as { code?: string; message?: string };
      const code = errorObj?.code;
      if (code === 'auth/email-already-in-use') {
        setError('Email already registered. Sign in instead.');
      } else {
        setError(errorObj?.message || 'Failed to create account. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setGLoading(true);
    try {
      await signInGoogle();
      router.push('/dashboard');
    } catch (err) {
      const errorObj = err as { message?: string };
      setError(errorObj?.message || 'Google sign-in failed.');
    } finally {
      setGLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', overflow: 'hidden' }}>

      {/* Left panel */}
      <div style={{ width: '44%', flexShrink: 0, background: 'var(--bg-surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 56px' }}
        className="hide-on-mobile">
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 56 }}>
          <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }}>
            <Image 
              src="/logo.png" 
              alt="Sitrezhuthu" 
              fill 
              sizes="48px"
              style={{ objectFit: 'contain' }} 
            />
          </div>
          <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '0.06em', color: 'var(--text)', textTransform: 'uppercase' }}>SITREZHUTHU</span>
        </Link>

        <h2 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: 36, color: 'var(--text)', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 16 }}>
          Your portfolio,<br />
          <span className="grad-text">live in minutes.</span>
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 340, marginBottom: 48 }}>
          Join developers and designers who&apos;ve built beautiful, professional portfolios with Sitrezhuthu.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {PERKS.map(perk => (
            <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <CheckCircle2 size={17} style={{ color: '#3DAA7A', flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: 400, height: 300, background: 'radial-gradient(ellipse, rgba(61,170,122,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Mobile logo */}
        <div style={{ marginBottom: 36 }} className="show-only-mobile">
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }}>
              <Image 
                src="/logo.png" 
                alt="Sitrezhuthu" 
                fill 
                sizes="48px"
                style={{ objectFit: 'contain' }} 
              />
            </div>
            <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '0.06em', color: 'var(--text)', textTransform: 'uppercase' }}>SITREZHUTHU</span>
          </Link>
        </div>

        <div style={{ width: '100%', maxWidth: 400, position: 'relative' }}>
          <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: 22, color: 'var(--text)', textAlign: 'center', marginBottom: 8 }}>
            Create your account
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 28 }}>
            Free forever. No credit card needed.
          </p>

          {error && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: 'rgba(255,75,75,0.08)', border: '1px solid rgba(255,75,75,0.2)', borderRadius: 10, padding: '12px 14px', marginBottom: 20, color: '#ff8080', fontSize: 13 }}>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} /> {error}
            </div>
          )}

          <button
            onClick={handleGoogle}
            disabled={gLoading}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: '12px', background: 'var(--bg-hover)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontWeight: 500, fontSize: 14, cursor: gLoading ? 'not-allowed' : 'pointer', marginBottom: 20, transition: 'all .2s' }}
            onMouseEnter={e => { if (!gLoading) { e.currentTarget.style.background  = 'var(--bg-surface)'; e.currentTarget.style.borderColor  = 'var(--border-lit)'; } }}
            onMouseLeave={e => { e.currentTarget.style.background  = 'var(--bg-hover)'; e.currentTarget.style.borderColor  = 'var(--border)'; }}
          >
            {gLoading ? <Loader2 size={16} className="spin" /> : <GoogleIcon />}
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>OR</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 8 }}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Alex Rivera"
                required
                className="field"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 8 }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="field"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 8 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  className="field"
                  style={{ paddingRight: 44 }}
                />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: 0 }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password.length > 0 && (
                <div style={{ marginTop: 6 }}>
                  <div style={{ height: 3, borderRadius: 999, background: 'var(--border)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: password.length < 6 ? '30%' : password.length < 10 ? '65%' : '100%', background: password.length < 6 ? '#ff4d4d' : password.length < 10 ? '#ffd700' : '#3DAA7A', borderRadius: 999, transition: 'all 0.3s' }} />
                  </div>
                  <span style={{ fontSize: 11, color: password.length < 6 ? '#ff4d4d' : password.length < 10 ? '#ffd700' : '#3DAA7A', marginTop: 4, display: 'block' }}>
                    {password.length < 6 ? 'Too short' : password.length < 10 ? 'Fair' : 'Strong'}
                  </span>
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', marginTop: 4, fontSize: 15, padding: '13px' }}>
              {loading ? <><Loader2 size={16} className="spin" /> Creating account…</> : <>Create Account <ArrowRight size={16} /></>}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--text-dim)' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#3DAA7A', fontWeight: 500, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hide-on-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-only-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}
