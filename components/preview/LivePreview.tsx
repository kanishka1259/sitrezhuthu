'use client';

import { useState } from 'react';
import { usePortfolioStore, TEMPLATE_DEFAULTS, type TemplateId } from '@/store/usePortfolioStore';
import { MinimalTemplate } from '@/components/templates/Minimal';
import { ModernCardsTemplate } from '@/components/templates/ModernCards';
import { DarkThemeTemplate } from '@/components/templates/DarkTheme';
import { GlassmorphismTemplate } from '@/components/templates/Glassmorphism';
import { TechMinimalTemplate } from '@/components/templates/TechMinimal';
import { CreativeTemplate } from '@/components/templates/Creative';
import { NeonTemplate } from '@/components/templates/Neon';
import { ExecutiveTemplate } from '@/components/templates/Executive';
import { BentoTemplate } from '@/components/templates/Bento';
import { FreeformCanvas } from '@/components/templates/FreeformCanvas';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

type Viewport = 'desktop' | 'tablet' | 'mobile';

const VIEWPORT_WIDTHS: Record<Viewport, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px',
};

export function LivePreview() {
  const portfolio = usePortfolioStore();
  const [viewport, setViewport] = useState<Viewport>('desktop');

  // Merge stored templateStyles with the template's defaults so all tokens are present
  const baseStyles = TEMPLATE_DEFAULTS[portfolio.template as TemplateId] ?? TEMPLATE_DEFAULTS['minimal'];
  const mergedStyles = { ...baseStyles, ...(portfolio.templateStyles || {}) };
  const data = { ...portfolio, templateStyles: mergedStyles } as any;

  const renderTemplate = () => {
    switch (portfolio.template) {
      case 'minimal':       return <MinimalTemplate data={data} />;
      case 'cards':         return <ModernCardsTemplate data={data} />;
      case 'dark':          return <DarkThemeTemplate data={data} />;
      case 'glassmorphism': return <GlassmorphismTemplate data={data} />;
      case 'tech-minimal':  return <TechMinimalTemplate data={data} />;
      case 'creative':      return <CreativeTemplate data={data} />;
      case 'neon':          return <NeonTemplate data={data} />;
      case 'executive':     return <ExecutiveTemplate data={data} />;
      case 'bento':         return <BentoTemplate data={data} />;
      case 'custom':        return <FreeformCanvas data={data} isEditor={true} />;
      default:              return <MinimalTemplate data={data} />;
    }
  };

  // For the custom canvas template, it takes full editor space
  if (portfolio.template === 'custom') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {renderTemplate()}
      </div>
    );
  }

  const isNarrow = viewport !== 'desktop';

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D1510' }}>

      {/* ── Toolbar ── */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem', borderBottom: '1px solid rgba(61,170,122,0.06)', background: 'rgba(9,5,15,0.9)', backdropFilter: 'blur(12px)' }}>
        {/* Live badge + template name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(61,170,122,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Live Preview</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#3DAA7A', background: 'rgba(167,139,250,0.12)', padding: '0.15rem 0.55rem', borderRadius: 6 }}>
            {portfolio.template}
          </span>
          {/* Color dot showing primary color */}
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: mergedStyles.primaryColor, border: '1.5px solid rgba(61,170,122,.2)', flexShrink: 0 }} title={`Primary: ${mergedStyles.primaryColor}`} />
        </div>

        {/* Viewport switcher */}
        <div style={{ display: 'flex', gap: 2, background: 'rgba(61,170,122,0.05)', borderRadius: 8, padding: '0.2rem' }}>
          {([['desktop', Monitor], ['tablet', Tablet], ['mobile', Smartphone]] as const).map(([vp, Icon]) => (
            <button key={vp} onClick={() => setViewport(vp)}
              style={{ padding: '0.3rem 0.6rem', borderRadius: 6, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.7rem', fontWeight: 600, transition: 'all .2s',
                background: viewport === vp ? 'rgba(124,58,237,0.5)' : 'transparent',
                color: viewport === vp ? '#3DAA7A' : 'rgba(61,170,122,0.35)',
              }}>
              <Icon size={13} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Preview Area ── */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: isNarrow ? 'flex-start' : 'stretch', padding: isNarrow ? '1.5rem 1rem' : 0, background: isNarrow ? '#111' : 'transparent' }}>
        <div
          id="portfolio-preview"
          style={{
            width: VIEWPORT_WIDTHS[viewport],
            maxWidth: VIEWPORT_WIDTHS[viewport],
            minHeight: '100%',
            overflowX: 'hidden',
            boxShadow: isNarrow ? '0 0 60px rgba(0,0,0,0.7)' : 'none',
            borderRadius: isNarrow ? 16 : 0,
            transition: 'width .3s ease, max-width .3s ease',
          }}
        >
          {renderTemplate()}
        </div>
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}
