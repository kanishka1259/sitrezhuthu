'use client';
import { useRef } from 'react';
import { usePortfolioStore, CustomElement } from '@/store/usePortfolioStore';
import { Trash2, Copy, ArrowUpToLine, ArrowDownToLine, ChevronUp, ChevronDown, Lock, Unlock, EyeOff, Eye, Upload, Link, ExternalLink, Globe, Mail } from 'lucide-react';

const FONTS = ['Inter', 'Space Grotesk', 'Outfit', 'Plus Jakarta Sans', 'Roboto', 'Montserrat', 'Poppins', 'Nunito', 'JetBrains Mono', 'Playfair Display', 'Merriweather', 'Syne', 'DM Sans'];

const inp: React.CSSProperties = {
  width: '100%', padding: '5px 8px', background: 'rgba(61,170,122,0.05)',
  border: '1px solid rgba(61,170,122,0.08)', borderRadius: 6,
  color: '#f1f5f9', fontSize: '0.78rem', outline: 'none',
  boxSizing: 'border-box',
};
const label: React.CSSProperties = {
  display: 'block', fontSize: '0.65rem', fontWeight: 600, color: '#64748b',
  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3, marginTop: 10
};
const row: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 };
const secHead: React.CSSProperties = {
  fontSize: '0.62rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase',
  letterSpacing: '0.08em', padding: '10px 0 4px', borderBottom: '1px solid rgba(61,170,122,0.06)', marginBottom: 4
};

// Gradient presets
const GRADIENT_PRESETS = [
  'linear-gradient(135deg, #3DAA7A, #3DAA7A)',
  'linear-gradient(135deg, #3DAA7A, #3DAA7A)',
  'linear-gradient(135deg, #3DAA7A, #3DAA7A)',
  'linear-gradient(135deg, #3DAA7A, #ef4444)',
  'linear-gradient(135deg, #D97706, #3DAA7A)',
  'linear-gradient(180deg, rgba(99,102,241,0.2), transparent)',
];

const SHADOW_PRESETS = [
  '0 4px 20px rgba(0,0,0,0.3)',
  '0 8px 40px rgba(99,102,241,0.4)',
  '0 0 30px rgba(99,102,241,0.6)',
  '0 20px 60px rgba(0,0,0,0.5)',
  'inset 0 0 30px rgba(99,102,241,0.2)',
];

export function PropertiesPanel() {
  const {
    selectedElementId, customElements, updateCustomElement,
    removeCustomElement, duplicateCustomElement, reorderCustomElement,
    templateStyles: s
  } = usePortfolioStore();
  const el = customElements.find(e => e.id === selectedElementId);
  const imgInputRef = useRef<HTMLInputElement>(null);

  if (!el) {
    return (
      <div style={{
        position: 'absolute', right: 16, top: 16, width: 252,
        background: 'rgba(15,15,20,0.97)', backdropFilter: 'blur(16px)',
        border: '1px solid rgba(61,170,122,0.08)', borderRadius: 16,
        padding: '16px', zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
      }}>
        <p style={{ fontSize: '0.72rem', color: '#475569', textAlign: 'center', padding: '12px 0 4px', lineHeight: 1.6 }}>
          🎨 Click any element<br/>to edit its properties
        </p>
        <div style={{ marginTop: 12, padding: '10px', background: 'rgba(99,102,241,0.08)', borderRadius: 10, border: '1px solid rgba(99,102,241,0.15)' }}>
          <p style={{ fontSize: '0.65rem', color: '#64748b', margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: '#94a3b8' }}>Tips:</strong><br/>
            • Double-click text to edit<br/>
            • Drag to move elements<br/>
            • Corner handle to resize<br/>
            • Right-click for more options<br/>
            • Ctrl+Z to undo
          </p>
        </div>
      </div>
    );
  }

  const upd = (k: Partial<CustomElement>) => updateCustomElement(el.id, k);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) upd({ src: ev.target.result as string });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div style={{
      position: 'absolute', right: 16, top: 16, width: 252,
      background: 'rgba(15,15,20,0.97)', backdropFilter: 'blur(16px)',
      border: '1px solid rgba(61,170,122,0.08)', borderRadius: 16,
      padding: '12px', zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      maxHeight: 'calc(100% - 32px)', overflowY: 'auto',
    }}>
      <input type="file" ref={imgInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />

      {/* Header + Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f1f5f9', textTransform: 'capitalize' }}>
            {el.shapeType ? el.shapeType : el.type}
          </span>
          {el.locked && <span style={{ fontSize: '0.6rem', background: 'rgba(245,158,11,0.2)', color: '#3DAA7A', padding: '1px 5px', borderRadius: 4 }}>locked</span>}
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          <ActionBtn icon={<Copy size={13}/>} title="Duplicate (Ctrl+D)" onClick={() => duplicateCustomElement(el.id)} />
          <ActionBtn icon={el.locked ? <Unlock size={13}/> : <Lock size={13}/>} title={el.locked ? 'Unlock' : 'Lock'} onClick={() => upd({ locked: !el.locked })} />
          <ActionBtn icon={el.hidden ? <Eye size={13}/> : <EyeOff size={13}/>} title={el.hidden ? 'Show' : 'Hide'} onClick={() => upd({ hidden: !el.hidden })} />
          <ActionBtn icon={<Trash2 size={13}/>} title="Delete" onClick={() => removeCustomElement(el.id)} danger />
        </div>
      </div>

      {/* Layer order */}
      <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
        {([['front', <ArrowUpToLine size={11}/>, 'Bring to Front'], ['forward', <ChevronUp size={11}/>, 'Bring Forward'], ['backward', <ChevronDown size={11}/>, 'Send Backward'], ['back', <ArrowDownToLine size={11}/>, 'Send to Back']] as const).map(([dir, icon, title]) => (
          <button key={dir} onClick={() => reorderCustomElement(el.id, dir)} title={title}
            style={{ flex: 1, padding: '4px 2px', borderRadius: 5, background: 'rgba(61,170,122,0.04)', border: '1px solid rgba(61,170,122,0.06)', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => e.currentTarget.style.background  = 'rgba(61,170,122,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background  = 'rgba(61,170,122,0.04)'}>
            {icon}
          </button>
        ))}
      </div>

      {/* ── Transform ── */}
      <p style={secHead}>Transform</p>
      <div style={row}>
        <div><p style={label}>X</p><input type="number" style={inp} value={Math.round(el.x)} onChange={e => upd({ x: +e.target.value })} /></div>
        <div><p style={label}>Y</p><input type="number" style={inp} value={Math.round(el.y)} onChange={e => upd({ y: +e.target.value })} /></div>
      </div>
      <div style={row}>
        <div><p style={label}>W px</p><input type="number" style={inp} value={el.width || 100} onChange={e => upd({ width: +e.target.value })} /></div>
        <div><p style={label}>H px</p><input type="number" style={inp} value={el.height || 60} onChange={e => upd({ height: +e.target.value })} /></div>
      </div>
      <div style={row}>
        <div><p style={label}>Rotate °</p><input type="number" style={inp} value={el.rotation || 0} onChange={e => upd({ rotation: +e.target.value })} /></div>
        <div><p style={label}>Opacity %</p><input type="number" style={inp} min={0} max={100} value={Math.round((el.opacity ?? 1) * 100)} onChange={e => upd({ opacity: +e.target.value / 100 })} /></div>
      </div>
      <div>
        <p style={label}>Z-Index</p>
        <input type="number" style={inp} value={el.zIndex || 10} onChange={e => upd({ zIndex: +e.target.value })} />
      </div>

      {/* ── Fill ── */}
      <p style={secHead}>Fill & Color</p>
      <div style={row}>
        <div>
          <p style={label}>Fill Color</p>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <input type="color" value={el.bgColor || '#3DAA7A'} onChange={e => upd({ bgColor: e.target.value, bgGradient: undefined })} style={{ width: 28, height: 28, border: 'none', borderRadius: 4, cursor: 'pointer', padding: 0, background: 'none' }} />
            <input type="text" style={{ ...inp, flex: 1 }} value={el.bgColor || ''} onChange={e => upd({ bgColor: e.target.value })} placeholder="#hex" />
          </div>
        </div>
        <div>
          <p style={label}>Text Color</p>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <input type="color" value={el.color || '#3DAA7A'} onChange={e => upd({ color: e.target.value })} style={{ width: 28, height: 28, border: 'none', borderRadius: 4, cursor: 'pointer', padding: 0, background: 'none' }} />
            <input type="text" style={{ ...inp, flex: 1 }} value={el.color || ''} onChange={e => upd({ color: e.target.value })} placeholder="#hex" />
          </div>
        </div>
      </div>
      <p style={label}>Gradient (CSS)</p>
      <input type="text" style={inp} value={el.bgGradient || ''} onChange={e => upd({ bgGradient: e.target.value || undefined })} placeholder="linear-gradient(135deg, #f00, #00f)" />
      <div style={{ display: 'flex', gap: 4, marginTop: 5, flexWrap: 'wrap' }}>
        {GRADIENT_PRESETS.map(g => (
          <div key={g} onClick={() => upd({ bgGradient: g, bgColor: undefined })} title={g}
            style={{ width: 22, height: 22, borderRadius: 4, background: g, cursor: 'pointer', border: el.bgGradient === g ? '2px solid #3DAA7A' : '1px solid rgba(61,170,122,0.1)', flexShrink: 0 }} />
        ))}
      </div>

      {/* ── Border ── */}
      <p style={secHead}>Border</p>
      <div style={row}>
        <div><p style={label}>Width px</p><input type="number" style={inp} value={el.borderWidth || 0} onChange={e => upd({ borderWidth: +e.target.value })} /></div>
        <div>
          <p style={label}>Color</p>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <input type="color" value={el.borderColor || '#3DAA7A'} onChange={e => upd({ borderColor: e.target.value })} style={{ width: 28, height: 28, border: 'none', borderRadius: 4, cursor: 'pointer', padding: 0, background: 'none' }} />
            <input type="text" style={{ ...inp, flex: 1 }} value={el.borderColor || ''} onChange={e => upd({ borderColor: e.target.value })} placeholder="#hex" />
          </div>
        </div>
      </div>
      <div style={row}>
        <div>
          <p style={label}>Style</p>
          <select style={{ ...inp }} value={el.borderStyle || 'solid'} onChange={e => upd({ borderStyle: e.target.value as any })}>
            <option value="solid">Solid</option><option value="dashed">Dashed</option><option value="dotted">Dotted</option><option value="none">None</option>
          </select>
        </div>
        <div><p style={label}>Radius px</p><input type="number" style={inp} value={el.borderRadius || 0} onChange={e => upd({ borderRadius: +e.target.value })} /></div>
      </div>

      {/* ── Shadow ── */}
      <p style={secHead}>Shadow & Effects</p>
      <input type="text" style={inp} value={el.shadow || ''} onChange={e => upd({ shadow: e.target.value || undefined })} placeholder="0 4px 20px rgba(0,0,0,0.3)" />
      <div style={{ display: 'flex', gap: 4, marginTop: 5, flexWrap: 'wrap' }}>
        <div onClick={() => upd({ shadow: undefined })} title="No shadow"
          style={{ padding: '2px 8px', borderRadius: 4, background: 'rgba(61,170,122,0.04)', border: !el.shadow ? '1px solid #3DAA7A' : '1px solid rgba(61,170,122,0.08)', cursor: 'pointer', fontSize: '0.6rem', color: '#64748b' }}>None</div>
        {SHADOW_PRESETS.map(sh => (
          <div key={sh} onClick={() => upd({ shadow: sh })}
            style={{ padding: '2px 8px', borderRadius: 4, background: 'rgba(61,170,122,0.04)', border: el.shadow === sh ? '1px solid #3DAA7A' : '1px solid rgba(61,170,122,0.08)', cursor: 'pointer', fontSize: '0.6rem', color: '#94a3b8' }}>
            {SHADOW_PRESETS.indexOf(sh) + 1}
          </div>
        ))}
      </div>

      {/* ── Padding ── */}
      <p style={label}>Padding px</p>
      <input type="number" style={inp} value={el.padding || 0} onChange={e => upd({ padding: +e.target.value })} />

      {/* ── Typography (text / button) ── */}
      {['text', 'button'].includes(el.type) && (<>
        <p style={secHead}>Typography</p>
        <p style={label}>Font Family</p>
        <select style={{ ...inp, marginBottom: 4 }} value={el.fontFamily || 'Inter'} onChange={e => upd({ fontFamily: e.target.value })}>
          {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <div style={row}>
          <div><p style={label}>Size px</p><input type="number" style={inp} value={el.fontSize || 16} onChange={e => upd({ fontSize: +e.target.value })} /></div>
          <div>
            <p style={label}>Weight</p>
            <select style={inp} value={el.fontWeight || '400'} onChange={e => upd({ fontWeight: e.target.value })}>
              <option value="300">Light</option><option value="400">Regular</option><option value="500">Medium</option>
              <option value="600">Semibold</option><option value="700">Bold</option><option value="800">Extra Bold</option><option value="900">Black</option>
            </select>
          </div>
        </div>
        <div style={row}>
          <div>
            <p style={label}>Style</p>
            <select style={inp} value={el.fontStyle || 'normal'} onChange={e => upd({ fontStyle: e.target.value as any })}>
              <option value="normal">Normal</option><option value="italic">Italic</option>
            </select>
          </div>
          <div>
            <p style={label}>Decoration</p>
            <select style={inp} value={el.textDecoration || 'none'} onChange={e => upd({ textDecoration: e.target.value as any })}>
              <option value="none">None</option><option value="underline">Underline</option><option value="line-through">Strikethrough</option>
            </select>
          </div>
        </div>
        <div style={row}>
          <div><p style={label}>Letter Sp.</p><input type="number" style={inp} value={el.letterSpacing || 0} step={0.5} onChange={e => upd({ letterSpacing: +e.target.value })} /></div>
          <div><p style={label}>Line Height</p><input type="number" style={inp} value={el.lineHeight || 1.4} step={0.1} onChange={e => upd({ lineHeight: +e.target.value })} /></div>
        </div>
        <p style={label}>Align</p>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['left', 'center', 'right'] as const).map(a => (
            <button key={a} onClick={() => upd({ textAlign: a })}
              style={{ flex: 1, padding: '5px', borderRadius: 5, border: '1px solid rgba(61,170,122,0.06)', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600, background: el.textAlign === a ? s.primaryColor : 'rgba(61,170,122,0.04)', color: el.textAlign === a ? '#3DAA7A' : '#94a3b8' }}>
              {a}
            </button>
          ))}
        </div>
      </>)}

      {/* ── Image ── */}
      {el.type === 'image' && (<>
        <p style={secHead}>Image</p>
        <button
          onClick={() => imgInputRef.current?.click()}
          style={{ width: '100%', padding: '8px', borderRadius: 8, background: 'rgba(99,102,241,0.12)', border: '1px dashed rgba(99,102,241,0.4)', color: '#818cf8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: '0.78rem', fontWeight: 600, marginBottom: 6 }}
          onMouseEnter={e => e.currentTarget.style.background  = 'rgba(99,102,241,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background  = 'rgba(99,102,241,0.12)'}>
          <Upload size={14}/> Upload from device
        </button>
        <p style={label}>Or paste URL</p>
        <input type="text" style={inp} value={el.src && el.src.startsWith('data:') ? '' : (el.src || '')} onChange={e => upd({ src: e.target.value })} placeholder="https://..." />
        {el.src && (
          <div style={{ marginTop: 6, borderRadius: 8, overflow: 'hidden', height: 80, background: 'rgba(61,170,122,0.03)', border: '1px solid rgba(61,170,122,0.06)' }}>
            <img src={el.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <p style={label}>Object Fit</p>
        <select style={inp} value={(el as any).objectFit || 'cover'} onChange={e => upd({ objectFit: e.target.value } as any)}>
          <option value="cover">Cover</option><option value="contain">Contain</option><option value="fill">Fill</option><option value="none">None</option>
        </select>
      </>)}

      {/* ── Link / Click Action ── */}
      <p style={secHead}>Interaction</p>
      <p style={label}>On Click</p>
      <select style={{ ...inp, marginBottom: 4 }} value={el.clickAction || 'none'} onChange={e => upd({ clickAction: e.target.value as any })}>
        <option value="none">None</option>
        <option value="link">Open Link / URL</option>
        <option value="scroll">Scroll to Section</option>
      </select>
      {el.clickAction && el.clickAction !== 'none' && (
        <input type="text" style={inp} value={el.clickTarget || ''} onChange={e => upd({ clickTarget: e.target.value })} placeholder={el.clickAction === 'link' ? 'https://...' : '#section-id'} />
      )}

      {/* Quick social presets for button */}
      {el.type === 'button' && (
        <div style={{ marginTop: 6 }}>
          <p style={label}>Quick Social Links</p>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {[
              { icon: '🐙', label: 'GitHub', url: 'https://github.com/' },
              { icon: '💼', label: 'LinkedIn', url: 'https://linkedin.com/in/' },
              { icon: '🐦', label: 'Twitter', url: 'https://twitter.com/' },
              { icon: '📧', label: 'Email', url: 'mailto:' },
              { icon: '🌐', label: 'Website', url: 'https://' },
            ].map(s => (
              <button key={s.label} onClick={() => upd({ content: s.icon + ' ' + s.label, clickAction: 'link', clickTarget: s.url })}
                style={{ padding: '3px 7px', borderRadius: 5, background: 'rgba(61,170,122,0.04)', border: '1px solid rgba(61,170,122,0.08)', color: '#94a3b8', cursor: 'pointer', fontSize: '0.65rem' }}
                onMouseEnter={e => e.currentTarget.style.background  = 'rgba(61,170,122,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background  = 'rgba(61,170,122,0.04)'}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Animation ── */}
      <p style={secHead}>Animation</p>
      <select style={{ ...inp, marginBottom: 4 }} value={el.animation?.type || 'none'} onChange={e => upd({ animation: { type: e.target.value as any, duration: el.animation?.duration || 600, delay: el.animation?.delay || 0 } })}>
        <option value="none">None</option>
        <option value="fade">Fade In</option>
        <option value="slideUp">Slide Up</option>
        <option value="slideLeft">Slide Left</option>
        <option value="bounce">Bounce</option>
        <option value="scale">Scale In</option>
      </select>
      {el.animation?.type && el.animation.type !== 'none' && (
        <div style={row}>
          <div><p style={label}>Duration ms</p><input type="number" style={inp} value={el.animation.duration} step={100} onChange={e => upd({ animation: { ...el.animation!, duration: +e.target.value } })} /></div>
          <div><p style={label}>Delay ms</p><input type="number" style={inp} value={el.animation.delay} step={100} onChange={e => upd({ animation: { ...el.animation!, delay: +e.target.value } })} /></div>
        </div>
      )}

      {/* ── Content (section label) ── */}
      {el.type === 'section' && (<>
        <p style={secHead}>Section Label</p>
        <input type="text" style={inp} value={el.content || ''} onChange={e => upd({ content: e.target.value })} placeholder="About Me, Projects, etc." />
        <div style={row}>
          <div><p style={label}>Font Size</p><input type="number" style={inp} value={el.fontSize || 13} onChange={e => upd({ fontSize: +e.target.value })} /></div>
          <div>
            <p style={label}>Font Weight</p>
            <select style={inp} value={el.fontWeight || '600'} onChange={e => upd({ fontWeight: e.target.value })}>
              <option value="400">Regular</option><option value="600">Semibold</option><option value="700">Bold</option>
            </select>
          </div>
        </div>
      </>)}
    </div>
  );
}

function ActionBtn({ icon, title, onClick, danger = false }: { icon: React.ReactNode; title: string; onClick: () => void; danger?: boolean }) {
  return (
    <button onClick={onClick} title={title}
      style={{ padding: '4px 6px', borderRadius: 6, background: danger ? 'rgba(239,68,68,0.1)' : 'rgba(61,170,122,0.06)', border: '1px solid rgba(61,170,122,0.06)', color: danger ? '#ef4444' : '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      onMouseEnter={e => (e.currentTarget.style.background = danger ? 'rgba(239,68,68,0.2)' : 'rgba(61,170,122,0.12)')}
      onMouseLeave={e => (e.currentTarget.style.background = danger ? 'rgba(239,68,68,0.1)' : 'rgba(61,170,122,0.06)')}>
      {icon}
    </button>
  );
}
