'use client';

import { Trash2, Plus } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function EducationCard() {
  const { education, addEducation, updateEducation, removeEducation } = usePortfolioStore();

  return (
    <div className="space-y-4">
      {education.map((edu, idx) => (
        <div key={idx} className="border border-white/20 rounded-lg p-4 bg-white/5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-white">Education {idx + 1}</h3>
            <button
              onClick={() => removeEducation(idx)}
              className="text-red-400 hover:text-red-300 transition"
              aria-label="Delete education"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => updateEducation(idx, 'institution', e.target.value)}
              placeholder="Institution/University Name"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />

            <input
              type="text"
              value={edu.degree}
              onChange={(e) => updateEducation(idx, 'degree', e.target.value)}
              placeholder="Degree/Certification"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />

            <input
              type="text"
              value={edu.year}
              onChange={(e) => updateEducation(idx, 'year', e.target.value)}
              placeholder="Year/Duration (e.g., 2020-2024)"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-white/20 rounded-lg py-3 text-white/60 hover:border-purple-500 hover:text-purple-400 transition font-medium"
      >
        <Plus size={20} /> Add Education
      </button>
    </div>
  );
}
