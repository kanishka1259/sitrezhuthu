'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function SkillInput() {
  const [input, setInput] = useState('');
  const { skills, addSkill, removeSkill } = usePortfolioStore();

  const handleAddSkill = () => {
    if (input.trim() && !skills.includes(input.trim())) {
      addSkill(input.trim());
      setInput('');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
          placeholder="Add a skill (e.g., React, TypeScript)"
          style={{ flex: 1, padding: '0.6rem 0.9rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 14, outline: 'none' }}
          onFocus={e => { e.currentTarget.style.borderColor = '#3DAA7A'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
        />
        <button
          onClick={handleAddSkill}
          style={{ padding: '0.6rem 1.1rem', background: '#3DAA7A', border: 'none', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'opacity .2s' }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
        >
          Add
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {skills.map((skill) => (
          <div key={skill} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(61,170,122,0.1)', color: '#62C99A', padding: '4px 12px', borderRadius: 999, border: '1px solid rgba(61,170,122,0.25)', fontSize: 13, fontWeight: 500 }}>
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(skill)}
              style={{ background: 'none', border: 'none', color: '#62C99A', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', opacity: 0.7 }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; }}
              aria-label="Remove skill"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
