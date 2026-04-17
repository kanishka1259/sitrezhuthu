'use client';

import { Trash2, Plus } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function ProjectCard() {
  const { projects, addProject, updateProject, removeProject } = usePortfolioStore();

  return (
    <div className="space-y-4">
      {projects.map((project, idx) => (
        <div key={idx} className="border border-white/20 rounded-lg p-4 bg-white/5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-white">Project {idx + 1}</h3>
            <button
              onClick={() => removeProject(idx)}
              className="text-red-400 hover:text-red-300 transition"
              aria-label="Delete project"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={project.title}
              onChange={(e) => updateProject(idx, 'title', e.target.value)}
              placeholder="Project Title"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />

            <textarea
              value={project.description}
              onChange={(e) => updateProject(idx, 'description', e.target.value)}
              placeholder="Project Description"
              rows={3}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />

            <input
              type="url"
              value={project.github}
              onChange={(e) => updateProject(idx, 'github', e.target.value)}
              placeholder="GitHub URL (optional)"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />

            <input
              type="url"
              value={project.live}
              onChange={(e) => updateProject(idx, 'live', e.target.value)}
              placeholder="Live Demo URL (optional)"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Proficiency: {project.proficiency || 50}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={project.proficiency || 50}
                onChange={(e) => updateProject(idx, 'proficiency', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addProject}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-white/20 rounded-lg py-3 text-white/60 hover:border-purple-500 hover:text-purple-400 transition font-medium"
      >
        <Plus size={20} /> Add Project
      </button>
    </div>
  );
}
