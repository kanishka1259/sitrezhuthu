'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useFirebaseAuth } from '@/lib/firebase-auth-context';
import Image from 'next/image';

function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function LoginPage() {
  const { signIn, signInGoogle } = useFirebaseAuth();
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
    setLoading(true);
    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err) {
      const errorObj = err as { code?: string; message?: string };
      const code = errorObj?.code;
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else {
        setError(errorObj?.message || 'Sign-in failed. Please try again.');
      }
    } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setError('');
    setGLoading(true);
    try { await signInGoogle(); router.push('/dashboard'); }
    catch (err) {
      const errorObj = err as { message?: string };
      setError(errorObj?.message || 'Google sign-in failed.');
    }
    finally { setGLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: 550, height: 400, background: 'radial-gradient(ellipse, rgba(61,170,122,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 300, height: 300, background: 'radial-gradient(ellipse, rgba(120,68,20,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, textDecoration: 'none', marginBottom: 40 }}>
          <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }}>
            <Image 
              src="/logo.png" 
              alt="Sitrezhuthu" 
              fill 
              sizes="48px"
              style={{ objectFit: 'contain' }} 
            />
          </div>
          <div>
            <div style={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '0.1em', color: '#62C99A', textTransform: 'uppercase' }}>SITREZHUTHU</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em' }}>PORTFOLIO GENERATOR</div>
          </div>
        </Link>

        {/* Card */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-lit)', borderRadius: 20, padding: '36px 32px', boxShadow: '0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(61,170,122,0.06)' }}>
          <h1 style={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 700, fontSize: 22, color: 'var(--text)', textAlign: 'center', marginBottom: 8 }}>Welcome back</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 28 }}>Sign in to continue to your portfolios</p>

          {error && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: 'rgba(192,80,80,0.08)', border: '1px solid rgba(192,80,80,0.2)', borderRadius: 10, padding: '12px 14px', marginBottom: 20, color: '#D07070', fontSize: 13 }}>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} /> {error}
            </div>
          )}

          <button onClick={handleGoogle} disabled={gLoading}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: '12px', background: 'rgba(240,230,211,0.04)', border: '1px solid rgba(240,230,211,0.09)', borderRadius: 10, color: '#D8EDE2', fontWeight: 500, fontSize: 14, cursor: gLoading ? 'not-allowed' : 'pointer', marginBottom: 20, transition: 'all .2s' }}
            onMouseEnter={e => { if (!gLoading) { e.currentTarget.style.background  = 'rgba(61,170,122,0.07)'; e.currentTarget.style.borderColor  = 'rgba(61,170,122,0.25)'; } }}
            onMouseLeave={e => { e.currentTarget.style.background  = 'rgba(240,230,211,0.04)'; e.currentTarget.style.borderColor  = 'rgba(240,230,211,0.09)'; }}
          >
            {gLoading ? <Loader2 size={16} className="spin" /> : <GoogleIcon />}
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 500, letterSpacing: '0.05em' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 8 }}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="field" />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>Password</label>
                <Link href="/forgot-password" style={{ fontSize: 12, color: '#3DAA7A', textDecoration: 'none', opacity: 0.85 }}>Forgot password?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="field" style={{ paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#3E6050', cursor: 'pointer', padding: 0 }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', marginTop: 4, fontSize: 15, padding: '13px', borderRadius: 10 }}>
              {loading ? <><Loader2 size={16} className="spin" /> Signing in…</> : <>Sign In <ArrowRight size={15} /></>}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--text-dim)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" style={{ color: '#3DAA7A', fontWeight: 600, textDecoration: 'none' }}>Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
