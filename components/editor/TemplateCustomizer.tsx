'use client';

import { usePortfolioStore } from '@/store/usePortfolioStore';
import { RotateCcw, Palette, Type, Layout, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const FONT_OPTIONS = [
  'Inter', 'Space Grotesk', 'Outfit', 'Plus Jakarta Sans',
  'JetBrains Mono', 'Roboto Mono', 'Fira Code',
  'Playfair Display', 'DM Serif Display', 'Syne',
];

const COLOR_PRESETS: { name: string; primary: string; secondary: string; bg: string; text: string; muted: string; card: string; border: string }[] = [
  { name: 'Violet', primary: '#8b5cf6', secondary: '#0ea5e9', bg: '#f8f7ff', text: '#1e1b4b', muted: '#64748b', card: '#ffffff', border: '#e0e7ff' },
  { name: 'Emerald', primary: '#059669', secondary: '#10b981', bg: '#f0fdf4', text: '#064e3b', muted: '#6b7280', card: '#ffffff', border: '#d1fae5' },
  { name: 'Rose', primary: '#e11d48', secondary: '#fb7185', bg: '#fff1f2', text: '#881337', muted: '#9f1239', card: '#ffe4e6', border: '#fecdd3' },
  { name: 'Amber', primary: '#d97706', secondary: '#ea580c', bg: '#fffbeb', text: '#78350f', muted: '#92400e', card: '#fef3c7', border: '#fde68a' },
  { name: 'Indigo', primary: '#4f46e5', secondary: '#818cf8', bg: '#eef2ff', text: '#1e1b4b', muted: '#4338ca', card: '#ffffff', border: '#c7d2fe' },
  { name: 'Cyan', primary: '#0891b2', secondary: '#22d3ee', bg: '#f0fdfa', text: '#134e4a', muted: '#115e59', card: '#ccfbf1', border: '#99f6e4' },
  { name: 'Dark+', primary: '#a78bfa', secondary: '#f472b6', bg: '#09050f', text: '#e8e8e8', muted: '#94a3b8', card: '#1e1e2e', border: '#2d2d3b' },
  { name: 'Hacker', primary: '#00ff88', secondary: '#00cc66', bg: '#050505', text: '#e2e8f0', muted: '#64748b', card: '#111111', border: '#222222' },
];

const sectionLabel = (label: string) => (
  <p style={{ fontSize: '.65rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.1em', margin: '1.25rem 0 .6rem' }}>{label}</p>
);

interface ColorRowProps { label: string; value: string; onChange: (v: string) => void; }
function ColorRow({ label, value, onChange }: ColorRowProps) {
  // Guard: if value is not a valid hex for the color input, use a fallback
  const safeHex = /^#[0-9a-fA-F]{3,8}$/.test(value) ? value : '#000000';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.4rem 0', borderBottom: '1px solid var(--editor-border)' }}>
      <span style={{ fontSize: '.78rem', color: 'var(--editor-text)', fontWeight: 500 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
        <span style={{ fontSize: '.72rem', color: 'var(--editor-text-muted)', fontFamily: 'monospace' }}>{value}</span>
        <label style={{ position: 'relative', cursor: 'pointer', display: 'flex' }}>
          <input type="color" value={safeHex} onChange={e => onChange(e.target.value)}
            style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
          <div style={{ width: 28, height: 28, borderRadius: 6, background: value, border: '2px solid var(--editor-border-strong)', cursor: 'pointer', flexShrink: 0, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.2)' }} />
        </label>
      </div>
    </div>
  );
}

interface SliderRowProps { label: string; value: number; min: number; max: number; unit?: string; onChange: (v: number) => void; }
function SliderRow({ label, value, min, max, unit = '', onChange }: SliderRowProps) {
  return (
    <div style={{ padding: '.4rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.35rem' }}>
        <span style={{ fontSize: '.78rem', color: 'var(--editor-text)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: '.72rem', color: '#3DAA7A', fontWeight: 700 }}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(+e.target.value)}
        style={{ width: '100%', accentColor: '#3DAA7A', cursor: 'pointer' }} />
    </div>
  );
}

export function TemplateCustomizer() {
  const { templateStyles: s, setTemplateStyle, setTemplateStyles, resetTemplateStyles, template } = usePortfolioStore();
  const [tab, setTab] = useState<'colors' | 'type' | 'layout'>('colors');

  const inputCls: React.CSSProperties = {
    width: '100%', padding: '.45rem .75rem', background: 'var(--editor-input-bg)',
    border: '1px solid var(--editor-input-border)', borderRadius: 8, color: 'var(--editor-text)',
    fontSize: '.8rem', outline: 'none',
  };

  // Derived: is background dark?
  const isDarkBg = (() => {
    const hex = (s.bgColor || '#ffffff').replace('#', '');
    if (hex.length < 6) return false;
    const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
    return (r*0.299 + g*0.587 + b*0.114) < 128;
  })();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '.2rem', marginBottom: '.75rem' }}>
        {([
          ['colors', Palette, 'Colors'],
          ['type', Type, 'Fonts'],
          ['layout', Layout, 'Layout'],
        ] as const).map(([id, Icon, label]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '.45rem .25rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '.7rem', fontWeight: 700, transition: 'all .2s',
              background: tab === id ? 'rgba(61,170,122,0.15)' : 'var(--editor-btn-ghost)',
              color: tab === id ? '#3DAA7A' : 'var(--editor-text-muted)',
            }}>
            <Icon size={11} />{label}
          </button>
        ))}
        <button onClick={resetTemplateStyles} title="Reset to defaults"
          style={{ padding: '.45rem .5rem', borderRadius: 8, border: '1px solid var(--editor-border-strong)', background: 'var(--editor-btn-ghost)', color: 'var(--editor-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all .2s' }}>
          <RotateCcw size={11} />
        </button>
      </div>

      {/* ── Colors Tab ── */}
      {tab === 'colors' && (
        <div>
          {sectionLabel('Quick Presets')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '.4rem', marginBottom: '.5rem' }}>
            {COLOR_PRESETS.map(preset => (
              <button key={preset.name} title={preset.name}
                onClick={() => {
                  setTemplateStyles({
                    primaryColor: preset.primary,
                    secondaryColor: preset.secondary,
                  });
                }}
                style={{ padding: '.35rem', borderRadius: 6, border: '1px solid var(--editor-border-strong)', background: preset.bg, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: preset.primary }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: preset.secondary }} />
                </div>
                <span style={{ fontSize: '.58rem', color: preset.text, fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,.2)' }}>{preset.name}</span>
              </button>
            ))}
          </div>

          {/* Live color preview strip */}
          <div style={{ display: 'flex', height: 24, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--editor-border-strong)', marginBottom: '.75rem', marginTop: '.25rem' }}>
            {[s.primaryColor, s.secondaryColor, s.bgColor, s.cardBg, s.textColor, s.mutedColor, s.borderColor].map((c, i) => (
              <div key={i} style={{ flex: 1, background: c }} title={c} />
            ))}
          </div>

          {sectionLabel('Custom Colors')}
          <ColorRow label="Primary" value={s.primaryColor} onChange={v => setTemplateStyle('primaryColor', v)} />
          <ColorRow label="Secondary" value={s.secondaryColor} onChange={v => setTemplateStyle('secondaryColor', v)} />
          <ColorRow label="Background" value={s.bgColor} onChange={v => setTemplateStyle('bgColor', v)} />
          <ColorRow label="Text" value={s.textColor} onChange={v => setTemplateStyle('textColor', v)} />
          <ColorRow label="Muted" value={s.mutedColor} onChange={v => setTemplateStyle('mutedColor', v)} />
          <ColorRow label="Card BG" value={s.cardBg} onChange={v => setTemplateStyle('cardBg', v)} />
          <ColorRow label="Border" value={s.borderColor} onChange={v => setTemplateStyle('borderColor', v)} />

          {/* Live mini-preview showing name on bg */}
          <div style={{ marginTop: '.75rem', borderRadius: 10, overflow: 'hidden', border: `1px solid ${s.borderColor}` }}>
            <div style={{ background: s.bgColor, padding: '.75rem 1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '.9rem', color: s.textColor, marginBottom: '.25rem' }}>Your Name</div>
              <div style={{ fontSize: '.75rem', color: s.mutedColor }}>Developer & Designer</div>
              <div style={{ marginTop: '.5rem', display: 'flex', gap: '.5rem' }}>
                <span style={{ background: s.primaryColor, color: isDarkBg ? s.textColor : '#fff', fontSize: '.65rem', padding: '.2rem .55rem', borderRadius: 6, fontWeight: 700 }}>Hire Me</span>
                <span style={{ background: s.cardBg, border: `1px solid ${s.borderColor}`, color: s.textColor, fontSize: '.65rem', padding: '.2rem .55rem', borderRadius: 6, fontWeight: 600 }}>GitHub</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Fonts Tab ── */}
      {tab === 'type' && (
        <div>
          {sectionLabel('Heading Font')}
          <select value={s.headingFont} onChange={e => setTemplateStyle('headingFont', e.target.value)} style={{ ...inputCls, marginBottom: '.75rem' }}>
            {FONT_OPTIONS.map(f => <option key={f} value={f} style={{ background: '#1e293b', color: '#e2e8f0' }}>{f}</option>)}
          </select>

          {sectionLabel('Body Font')}
          <select value={s.bodyFont} onChange={e => setTemplateStyle('bodyFont', e.target.value)} style={{ ...inputCls }}>
            {FONT_OPTIONS.map(f => <option key={f} value={f} style={{ background: '#1e293b', color: '#e2e8f0' }}>{f}</option>)}
          </select>

          <div style={{ marginTop: '1rem', padding: '.75rem', background: 'var(--editor-card-bg)', borderRadius: 8, border: '1px solid var(--editor-card-border)' }}>
            <p style={{ fontFamily: `'${s.headingFont}', sans-serif`, fontSize: '1.1rem', fontWeight: 700, color: 'var(--editor-text)', marginBottom: '.25rem' }}>Heading Preview</p>
            <p style={{ fontFamily: `'${s.bodyFont}', sans-serif`, fontSize: '.82rem', color: 'var(--editor-text-muted)' }}>Body text preview — the quick brown fox jumps over the lazy dog.</p>
          </div>
        </div>
      )}

      {/* ── Layout Tab ── */}
      {tab === 'layout' && (
        <div>
          {sectionLabel('Shape & Radius')}
          <SliderRow label="Card Radius" value={s.borderRadius} min={0} max={32} unit="px" onChange={v => setTemplateStyle('borderRadius', v)} />
          <SliderRow label="Button Radius" value={s.buttonRadius} min={0} max={32} unit="px" onChange={v => setTemplateStyle('buttonRadius', v)} />

          {sectionLabel('Spacing & Width')}
          <SliderRow label="Max Width" value={s.maxWidth} min={700} max={1400} unit="px" onChange={v => setTemplateStyle('maxWidth', v)} />
          <SliderRow label="Section Gap" value={s.sectionGap} min={10} max={80} unit="px" onChange={v => setTemplateStyle('sectionGap', v)} />

          {sectionLabel('Avatar')}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.4rem 0' }}>
            <span style={{ fontSize: '.78rem', color: 'var(--editor-text)', fontWeight: 500 }}>Show Avatar</span>
            <button onClick={() => setTemplateStyle('showAvatar', !s.showAvatar)}
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '.35rem .75rem', borderRadius: 8, border: 'none', background: s.showAvatar ? 'rgba(61,170,122,0.15)' : 'var(--editor-btn-ghost)', color: s.showAvatar ? '#3DAA7A' : 'var(--editor-text-muted)', cursor: 'pointer', fontSize: '.75rem', fontWeight: 600, transition: 'all .2s' }}>
              {s.showAvatar ? <Eye size={12} /> : <EyeOff size={12} />} {s.showAvatar ? 'Visible' : 'Hidden'}
            </button>
          </div>

          <div style={{ padding: '.4rem 0' }}>
            <p style={{ fontSize: '.78rem', color: 'var(--editor-text)', fontWeight: 500, marginBottom: '.5rem' }}>Avatar Shape</p>
            <div style={{ display: 'flex', gap: '.4rem' }}>
              {(['circle','rounded','square'] as const).map(shape => (
                <button key={shape} onClick={() => setTemplateStyle('avatarShape', shape)}
                  style={{ flex: 1, padding: '.4rem', borderRadius: 6, border: `1.5px solid ${s.avatarShape === shape ? '#3DAA7A' : 'var(--editor-border-strong)'}`, background: s.avatarShape === shape ? 'rgba(61,170,122,0.15)' : 'var(--editor-btn-ghost)', color: s.avatarShape === shape ? '#3DAA7A' : 'var(--editor-text-muted)', cursor: 'pointer', fontSize: '.68rem', fontWeight: 700, textTransform: 'capitalize', transition: 'all .2s' }}>
                  {shape}
                </button>
              ))}
            </div>
          </div>

          {sectionLabel('Hero Layout')}
          <div style={{ display: 'flex', gap: '.4rem' }}>
            {(['left','center','split'] as const).map(layout => (
              <button key={layout} onClick={() => setTemplateStyle('heroLayout', layout)}
                style={{ flex: 1, padding: '.4rem', borderRadius: 6, border: `1.5px solid ${s.heroLayout === layout ? '#3DAA7A' : 'var(--editor-border-strong)'}`, background: s.heroLayout === layout ? 'rgba(61,170,122,0.15)' : 'var(--editor-btn-ghost)', color: s.heroLayout === layout ? '#3DAA7A' : 'var(--editor-text-muted)', cursor: 'pointer', fontSize: '.68rem', fontWeight: 700, textTransform: 'capitalize', transition: 'all .2s' }}>
                {layout}
              </button>
            ))}
          </div>

          {template === 'custom' && (<>
            {sectionLabel('Canvas Size')}
            <SliderRow label="Canvas Width" value={s.canvasWidth || 1440} min={800} max={2560} unit="px" onChange={v => setTemplateStyle('canvasWidth', v)} />
            <SliderRow label="Canvas Height" value={s.canvasHeight || 1800} min={600} max={5000} unit="px" onChange={v => setTemplateStyle('canvasHeight', v)} />
          </>)}
        </div>
      )}
    </div>
  );
}
