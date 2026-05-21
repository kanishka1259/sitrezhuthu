'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import Link from 'next/link';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { SkillInput } from './SkillInput';
import { ProjectCard } from './ProjectCard';
import { EducationCard } from './EducationCard';
import { TemplateCustomizer } from './TemplateCustomizer';
import {
  FileJson, Share2, User, Briefcase,
  GraduationCap, Mail, LayoutTemplate, CheckCircle2, Paintbrush,
  Square, Layout, Moon, Zap, Terminal, Palette, Sparkles, ShieldCheck, LayoutGrid, MousePointer2, Star
} from 'lucide-react';
import { useFirebaseAuth } from '@/lib/firebase-auth-context';
import Image from 'next/image';
import { type PortfolioData } from '@/types/portfolio';

interface FormPanelProps {
  onSave?: () => Promise<void>;
  isSaving?: boolean;
  saveMessage?: string;
}

const TEMPLATES = [
  { id: 'minimal',       name: 'Minimal',        color: '#3DAA7A', bg: 'rgba(61,170,122,0.1)',   Icon: Square },
  { id: 'cards',         name: 'Modern Cards',   color: '#D97706', bg: 'rgba(217,119,6,0.1)',   Icon: Layout },
  { id: 'dark',          name: 'Dark Pro',        color: '#3DAA7A', bg: 'rgba(61,170,122,0.1)',   Icon: Moon },
  { id: 'glassmorphism', name: 'Glass',           color: '#3DAA7A', bg: 'rgba(61,170,122,0.1)',   Icon: Zap },
  { id: 'tech-minimal',  name: 'Terminal',        color: '#3DAA7A', bg: 'rgba(61,170,122,0.1)',   Icon: Terminal },
  { id: 'creative',      name: 'Creative',        color: '#3DAA7A', bg: 'rgba(61,170,122,0.1)',   Icon: Palette },
  { id: 'neon',          name: 'Neon Cyber',      color: '#00FF88', bg: 'rgba(0,255,136,0.08)',  Icon: Sparkles },
  { id: 'executive',     name: 'Executive',       color: '#3DAA7A', bg: 'rgba(61,170,122,0.1)',   Icon: ShieldCheck },
  { id: 'bento',         name: 'Bento Grid',      color: '#3DAA7A', bg: 'rgba(61,170,122,0.1)',   Icon: LayoutGrid },
  { id: 'custom',        name: 'Custom Design',   color: '#3DAA7A', bg: 'rgba(61,170,122,0.05)', Icon: MousePointer2 },
] as const;

const TABS = [
  { id: 'basic',     label: 'Profile',   Icon: User },
  { id: 'projects',  label: 'Projects',  Icon: Briefcase },
  { id: 'education', label: 'Education', Icon: GraduationCap },
  { id: 'contact',   label: 'Contact',   Icon: Mail },
  { id: 'template',  label: 'Template',  Icon: LayoutTemplate },
  { id: 'style',     label: 'Style',     Icon: Paintbrush },
] as const;

type TabId = typeof TABS[number]['id'];

interface ProfileTabProps {
  portfolio: {
    name: string;
    slug?: string;
    isPublic: boolean;
    bio?: string;
    avatar?: string;
    allowedEmails?: string[];
    setField: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  };
  allowedEmailInput: string;
  setAllowedEmailInput: (val: string) => void;
  handleAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  uploadingAvatar: boolean;
}

// Memoized sub-components to prevent parent re-renders from affecting them
const ProfileTab = memo(({ 
  portfolio, 
  allowedEmailInput, 
  setAllowedEmailInput, 
  handleAvatarUpload, 
  uploadingAvatar 
}: ProfileTabProps) => {
  const inputCls = 'editor-input';
  const labelCls = 'editor-label';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--editor-card-bg)', borderRadius: 16, border: '1px solid var(--editor-card-border)', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--editor-text)' }}>Public Portfolio</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--editor-text-muted)', marginTop: 2, fontWeight: 400 }}>Anyone with the link can view</div>
        </div>
        <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24 }}>
          <input type="checkbox" checked={portfolio.isPublic ?? true} onChange={e => portfolio.setField('isPublic', e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
          <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: portfolio.isPublic ?? true ? 'rgba(61,170,122,0.4)' : 'rgba(255,255,255,0.1)', transition: '.2s', borderRadius: 24, border: '1px solid rgba(61,170,122,0.2)' }}>
            <span style={{ position: 'absolute', content: '""', height: 16, width: 16, left: 3, bottom: 3, backgroundColor: '#FFFFFF', transition: '.2s', borderRadius: '50%', transform: portfolio.isPublic ?? true ? 'translateX(20px)' : 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
          </span>
        </label>
      </div>

      {!(portfolio.isPublic ?? true) && (
        <div style={{ padding: '1rem', background: 'var(--editor-card-bg)', borderRadius: 14, border: '1px solid var(--editor-card-border)', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#3DAA7A', marginBottom: 6 }}>Allowed Emails</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--editor-text-muted)', marginBottom: 10, fontWeight: 400 }}>People with these emails can view your private portfolio.</div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
            <input type="email" value={allowedEmailInput} onChange={e => setAllowedEmailInput(e.target.value)} placeholder="friend@email.com" className={inputCls} style={{ flex: 1, padding: '0.5rem 0.75rem' }} onKeyDown={e => { if (e.key === 'Enter' && allowedEmailInput.trim()) { const cur: string[] = portfolio.allowedEmails || []; portfolio.setField('allowedEmails', [...new Set([...cur, allowedEmailInput.trim()])]); setAllowedEmailInput(''); } }} />
            <button onClick={() => { if (!allowedEmailInput.trim()) return; const cur: string[] = portfolio.allowedEmails || []; portfolio.setField('allowedEmails', [...new Set([...cur, allowedEmailInput.trim()])]); setAllowedEmailInput(''); }} style={{ padding: '0.5rem 0.85rem', background: '#3DAA7A', border: 'none', borderRadius: 10, color: '#3DAA7A', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }}>Add</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {(portfolio.allowedEmails || []).map((email: string) => (
              <div key={email} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 20, padding: '3px 10px', fontSize: '0.75rem', color: '#a5b4fc', fontWeight: 500 }}>
                {email}
                <button onClick={() => { const cur: string[] = portfolio.allowedEmails || []; portfolio.setField('allowedEmails', cur.filter((e: string) => e !== email)); }} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: 0, fontSize: '0.9rem', lineHeight: 1 }}>×</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <label className={labelCls} style={{ marginTop: 0 }}>Custom URL Slug</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: 'var(--editor-text)', fontSize: '0.9rem', fontWeight: 500, background: 'var(--editor-tab-active-bg)', padding: '0.65rem 1rem', borderRadius: 12 }}>sitrezhuthu.com/</span>
        <input type="text" value={portfolio.slug || ''} onChange={e => portfolio.setField('slug', e.target.value)}
          placeholder="your-name" className={inputCls} style={{ flex: 1 }} />
      </div>

      <label className={labelCls}>Full Name</label>
      <input type="text" value={portfolio.name} onChange={e => portfolio.setField('name', e.target.value)}
        placeholder="Alex Rivera" className={inputCls} />

      <label className={labelCls}>Bio / Tagline</label>
      <textarea value={portfolio.bio} onChange={e => portfolio.setField('bio', e.target.value)}
        placeholder="Full-stack developer crafting elegant digital experiences…" rows={4} className={inputCls} style={{ resize: 'vertical' }} />

      <label className={labelCls}>Avatar Image</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginTop: '0.25rem', marginBottom: '1rem', background: 'var(--editor-card-bg)', padding: '1rem', borderRadius: 16, border: '1px solid var(--editor-card-border)' }}>
        <div style={{ position: 'relative', width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--editor-border-strong)', background: 'var(--editor-input-bg)' }}>
          {portfolio.avatar ? (
            <Image src={portfolio.avatar} alt="Preview" fill style={{ objectFit: 'cover' }} sizes="56px" />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={24} color="#3DAA7A" /></div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <input type="file" accept="image/*" onChange={handleAvatarUpload} disabled={uploadingAvatar} style={{ fontSize: '0.85rem', color: 'var(--editor-text)', fontWeight: 400 }} />
          {uploadingAvatar && <div style={{ fontSize: '0.8rem', color: 'var(--editor-text-muted)', marginTop: 4, fontWeight: 500 }}>Uploading...</div>}
        </div>
      </div>

      <label className={labelCls}>Skills</label>
      <SkillInput />
    </div>
  );
});

ProfileTab.displayName = 'ProfileTab';

export function FormPanel({ saveMessage = '' }: FormPanelProps) {
  // Use specific selectors to minimize re-renders
  const name = usePortfolioStore(state => state.name);
  const slug = usePortfolioStore(state => state.slug);
  const isPublic = usePortfolioStore(state => state.isPublic);
  const bio = usePortfolioStore(state => state.bio);
  const avatar = usePortfolioStore(state => state.avatar);
  const contact = usePortfolioStore(state => state.contact);
  const template = usePortfolioStore(state => state.template);
  const allowedEmails = usePortfolioStore(state => state.allowedEmails);
  const setField = usePortfolioStore(state => state.setField);
  const updateContact = usePortfolioStore(state => state.updateContact);
  const setTemplate = usePortfolioStore(state => state.setTemplate);
  
  // Aggregate portfolio object for the memoized ProfileTab
  const portfolioSummary = useMemo(() => ({
    name, slug, isPublic, bio, avatar, allowedEmails, setField
  }), [name, slug, isPublic, bio, avatar, allowedEmails, setField]);

  const [activeTab, setActiveTab] = useState<TabId>('basic');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [allowedEmailInput, setAllowedEmailInput] = useState('');
  const { getIdToken } = useFirebaseAuth();

  const handleExportJSON = useCallback(() => {
    const state = usePortfolioStore.getState();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _history, _historyIndex, ...data } = state as unknown as Record<string, unknown>;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${name || 'portfolio'}.json`; a.click();
    URL.revokeObjectURL(url);
  }, [name]);

  const handleCopyLink = useCallback(async () => {
    if (typeof window !== 'undefined') {
      const s = slug || 'portfolio';
      await navigator.clipboard.writeText(`${window.location.origin}/${s}`);
    }
  }, [slug]);

  const handleAvatarUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const token = await getIdToken();
      const formData = new FormData();
      formData.append('file', file);
      formData.append('isAvatar', 'true');
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Upload failed with status ${res.status}`);
      }
      const data = await res.json();
      setField('avatar', data.url);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload avatar';
      alert(message);
    } finally {
      setUploadingAvatar(false);
    }
  }, [getIdToken, setField]);

  const inputCls = 'editor-input';
  const labelCls = 'editor-label';

  return (
    <div className="w-full h-full flex flex-col bg-transparent">
      {/* ── Header ── */}
      <div style={{ borderBottom: '1px solid var(--editor-border)', padding: '1.25rem 1.5rem 0.5rem', background: 'var(--editor-header-bg)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontWeight: 600, fontSize: '1.15rem', color: 'var(--editor-text)' }}>Editor</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--editor-text-muted)', marginTop: 2, fontWeight: 400 }}>
              {name ? `Editing: ${name}` : 'Build your portfolio'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {saveMessage && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 500, color: '#3DAA7A', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '0.4rem 0.75rem', borderRadius: 10 }}>
                <CheckCircle2 size={14} /> {saveMessage}
              </div>
            )}
            <button onClick={handleExportJSON} title="Export JSON" className="p-2 rounded-xl bg-jade/5 text-jade-bright hover:bg-jade/10 transition-colors border-none cursor-pointer flex items-center" style={{ color: 'var(--editor-text)' }}>
              <FileJson size={16} />
            </button>
            <button onClick={handleCopyLink} title="Copy portfolio link" className="p-2 rounded-xl bg-jade/5 text-jade-bright hover:bg-jade/10 transition-colors border-none cursor-pointer flex items-center" style={{ color: 'var(--editor-text)' }}>
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', paddingBottom: '0' }} className="no-scrollbar">
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.5rem 0.75rem', borderRadius: '8px 8px 0 0', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: 'all .2s',
                background: activeTab === id ? 'var(--editor-tab-active-bg)' : 'transparent',
                color: activeTab === id ? 'var(--editor-text)' : 'var(--editor-text-muted)',
                borderBottom: activeTab === id ? '2px solid #3DAA7A' : '2px solid transparent',
                whiteSpace: 'nowrap'
              }}>
              <Icon size={14} style={{ opacity: activeTab === id ? 1 : 0.7 }} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.5rem' }}>
        {activeTab === 'basic' && (
          <ProfileTab 
            portfolio={portfolioSummary}
            allowedEmailInput={allowedEmailInput}
            setAllowedEmailInput={setAllowedEmailInput}
            handleAvatarUpload={handleAvatarUpload}
            uploadingAvatar={uploadingAvatar}
          />
        )}

        {activeTab === 'projects' && <ProjectCard />}
        {activeTab === 'education' && <EducationCard />}

        {activeTab === 'contact' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { field: 'email' as const, label: 'Email Address', placeholder: 'alex@example.com', type: 'email' },
              { field: 'linkedin' as const, label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/yourprofile', type: 'url' },
              { field: 'github' as const, label: 'GitHub URL', placeholder: 'https://github.com/yourprofile', type: 'url' },
              { field: 'twitter' as const, label: 'Twitter / X URL', placeholder: 'https://twitter.com/yourprofile', type: 'url' },
            ].map(({ field, label, placeholder, type }) => (
              <div key={field}>
                <label className={labelCls} style={{ marginTop: field === 'email' ? 0 : 20 }}>{label}</label>
                <input type={type} value={contact[field]} onChange={e => updateContact(field, e.target.value)}
                  placeholder={placeholder} className={inputCls} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'template' && (
          <div>
            <p style={{ fontSize: '0.9rem', color: 'var(--editor-text-muted)', marginBottom: '1.5rem', lineHeight: 1.6, fontWeight: 400 }}>
              Choose a base template. Use the <strong style={{ color: 'var(--editor-text)', fontWeight: 500 }}>Style</strong> tab to customize colors, fonts & layout.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
              {TEMPLATES.map(t => (
                <button key={t.id} onClick={() => setTemplate(t.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: 16,
                    border: template === t.id ? `1.5px solid ${t.color}` : '1px solid var(--editor-card-border)',
                    background: template === t.id ? 'rgba(61,170,122,0.06)' : 'var(--editor-card-bg)',
                    cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', width: '100%',
                    boxShadow: template === t.id ? `0 4px 20px ${t.color}15` : 'none'
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: t.bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.color }}>
                    <t.Icon size={22} strokeWidth={2.5} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: template === t.id ? t.color : 'var(--editor-text)' }}>{t.name}</div>
                    {t.id === 'custom' && <div style={{ fontSize: '.75rem', color: '#3DAA7A', marginTop: 2, fontWeight: 500 }}>Canvas-based builder</div>}
                  </div>
                  {template === t.id && <CheckCircle2 size={18} style={{ color: t.color, flexShrink: 0 }} />}
                </button>
              ))}
            </div>

            <Link href="/templates"
              className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-jade/5 border border-jade/15 text-jade-bright text-[0.9rem] font-semibold no-underline hover:bg-jade/10 hover:-translate-y-px transition-all">
              <Star size={16} /> Browse Community Designs
            </Link>
          </div>
        )}

        {activeTab === 'style' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', padding: '0.85rem 1rem', background: 'var(--editor-card-bg)', border: '1px solid var(--editor-card-border)', borderRadius: 12 }}>
              <Paintbrush size={16} style={{ color: '#3DAA7A', flexShrink: 0 }} />
              <p style={{ fontSize: '0.85rem', color: 'var(--editor-text)', lineHeight: 1.5, fontWeight: 400 }}>
                Style changes apply live in the preview. They override the base template&apos;s defaults.
              </p>
            </div>
            <TemplateCustomizer />
          </div>
        )}
      </div>
    </div>
  );
}
