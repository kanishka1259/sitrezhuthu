'use client';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { Eye, EyeOff, Lock, Unlock, Trash2, GripVertical } from 'lucide-react';

export function LayersPanel() {
  const { customElements, selectedElementId, setSelectedElementId, updateCustomElement, removeCustomElement } = usePortfolioStore();

  const sorted = [...customElements].sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0));

  return (
    <div style={{
      position: 'absolute', left: 88, bottom: 16, width: 220, maxHeight: 320,
      background: 'rgba(15,15,20,0.95)', backdropFilter: 'blur(12px)',
      border: '1px solid rgba(61,170,122,0.08)', borderRadius: 14,
      zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(61,170,122,0.06)', fontSize: '0.68rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Layers ({customElements.length})
      </div>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {sorted.length === 0 && (
          <p style={{ fontSize: '0.75rem', color: '#475569', textAlign: 'center', padding: '16px 8px' }}>No elements yet</p>
        )}
        {sorted.map(el => (
          <div
            key={el.id}
            onClick={() => setSelectedElementId(el.id === selectedElementId ? null : el.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', cursor: 'pointer',
              background: selectedElementId === el.id ? 'rgba(99,102,241,0.15)' : 'transparent',
              borderLeft: selectedElementId === el.id ? '2px solid #3DAA7A' : '2px solid transparent',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { if (selectedElementId !== el.id) (e.currentTarget as HTMLElement).style.background = 'rgba(61,170,122,0.04)'; }}
            onMouseLeave={e => { if (selectedElementId !== el.id) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            <GripVertical size={12} style={{ color: '#334155', flexShrink: 0 }} />
            <div style={{
              width: 20, height: 20, borderRadius: 4, flexShrink: 0,
              background: el.bgColor || el.color || '#3DAA7A',
              border: '1px solid rgba(61,170,122,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem'
            }}>
              {el.type === 'text' ? 'T' : el.type === 'image' ? '🖼' : el.type === 'button' ? 'B' : '■'}
            </div>
            <span style={{ flex: 1, fontSize: '0.72rem', color: el.hidden ? '#475569' : '#cbd5e1', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {el.content || el.type} {el.shapeType ? `(${el.shapeType})` : ''}
            </span>
            <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
              <button
                onClick={e => { e.stopPropagation(); updateCustomElement(el.id, { hidden: !el.hidden }); }}
                style={{ padding: 2, background: 'none', border: 'none', cursor: 'pointer', color: el.hidden ? '#475569' : '#64748b', display: 'flex' }}
                title={el.hidden ? 'Show' : 'Hide'}>
                {el.hidden ? <EyeOff size={12}/> : <Eye size={12}/>}
              </button>
              <button
                onClick={e => { e.stopPropagation(); updateCustomElement(el.id, { locked: !el.locked }); }}
                style={{ padding: 2, background: 'none', border: 'none', cursor: 'pointer', color: el.locked ? '#3DAA7A' : '#64748b', display: 'flex' }}
                title={el.locked ? 'Unlock' : 'Lock'}>
                {el.locked ? <Lock size={12}/> : <Unlock size={12}/>}
              </button>
              <button
                onClick={e => { e.stopPropagation(); removeCustomElement(el.id); }}
                style={{ padding: 2, background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', display: 'flex' }}
                title="Delete">
                <Trash2 size={12}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
