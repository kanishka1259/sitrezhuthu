'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
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
  Loader2, ChevronDown, User, Upload, X, Check, Link as LinkIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Inline Submit-to-Community Modal ── */
function SubmitModal({ onClose, portfolio, user, getIdToken }: { onClose: () => void; portfolio: any; user: any; getIdToken: () => Promise<string | null> }) {
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
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Submission failed.');
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
                We'll capture your current <strong style={{ color: '#3DAA7A', fontWeight: 500 }}>template + style settings</strong> automatically. After review, your design goes live.
              </div>
              {status === 'error' && <p style={{ color: '#ef4444', fontSize: '.85rem' }}>{error}</p>}
              <button type="submit" disabled={status === 'sending'}
                style={{ padding: '0.9rem', background: '#3DAA7A', border: 'none', borderRadius: 14, color: '#FAF9F6', fontWeight: 600, fontSize: '0.95rem', cursor: status === 'sending' ? 'not-allowed' : 'pointer', marginTop: '0.5rem', transition: 'transform .2s' }}
                onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.transform  = 'scale(1.02)'; }}
                onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.transform  = 'scale(1)'; }}>
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
  const router = useRouter();
  const portfolio = usePortfolioStore();

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  /* ── Auth guard ── */
  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  /* ── Load saved portfolio or reset ── */
  useEffect(() => {
    if (user) {
      if (!id) {
        portfolio.reset();
        return;
      }
      getIdToken().then(token => {
        if (!token) return;
        axios.get(`/api/portfolio?id=${id}`, { headers: { Authorization: `Bearer ${token}` } })
          .then(r => { if (r.data && Object.keys(r.data).length > 0) portfolio.loadFromDB(r.data); })
          .catch(() => { });
      });
    }
  }, [user, id]);

  /* ── Save handler ── */
  const handleSave = useCallback(async () => {
    if (isSaving) return;
    setIsSaving(true);
    setSaveMessage('');
    try {
      const token = await getIdToken();
      const username = portfolio.slug || (portfolio as any).username || user?.email?.split('@')[0]?.toLowerCase().replace(/[^a-z0-9-]/g, '-') || 'portfolio';
      const r = await axios.post('/api/portfolio', { ...portfolio, username }, { headers: { Authorization: `Bearer ${token}` } });

      if (!portfolio._id && r.data._id) {
        portfolio.loadFromDB({ _id: r.data._id, username: r.data.username });
        router.replace(`/editor?id=${r.data._id}`);
      }

      setSaveMessage('Saved successfully');
      setTimeout(() => setSaveMessage(''), 3500);
    } catch (err: any) {
      setSaveMessage(err.response?.data?.error || 'Save failed');
      setTimeout(() => setSaveMessage(''), 4000);
    } finally {
      setIsSaving(false);
    }
  }, [isSaving, user, portfolio, getIdToken]);

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

  const username = portfolio.slug || (portfolio as any).username || user.email?.split('@')[0]?.toLowerCase().replace(/[^a-z0-9-]/g, '-') || 'portfolio';
  const publicUrl = `/${username}`;

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: '#050A07', overflow: 'hidden' }}>

      {/* ── Top Navigation Bar ── */}
      <nav style={{ flexShrink: 0, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.25rem', borderBottom: '1px solid rgba(61,170,122,0.05)', background: 'rgba(10,10,12,0.8)', backdropFilter: 'blur(20px)', zIndex: 50 }}>

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
              <Link key={href} href={href} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.4rem 0.75rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, color: '#e5e7eb', transition: 'all .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#FAF9F6'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#e5e7eb'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                <Icon size={14} /> {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Preview button + user menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Mobile preview toggle */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="md:hidden"
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.4rem 0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e5e7eb', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer' }}>
            <Eye size={14} /> {showPreview ? 'Edit' : 'Preview'}
          </button>

          {/* Submit to community */}
          <button onClick={() => setShowSubmit(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.4rem 0.75rem', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: 8, color: '#e5e7eb', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = '#FAF9F6'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = '#e5e7eb'; }}>
            <Upload size={14} /> Share Design
          </button>

          {/* Public link */}
          <Link href={publicUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.4rem 0.75rem', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, color: '#FAF9F6', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', transition: 'all .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.15)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.1)'; }}>
            <ExternalLink size={14} /> View Live
          </Link>

          {/* Copy Share Link */}
          <button onClick={() => {
            navigator.clipboard.writeText(window.location.origin + publicUrl);
            alert('Link copied to clipboard!');
          }}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.4rem 0.75rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, color: '#FAF9F6', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(16,185,129,0.15)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(16,185,129,0.1)'; }}>
            <LinkIcon size={14} /> Share
          </button>

          {/* User menu */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setUserMenuOpen(!userMenuOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.35rem 0.5rem 0.35rem 0.35rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20, color: '#e5e7eb', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#3DAA7A,#D97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 600, flexShrink: 0 }}>
                {user.displayName?.charAt(0)?.toUpperCase() || <User size={12} />}
              </div>
              <ChevronDown size={14} style={{ opacity: 0.5, transform: userMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.15 }}
                  style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, minWidth: 200, background: '#EAE8E3', border: '1px solid rgba(61,170,122,0.1)', borderRadius: 16, overflow: 'hidden', zIndex: 100, boxShadow: '0 12px 24px rgba(0,0,0,0.3)' }}>
                  <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(61,170,122,0.05)' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#3DAA7A' }}>{user.displayName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#3DAA7A', marginTop: 4, fontWeight: 400 }}>{user.email}</div>
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

      {/* ── Submit Modal ── */}
      {showSubmit && <SubmitModal onClose={() => setShowSubmit(false)} portfolio={portfolio} user={user} getIdToken={getIdToken} />}

      {/* ── Main Split Layout ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {/* Form Panel — scrolls independently */}
        <div style={{
          width: '42%', flexShrink: 0,
          overflowY: 'auto',
          borderRight: '1px solid rgba(61,170,122,0.05)',
          display: showPreview ? 'none' : 'flex',
          flexDirection: 'column',
          background: 'rgba(10,10,12,0.5)',
        }} className="md:flex! md:w-[42%]!">
          <FormPanel onSave={handleSave} isSaving={isSaving} saveMessage={saveMessage} />
        </div>

        {/* Live Preview — scrolls independently */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          background: '#050A07',
          ...(showPreview ? {} : { display: 'none' }),
        }} className="md:flex!">
          <LivePreview />
        </div>
      </div>

      {/* ── Footer Bar (Edit / Preview / Save) — always visible ── */}
      <div style={{ flexShrink: 0, borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,12,0.95)', backdropFilter: 'blur(30px)', padding: '0.75rem 1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center', boxShadow: '0 -10px 40px rgba(0,0,0,0.5)' }}>
        {/* Edit / Preview toggle — only shown on mobile */}
        <div className="md:hidden" style={{ display: 'flex', gap: '0.6rem', flex: 1 }}>
          <button onClick={() => setShowPreview(false)}
            style={{ flex: 1, padding: '0.7rem', borderRadius: 12, border: !showPreview ? '1px solid rgba(61,170,122,0.3)' : '1px solid rgba(255,255,255,0.05)', background: !showPreview ? 'rgba(61,170,122,0.1)' : 'transparent', color: !showPreview ? '#62C99A' : '#6b7280', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <User size={14} /> Edit
          </button>
          <button onClick={() => setShowPreview(true)}
            style={{ flex: 1, padding: '0.7rem', borderRadius: 12, border: showPreview ? '1px solid rgba(61,170,122,0.3)' : '1px solid rgba(255,255,255,0.05)', background: showPreview ? 'rgba(61,170,122,0.1)' : 'transparent', color: showPreview ? '#62C99A' : '#6b7280', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Eye size={14} /> Preview
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
