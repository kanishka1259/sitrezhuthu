'use client';

import { useEffect, useState, useCallback, useRef, Suspense } from 'react';
import { useFirebaseAuth } from '@/lib/firebase-auth-context';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FormPanel } from '@/components/editor/FormPanel';
import { LivePreview } from '@/components/preview/LivePreview';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { IridescentButterfly } from '@/components/Logo';

import axios from 'axios';
import {
  LayoutDashboard, LogOut, ExternalLink, Eye,
  Loader2, ChevronDown, User, Upload, X, Check, Link as LinkIcon,
  Moon, Sun, AlertTriangle, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PortfolioStore } from '@/store/usePortfolioStore';

/* ── Inline Submit-to-Community Modal ── */
function SubmitModal({ onClose, portfolio, user, getIdToken }: { onClose: () => void; portfolio: PortfolioStore; user: { displayName?: string | null; email?: string | null } | null; getIdToken: () => Promise<string | null> }) {
  const [form, setForm] = useState({ authorName: user?.displayName || '', authorEmail: user?.email || '', templateName: '', description: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.authorName || !form.authorEmail || !form.templateName) return;
    setStatus('sending');
    try {
      await axios.post('/api/templates/community', {
        ...form,
        baseTemplate: portfolio.template,
        templateStyles: portfolio.templateStyles,
        customElements: portfolio.customElements || [],
        previewData: {
          name: portfolio.name || 'Demo User',
          bio: portfolio.bio || 'A creative portfolio.',
          skills: portfolio.skills?.slice(0, 6) || [],
          projects: portfolio.projects?.slice(0, 2) || [],
          education: portfolio.education?.slice(0, 1) || [],
          contact: portfolio.contact,
        },
      }, {
        headers: {
          Authorization: `Bearer ${await getIdToken()}`
        }
      });
      setStatus('success');
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err) ? err.response?.data?.error : (err instanceof Error ? err.message : 'Submission failed.');
      setError(msg);
      setStatus('error');
    }
  };

  const inp: React.CSSProperties = { width: '100%', padding: '0.85rem 1rem', background: 'rgba(61,170,122,0.05)', border: '1px solid rgba(61,170,122,0.1)', borderRadius: 12, color: '#3DAA7A', fontSize: '0.95rem', outline: 'none', fontWeight: 400 };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div style={{ background: '#EAE8E3', border: '1px solid rgba(61,170,122,0.1)', borderRadius: 24, padding: '2.5rem', width: '100%', maxWidth: 480, position: 'relative', boxShadow: '0 24px 48px rgba(0,0,0,0.5)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'rgba(61,170,122,0.05)', border: 'none', borderRadius: 12, padding: '.4rem', color: '#3DAA7A', cursor: 'pointer', display: 'flex' }}><X size={18} /></button>
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}><Check size={32} style={{ color: '#3DAA7A' }} /></div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.75rem' }}>Submitted!</h3>
            <p style={{ color: '#3DAA7A', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 400 }}>Once approved by our team it will appear in the community gallery — credited to you.</p>
            <button onClick={onClose} style={{ padding: '0.85rem 2rem', background: '#3DAA7A', border: 'none', borderRadius: 14, color: '#FAF9F6', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Upload size={20} style={{ color: '#3DAA7A' }} /></div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#3DAA7A' }}>Share Design</h3>
                <p style={{ fontSize: '.85rem', color: '#3DAA7A', fontWeight: 400 }}>Your current template + style settings</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: '#3DAA7A', marginBottom: '.4rem' }}>Your Name *</label>
                  <input required style={inp} value={form.authorName} onChange={e => setForm(f => ({ ...f, authorName: e.target.value }))} placeholder="Alex Rivera" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: '#3DAA7A', marginBottom: '.4rem' }}>Email *</label>
                  <input required type="email" style={inp} value={form.authorEmail} onChange={e => setForm(f => ({ ...f, authorEmail: e.target.value }))} placeholder="alex@example.com" />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: '#3DAA7A', marginBottom: '.4rem' }}>Template Name *</label>
                <input required style={inp} value={form.templateName} onChange={e => setForm(f => ({ ...f, templateName: e.target.value }))} placeholder="My Awesome Design" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: '#3DAA7A', marginBottom: '.4rem' }}>Description</label>
                <textarea rows={2} style={{ ...inp, resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe what makes your design unique…" />
              </div>
              <div style={{ padding: '0.85rem', background: 'rgba(61,170,122,0.03)', border: '1px solid rgba(61,170,122,0.05)', borderRadius: 12, fontSize: '.85rem', color: '#3DAA7A', lineHeight: 1.5, fontWeight: 400 }}>
                We&apos;ll capture your current <strong style={{ color: '#3DAA7A', fontWeight: 500 }}>template + style settings</strong> automatically. After review, your design goes live.
              </div>
              {status === 'error' && <p style={{ color: '#ef4444', fontSize: '.85rem' }}>{error}</p>}
              <button type="submit" disabled={status === 'sending'}
                style={{ padding: '0.9rem', background: '#3DAA7A', border: 'none', borderRadius: 14, color: '#FAF9F6', fontWeight: 600, fontSize: '0.95rem', cursor: status === 'sending' ? 'not-allowed' : 'pointer', marginTop: '0.5rem', transition: 'transform .2s' }}
                onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.transform = 'scale(1)'; }}>
                {status === 'sending' ? 'Submitting…' : 'Submit Template'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function EditorContent() {
  const { user, loading, signOut, getIdToken } = useFirebaseAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [nightMode, setNightMode] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const isLight = document.documentElement.classList.contains('light-theme');
    setNightMode(!isLight);
  }, []);

  useEffect(() => {
    const handleSync = () => {
      const isLight = document.documentElement.classList.contains('light-theme');
      setNightMode(!isLight);
    };
    window.addEventListener('site-theme-change', handleSync);
    return () => window.removeEventListener('site-theme-change', handleSync);
  }, []);

  const toggleNightMode = () => {
    const next = !nightMode;
    setNightMode(next);
    localStorage.setItem('site-theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('light-theme', !next);
    window.dispatchEvent(new Event('site-theme-change'));
  };

  const [showSlugWarning, setShowSlugWarning] = useState(false);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const portfolio = usePortfolioStore();
  const isCanvasFullScreen = portfolio.template === 'custom' && portfolio.isCanvasFullScreen;
  const slug = usePortfolioStore(s => s.slug);

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // Stable refs — prevent stale closures without adding to effect deps
  const getIdTokenRef = useRef(getIdToken);
  getIdTokenRef.current = getIdToken;
  const hasFetchedRef = useRef<string | null>(null); // tracks last fetched id
  const handleSaveRef = useRef<() => Promise<void>>(() => Promise.resolve());

  /* ── Auth guard ── */
  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  /* ── Load saved portfolio or reset (fires ONCE per id change) ── */
  useEffect(() => {
    if (!user) return;
    // Only fetch if we haven't already fetched this id in this session
    if (id) {
      if (hasFetchedRef.current === id) return; // already loaded
      hasFetchedRef.current = id;
      getIdTokenRef.current().then(token => {
        if (!token) return;
        axios.get(`/api/portfolio?id=${id}`, { headers: { Authorization: `Bearer ${token}` } })
          .then(r => { if (r.data && Object.keys(r.data).length > 0) usePortfolioStore.getState().loadFromDB(r.data); })
          .catch(() => {});
      });
    } else {
      const tplParam = searchParams.get('template');
      if (!tplParam) {
        usePortfolioStore.getState().reset();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]); // intentionally omit portfolio/getIdToken — stable via refs

  /* ── Save handler ── */
  const handleSave = useCallback(async () => {
    if (isSaving) return;
    setIsSaving(true);
    setSaveMessage('');
    try {
      const token = await getIdTokenRef.current();
      // Read from store directly at call-time — no stale closure
      const store = usePortfolioStore.getState();
      const username = store.slug || store.username || user?.email?.split('@')[0]?.toLowerCase().replace(/[^a-z0-9-]/g, '-') || 'portfolio';
      const r = await axios.post('/api/portfolio', { ...store, username }, { headers: { Authorization: `Bearer ${token}` } });

      if (!store._id && r.data._id) {
        usePortfolioStore.getState().loadFromDB({ _id: r.data._id, username: r.data.username });
        router.replace(`/editor?id=${r.data._id}`);
      }

      setSaveMessage('Saved successfully');
      setTimeout(() => setSaveMessage(''), 3500);
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err) ? err.response?.data?.error : (err instanceof Error ? err.message : 'Save failed');
      setSaveMessage(msg);
      setTimeout(() => setSaveMessage(''), 4000);
    } finally {
      setIsSaving(false);
    }
  // Only re-create when isSaving/user/router change — not on every store mutation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSaving, user?.uid, router]);

  // Keep handleSaveRef in sync so the auto-save effect always calls the latest version
  handleSaveRef.current = handleSave;

  /* ── Auto-save: debounce 5s after any data change ── */
  useEffect(() => {
    if (!autoSave) return;
    
    // Subscribe to all store changes without causing re-renders
    const unsubscribe = usePortfolioStore.subscribe(() => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = setTimeout(() => { handleSaveRef.current(); }, 5000);
    });

    return () => { 
      unsubscribe();
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current); 
    };
  }, [autoSave]);

  /* ── Loading & guard states ── */
  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', background: '#050A07', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', color: '#3DAA7A' }}>
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: '#3DAA7A' }} />
        <span style={{ fontSize: '0.9rem', color: '#3DAA7A', fontWeight: 500 }}>Loading…</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const username = portfolio.slug || portfolio.username || user.email?.split('@')[0]?.toLowerCase().replace(/[^a-z0-9-]/g, '-') || 'portfolio';
  const publicUrl = `/${username}`;

  return (
    <div style={{
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      background: nightMode ? '#050A07' : '#f8fafc',
      color: nightMode ? '#FAF9F6' : '#0f172a',
      overflow: 'hidden',
      '--editor-bg': nightMode ? '#050A07' : '#f8fafc',
      '--editor-text': nightMode ? '#FAF9F6' : '#0f172a',
      '--editor-text-muted': nightMode ? '#A0BCAE' : '#64748b',
      '--editor-panel-bg': nightMode ? 'rgba(10,10,12,0.5)' : '#ffffff',
      '--editor-header-bg': nightMode ? 'rgba(10,10,12,0.8)' : '#ffffff',
      '--editor-footer-bg': nightMode ? 'rgba(10,10,12,0.95)' : '#ffffff',
      '--editor-border': nightMode ? 'rgba(61,170,122,0.05)' : 'rgba(0,0,0,0.08)',
      '--editor-border-strong': nightMode ? 'rgba(61,170,122,0.08)' : 'rgba(0,0,0,0.12)',
      '--editor-input-bg': nightMode ? 'rgba(255,255,255,0.03)' : '#f1f5f9',
      '--editor-input-border': nightMode ? 'rgba(255,255,255,0.1)' : '#cbd5e1',
      '--editor-input-focus-bg': nightMode ? 'rgba(255,255,255,0.06)' : '#ffffff',
      '--editor-card-bg': nightMode ? 'rgba(61,170,122,0.02)' : '#f8fafc',
      '--editor-card-border': nightMode ? 'rgba(61,170,122,0.05)' : 'rgba(0,0,0,0.06)',
      '--editor-tab-active-bg': nightMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      '--editor-btn-ghost': nightMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      '--editor-btn-ghost-hover': nightMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
      '--editor-label': nightMode ? '#e5e7eb' : '#334155',
    } as React.CSSProperties}>
      <style>{`
        .editor-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: var(--editor-input-bg) !important;
          border: 1px solid var(--editor-input-border) !important;
          border-radius: 12px;
          color: var(--editor-text) !important;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
          outline: none;
        }
        .editor-input::placeholder {
          color: var(--editor-text-muted) !important;
          opacity: 0.6;
        }
        .editor-input:focus {
          border-color: #3DAA7A !important;
          background: var(--editor-input-focus-bg) !important;
        }
        .editor-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: var(--editor-label) !important;
          letter-spacing: 0.05em;
          margin-bottom: 0.375rem;
          margin-top: 1.25rem;
        }
        /* Style standard range inputs for light theme */
        input[type="range"] {
          background: ${nightMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} !important;
        }
      `}</style>

      {/* ── Top Navigation Bar ── */}
      <nav style={{ flexShrink: 0, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.25rem', borderBottom: '1px solid var(--editor-border)', background: 'var(--editor-header-bg)', backdropFilter: 'blur(20px)', zIndex: 100, position: 'relative' }}>

        {/* Left: brand + nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex' }}>
            <IridescentButterfly />
          </Link>
          <div style={{ width: 1, height: 20, background: 'rgba(61,170,122,0.1)' }} />
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {[
              { href: '/dashboard', label: 'My Projects', Icon: LayoutDashboard },
            ].map(({ href, label, Icon }) => (
              <Link key={href} href={href} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.4rem 0.75rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, color: 'var(--editor-text-muted)', transition: 'all .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--editor-text)'; (e.currentTarget as HTMLElement).style.background = 'var(--editor-btn-ghost-hover)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--editor-text-muted)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                <Icon size={14} /> {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: controls + user menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>


          {/* Night mode toggle */}
          <button onClick={toggleNightMode} title={nightMode ? 'Light mode' : 'Dark mode'}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '0.4rem 0.7rem', background: nightMode ? 'rgba(99,102,241,0.2)' : 'var(--editor-btn-ghost)', border: `1px solid ${nightMode ? 'rgba(99,102,241,0.4)' : 'var(--editor-border-strong)'}`, borderRadius: 8, color: nightMode ? '#818cf8' : 'var(--editor-text-muted)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all .2s' }}>
            {nightMode ? <Moon size={14} /> : <Sun size={14} />}
            <span className="hidden md:inline">{nightMode ? 'Night' : 'Day'}</span>
          </button>

          {/* Auto-save toggle */}
          <button onClick={() => setAutoSave(a => !a)} title="Toggle auto-save"
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '0.4rem 0.7rem', background: autoSave ? 'rgba(16,185,129,0.15)' : 'var(--editor-btn-ghost)', border: `1px solid ${autoSave ? 'rgba(16,185,129,0.35)' : 'var(--editor-border-strong)'}`, borderRadius: 8, color: autoSave ? '#34d399' : 'var(--editor-text-muted)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all .2s' }}>
            <RefreshCw size={13} style={{ animation: autoSave ? 'spin 3s linear infinite' : 'none' }} />
            <span className="hidden md:inline">Auto Save</span>
          </button>

          {/* Submit to community */}
          <button onClick={() => setShowSubmit(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.4rem 0.75rem', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 8, color: '#e5e7eb', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}>
            <Upload size={14} />
            <span className="hidden md:inline">Share</span>
          </button>

          {/* View Live — warns if slug missing */}
          <button onClick={() => {
            if (!slug) { setShowSlugWarning(true); setTimeout(() => setShowSlugWarning(false), 4000); return; }
            window.open(publicUrl, '_blank');
          }}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.4rem 0.75rem', background: slug ? 'rgba(59,130,246,0.1)' : 'rgba(245,158,11,0.1)', border: `1px solid ${slug ? 'rgba(59,130,246,0.2)' : 'rgba(245,158,11,0.25)'}`, borderRadius: 8, color: slug ? '#93c5fd' : '#fbbf24', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all .2s' }}>
            {slug ? <ExternalLink size={14} /> : <AlertTriangle size={14} />}
            <span className="hidden md:inline">View Live</span>
          </button>

          {/* Copy Share Link */}
          <button onClick={() => {
            navigator.clipboard.writeText(window.location.origin + publicUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '0.4rem 0.85rem',
              background: copied ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${copied ? 'rgba(16,185,129,0.35)' : 'var(--editor-border-strong)'}`,
              borderRadius: 8,
              color: copied ? '#34d399' : 'var(--editor-text-muted)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all .2s'
            }}
            title={copied ? "Copied!" : "Copy link"}>
            {copied ? <Check size={13} /> : <LinkIcon size={13} />}
            <span className="hidden md:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>

          {/* User menu */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setUserMenuOpen(!userMenuOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.35rem 0.5rem 0.35rem 0.35rem', background: 'rgba(61,170,122,0.06)', border: '1px solid var(--editor-border)', borderRadius: 20, color: 'var(--editor-text)', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(61,170,122,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(61,170,122,0.06)'; }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#3DAA7A,#D97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 600, flexShrink: 0 }}>
                {user.displayName?.charAt(0)?.toUpperCase() || <User size={12} />}
              </div>
              <ChevronDown size={14} style={{ opacity: 0.5, transform: userMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.15 }}
                  style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, minWidth: 200, background: 'var(--editor-panel-bg)', border: '1px solid var(--editor-border-strong)', borderRadius: 16, overflow: 'hidden', zIndex: 200, boxShadow: nightMode ? '0 12px 24px rgba(0,0,0,0.5)' : '0 8px 24px rgba(0,0,0,0.12)', backdropFilter: 'blur(20px)' }}>
                  <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--editor-border)' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--editor-text)' }}>{user.displayName}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--editor-text-muted)', marginTop: 4, fontWeight: 400 }}>{user.email}</div>
                  </div>
                  <button onClick={() => { signOut(); router.push('/'); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '0.85rem 1.25rem', background: 'none', border: 'none', color: '#ef4444', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all .2s', textAlign: 'left' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.1)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}>
                    <LogOut size={14} /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* ── Slug warning toast ── */}
      <AnimatePresence>
        {showSlugWarning && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ position: 'fixed', top: 76, left: '50%', transform: 'translateX(-50%)', zIndex: 200, background: '#1c1207', border: '1px solid rgba(245,158,11,0.4)', borderRadius: 12, padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
            <AlertTriangle size={16} style={{ color: '#fbbf24', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fbbf24' }}>Set a URL slug first!</div>
              <div style={{ fontSize: '0.75rem', color: '#f59e0b', marginTop: 2 }}>Go to the <strong>Profile</strong> tab and fill in your Custom URL slug before viewing your live portfolio.</div>
            </div>
            <button onClick={() => setShowSlugWarning(false)} style={{ background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer', padding: 2, flexShrink: 0 }}><X size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Submit Modal ── */}
      {showSubmit && <SubmitModal onClose={() => setShowSubmit(false)} portfolio={portfolio} user={user} getIdToken={getIdToken} />}

      {/* ── Main Split Layout ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {/* Form Panel — scrolls independently */}
        <div style={{
          width: '42%', flexShrink: 0,
          overflowY: 'auto',
          borderRight: '1px solid var(--editor-border)',
          flexDirection: 'column',
          background: 'var(--editor-panel-bg)',
          display: (showPreview || isCanvasFullScreen) ? 'none' : 'flex',
        }} className={isCanvasFullScreen ? "" : "md:flex! md:w-[42%]!"}>
          <FormPanel onSave={handleSave} isSaving={isSaving} saveMessage={saveMessage} />
        </div>

        {/* Live Preview — scrolls independently */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          flexDirection: 'column',
          background: 'var(--editor-bg)',
          display: showPreview ? 'flex' : 'none',
        }} className="md:flex!">
          <LivePreview nightMode={nightMode} />
        </div>
      </div>

      {/* ── Footer Bar (Edit / Preview / Save) — always visible ── */}
      {!isCanvasFullScreen && (
        <div style={{ flexShrink: 0, borderTop: '1px solid var(--editor-border)', background: 'var(--editor-footer-bg)', padding: '0.75rem 1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center', boxShadow: nightMode ? '0 -10px 40px rgba(0,0,0,0.5)' : '0 -4px 15px rgba(0,0,0,0.04)' }}>
          {/* Single Edit/Preview toggle — only shown on mobile */}
          <div className="md:hidden" style={{ flex: 1 }}>
            <button onClick={() => setShowPreview(p => !p)}
              style={{ width: '100%', padding: '0.7rem', borderRadius: 12, border: '1px solid rgba(61,170,122,0.3)', background: 'rgba(61,170,122,0.1)', color: '#62C99A', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              {showPreview ? <><User size={14} /> Switch to Edit</> : <><Eye size={14} /> Switch to Preview</>}
            </button>
          </div>
          {/* Spacer on desktop */}
          <div className="hidden md:block" style={{ flex: 1 }} />
          {/* Save — always visible */}
          <button onClick={handleSave} disabled={isSaving}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '0.7rem 1.75rem', borderRadius: 12, border: 'none',
              background: isSaving ? 'rgba(61,170,122,0.2)' : 'linear-gradient(135deg, #3DAA7A 0%, #2D8060 100%)',
              color: isSaving ? 'rgba(216,237,226,0.5)' : '#fff',
              fontWeight: 700, fontSize: '0.9rem', cursor: isSaving ? 'not-allowed' : 'pointer',
              boxShadow: isSaving ? 'none' : '0 4px 15px rgba(61,170,122,0.3)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { if (!isSaving) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(61,170,122,0.4)'; } }}
            onMouseLeave={e => { if (!isSaving) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(61,170,122,0.3)'; } }}>
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#050A07', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ animation: 'spin 1s linear infinite', color: '#3DAA7A' }}>Loading...</div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}
