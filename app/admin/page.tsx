'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { CheckCircle, XCircle, Clock, ShieldCheck, Eye, ArrowLeft, RefreshCw, X } from 'lucide-react';
import { MinimalTemplate } from '@/components/templates/Minimal';
import { ModernCardsTemplate } from '@/components/templates/ModernCards';
import { DarkThemeTemplate } from '@/components/templates/DarkTheme';
import { GlassmorphismTemplate } from '@/components/templates/Glassmorphism';
import { TechMinimalTemplate } from '@/components/templates/TechMinimal';
import { FreeformCanvas } from '@/components/templates/FreeformCanvas';
import { type CustomElement, type PortfolioStore } from '@/store/usePortfolioStore';

interface CommunityTemplate {
  _id: string;
  templateName: string;
  authorName: string;
  authorEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  votes: number;
  baseTemplate: string;
  description?: string;
  createdAt?: string;
  templateStyles?: Record<string, string | undefined>;
  customElements?: CustomElement[];
  previewData?: Record<string, unknown>;
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    approved: { bg: 'rgba(74,222,128,0.15)', border: 'rgba(74,222,128,0.4)', color: '#4ade80', icon: CheckCircle, label: 'Approved' },
    rejected: { bg: 'rgba(248,113,113,0.15)', border: 'rgba(248,113,113,0.4)', color: '#f87171', icon: XCircle, label: 'Rejected' },
    pending:  { bg: 'rgba(251,191,36,0.15)',  border: 'rgba(251,191,36,0.4)',  color: '#fbbf24', icon: Clock,       label: 'Pending' },
  }[status] ?? { bg: 'rgba(148,163,184,0.15)', border: 'rgba(148,163,184,0.4)', color: '#94a3b8', icon: Clock, label: status };

  const Icon = config.icon;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '.3rem .75rem', borderRadius: 999, background: config.bg, border: `1px solid ${config.border}`, color: config.color, fontSize: '.72rem', fontWeight: 700 }}>
      <Icon size={12} /> {config.label}
    </span>
  );
}

function TemplatePreviewCard({ s }: { s: Record<string, string | undefined> | undefined }) {
  const primary = s?.primaryColor || '#3DAA7A';
  const bg      = s?.bgColor      || '#f8f7ff';
  return (
    <div style={{ width: 120, height: 80, borderRadius: 8, background: bg, padding: '.5rem', display: 'flex', flexDirection: 'column', gap: '.25rem', overflow: 'hidden', flexShrink: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: 28, height: 4, borderRadius: 2, background: primary, opacity: .8 }} />
        <div style={{ display: 'flex', gap: 3 }}>{[1,2,3].map(i => <div key={i} style={{ width: 12, height: 3, borderRadius: 1, background: primary, opacity: .3 }} />)}</div>
      </div>
      <div style={{ width: '60%', height: 5, borderRadius: 2, background: primary, opacity: .7 }} />
      <div style={{ width: '40%', height: 3, borderRadius: 1, background: primary, opacity: .35 }} />
      <div style={{ display: 'flex', gap: 3, marginTop: 2 }}>
        {[1,2].map(i => <div key={i} style={{ flex: 1, borderRadius: 4, height: 18, background: 'rgba(61,170,122,0.4)', border: `1px solid ${primary}22` }} />)}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [templates, setTemplates] = useState<CommunityTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<CommunityTemplate | null>(null);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    try {
      const params = filter === 'all' ? '' : `?status=${filter}`;
      const r = await axios.get(`/api/templates/community${params}`);
      setTemplates(r.data);
    } catch {
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setActionLoading(id + action);
    try {
      await axios.patch('/api/templates/community', { id, action });
      setTemplates(prev => prev.map(t => t._id === id ? { ...t, status: action === 'approve' ? 'approved' : 'rejected' } : t));
    } catch { /* soft fail */ } finally {
      setActionLoading(null);
    }
  };

  const counts = templates.reduce((acc, t) => { acc[t.status] = (acc[t.status] || 0) + 1; return acc; }, {} as Record<string, number>);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#09050f,#12082a,#09050f)', color: '#3DAA7A' }}>
      {/* Ambient */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: 500, height: 500, background: 'radial-gradient(circle,rgba(124,58,237,.18) 0%,transparent 70%)', borderRadius: '50%' }} />
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.85)', backdropFilter: 'blur(8px)' }}>
          <div style={{ width: '90vw', height: '90vh', background: '#0D1510', border: '1px solid rgba(61,170,122,.1)', borderRadius: 24, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(61,170,122,.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(61,170,122,.02)' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>{previewTemplate.templateName}</h3>
                <div style={{ fontSize: '.8rem', color: 'rgba(61,170,122,.5)' }}>by {previewTemplate.authorName}</div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {previewTemplate.status !== 'approved' && (
                  <button onClick={() => { handleAction(previewTemplate._id, 'approve'); setPreviewTemplate(null); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '.5rem 1.2rem', background: '#4ade80', border: 'none', borderRadius: 8, color: '#052e16', fontWeight: 700, cursor: 'pointer' }}>
                    <CheckCircle size={14} /> Approve
                  </button>
                )}
                {previewTemplate.status !== 'rejected' && (
                  <button onClick={() => { handleAction(previewTemplate._id, 'reject'); setPreviewTemplate(null); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '.5rem 1.2rem', background: '#f87171', border: 'none', borderRadius: 8, color: '#450a0a', fontWeight: 700, cursor: 'pointer' }}>
                    <XCircle size={14} /> Reject
                  </button>
                )}
                <button onClick={() => setPreviewTemplate(null)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, background: 'rgba(61,170,122,.1)', border: 'none', borderRadius: 8, color: '#3DAA7A', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>
            </div>
            <div style={{ flex: 1, position: 'relative', overflowY: 'auto' }}>
              {(() => {
                const p = previewTemplate;
                const data = { ...p.previewData, template: p.baseTemplate, templateStyles: p.templateStyles, customElements: p.customElements || [] } as unknown as PortfolioStore;
                switch (p.baseTemplate) {
                  case 'minimal':       return <MinimalTemplate data={data} />;
                  case 'cards':         return <ModernCardsTemplate data={data} />;
                  case 'dark':          return <DarkThemeTemplate data={data} />;
                  case 'glassmorphism': return <GlassmorphismTemplate data={data} />;
                  case 'tech-minimal':  return <TechMinimalTemplate data={data} />;
                  case 'custom':        return <FreeformCanvas data={data} isEditor={false} />;
                  default:              return <MinimalTemplate data={data} />;
                }
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(9,5,15,.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(61,170,122,.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link href="/" style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '.06em', textDecoration: 'none', background: 'linear-gradient(90deg,#3DAA7A,#3DAA7A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              SITREZHUTHU
            </Link>
            <div style={{ width: 1, height: 18, background: 'rgba(61,170,122,.1)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={16} style={{ color: '#3DAA7A' }} />
              <span style={{ fontSize: '.85rem', fontWeight: 700, color: '#3DAA7A' }}>Admin Panel</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '.75rem' }}>
            <Link href="/templates" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '.45rem .9rem', background: 'rgba(61,170,122,.06)', border: '1px solid rgba(61,170,122,.1)', borderRadius: 8, color: 'rgba(61,170,122,.7)', fontSize: '.78rem', fontWeight: 600, textDecoration: 'none' }}>
              <ArrowLeft size={13} /> Community Gallery
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '3rem 2rem 6rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '.35rem 1rem', background: 'rgba(167,139,250,.12)', border: '1px solid rgba(167,139,250,.25)', borderRadius: 999, fontSize: '.75rem', fontWeight: 600, color: '#3DAA7A', marginBottom: '1rem' }}>
            <ShieldCheck size={13} /> Admin · Template Review
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-.03em', marginBottom: '.5rem' }}>Community Template Review</h1>
          <p style={{ color: 'rgba(61,170,122,.5)', fontSize: '1rem' }}>Review, approve, or reject community-submitted templates. Approved templates are immediately visible to all users.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Pending Review', count: counts.pending || 0, color: '#fbbf24', bg: 'rgba(251,191,36,.1)', border: 'rgba(251,191,36,.2)' },
            { label: 'Approved', count: counts.approved || 0, color: '#4ade80', bg: 'rgba(74,222,128,.1)', border: 'rgba(74,222,128,.2)' },
            { label: 'Rejected', count: counts.rejected || 0, color: '#f87171', bg: 'rgba(248,113,113,.1)', border: 'rgba(248,113,113,.2)' },
          ].map(s => (
            <div key={s.label} style={{ padding: '1.25rem', background: s.bg, border: `1px solid ${s.border}`, borderRadius: 14, textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.count}</div>
              <div style={{ fontSize: '.78rem', color: 'rgba(61,170,122,.5)', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.75rem', alignItems: 'center' }}>
          {(['pending', 'all', 'approved', 'rejected'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: '.45rem 1rem', borderRadius: 999, fontSize: '.78rem', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all .2s', background: filter === f ? 'linear-gradient(135deg,#3DAA7A,#3DAA7A)' : 'rgba(61,170,122,.07)', color: filter === f ? '#3DAA7A' : 'rgba(61,170,122,.5)', textTransform: 'capitalize' }}>
              {f}
            </button>
          ))}
          <button onClick={fetchTemplates}
            style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '.45rem .9rem', background: 'rgba(61,170,122,.06)', border: '1px solid rgba(61,170,122,.1)', borderRadius: 8, color: 'rgba(61,170,122,.6)', fontSize: '.78rem', fontWeight: 600, cursor: 'pointer' }}>
            <RefreshCw size={13} /> Refresh
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(61,170,122,.4)' }}>Loading submissions…</div>
        ) : templates.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(61,170,122,.3)', background: 'rgba(61,170,122,.03)', borderRadius: 16, border: '1px solid rgba(61,170,122,.07)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '.75rem' }}>📭</div>
            <p>No {filter === 'all' ? '' : filter} submissions found.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {templates.map(tpl => (
              <div key={tpl._id} style={{ background: 'rgba(61,170,122,.03)', border: '1px solid rgba(61,170,122,.08)', borderRadius: 16, padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', transition: 'border-color .2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor  = 'rgba(167,139,250,.25)'}
                onMouseLeave={e => e.currentTarget.style.borderColor  = 'rgba(61,170,122,.08)'}>

                {/* Mini preview */}
                <TemplatePreviewCard s={tpl.templateStyles} />

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', flexWrap: 'wrap', marginBottom: '.3rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '.95rem' }}>{tpl.templateName}</span>
                    <StatusBadge status={tpl.status} />
                    {tpl.status === 'approved' && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '.2rem .6rem', borderRadius: 999, background: 'rgba(99,102,241,.2)', border: '1px solid rgba(99,102,241,.4)', color: '#818cf8', fontSize: '.65rem', fontWeight: 700 }}>
                        <ShieldCheck size={10} /> Verified by Admin
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '.78rem', color: '#3DAA7A', fontWeight: 600, marginBottom: '.25rem' }}>by {tpl.authorName} · {tpl.authorEmail}</div>
                  {tpl.description && <p style={{ fontSize: '.8rem', color: 'rgba(61,170,122,.4)', lineHeight: 1.5, marginBottom: '.4rem' }}>{tpl.description}</p>}
                  <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '.65rem', padding: '.2rem .55rem', borderRadius: 6, background: 'rgba(167,139,250,.1)', color: '#3DAA7A', fontWeight: 600 }}>Base: {tpl.baseTemplate}</span>
                    <span style={{ fontSize: '.65rem', padding: '.2rem .55rem', borderRadius: 6, background: 'rgba(61,170,122,.07)', color: 'rgba(61,170,122,.45)', fontWeight: 600 }}>❤ {tpl.votes || 0} votes</span>
                    <span style={{ fontSize: '.65rem', padding: '.2rem .55rem', borderRadius: 6, background: 'rgba(61,170,122,.07)', color: 'rgba(61,170,122,.45)', fontWeight: 600 }}>
                      {tpl.createdAt ? new Date(tpl.createdAt).toLocaleDateString() : '—'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '.5rem', flexShrink: 0 }}>
                  <button
                    onClick={() => setPreviewTemplate(tpl)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '.5rem 1rem', background: 'rgba(61,170,122,.05)', border: '1px solid rgba(61,170,122,.15)', borderRadius: 8, color: '#3DAA7A', fontSize: '.78rem', fontWeight: 700, cursor: 'pointer', transition: 'all .2s' }}>
                    <Eye size={13} /> Preview
                  </button>
                  {tpl.status !== 'approved' && (
                    <button
                      onClick={() => handleAction(tpl._id, 'approve')}
                      disabled={actionLoading === tpl._id + 'approve'}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '.5rem 1rem', background: 'rgba(74,222,128,.15)', border: '1px solid rgba(74,222,128,.35)', borderRadius: 8, color: '#4ade80', fontSize: '.78rem', fontWeight: 700, cursor: 'pointer', transition: 'all .2s', opacity: actionLoading === tpl._id + 'approve' ? .5 : 1 }}>
                      <CheckCircle size={13} /> Approve
                    </button>
                  )}
                  {tpl.status !== 'rejected' && (
                    <button
                      onClick={() => handleAction(tpl._id, 'reject')}
                      disabled={actionLoading === tpl._id + 'reject'}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '.5rem 1rem', background: 'rgba(248,113,113,.1)', border: '1px solid rgba(248,113,113,.3)', borderRadius: 8, color: '#f87171', fontSize: '.78rem', fontWeight: 700, cursor: 'pointer', transition: 'all .2s', opacity: actionLoading === tpl._id + 'reject' ? .5 : 1 }}>
                      <XCircle size={13} /> Reject
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
