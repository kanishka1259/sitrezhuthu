'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useFirebaseAuth } from '@/lib/firebase-auth-context';
import { Navbar } from '@/components/common/Navbar';
import { Plus, Edit3, Trash2, ExternalLink, LayoutDashboard, Loader2, Clock, FileText, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GOLD = '#3DAA7A';
const GOLD_BRIGHT = '#62C99A';

const TEMPLATE_ACCENTS: Record<string, string> = {
  neon: '#6EE7B7', dark: '#A78BFA', glassmorphism: '#93C5FD',
  creative: '#F9A8D4', executive: '#7DD3FC', bento: '#A5B4FC',
  'tech-minimal': '#86EFAC', cards: '#67E8F9', minimal: GOLD_BRIGHT,
  custom: '#FCD34D',
};

function PortfolioCard({ p, onDelete }: { p: any; onDelete: (id: string, e: React.MouseEvent) => void }) {
  const accent = TEMPLATE_ACCENTS[p.template] || GOLD_BRIGHT;
  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      style={{ background: '#121D16', border: '1px solid rgba(240,230,211,0.07)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.22s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `rgba(61,170,122,0.28)`; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 36px rgba(0,0,0,0.4)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(240,230,211,0.07)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
    >
      {/* Accent strip */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${accent}80, ${accent}20)` }} />

      <Link href={`/editor?id=${p._id}`} style={{ display: 'block', padding: '20px 20px 0', textDecoration: 'none', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <h3 style={{ fontWeight: 600, fontSize: 15, color: '#D8EDE2', marginBottom: 6 }}>{p.name || p.username || 'Untitled Portfolio'}</h3>
            <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 6, background: `${accent}12`, color: accent, border: `1px solid ${accent}28`, letterSpacing: '0.03em' }}>{p.template || 'minimal'}</span>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(61,170,122,0.08)', border: '1px solid rgba(61,170,122,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FileText size={15} style={{ color: GOLD }} />
          </div>
        </div>

        {p.bio && <p style={{ fontSize: 13, color: '#3E6050', lineHeight: 1.65, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' as any }}>{p.bio}</p>}

        {p.skills?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
            {p.skills.slice(0, 4).map((s: string, i: number) => (
              <span key={i} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 5, background: 'rgba(240,230,211,0.04)', color: '#2E4A38', border: '1px solid rgba(240,230,211,0.06)' }}>{s}</span>
            ))}
            {p.skills.length > 4 && <span style={{ fontSize: 11, color: '#2E4A38' }}>+{p.skills.length - 4}</span>}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 16, color: '#2E4A38', fontSize: 12 }}>
          <Clock size={11} />
          {new Date(p.updatedAt || p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          {p.isPublic && <span style={{ marginLeft: 'auto', fontSize: 11, color: GOLD_BRIGHT, background: 'rgba(61,170,122,0.08)', padding: '2px 8px', borderRadius: 5, border: `1px solid rgba(61,170,122,0.2)` }}>● Live</span>}
        </div>
      </Link>

      <div style={{ padding: '12px 16px 16px', borderTop: '1px solid rgba(61,170,122,0.06)', display: 'flex', gap: 8 }}>
        <Link href={`/editor?id=${p._id}`} className="btn-primary" style={{ flex: 1, padding: '9px', fontSize: 13, textDecoration: 'none', borderRadius: 8, gap: 6 }}>
          <Edit3 size={13} /> Edit
        </Link>
        {p.slug && (
          <a href={`/${p.slug}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="btn-ghost" style={{ padding: '9px 12px', borderRadius: 8, textDecoration: 'none' }}>
            <ExternalLink size={14} />
          </a>
        )}
        <button onClick={e => onDelete(p._id, e)} style={{ padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(192,80,80,0.14)', color: '#C05050', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(192,80,80,0.08)'; e.currentTarget.style.borderColor = 'rgba(192,80,80,0.28)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(192,80,80,0.14)'; }}
          aria-label="Delete"
        ><Trash2 size={14} /></button>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { user, loading, getIdToken } = useFirebaseAuth();
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) { router.push('/login'); return; }
    if (user) fetchPortfolios();
  }, [user, loading, router]);

  const fetchPortfolios = async () => {
    try {
      const token = await getIdToken();
      if (!token) return;
      const res = await axios.get('/api/portfolio', { headers: { Authorization: `Bearer ${token}` } });
      setPortfolios(Array.isArray(res.data) ? res.data : []);
    } catch { console.error('Failed to fetch portfolios'); }
    finally { setIsLoading(false); }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!confirm('Delete this portfolio? This cannot be undone.')) return;
    try {
      const token = await getIdToken();
      await axios.delete(`/api/portfolio?id=${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setPortfolios(prev => prev.filter(p => p._id !== id));
    } catch { alert('Failed to delete portfolio'); }
  };

  if (loading || isLoading) {
    return (
      <div style={{ minHeight: '100vh', background: '#070C09', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={28} style={{ color: GOLD, animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#070C09', color: '#D8EDE2' }}>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 24px 80px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 700, fontSize: 28, color: '#D8EDE2', marginBottom: 6, letterSpacing: '-0.02em' }}>My Projects</h1>
            <p style={{ fontSize: 14, color: '#2E4A38' }}>{portfolios.length === 0 ? 'No portfolios yet.' : `${portfolios.length} portfolio${portfolios.length === 1 ? '' : 's'}`}</p>
          </div>
          <Link href="/templates" className="btn-primary" style={{ textDecoration: 'none', fontSize: 14, padding: '10px 22px', borderRadius: 10 }}>
            <Plus size={15} /> New Portfolio
          </Link>
        </div>

        {/* Empty state */}
        {portfolios.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', border: '1px solid rgba(61,170,122,0.1)', borderRadius: 20, background: '#0D1510', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: '30%', right: '30%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(61,170,122,0.3), transparent)' }} />
            <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(61,170,122,0.08)', border: '1px solid rgba(61,170,122,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <LayoutDashboard size={28} style={{ color: GOLD, opacity: 0.7 }} />
            </div>
            <h2 style={{ fontWeight: 600, fontSize: 20, color: '#D8EDE2', marginBottom: 10 }}>No portfolios yet</h2>
            <p style={{ fontSize: 14, color: '#2E4A38', maxWidth: 300, margin: '0 auto 28px', lineHeight: 1.7 }}>Browse our templates and create your first professional portfolio.</p>
            <Link href="/templates" className="btn-primary" style={{ textDecoration: 'none' }}>
              <Zap size={15} /> Explore Templates
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
            <AnimatePresence>
              {portfolios.map(p => <PortfolioCard key={p._id} p={p} onDelete={handleDelete} />)}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
