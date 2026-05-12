'use client';

import { usePortfolioStore, TemplateStyles, TEMPLATE_DEFAULTS } from '@/store/usePortfolioStore';
import { RotateCcw, Palette, Type, Layout, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const FONT_OPTIONS = [
  'Inter', 'Space Grotesk', 'Outfit', 'Plus Jakarta Sans',
  'JetBrains Mono', 'Roboto Mono', 'Fira Code',
  'Playfair Display', 'DM Serif Display', 'Syne',
];

const COLOR_PRESETS: { name: string; primary: string; secondary: string; bg: string; text: string }[] = [
  { name: 'Violet', primary: '#3DAA7A', secondary: '#0ea5e9', bg: '#f8f7ff', text: '#1e1b4b' },
  { name: 'Emerald', primary: '#059669', secondary: '#3DAA7A', bg: '#f0fdf4', text: '#064e3b' },
  { name: 'Rose', primary: '#3DAA7A', secondary: '#3DAA7A', bg: '#fff1f2', text: '#881337' },
  { name: 'cyan', primary: '#d97706', secondary: '#ea580c', bg: '#fffbeb', text: '#78350f' },
  { name: 'Indigo', primary: '#4f46e5', secondary: '#3DAA7A', bg: '#eef2ff', text: '#1e1b4b' },
  { name: 'cyan', primary: '#3DAA7A', secondary: '#3DAA7A', bg: '#f0fdfa', text: '#134e4a' },
  { name: 'Dark+', primary: '#3DAA7A', secondary: '#3DAA7A', bg: '#09050f', text: '#e8e8e8' },
  { name: 'Hacker', primary: '#00ff88', secondary: '#00cc66', bg: '#050505', text: '#e2e8f0' },
];

const sectionLabel = (label: string) => (
  <p style={{ fontSize: '.65rem', fontWeight: 700, color: 'rgba(61,170,122,.35)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '1.25rem 0 .6rem' }}>{label}</p>
);

interface ColorRowProps { label: string; value: string; onChange: (v: string) => void; }
function ColorRow({ label, value, onChange }: ColorRowProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.4rem 0' }}>
      <span style={{ fontSize: '.78rem', color: 'rgba(61,170,122,.6)', fontWeight: 500 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
        <span style={{ fontSize: '.72rem', color: 'rgba(61,170,122,.3)', fontFamily: 'monospace' }}>{value}</span>
        <label style={{ position: 'relative', cursor: 'pointer' }}>
          <input type="color" value={value} onChange={e => onChange(e.target.value)}
            style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
          <div style={{ width: 28, height: 28, borderRadius: 6, background: value, border: '2px solid rgba(61,170,122,.2)', cursor: 'pointer', flexShrink: 0 }} />
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
        <span style={{ fontSize: '.78rem', color: 'rgba(61,170,122,.6)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: '.72rem', color: '#3DAA7A', fontWeight: 700 }}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(+e.target.value)}
        style={{ width: '100%', accentColor: '#3DAA7A', cursor: 'pointer' }} />
    </div>
  );
}

export function TemplateCustomizer() {
  const { templateStyles: s, setTemplateStyle, resetTemplateStyles, template } = usePortfolioStore();
  const [tab, setTab] = useState<'colors' | 'type' | 'layout'>('colors');

  const inputCls: React.CSSProperties = {
    width: '100%', padding: '.45rem .75rem', background: 'rgba(61,170,122,.06)',
    border: '1px solid rgba(61,170,122,.12)', borderRadius: 8, color: '#3DAA7A',
    fontSize: '.8rem', outline: 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '.2rem', marginBottom: '.75rem' }}>
        {([
          ['colors', Palette, 'Colors'],
          ['type', Type, 'Fonts'],
          ['layout', Layout, 'Layout'],
        ] as const).map(([id, Icon, label]) => (
          <button key={id} onClick={() => setTab(id as any)}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '.45rem .25rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '.7rem', fontWeight: 700, transition: 'all .2s',
              background: tab === id ? 'rgba(124,58,237,.3)' : 'rgba(61,170,122,.05)',
              color: tab === id ? '#3DAA7A' : 'rgba(61,170,122,.4)',
            }}>
            <Icon size={11} />{label}
          </button>
        ))}
        <button onClick={resetTemplateStyles} title="Reset to defaults"
          style={{ padding: '.45rem .5rem', borderRadius: 8, border: '1px solid rgba(61,170,122,.1)', background: 'rgba(61,170,122,.05)', color: 'rgba(61,170,122,.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all .2s' }}>
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
                  setTemplateStyle('primaryColor', preset.primary);
                  setTemplateStyle('secondaryColor', preset.secondary);
                  setTemplateStyle('bgColor', preset.bg);
                  setTemplateStyle('textColor', preset.text);
                }}
                style={{ padding: '.35rem', borderRadius: 6, border: '1px solid rgba(61,170,122,.1)', background: 'rgba(61,170,122,.04)', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: preset.primary }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: preset.secondary }} />
                </div>
                <span style={{ fontSize: '.58rem', color: 'rgba(61,170,122,.4)', fontWeight: 600 }}>{preset.name}</span>
              </button>
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
        </div>
      )}

      {/* ── Fonts Tab ── */}
      {tab === 'type' && (
        <div>
          {sectionLabel('Heading Font')}
          <select value={s.headingFont} onChange={e => setTemplateStyle('headingFont', e.target.value)} style={{ ...inputCls, marginBottom: '.75rem' }}>
            {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>

          {sectionLabel('Body Font')}
          <select value={s.bodyFont} onChange={e => setTemplateStyle('bodyFont', e.target.value)} style={{ ...inputCls }}>
            {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>

          <div style={{ marginTop: '1rem', padding: '.75rem', background: 'rgba(61,170,122,.04)', borderRadius: 8, border: '1px solid rgba(61,170,122,.08)' }}>
            <p style={{ fontFamily: `'${s.headingFont}', sans-serif`, fontSize: '1.1rem', fontWeight: 700, color: '#3DAA7A', marginBottom: '.25rem' }}>Heading Preview</p>
            <p style={{ fontFamily: `'${s.bodyFont}', sans-serif`, fontSize: '.82rem', color: 'rgba(61,170,122,.5)' }}>Body text preview — the quick brown fox jumps over the lazy dog.</p>
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
            <span style={{ fontSize: '.78rem', color: 'rgba(61,170,122,.6)', fontWeight: 500 }}>Show Avatar</span>
            <button onClick={() => setTemplateStyle('showAvatar', !s.showAvatar)}
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '.35rem .75rem', borderRadius: 8, border: 'none', background: s.showAvatar ? 'rgba(124,58,237,.3)' : 'rgba(61,170,122,.07)', color: s.showAvatar ? '#3DAA7A' : 'rgba(61,170,122,.4)', cursor: 'pointer', fontSize: '.75rem', fontWeight: 600, transition: 'all .2s' }}>
              {s.showAvatar ? <Eye size={12} /> : <EyeOff size={12} />} {s.showAvatar ? 'Visible' : 'Hidden'}
            </button>
          </div>

          <div style={{ padding: '.4rem 0' }}>
            <p style={{ fontSize: '.78rem', color: 'rgba(61,170,122,.6)', fontWeight: 500, marginBottom: '.5rem' }}>Avatar Shape</p>
            <div style={{ display: 'flex', gap: '.4rem' }}>
              {(['circle','rounded','square'] as const).map(shape => (
                <button key={shape} onClick={() => setTemplateStyle('avatarShape', shape)}
                  style={{ flex: 1, padding: '.4rem', borderRadius: 6, border: `1.5px solid ${s.avatarShape === shape ? 'rgba(124,58,237,.6)' : 'rgba(61,170,122,.1)'}`, background: s.avatarShape === shape ? 'rgba(124,58,237,.2)' : 'rgba(61,170,122,.04)', color: s.avatarShape === shape ? '#3DAA7A' : 'rgba(61,170,122,.4)', cursor: 'pointer', fontSize: '.68rem', fontWeight: 700, textTransform: 'capitalize', transition: 'all .2s' }}>
                  {shape}
                </button>
              ))}
            </div>
          </div>

          {sectionLabel('Hero Layout')}
          <div style={{ display: 'flex', gap: '.4rem' }}>
            {(['left','center','split'] as const).map(layout => (
              <button key={layout} onClick={() => setTemplateStyle('heroLayout', layout)}
                style={{ flex: 1, padding: '.4rem', borderRadius: 6, border: `1.5px solid ${s.heroLayout === layout ? 'rgba(124,58,237,.6)' : 'rgba(61,170,122,.1)'}`, background: s.heroLayout === layout ? 'rgba(124,58,237,.2)' : 'rgba(61,170,122,.04)', color: s.heroLayout === layout ? '#3DAA7A' : 'rgba(61,170,122,.4)', cursor: 'pointer', fontSize: '.68rem', fontWeight: 700, textTransform: 'capitalize', transition: 'all .2s' }}>
                {layout}
              </button>
            ))}
          </div>

          {template === 'custom' && (<>
            {sectionLabel('Canvas Size')}
            <SliderRow label="Canvas Width" value={(s as any).canvasWidth || 1440} min={800} max={2560} unit="px" onChange={v => setTemplateStyle('canvasWidth' as any, v)} />
            <SliderRow label="Canvas Height" value={(s as any).canvasHeight || 1800} min={600} max={5000} unit="px" onChange={v => setTemplateStyle('canvasHeight' as any, v)} />
          </>)}
        </div>
      )}
    </div>
  );
}
