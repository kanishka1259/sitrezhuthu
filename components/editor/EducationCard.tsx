'use client';

import { Trash2, Plus } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function EducationCard() {
  const { education, addEducation, updateEducation, removeEducation } = usePortfolioStore();

  return (
    <div className="space-y-4">
      {education.map((edu, idx) => (
        <div key={idx} style={{ padding: '1.5rem', background: 'var(--editor-card-bg)', border: '1px solid var(--editor-card-border)', borderRadius: 20, marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '1rem', color: '#3DAA7A' }}>Education {idx + 1}</h3>
            <button
              onClick={() => removeEducation(idx)}
              style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)', border: 'none', padding: '0.4rem', borderRadius: 8, cursor: 'pointer', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background  = 'rgba(239,68,68,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background  = 'rgba(239,68,68,0.1)'; }}
              aria-label="Delete education"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => updateEducation(idx, 'institution', e.target.value)}
              placeholder="Institution/University Name"
              className="editor-input"
            />

            <input
              type="text"
              value={edu.degree}
              onChange={(e) => updateEducation(idx, 'degree', e.target.value)}
              placeholder="Degree/Certification"
              className="editor-input"
            />

            <input
              type="text"
              value={edu.year}
              onChange={(e) => updateEducation(idx, 'year', e.target.value)}
              placeholder="Year/Duration (e.g., 2020-2024)"
              className="editor-input"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: 8, padding: '1rem', border: '2px dashed var(--editor-border-strong)', borderRadius: 20, color: '#3DAA7A', fontWeight: 600, fontSize: '0.9rem', background: 'transparent', cursor: 'pointer', transition: 'all .2s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor  = '#3DAA7A'; e.currentTarget.style.color  = '#3DAA7A'; e.currentTarget.style.background  = 'var(--editor-card-bg)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor  = 'var(--editor-border-strong)'; e.currentTarget.style.color  = '#3DAA7A'; e.currentTarget.style.background  = 'transparent'; }}
      >
        <Plus size={20} /> Add Education
      </button>
    </div>
  );
}
