'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Eye, Edit3, X, Zap, Sparkles,
  Monitor, Tablet, Smartphone,
  Heart, Upload, Check, Loader2, Plus
} from 'lucide-react';
import { usePortfolioStore, TEMPLATE_DEFAULTS, TemplateStyles, PortfolioStore } from '@/store/usePortfolioStore';
import { CustomElement } from '@/types/portfolio';
import { Navbar } from '@/components/common/Navbar';
import { useFirebaseAuth } from '@/lib/firebase-auth-context';
import { MinimalTemplate } from '@/components/templates/Minimal';
import { ModernCardsTemplate } from '@/components/templates/ModernCards';
import { DarkThemeTemplate } from '@/components/templates/DarkTheme';
import { GlassmorphismTemplate } from '@/components/templates/Glassmorphism';
import { TechMinimalTemplate } from '@/components/templates/TechMinimal';
import { CreativeTemplate } from '@/components/templates/Creative';
import { NeonTemplate } from '@/components/templates/Neon';
import { ExecutiveTemplate } from '@/components/templates/Executive';
import { BentoTemplate } from '@/components/templates/Bento';

import { DEMO, templates, categories, SAMPLE_TEMPLATES, TemplateId, TemplateMeta } from '@/lib/templates-data';
import { memo, useMemo, useRef } from 'react';

// ─── tiny live mini-preview thumbnails ──────────────────────────────────────
const LiveThumbnail = memo(function LiveThumbnail({ templateId, templateStyles, customElements, gradient }: { templateId: TemplateId, templateStyles: TemplateStyles, customElements?: CustomElement[], gradient?: string }) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const demoData = useMemo(() => ({ ...DEMO, template: templateId, templateStyles, customElements } as unknown as PortfolioStore), [templateId, templateStyles, customElements]);

  const renderTemplate = () => {
    if (!isInView) return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(61,170,122,0.03)' }}>
        <Loader2 size={24} className="animate-spin text-[#3DAA7A]/20" />
      </div>
    );
    switch (templateId) {
      case 'minimal': return <MinimalTemplate data={demoData} />;
      case 'cards': return <ModernCardsTemplate data={demoData} />;
      case 'dark': return <DarkThemeTemplate data={demoData} />;
      case 'glassmorphism': return <GlassmorphismTemplate data={demoData} />;
      case 'tech-minimal': return <TechMinimalTemplate data={demoData} />;
      case 'creative': return <CreativeTemplate data={demoData} />;
      case 'neon': return <NeonTemplate data={demoData} />;
      case 'executive': return <ExecutiveTemplate data={demoData} />;
      case 'bento': return <BentoTemplate data={demoData} />;
      default: return <MinimalTemplate data={demoData} />;
    }
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', background: gradient || templateStyles.bgColor || '#000' }}>
      <div style={{
        width: '1200px',
        height: '800px',
        transform: 'scale(0.35)',
        transformOrigin: 'top left',
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0
      }}>
        {renderTemplate()}
      </div>
    </div>
  );
});

// ─── Preview Modal ────────────────────────────────────────────────────────────

function PreviewModal({ template, onClose, onUse }: { template: TemplateMeta; onClose: () => void; onUse: () => void }) {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const demoData = useMemo(() => ({ ...DEMO, template: template.id, templateStyles: TEMPLATE_DEFAULTS[template.id as TemplateId] ?? TEMPLATE_DEFAULTS['minimal'] } as unknown as PortfolioStore), [template.id]);

  const widths = { desktop: '100%', tablet: '768px', mobile: '390px' };

  const renderTemplate = () => {
    switch (template.id) {
      case 'minimal': return <MinimalTemplate data={demoData} />;
      case 'cards': return <ModernCardsTemplate data={demoData} />;
      case 'dark': return <DarkThemeTemplate data={demoData} />;
      case 'glassmorphism': return <GlassmorphismTemplate data={demoData} />;
      case 'tech-minimal': return <TechMinimalTemplate data={demoData} />;
      case 'creative': return <CreativeTemplate data={demoData} />;
      case 'neon': return <NeonTemplate data={demoData} />;
      case 'executive': return <ExecutiveTemplate data={demoData} />;
      case 'bento': return <BentoTemplate data={demoData} />;
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
    >
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', background: '#EAE8E3', borderBottom: '1px solid rgba(61,170,122,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontWeight: 600, fontSize: '1rem', color: '#3DAA7A' }}>{template.name}</span>
          <span style={{ fontSize: '0.8rem', color: '#888888', fontWeight: 400 }}>Live Preview · Demo data</span>
        </div>
        <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(61,170,122,0.05)', padding: '0.25rem', borderRadius: 10 }}>
          {([['desktop', Monitor], ['tablet', Tablet], ['mobile', Smartphone]] as const).map(([vp, Icon]) => (
            <button
              key={vp}
              onClick={() => setViewport(vp)}
              style={{
                padding: '0.35rem 0.7rem', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', fontWeight: 500, transition: 'all .2s',
                background: viewport === vp ? '#3DAA7A' : 'transparent',
                color: viewport === vp ? '#000' : '#3DAA7A',
                border: 'none'
              }}
            >
              <Icon size={14} />
              {vp.charAt(0).toUpperCase() + vp.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onUse}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.6rem 1.25rem', background: '#3DAA7A', border: 'none', borderRadius: 12, color: '#FAF9F6', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Edit3 size={14} /> Use This Template
          </button>
          <button onClick={onClose} style={{ background: 'rgba(61,170,122,0.05)', border: 'none', borderRadius: 10, padding: '0.6rem', cursor: 'pointer', color: '#3DAA7A', display: 'flex', alignItems: 'center' }}>
            <X size={16} />
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: viewport === 'desktop' ? 0 : '2rem', background: '#FAF9F6' }}>
        <motion.div
          key={viewport}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          style={{
            width: widths[viewport],
            maxWidth: widths[viewport],
            minHeight: '100%',
            overflowX: 'hidden',
            boxShadow: viewport !== 'desktop' ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
            borderRadius: viewport !== 'desktop' ? 24 : 0,
            border: viewport !== 'desktop' ? '1px solid rgba(61,170,122,0.1)' : 'none',
          }}
        >
          {renderTemplate()}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Submission Modal (Community) ───────────────────────────────────────────────────────
function SubmitModal({ onClose }: { onClose: () => void }) {
  const portfolio = usePortfolioStore();
  const { getIdToken } = useFirebaseAuth();
  const [form, setForm] = useState({ authorName: '', authorEmail: '', templateName: '', description: '' });
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
          skills: portfolio.skills.slice(0, 6),
          projects: portfolio.projects.slice(0, 2),
          education: portfolio.education.slice(0, 1),
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

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '.65rem .85rem', background: 'rgba(61,170,122,.06)',
    border: '1px solid rgba(61,170,122,.12)', borderRadius: 10, color: '#3DAA7A',
    fontSize: '.85rem', outline: 'none', transition: 'border-color .2s',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(6px)' }}>
      <div style={{ background: 'rgba(15,10,30,.98)', border: '1px solid rgba(61,170,122,.1)', borderRadius: 20, padding: '2rem', width: '100%', maxWidth: 500, position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(61,170,122,.08)', border: 'none', borderRadius: 8, padding: '.35rem', color: 'rgba(61,170,122,.6)', cursor: 'pointer', display: 'flex' }}>
          <X size={16} />
        </button>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(74,222,128,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <Check size={30} style={{ color: '#4ade80' }} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '.5rem' }}>Submitted!</h3>
            <p style={{ color: 'rgba(61,170,122,.5)', fontSize: '.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Your template has been submitted for review. Once approved by our team, it will appear in the community gallery automatically.
            </p>
            <button onClick={onClose} style={{ padding: '.65rem 1.5rem', background: '#3DAA7A', border: 'none', borderRadius: 10, color: '#050A07', fontWeight: 700, cursor: 'pointer' }}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1.5rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(98,201,154,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Upload size={16} style={{ color: '#3DAA7A' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#3DAA7A' }}>Submit Your Design</h3>
                <p style={{ fontSize: '.72rem', color: 'rgba(61,170,122,.6)' }}>Your current template style will be captured</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, color: 'rgba(61,170,122,.5)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.4rem' }}>Your Name *</label>
                  <input required style={inputStyle} value={form.authorName} onChange={e => setForm(f => ({ ...f, authorName: e.target.value }))} placeholder="Alex Rivera" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, color: 'rgba(61,170,122,.5)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.4rem' }}>Email *</label>
                  <input required type="email" style={inputStyle} value={form.authorEmail} onChange={e => setForm(f => ({ ...f, authorEmail: e.target.value }))} placeholder="alex@example.com" />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, color: 'rgba(61,170,122,.5)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.4rem' }}>Template Name *</label>
                <input required style={inputStyle} value={form.templateName} onChange={e => setForm(f => ({ ...f, templateName: e.target.value }))} placeholder="My Awesome Dark Theme" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, color: 'rgba(61,170,122,.5)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.4rem' }}>Description</label>
                <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe what makes your design unique…" />
              </div>

              <div style={{ padding: '.75rem', background: 'rgba(61,170,122,.06)', border: '1px solid rgba(61,170,122,.15)', borderRadius: 10, fontSize: '.75rem', color: 'rgba(61,170,122,.6)', lineHeight: 1.6, display: 'flex', gap: 8 }}>
                <Sparkles size={14} style={{ flexShrink: 0, marginTop: 2, color: '#3DAA7A' }} />
                <span>We&apos;ll capture your current <strong style={{ color: '#3DAA7A' }}>template + style settings</strong> automatically. After review, your design will be added to the gallery.</span>
              </div>

              {status === 'error' && <p style={{ color: '#f87171', fontSize: '.8rem' }}>{error}</p>}

              <button type="submit" disabled={status === 'sending'}
                style={{
                  padding: '.85rem', background: status === 'sending' ? 'rgba(61,170,122,.2)' : 'linear-gradient(135deg, #3DAA7A 0%, #2D8060 100%)',
                  border: 'none', borderRadius: 12, color: status === 'sending' ? 'rgba(216,237,226,0.5)' : '#FAF9F6',
                  fontWeight: 700, fontSize: '.9rem', cursor: status === 'sending' ? 'not-allowed' : 'pointer', transition: 'all .2s'
                }}>
                {status === 'sending' ? <Loader2 size={18} className="animate-spin mx-auto" /> : 'Submit Template'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Unified Template Card ───────────────────────────────────────────────────────────
// ─── Unified Template Card ───────────────────────────────────────────────────────────
function TemplateCard({
  template,
  isCommunity,
  onPreview,
  onUse,
  onVote
}: {
  template: TemplateMeta | Record<string, unknown>;
  isCommunity?: boolean;
  onPreview: (t: TemplateMeta | Record<string, unknown>) => void;
  onUse: (t: TemplateMeta | Record<string, unknown>) => void;
  onVote?: (id: string) => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = template as any;
  const styles = isCommunity ? t.templateStyles : (TEMPLATE_DEFAULTS[t.id as TemplateId] ?? TEMPLATE_DEFAULTS['minimal']);
  const baseId = (isCommunity ? t.baseTemplate : t.id) as TemplateId;
  const name = isCommunity ? t.templateName : t.name;
  const tagline = isCommunity ? `by ${t.authorName}` : t.tagline;
  const accent = isCommunity ? (styles.primaryColor || '#3DAA7A') : t.accentColor;

  return (
    <motion.div layout
      className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-surface)] flex flex-col hover:-translate-y-1 hover:border-[var(--border-lit)] transition-all duration-300 shadow-md">
      <div className="h-[200px] relative mx-3 mt-3 rounded-[16px] overflow-hidden cursor-pointer" onClick={() => onPreview(t)}>
        <LiveThumbnail
          templateId={baseId}
          templateStyles={styles}
          customElements={isCommunity ? t.customElements : undefined}
          gradient={!isCommunity ? t.gradient : styles.bgColor}
        />

        {isCommunity && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[9px] font-bold bg-[#3DAA7A] text-[#050A07] uppercase tracking-wider shadow-lg">
            Community Design
          </div>
        )}
        {!isCommunity && t.badge && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-lg" style={{ background: t.badgeColor }}>
            {t.badge as string}
          </div>
        )}

        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-[2px]">
          <div className="flex items-center gap-2 px-5 py-3 bg-white/20 rounded-xl text-sm font-semibold text-white backdrop-blur-md">
            <Eye size={16} /> Preview
          </div>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold text-[1.15rem] mb-1 text-[var(--text)]">{name as string}</div>
            <div className="text-sm font-medium" style={{ color: accent }}>{tagline as string}</div>
          </div>
          <div className="text-xs text-[var(--text-muted)] font-medium flex items-center gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); onVote?.(isCommunity ? t._id : t.id); }}
              className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer bg-transparent border-none p-0"
              title={t.liked ? "Unlike this template" : "Like this template"}
            >
              <Heart size={12} className={t.liked ? "fill-rose-400 text-rose-400" : "text-rose-400 hover:fill-rose-400"} />
              <span className="text-[var(--text-muted)]">{((isCommunity ? t.votes : t.likes) ?? 0).toLocaleString()}</span>
            </button>
            <span className="flex items-center gap-1">
              <Eye size={12} style={{ color: accent }} />
              {((t.views) ?? 0).toLocaleString()}
            </span>
          </div>
        </div>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed font-normal line-clamp-2">
          {isCommunity ? t.description as string : t.description as string}
        </p>
        {!isCommunity && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {(t.features || []).slice(0, 3).map((f: string) => (
              <span key={f} className="text-[10px] px-2 py-1 bg-[var(--bg-hover)] border border-[var(--border)] rounded-md text-[var(--text)] font-medium uppercase tracking-tight">{f}</span>
            ))}
          </div>
        )}
        {isCommunity && (
          <div className="mt-auto flex items-center gap-2">
            <span className="text-[10px] px-2 py-1 bg-[#3DAA7A]/10 border border-[#3DAA7A]/20 rounded-md text-[#3DAA7A] font-bold uppercase">
              Base: {t.baseTemplate as string}
            </span>
          </div>
        )}
      </div>

      <div className="px-6 pb-6 flex gap-3">
        <button onClick={() => onPreview(t)}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--text)] hover:bg-[var(--bg-hover)] transition-colors">
          <Eye size={16} /> Preview
        </button>
        <button onClick={() => onUse(t)}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#3DAA7A] text-[#050A07] text-sm font-bold hover:scale-[1.03] transition-transform">
          <Edit3 size={16} /> Use Template
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Templates Page ───────────────────────────────────────────────────────────
export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePreview, setActivePreview] = useState<TemplateMeta | Record<string, unknown> | null>(null);

  // Community State
  const [communityTemplates, setCommunityTemplates] = useState<Array<Record<string, unknown> & { _id?: string }>>([]);
  const [communityLoading, setCommunityLoading] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);

  const { setTemplate, setTemplateStyle } = usePortfolioStore();
  const { getIdToken } = useFirebaseAuth();
  const router = useRouter();

  // Official template likes — persisted in localStorage
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [dbStats, setDbStats] = useState<Record<string, { likes: number; views: number }>>({});

  useEffect(() => {
    try {
      const savedLiked = localStorage.getItem('template-liked-ids');
      if (savedLiked) setLikedIds(new Set(JSON.parse(savedLiked)));
    } catch { /* ignore */ }

    // Fetch official template stats from MongoDB
    axios.get('/api/templates/stats')
      .then(r => {
        const statsMap: Record<string, { likes: number; views: number }> = {};
        if (Array.isArray(r.data)) {
          r.data.forEach((s: any) => {
            statsMap[s.templateId] = { likes: s.likes || 0, views: s.views || 0 };
          });
        }
        setDbStats(statsMap);
      })
      .catch(() => {});
  }, []);

  const handlePreview = async (t: any) => {
    setActivePreview(t);
    const isComm = !!t._id;
    const id = isComm ? t._id : t.id;
    try {
      if (isComm) {
        await axios.patch('/api/templates/community', { id, action: 'view' });
        setCommunityTemplates(prev => prev.map(item => item._id === id ? { ...item, views: ((item.views as number) || 0) + 1 } : item));
      } else {
        const r = await axios.patch('/api/templates/stats', { id, action: 'view' });
        if (r.data?.success) {
          setDbStats(prev => ({
            ...prev,
            [id]: {
              likes: r.data.likes,
              views: r.data.views
            }
          }));
        }
      }
    } catch { /* soft fail */ }
  };

  const handleOfficialVote = async (id: string) => {
    const isLiked = likedIds.has(id);
    const action = isLiked ? 'unlike' : 'like';

    // Optimistic UI update
    setLikedIds(prev => {
      const next = new Set(prev);
      if (isLiked) next.delete(id); else next.add(id);
      localStorage.setItem('template-liked-ids', JSON.stringify([...next]));
      return next;
    });

    setDbStats(prev => {
      const stats = prev[id] || { likes: 0, views: 0 };
      return {
        ...prev,
        [id]: { ...stats, likes: Math.max(0, stats.likes + (isLiked ? -1 : 1)) }
      };
    });

    try {
      const r = await axios.patch('/api/templates/stats', { id, action });
      if (r.data?.success) {
        setDbStats(prev => ({
          ...prev,
          [id]: { likes: r.data.likes, views: r.data.views }
        }));
      }
    } catch { /* soft fail, keep optimistic update */ }
  };

  // Fetch community templates on mount
  useEffect(() => {
    axios.get('/api/templates/community')
      .then(r => setCommunityTemplates(r.data.length ? r.data : SAMPLE_TEMPLATES))
      .catch(() => setCommunityTemplates(SAMPLE_TEMPLATES))
      .finally(() => setCommunityLoading(false));
  }, []);

  const handleUseOfficial = (id: TemplateId) => {
    setActivePreview(null);
    setTemplate(id);
    router.push(`/editor?template=${id}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUseCommunity = (tpl: any) => {
    setTemplate(tpl.baseTemplate as TemplateId);
    if (tpl.templateStyles) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.entries(tpl.templateStyles as Record<string, any>).forEach(([k, v]) => setTemplateStyle(k as keyof TemplateStyles, v));
    }
    usePortfolioStore.getState().setField('customElements', (tpl.customElements as CustomElement[]) || []);
    router.push(`/editor?template=${tpl.baseTemplate}`);
  };

  const handleVote = async (id: string) => {
    const isLiked = likedIds.has(id);
    const action = isLiked ? 'unvote' : 'vote';

    // Optimistic UI update
    setLikedIds(prev => {
      const next = new Set(prev);
      if (isLiked) next.delete(id); else next.add(id);
      localStorage.setItem('template-liked-ids', JSON.stringify([...next]));
      return next;
    });

    setCommunityTemplates(prev => prev.map(t => 
      t._id === id ? { ...t, votes: Math.max(0, ((t.votes as number) || 0) + (isLiked ? -1 : 1)) } : t
    ));

    try {
      const token = await getIdToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      await axios.patch('/api/templates/community', { id, action }, { headers });
    } catch { /* soft fail, keep optimistic update */ }
  };

  const filteredOfficial = selectedCategory === 'All' || selectedCategory === 'Official'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  // Enrich official templates with database likes & views
  const enrichedOfficial = filteredOfficial.map(t => {
    const stats = dbStats[t.id] || { likes: 0, views: 0 };
    return {
      ...t,
      likes: stats.likes,
      views: stats.views,
      liked: likedIds.has(t.id),
    };
  });

  const filteredCommunity = (selectedCategory === 'All' || selectedCategory === 'Community'
    ? communityTemplates
    : []).map(t => ({ ...t, liked: likedIds.has(t._id as string) }));

  const displayCategories = ['All', 'Official', 'Community', ...categories.filter(c => c !== 'All')];

  return (
    <>
      <AnimatePresence>
        {activePreview && (
          <PreviewModal
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            template={(activePreview as any).id ? activePreview : { ...activePreview, id: (activePreview as any).baseTemplate } as any}
            onClose={() => setActivePreview(null)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onUse={() => (activePreview as any).id ? handleUseOfficial((activePreview as any).id) : handleUseCommunity(activePreview as Record<string, unknown>)}
          />
        )}
      </AnimatePresence>

      {showSubmit && <SubmitModal onClose={() => setShowSubmit(false)} />}

      <div className="min-h-screen font-sans bg-[var(--bg)] text-[var(--text)] overflow-hidden relative">
        {/* Background Orbs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[10%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-tr from-[#3DAA7A]/15 to-[#3DAA7A]/15 blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tl from-[#3DAA7A]/10 to-[#3DAA7A]/10 blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute top-[30%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3DAA7A]/20 to-transparent shadow-[0_0_30px_#3DAA7A]" />
        </div>

        <Navbar />

        <main className="relative z-10 max-w-[1200px] mx-auto px-6 pb-24">

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-center pt-24 pb-16">

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-[var(--text)]">
              Pick your perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3DAA7A] to-[#62C99A]">template</span>
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-[600px] mx-auto leading-relaxed">
              Choose from our high-fidelity official layouts or unique creative designs shared by the community.
            </p>

            <div className="mt-12 flex flex-wrap gap-2 justify-center">
              {displayCategories.map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat ? 'bg-[#3DAA7A] text-[#050A07] shadow-[0_0_15px_rgba(61,170,122,0.3)]' : 'bg-[var(--bg-surface)] border border-[var(--border-lit)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-warm)]'
                    }`}>
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <h2 className="text-xl font-bold text-[var(--text)] flex items-center gap-2">
              <Zap size={20} className="text-[#3DAA7A]" />
              {selectedCategory} Designs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {/* Create Custom Design Card */}
              <motion.div
                layout
                className="rounded-[24px] border-2 border-dashed border-[var(--border-warm)] hover:border-[#3DAA7A]/60 bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group min-h-[420px] shadow-sm"
                onClick={() => {
                  setTemplate('custom' as TemplateId);
                  router.push('/editor?template=custom');
                }}
                whileHover={{ y: -4 }}
              >
                <div className="flex flex-col items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-[#3DAA7A]/10 border border-[#3DAA7A]/20 flex items-center justify-center group-hover:bg-[#3DAA7A]/20 group-hover:border-[#3DAA7A]/40 group-hover:scale-110 transition-all duration-300">
                    <Plus size={36} className="text-[#3DAA7A]/60 group-hover:text-[#3DAA7A] transition-colors duration-300" />
                  </div>
                  <div className="text-center px-4">
                    <div className="text-lg font-bold text-[var(--text)] transition-colors mb-1">Create Custom</div>
                    <div className="text-sm text-[var(--text-muted)] transition-colors max-w-[200px]">Design your own layout from scratch with the canvas editor</div>
                  </div>
                </div>
              </motion.div>

              {/* Official Templates */}
              {enrichedOfficial.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onPreview={handlePreview}
                  onUse={() => handleUseOfficial(template.id)}
                  onVote={handleOfficialVote}
                />
              ))}

              {/* Community Templates */}
              {!communityLoading && filteredCommunity.map((tpl) => (
                <TemplateCard
                  key={tpl._id as string}
                  template={tpl}
                  isCommunity
                  onPreview={handlePreview}
                  onUse={handleUseCommunity}
                  onVote={handleVote}
                />
              ))}
            </AnimatePresence>
          </div>

          {communityLoading && selectedCategory !== 'Official' && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 size={32} className="animate-spin text-[#3DAA7A]" />
              <p className="text-[var(--text-muted)] font-medium">Discovering community gems...</p>
            </div>
          )}

          {!communityLoading && filteredCommunity.length === 0 && selectedCategory === 'Community' && (
            <div className="text-center py-24 border border-dashed border-[var(--border-lit)] rounded-3xl">
              <Sparkles size={48} className="mx-auto text-[var(--text-muted)] opacity-20 mb-4" />
              <h3 className="text-xl font-bold text-[var(--text)] mb-2">No community designs found</h3>
              <p className="text-[var(--text-muted)]">Be the first to share your creative layout!</p>
            </div>
          )}

        </main>
      </div>
    </>
  );
}
