'use client';
import { useState, useRef } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import {
  Type, MousePointerClick, Square, Circle, Triangle,
  Image as ImageIcon, Minus, Star, LayoutTemplate, Undo2, Redo2,
  Grid3x3, Magnet, Shapes, Smile, Upload, Diamond,
  User, Briefcase, Code2, GraduationCap, Phone, ChevronRight,
  Hash, Globe, Layers
} from 'lucide-react';

interface CanvasToolbarProps {
  showGrid: boolean;
  snapToGrid: boolean;
  onToggleGrid: () => void;
  onToggleSnap: () => void;
}

const TOOL_BTN: React.CSSProperties = {
  background: 'transparent', border: 'none', cursor: 'pointer',
  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
  padding: '6px 4px', borderRadius: 8, transition: 'background 0.15s', width: 64,
  color: '#cbd5e1',
};

// All emojis relevant to a portfolio
const EMOJI_GROUPS = {
  'Popular': ['👋', '🚀', '💻', '🎨', '⭐', '🔥', '✨', '💡', '🎯', '🏆'],
  'Work': ['💼', '📊', '📈', '🤝', '🏢', '⚡', '🛠️', '📱', '🌐', '🔧'],
  'People': ['👨‍💻', '👩‍💻', '🧑‍🎨', '👨‍🎓', '🧑‍🚀', '🙌', '👍', '✌️', '🤙', '💪'],
  'Objects': ['📝', '🎓', '📷', '🎵', '🏋️', '☕', '🌱', '📚', '🎮', '🧠'],
  'Symbols': ['❤️', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⬛', '🌈', '#️⃣'],
};

export function CanvasToolbar({ showGrid, snapToGrid, onToggleGrid, onToggleSnap }: CanvasToolbarProps) {
  const { addCustomElement, templateStyles: s, undo, redo } = usePortfolioStore();
  const [activeMenu, setActiveMenu] = useState<'shapes' | 'emoji' | 'portfolio' | null>(null);
  const [activeEmojiGroup, setActiveEmojiGroup] = useState<string>('Popular');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const add = (type: string, extra: any = {}) => {
    addCustomElement({
      type: type as any,
      x: 180 + Math.random() * 120,
      y: 180 + Math.random() * 120,
      width: extra.width || 200,
      height: extra.height || 60,
      zIndex: 10,
      opacity: 1,
      rotation: 0,
      ...extra,
    });
    setActiveMenu(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        add('image', { src: ev.target.result as string, width: 300, height: 220, borderRadius: 12 });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const tools = [
    {
      label: 'Text', icon: <Type size={18}/>,
      action: () => add('text', { content: 'Your Text', color: s.textColor, fontSize: 24, fontWeight: '600', width: 240, height: 48, bgColor: 'transparent' })
    },
    {
      label: 'Button', icon: <MousePointerClick size={18}/>,
      action: () => add('button', { content: '✨ Click Me', bgColor: s.primaryColor, color: '#3DAA7A', width: 160, height: 50, borderRadius: 10, fontSize: 15, fontWeight: '600' })
    },
    {
      label: 'Shapes', icon: <Shapes size={18}/>,
      action: () => setActiveMenu(activeMenu === 'shapes' ? null : 'shapes'),
      hasMenu: true
    },
    {
      label: 'Image', icon: <ImageIcon size={18}/>,
      action: () => fileInputRef.current?.click()
    },
    {
      label: 'Emoji', icon: <Smile size={18}/>,
      action: () => setActiveMenu(activeMenu === 'emoji' ? null : 'emoji'),
      hasMenu: true
    },
    {
      label: 'Divider', icon: <Minus size={18}/>,
      action: () => add('divider', { bgColor: s.borderColor, width: 340, height: 2, borderRadius: 2 })
    },
    {
      label: 'Section', icon: <LayoutTemplate size={18}/>,
      action: () => add('section', { content: 'Section Title', bgColor: s.cardBg, borderColor: s.borderColor, borderWidth: 1, borderStyle: 'solid', width: 520, height: 320, borderRadius: 16, padding: 24, fontSize: 13, color: 'rgba(61,170,122,0.4)', fontWeight: '600' })
    },
    {
      label: 'Portfolio', icon: <User size={18}/>,
      action: () => setActiveMenu(activeMenu === 'portfolio' ? null : 'portfolio'),
      hasMenu: true
    },
  ];

  const shapes = [
    { label: 'Box', icon: <Square size={15}/>, action: () => add('shape', { shapeType: 'square', bgColor: s.cardBg, borderColor: s.borderColor, borderWidth: 1, borderStyle: 'solid', width: 200, height: 120, borderRadius: 12 }) },
    { label: 'Circle', icon: <Circle size={15}/>, action: () => add('shape', { shapeType: 'circle', bgColor: s.primaryColor, width: 100, height: 100, borderRadius: 50 }) },
    { label: 'Triangle', icon: <Triangle size={15}/>, action: () => add('shape', { shapeType: 'triangle', color: s.primaryColor, width: 90, height: 90 }) },
    { label: 'Star', icon: <Star size={15}/>, action: () => add('shape', { shapeType: 'star', color: s.primaryColor, width: 90, height: 90 }) },
    { label: 'Diamond', icon: <Diamond size={15}/>, action: () => add('shape', { shapeType: 'diamond', bgColor: s.primaryColor, width: 90, height: 90 }) },
    { label: 'Pentagon', icon: '⬠', action: () => add('shape', { shapeType: 'pentagon', bgColor: s.primaryColor, width: 90, height: 90 }) },
    { label: 'Hexagon', icon: '⬡', action: () => add('shape', { shapeType: 'hexagon', bgColor: s.primaryColor, width: 90, height: 90 }) },
  ];

  // Portfolio-ready template blocks
  const portfolioBlocks = [
    {
      label: 'Hero Name', icon: <User size={14}/>,
      action: () => add('text', { content: 'John Doe', color: s.textColor, fontSize: 52, fontWeight: '800', width: 500, height: 70, bgColor: 'transparent', fontFamily: 'Space Grotesk' })
    },
    {
      label: 'Job Title', icon: <Briefcase size={14}/>,
      action: () => add('text', { content: 'Full Stack Developer', color: s.primaryColor, fontSize: 22, fontWeight: '600', width: 400, height: 40, bgColor: 'transparent', letterSpacing: 1 })
    },
    {
      label: 'Bio Text', icon: <Type size={14}/>,
      action: () => add('text', { content: 'I build beautiful, high-performance web applications with modern technologies and a passion for great user experiences.', color: s.mutedColor || '#94a3b8', fontSize: 16, fontWeight: '400', width: 500, height: 80, bgColor: 'transparent', lineHeight: 1.7 })
    },
    {
      label: 'Skill Badge', icon: <Code2 size={14}/>,
      action: () => add('button', { content: '⚡ React', bgColor: 'rgba(99,102,241,0.15)', color: s.primaryColor, width: 110, height: 38, borderRadius: 20, fontSize: 13, fontWeight: '600', borderColor: s.primaryColor, borderWidth: 1, borderStyle: 'solid' })
    },
    {
      label: 'CTA Button', icon: <MousePointerClick size={14}/>,
      action: () => add('button', { content: '📬 Contact Me', bgColor: s.primaryColor, color: '#3DAA7A', width: 180, height: 54, borderRadius: 12, fontSize: 16, fontWeight: '700', shadow: `0 8px 30px ${s.primaryColor}50` })
    },
    {
      label: 'Project Card', icon: <Layers size={14}/>,
      action: () => {
        add('shape', { shapeType: 'square', bgColor: s.cardBg || '#1e1e2e', borderColor: s.borderColor, borderWidth: 1, borderStyle: 'solid', width: 360, height: 240, borderRadius: 16 });
        setTimeout(() => add('text', { content: '🚀 Project Name', color: s.textColor, fontSize: 18, fontWeight: '700', width: 300, height: 30, bgColor: 'transparent' }), 50);
        setTimeout(() => add('text', { content: 'A brief description of what this project does and the tech stack used.', color: s.mutedColor || '#94a3b8', fontSize: 14, fontWeight: '400', width: 300, height: 60, bgColor: 'transparent', lineHeight: 1.6 }), 100);
      }
    },
    {
      label: 'Education', icon: <GraduationCap size={14}/>,
      action: () => add('text', { content: '🎓 B.Sc. Computer Science\nUniversity Name  ·  2024', color: s.textColor, fontSize: 15, fontWeight: '500', width: 360, height: 55, bgColor: 'transparent', lineHeight: 1.7 })
    },
    {
      label: 'Gradient Bg', icon: <Globe size={14}/>,
      action: () => add('shape', { shapeType: 'circle', bgGradient: `radial-gradient(circle, ${s.primaryColor}30, transparent 70%)`, width: 400, height: 400, zIndex: 1 })
    },
    {
      label: 'Section Title', icon: <Hash size={14}/>,
      action: () => {
        add('text', { content: 'About Me', color: s.textColor, fontSize: 36, fontWeight: '800', width: 300, height: 50, bgColor: 'transparent', fontFamily: 'Space Grotesk' });
        setTimeout(() => add('divider', { bgColor: s.primaryColor, width: 60, height: 4, borderRadius: 4 }), 50);
      }
    },
    {
      label: 'Social Link', icon: <Globe size={14}/>,
      action: () => add('button', { content: '🐙 GitHub', bgColor: 'transparent', color: s.textColor, width: 130, height: 42, borderRadius: 8, fontSize: 14, fontWeight: '600', borderColor: s.borderColor, borderWidth: 1, borderStyle: 'solid', clickAction: 'link', clickTarget: 'https://github.com/' })
    },
    {
      label: 'Avatar', icon: <User size={14}/>,
      action: () => add('image', { src: '', width: 160, height: 160, borderRadius: 80, borderColor: s.primaryColor, borderWidth: 3, borderStyle: 'solid', shadow: `0 0 40px ${s.primaryColor}60` })
    },
    {
      label: 'Divider', icon: <Minus size={14}/>,
      action: () => add('divider', { bgGradient: `linear-gradient(90deg, transparent, ${s.primaryColor}, transparent)`, width: 400, height: 1, borderRadius: 1 })
    },
  ];

  const isActive = (label: string) => activeMenu === label.toLowerCase();

  return (
    <div style={{
      position: 'absolute', left: 16, top: 16, zIndex: 100,
      background: 'rgba(12,12,18,0.97)', backdropFilter: 'blur(16px)',
      border: '1px solid rgba(61,170,122,0.08)', borderRadius: 18,
      padding: '10px 6px', display: 'flex', flexDirection: 'column', gap: 2,
      boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
    }}>
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />

      {/* Header */}
      <div style={{ fontSize: '0.58rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: 1.2, textAlign: 'center', padding: '0 4px 6px', borderBottom: '1px solid rgba(61,170,122,0.05)', marginBottom: 2 }}>
        Elements
      </div>

      {tools.map(t => (
        <div key={t.label} style={{ position: 'relative' }}>
          <button
            onClick={t.action}
            style={{ ...TOOL_BTN, background: isActive(t.label) ? 'rgba(99,102,241,0.15)' : 'transparent', color: isActive(t.label) ? '#818cf8' : '#cbd5e1' }}
            onMouseEnter={e => { if (!isActive(t.label)) e.currentTarget.style.background = 'rgba(61,170,122,0.06)'; }}
            onMouseLeave={e => { if (!isActive(t.label)) e.currentTarget.style.background = 'transparent'; }}
            title={`Add ${t.label}`}
          >
            {t.icon}
            <span style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: 0.3 }}>{t.label}</span>
            {t.hasMenu && <span style={{ position: 'absolute', right: 5, top: '50%', transform: 'translateY(-50%)', opacity: 0.4, fontSize: '0.5rem' }}>▶</span>}
          </button>

          {/* ── Shapes submenu ── */}
          {isActive('shapes') && t.label === 'Shapes' && (
            <div style={{ position: 'absolute', left: '100%', top: 0, marginLeft: 10, background: 'rgba(12,12,18,0.97)', border: '1px solid rgba(61,170,122,0.08)', borderRadius: 14, padding: '8px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, boxShadow: '0 8px 40px rgba(0,0,0,0.5)', zIndex: 200, width: 200 }}>
              <div style={{ gridColumn: '1/-1', fontSize: '0.58rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: 1, paddingBottom: 4, borderBottom: '1px solid rgba(61,170,122,0.05)', marginBottom: 2 }}>Shapes</div>
              {shapes.map(sh => (
                <button key={sh.label} onClick={sh.action} title={sh.label}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px 4px', borderRadius: 8, color: '#cbd5e1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
                  onMouseEnter={e => e.currentTarget.style.background  = 'rgba(61,170,122,0.07)'}
                  onMouseLeave={e => e.currentTarget.style.background  = 'transparent'}>
                  {typeof sh.icon === 'string' ? <span style={{ fontSize: '1rem' }}>{sh.icon}</span> : sh.icon}
                  <span style={{ fontSize: '0.55rem', color: '#64748b' }}>{sh.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* ── Emoji submenu ── */}
          {isActive('emoji') && t.label === 'Emoji' && (
            <div style={{ position: 'absolute', left: '100%', top: 0, marginLeft: 10, background: 'rgba(12,12,18,0.97)', border: '1px solid rgba(61,170,122,0.08)', borderRadius: 14, padding: '8px', boxShadow: '0 8px 40px rgba(0,0,0,0.5)', zIndex: 200, width: 230 }}>
              <div style={{ fontSize: '0.58rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: 1, paddingBottom: 6, borderBottom: '1px solid rgba(61,170,122,0.05)', marginBottom: 6 }}>Emojis</div>
              {/* Group tabs */}
              <div style={{ display: 'flex', gap: 2, marginBottom: 6, flexWrap: 'wrap' }}>
                {Object.keys(EMOJI_GROUPS).map(g => (
                  <button key={g} onClick={() => setActiveEmojiGroup(g)}
                    style={{ padding: '2px 7px', borderRadius: 5, background: activeEmojiGroup === g ? 'rgba(99,102,241,0.3)' : 'rgba(61,170,122,0.04)', border: 'none', color: activeEmojiGroup === g ? '#818cf8' : '#64748b', cursor: 'pointer', fontSize: '0.6rem', fontWeight: 600 }}>
                    {g}
                  </button>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 3 }}>
                {(EMOJI_GROUPS[activeEmojiGroup as keyof typeof EMOJI_GROUPS] || []).map(em => (
                  <button key={em} onClick={() => add('text', { content: em, fontSize: 48, width: 80, height: 80, bgColor: 'transparent', textAlign: 'center' })}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '5px', borderRadius: 8, fontSize: '1.4rem', lineHeight: 1 }}
                    onMouseEnter={e => e.currentTarget.style.background  = 'rgba(61,170,122,0.07)'}
                    onMouseLeave={e => e.currentTarget.style.background  = 'transparent'}>
                    {em}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Portfolio blocks submenu ── */}
          {isActive('portfolio') && t.label === 'Portfolio' && (
            <div style={{ position: 'absolute', left: '100%', top: 0, marginLeft: 10, background: 'rgba(12,12,18,0.97)', border: '1px solid rgba(61,170,122,0.08)', borderRadius: 14, padding: '8px', boxShadow: '0 8px 40px rgba(0,0,0,0.5)', zIndex: 200, width: 210, maxHeight: 400, overflowY: 'auto' }}>
              <div style={{ fontSize: '0.58rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: 1, paddingBottom: 6, borderBottom: '1px solid rgba(61,170,122,0.05)', marginBottom: 4 }}>Portfolio Blocks</div>
              {portfolioBlocks.map(b => (
                <button key={b.label} onClick={b.action}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', background: 'transparent', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 500, textAlign: 'left' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(61,170,122,0.07)'; e.currentTarget.style.color = '#e2e8f0'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}>
                  <span style={{ color: '#475569', flexShrink: 0 }}>{b.icon}</span>
                  {b.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* ── Utility controls ── */}
      <div style={{ borderTop: '1px solid rgba(61,170,122,0.05)', marginTop: 4, paddingTop: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <button onClick={undo} style={{ ...TOOL_BTN, color: '#475569' }} title="Undo (Ctrl+Z)"
          onMouseEnter={e => e.currentTarget.style.background  = 'rgba(61,170,122,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background  = 'transparent'}>
          <Undo2 size={15}/><span style={{ fontSize: '0.58rem', fontWeight: 600 }}>Undo</span>
        </button>
        <button onClick={redo} style={{ ...TOOL_BTN, color: '#475569' }} title="Redo (Ctrl+Y)"
          onMouseEnter={e => e.currentTarget.style.background  = 'rgba(61,170,122,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background  = 'transparent'}>
          <Redo2 size={15}/><span style={{ fontSize: '0.58rem', fontWeight: 600 }}>Redo</span>
        </button>
        <button onClick={onToggleGrid}
          style={{ ...TOOL_BTN, color: showGrid ? '#3DAA7A' : '#475569', background: showGrid ? 'rgba(99,102,241,0.12)' : 'transparent' }}
          title="Toggle Grid"
          onMouseEnter={e => { if (!showGrid) e.currentTarget.style.background = 'rgba(61,170,122,0.06)'; }}
          onMouseLeave={e => { if (!showGrid) e.currentTarget.style.background = 'transparent'; }}>
          <Grid3x3 size={15}/><span style={{ fontSize: '0.58rem', fontWeight: 600 }}>Grid</span>
        </button>
        <button onClick={onToggleSnap}
          style={{ ...TOOL_BTN, color: snapToGrid ? '#3DAA7A' : '#475569', background: snapToGrid ? 'rgba(99,102,241,0.12)' : 'transparent' }}
          title="Snap to Grid"
          onMouseEnter={e => { if (!snapToGrid) e.currentTarget.style.background = 'rgba(61,170,122,0.06)'; }}
          onMouseLeave={e => { if (!snapToGrid) e.currentTarget.style.background = 'transparent'; }}>
          <Magnet size={15}/><span style={{ fontSize: '0.58rem', fontWeight: 600 }}>Snap</span>
        </button>
      </div>
    </div>
  );
}
