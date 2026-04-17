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
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
          placeholder="Add a skill (e.g., React, TypeScript)"
          className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        <button onClick={handleAddSkill} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition">
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div key={skill} className="inline-flex items-center gap-2 bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full border border-purple-500/50">
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(skill)}
              className="hover:text-purple-100 transition"
              aria-label="Remove skill"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
