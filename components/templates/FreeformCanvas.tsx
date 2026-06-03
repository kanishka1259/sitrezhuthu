'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { usePortfolioStore, type CustomElement, type TemplateStyles, type PortfolioStore } from '@/store/usePortfolioStore';
import { CanvasToolbar } from '@/components/canvas/CanvasToolbar';
import { PropertiesPanel } from '@/components/canvas/PropertiesPanel';
import { LayersPanel } from '@/components/canvas/LayersPanel';
import { CanvasElement } from '@/components/canvas/CanvasElement';
import { ZoomIn, ZoomOut, Maximize2, Monitor, Smartphone, Tablet } from 'lucide-react';
import Image from 'next/image';

const GRID_SIZE = 20;

const ANIM_CSS = `
@keyframes canvasFadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes canvasSlideUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
@keyframes canvasSlideLeft { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
@keyframes canvasBounce { from { transform:scale(0); } to { transform:scale(1); } }
@keyframes canvasScaleIn { from { opacity:0; transform:scale(0.5); } to { opacity:1; transform:scale(1); } }
`;

function animStyle(el: CustomElement): React.CSSProperties {
  if (!el.animation || el.animation.type === 'none') return {};
  const map: Record<string, string> = {
    fade: 'canvasFadeIn', slideUp: 'canvasSlideUp', slideLeft: 'canvasSlideLeft',
    bounce: 'canvasBounce', scale: 'canvasScaleIn',
  };
  const name = map[el.animation.type];
  if (!name) return {};
  return { animation: `${name} ${el.animation.duration || 600}ms ${el.animation.delay || 0}ms both` };
}

// ─── Public read-only render (for /[username] page) ─────────────────────
export function FreeformCanvas({ data, isEditor = false }: { data: PortfolioStore; isEditor?: boolean }) {
  if (isEditor) return <FreeformEditor />;
  return <FreeformPublic data={data} />;
}

// ─── Public view ────────────────────────────────────────────────────────
function FreeformPublic({ data }: { data: PortfolioStore }) {
  const s = data.templateStyles || {};
  const els = data.customElements || [];

  const handleElClick = (el: CustomElement) => {
    if (!el.clickAction || el.clickAction === 'none') return;
    if (el.clickAction === 'link' && el.clickTarget) {
      window.open(el.clickTarget, '_blank');
    } else if (el.clickAction === 'scroll' && el.clickTarget) {
      const target = document.querySelector(el.clickTarget);
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: s.canvasBg || s.bgColor || '#FAF9F6', position: 'relative', overflow: 'hidden', fontFamily: s.bodyFont || 'Inter' }}>
      <style>{ANIM_CSS}</style>
      {els.filter((e: CustomElement) => !e.hidden).sort((a: CustomElement, b: CustomElement) => (a.zIndex || 0) - (b.zIndex || 0)).map((el: CustomElement) => (
        <div key={el.id}
          onClick={() => handleElClick(el)}
          style={{ position: 'absolute', left: el.x, top: el.y, width: el.width, height: el.height, opacity: el.opacity ?? 1, transform: `rotate(${el.rotation || 0}deg)`, zIndex: el.zIndex || 1, ...animStyle(el), cursor: (el.clickAction && el.clickAction !== 'none') ? 'pointer' : 'default' }}>
          <PublicElementRenderer el={el} s={s} />
        </div>
      ))}
    </div>
  );
}

function PublicElementRenderer({ el, s }: { el: CustomElement; s: TemplateStyles }) {
  const border = el.borderWidth ? `${el.borderWidth}px ${el.borderStyle || 'solid'} ${el.borderColor || 'transparent'}` : 'none';
  if (el.type === 'text') return (
    <div style={{ width: '100%', height: '100%', color: el.color || '#f1f5f9', fontSize: el.fontSize || 24, fontWeight: el.fontWeight || '600', fontFamily: el.fontFamily || s.bodyFont || 'Inter', fontStyle: el.fontStyle || 'normal', textDecoration: el.textDecoration || 'none', letterSpacing: el.letterSpacing ? `${el.letterSpacing}px` : undefined, lineHeight: el.lineHeight || 1.4, textAlign: el.textAlign || 'left', background: el.bgGradient || el.bgColor || 'transparent', borderRadius: el.borderRadius || 0, border, boxShadow: el.shadow, padding: el.padding ? `${el.padding}px` : '4px 8px', whiteSpace: 'pre-wrap' }}>
      {el.content}
    </div>
  );
  if (el.type === 'button') {
    if (el.clickAction === 'link') {
      return <a href={el.clickTarget} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', background: el.bgGradient || el.bgColor || '#3DAA7A', color: el.color || '#3DAA7A', fontSize: el.fontSize || 15, fontWeight: el.fontWeight || '600', fontFamily: el.fontFamily || 'Inter', borderRadius: el.borderRadius || 8, border, boxShadow: el.shadow, padding: el.padding ? `${el.padding}px` : '8px 20px', textDecoration: 'none', cursor: 'pointer', letterSpacing: el.letterSpacing ? `${el.letterSpacing}px` : undefined }}>{el.content}</a>;
    }
    return <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', background: el.bgGradient || el.bgColor || '#3DAA7A', color: el.color || '#3DAA7A', fontSize: el.fontSize || 15, fontWeight: el.fontWeight || '600', fontFamily: el.fontFamily || 'Inter', borderRadius: el.borderRadius || 8, border, boxShadow: el.shadow, padding: el.padding ? `${el.padding}px` : '8px 20px', textDecoration: 'none', cursor: 'pointer', letterSpacing: el.letterSpacing ? `${el.letterSpacing}px` : undefined }}>{el.content}</div>;
  }
  if (el.type === 'image') return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {el.src ? (
        <Image 
          src={el.src} 
          alt="" 
          fill
          sizes={`${el.width || 300}px`}
          style={{ objectFit: el.objectFit || 'cover', borderRadius: el.borderRadius || 0, border, boxShadow: el.shadow, display: 'block' }} 
        />
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(61,170,122,0.05)', color: '#3DAA7A' }}>
          No Image
        </div>
      )}
    </div>
  );
  if (el.type === 'shape') {
    if (el.shapeType === 'triangle') { const sz = Math.min(el.width || 80, el.height || 80); return <div style={{ width: 0, height: 0, borderLeft: `${sz/2}px solid transparent`, borderRight: `${sz/2}px solid transparent`, borderBottom: `${sz}px solid ${el.color || el.bgColor || '#3DAA7A'}` }} />; }
    if (el.shapeType === 'star') return <div style={{ fontSize: Math.min(el.width||60,el.height||60)*0.85, lineHeight:1, color: el.color||el.bgColor||'#3DAA7A', textShadow: el.shadow }}>★</div>;
    if (el.shapeType === 'diamond') return <div style={{ width:(el.width||80)*0.7, height:(el.height||80)*0.7, background: el.bgGradient||el.bgColor||el.color||'#3DAA7A', transform:'rotate(45deg)', borderRadius:el.borderRadius||4, boxShadow: el.shadow }} />;
    if (el.shapeType === 'pentagon') return <svg width={el.width||80} height={el.height||80} viewBox="0 0 100 100"><polygon points="50,5 95,35 80,90 20,90 5,35" fill={el.bgColor||el.color||'#3DAA7A'} stroke={el.borderColor||'none'} strokeWidth={el.borderWidth||0}/></svg>;
    if (el.shapeType === 'hexagon') return <svg width={el.width||80} height={el.height||80} viewBox="0 0 100 100"><polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill={el.bgColor||el.color||'#3DAA7A'} stroke={el.borderColor||'none'} strokeWidth={el.borderWidth||0}/></svg>;
    return <div style={{ width:'100%', height:'100%', background: el.bgGradient||el.bgColor||'#3DAA7A', borderRadius: el.shapeType==='circle'?'50%':(el.borderRadius||0), border, boxShadow:el.shadow }} />;
  }
  if (el.type === 'section') return <div style={{ width:'100%', height:'100%', background: el.bgGradient||el.bgColor||'rgba(61,170,122,0.03)', borderRadius:el.borderRadius||12, border, boxShadow:el.shadow, position: 'relative', overflow: 'hidden' }}>{el.content && <div style={{ position: 'absolute', top: 12, left: 16, color: el.color||'rgba(61,170,122,0.4)', fontSize: el.fontSize||13, fontWeight: el.fontWeight||'600', fontFamily: el.fontFamily||'Inter' }}>{el.content}</div>}</div>;
  if (el.type === 'divider') return <div style={{ width:'100%', height:el.height||2, background: el.bgGradient||el.bgColor||'rgba(61,170,122,0.1)', borderRadius:el.borderRadius||0 }} />;
  return null;
}

// Canvas size presets
const CANVAS_PRESETS = [
  { label: 'Desktop', icon: <Monitor size={13}/>, w: 1440, h: 900 },
  { label: 'Portrait', icon: <Monitor size={13}/>, w: 1080, h: 1920 },
  { label: 'Tablet', icon: <Tablet size={13}/>, w: 768, h: 1024 },
  { label: 'Mobile', icon: <Smartphone size={13}/>, w: 390, h: 844 },
];

// ─── Editor view ─────────────────────────────────────────────────────────
function FreeformEditor() {
  const { 
    customElements, setSelectedElementId, selectedElementId, templateStyles: s, 
    undo, redo, pushHistory, setTemplateStyle,
    isCanvasFullScreen: isFullscreen, setIsCanvasFullScreen: setIsFullscreen
  } = usePortfolioStore();

  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [zoom, setZoom] = useState(0.6);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const canvasW = s.canvasWidth || 1440;
  const canvasH = s.canvasHeight || 900;

  // Adaptive grid color based on canvas background luminance
  const gridColor = (() => {
    const hex = (s.canvasBg || s.bgColor || '#FAF9F6').replace('#', '');
    if (hex.length < 6) return 'rgba(0,0,0,0.05)';
    const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
    const lum = (r*0.299 + g*0.587 + b*0.114) / 255;
    return lum > 0.5 ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)';
  })();

  // ── Keyboard shortcuts ──────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') { e.preventDefault(); undo(); }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) { e.preventDefault(); redo(); }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElementId) {
        const el = customElements.find(e2 => e2.id === selectedElementId);
        if (el && !el.locked) {
          pushHistory();
          usePortfolioStore.getState().removeCustomElement(selectedElementId);
          setSelectedElementId(null);
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'd' && selectedElementId) {
        e.preventDefault();
        usePortfolioStore.getState().duplicateCustomElement(selectedElementId);
      }
      if (e.key === 'Escape') setSelectedElementId(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedElementId, customElements, pushHistory, redo, setSelectedElementId, undo]);

  // ── Middle-mouse / Alt+drag pan ──────────────────────────────────
  const handleCanvasPointerDown = (e: React.PointerEvent) => {
    if (e.button === 1 || e.altKey) {
      e.preventDefault();
      setIsPanning(true);
      panStart.current = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y };
      const onMove = (me: PointerEvent) => {
        setPan({ x: panStart.current.px + me.clientX - panStart.current.mx, y: panStart.current.py + me.clientY - panStart.current.my });
      };
      const onUp = () => { setIsPanning(false); window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    } else {
      setSelectedElementId(null);
    }
  };

  // ── Ctrl+scroll zoom ──────────────────────────────────────────────
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setZoom(z => Math.min(3, Math.max(0.15, z - e.deltaY * 0.001)));
    }
  }, []);

  const sorted = [...customElements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
  const visibleCount = customElements.filter(e => !e.hidden).length;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#05050a', overflow: 'hidden' }}>
      <style>{ANIM_CSS}</style>
      <style>{`
        .canvas-scrollable::-webkit-scrollbar { width: 8px; height: 8px; }
        .canvas-scrollable::-webkit-scrollbar-track { background: #07070d; }
        .canvas-scrollable::-webkit-scrollbar-thumb { background: rgba(61,170,122,0.08); border-radius: 4px; }
        .canvas-scrollable::-webkit-scrollbar-thumb:hover { background: rgba(61,170,122,0.14); }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── Left: Toolbar ── */}
      <CanvasToolbar showGrid={showGrid} snapToGrid={snapToGrid} onToggleGrid={() => setShowGrid(v => !v)} onToggleSnap={() => setSnapToGrid(v => !v)} />

      {/* ── Right: Properties ── */}
      <PropertiesPanel />

      {/* ── Bottom-left: Layers (positioned above bottom bar) ── */}
      {!isFullscreen && <LayersPanel />}

      {/* ── Top-center: Canvas Controls Bar ── */}
      <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 100, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(12,12,18,0.97)', backdropFilter: 'blur(16px)', border: '1px solid rgba(61,170,122,0.08)', borderRadius: 12, padding: '5px 10px', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
        {/* Canvas size presets */}
        <div style={{ display: 'flex', gap: 2 }}>
          {CANVAS_PRESETS.map(p => (
            <button key={p.label} onClick={() => { setTemplateStyle('canvasWidth', p.w); setTemplateStyle('canvasHeight', p.h); }}
              title={`${p.label}: ${p.w}×${p.h}`}
              style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 7, background: (canvasW === p.w && canvasH === p.h) ? 'rgba(99,102,241,0.2)' : 'transparent', border: '1px solid', borderColor: (canvasW === p.w && canvasH === p.h) ? 'rgba(99,102,241,0.5)' : 'transparent', color: (canvasW === p.w && canvasH === p.h) ? '#818cf8' : '#475569', cursor: 'pointer', fontSize: '0.65rem', fontWeight: 600 }}
              onMouseEnter={e => { if (canvasW !== p.w || canvasH !== p.h) { e.currentTarget.style.background = 'rgba(61,170,122,0.05)'; e.currentTarget.style.color = '#94a3b8'; } }}
              onMouseLeave={e => { if (canvasW !== p.w || canvasH !== p.h) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569'; } }}>
              {p.icon}
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        <div style={{ width: 1, height: 20, background: 'rgba(61,170,122,0.06)' }} />

        {/* Canvas size display */}
        <span style={{ fontSize: '0.65rem', color: '#334155', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
          {canvasW} × {canvasH}
        </span>

        <div style={{ width: 1, height: 20, background: 'rgba(61,170,122,0.06)' }} />

        {/* Background color */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: '0.62rem', color: '#334155', fontWeight: 600 }}>BG</span>
          <input type="color" value={s.canvasBg || s.bgColor || '#FAF9F6'}
            onChange={e => setTemplateStyle('canvasBg', e.target.value)}
            style={{ width: 22, height: 22, border: '1px solid rgba(61,170,122,0.1)', borderRadius: 4, cursor: 'pointer', padding: 0, background: 'none' }} />
        </div>

        <div style={{ width: 1, height: 20, background: 'rgba(61,170,122,0.06)' }} />

        {/* Fullscreen toggle */}
        <button onClick={() => setIsFullscreen(!isFullscreen)} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen canvas'}
          style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 7, background: isFullscreen ? 'rgba(99,102,241,0.2)' : 'transparent', border: `1px solid ${isFullscreen ? 'rgba(99,102,241,0.5)' : 'transparent'}`, color: isFullscreen ? '#818cf8' : '#475569', cursor: 'pointer', fontSize: '0.65rem', fontWeight: 600 }}>
          <Maximize2 size={13}/>
          <span>{isFullscreen ? 'Exit' : 'Full'}</span>
        </button>
      </div>

      {/* ── Bottom: Zoom controls & Info ── */}
      <div style={{ position: 'absolute', bottom: 16, right: 16, zIndex: 100, display: 'flex', gap: 4, alignItems: 'center', background: 'rgba(12,12,18,0.97)', backdropFilter: 'blur(16px)', border: '1px solid rgba(61,170,122,0.08)', borderRadius: 10, padding: '5px 10px', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
        <button onClick={() => setZoom(z => Math.min(3, z + 0.1))} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', padding: 3, borderRadius: 4 }}
          onMouseEnter={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(61,170,122,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'none'; }}>
          <ZoomIn size={15}/>
        </button>
        <span style={{ fontSize: '0.7rem', color: '#475569', fontWeight: 700, minWidth: 40, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
          {Math.round(zoom * 100)}%
        </span>
        <button onClick={() => setZoom(z => Math.max(0.15, z - 0.1))} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', padding: 3, borderRadius: 4 }}
          onMouseEnter={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(61,170,122,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'none'; }}>
          <ZoomOut size={15}/>
        </button>
        <button onClick={() => { setZoom(0.6); setPan({ x: 0, y: 0 }); }} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', padding: 3, borderRadius: 4 }} title="Reset view"
          onMouseEnter={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(61,170,122,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'none'; }}>
          <Maximize2 size={13}/>
        </button>
      </div>

      {/* ── Bottom-center: Status bar ── */}
      <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 100, background: 'rgba(12,12,18,0.9)', border: '1px solid rgba(61,170,122,0.06)', borderRadius: 8, padding: '4px 14px', fontSize: '0.65rem', color: '#334155', fontWeight: 600, display: 'flex', gap: 12, whiteSpace: 'nowrap' }}>
        <span>{visibleCount} elements</span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span>Alt+drag to pan</span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span>Ctrl+scroll to zoom</span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span>Del to delete</span>
      </div>

      {/* ── Canvas Viewport ── */}
      <div
        className="canvas-scrollable"
        onPointerDown={handleCanvasPointerDown}
        onWheel={handleWheel}
        style={{ width: '100%', height: '100%', overflow: 'auto', cursor: isPanning ? 'grabbing' : 'default' }}
      >
        <div style={{ display: 'inline-flex', padding: 80, minWidth: '100%', minHeight: '100%', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          {/* The actual canvas paper */}
          <div
            ref={canvasRef}
            style={{
              width: canvasW,
              height: canvasH,
              position: 'relative',
              backgroundColor: s.canvasBg || s.bgColor || '#FAF9F6',
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transformOrigin: 'top left',
              flexShrink: 0,
              boxShadow: '0 0 0 1px rgba(61,170,122,0.05), 0 40px 100px rgba(0,0,0,0.9)',
              backgroundImage: showGrid
                ? `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`
                : undefined,
              backgroundSize: showGrid ? `${GRID_SIZE}px ${GRID_SIZE}px` : undefined,
            }}
          >
            {sorted.map(el => (
              <CanvasElement
                key={el.id}
                el={el}
                isSelected={selectedElementId === el.id}
                snapToGrid={snapToGrid}
                gridSize={GRID_SIZE}
              />
            ))}

            {/* Empty state */}
            {sorted.length === 0 && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, pointerEvents: 'none' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(99,102,241,0.2)' }}>
                  <span style={{ fontSize: '2rem' }}>✦</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '1.1rem', color: 'rgba(61,170,122,0.6)', fontWeight: 700, margin: 0 }}>Your canvas is empty</p>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(61,170,122,0.5)', margin: '6px 0 0' }}>Add elements from the toolbar on the left</p>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                  {['Text', 'Image', 'Shapes', 'Emoji', 'Portfolio Blocks'].map(hint => (
                    <div key={hint} style={{ padding: '5px 12px', borderRadius: 20, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', fontSize: '0.72rem', color: 'rgba(61,170,122,0.6)', fontWeight: 500 }}>{hint}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
