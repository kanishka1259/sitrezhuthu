'use client';

import { useState } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { SkillInput } from './SkillInput';
import { ProjectCard } from './ProjectCard';
import { EducationCard } from './EducationCard';
import { Save, FileJson, Share2, Download, Copy } from 'lucide-react';
import { usePDF } from '@/hooks/usePDF';

interface FormPanelProps {
  onSave?: () => Promise<void>;
  isSaving?: boolean;
}

export function FormPanel({ onSave, isSaving = false }: FormPanelProps) {
  const portfolio = usePortfolioStore();
  const [activeTab, setActiveTab] = useState<'basic' | 'projects' | 'education' | 'contact'>('basic');
  const { generatePDF } = usePDF();

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(portfolio, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = async () => {
    await generatePDF('portfolio-preview', `${portfolio.name || 'portfolio'}.pdf`);
  };

  const handleCopyLink = async () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/p/${portfolio.name?.toLowerCase().replace(/\s+/g, '-') || 'portfolio'}`;
      await navigator.clipboard.writeText(url);
      alert('Portfolio link copied to clipboard!');
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-900/50">
      {/* Header with Actions */}
      <div className="border-b border-white/10 p-4 sticky top-0 z-10 bg-slate-900/80 backdrop-blur">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Portfolio Editor</h2>
          <div className="flex gap-2">
            <button
              onClick={handleExportJSON}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition"
              title="Export as JSON"
            >
              <FileJson size={20} />
            </button>
            <button
              onClick={handleExportPDF}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition"
              title="Export as PDF"
            >
              <Download size={20} />
            </button>
            <button
              onClick={handleCopyLink}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition"
              title="Copy portfolio link"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={onSave}
              disabled={isSaving}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 transition flex items-center gap-2"
            >
              <Save size={18} /> {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Template Selector */}
        <div className="flex gap-2">
          <label className="text-sm font-medium text-white/90">Template:</label>
          <select
            value={portfolio.template}
            onChange={(e) => portfolio.setTemplate(e.target.value as any)}
            className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            <option value="minimal">Minimal</option>
            <option value="cards">Modern Cards</option>
            <option value="dark">Dark Theme</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {(['basic', 'projects', 'education', 'contact'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 font-medium text-center transition border-b-2 ${
              activeTab === tab ? 'border-purple-500 text-purple-400' : 'border-transparent text-white/60 hover:text-white/90'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6 max-w-lg">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Full Name *</label>
              <input
                type="text"
                value={portfolio.name}
                onChange={(e) => portfolio.setField('name', e.target.value)}
                placeholder="John Doe"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Bio</label>
              <textarea
                value={portfolio.bio}
                onChange={(e) => portfolio.setField('bio', e.target.value)}
                placeholder="Write a brief bio about yourself..."
                rows={4}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Avatar URL</label>
              <input
                type="url"
                value={portfolio.avatar}
                onChange={(e) => portfolio.setField('avatar', e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
              {portfolio.avatar && (
                <img src={portfolio.avatar} alt="Avatar preview" className="mt-3 w-32 h-32 rounded-lg object-cover border-2 border-purple-500" />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">Skills</label>
              <SkillInput />
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="max-w-lg">
            <ProjectCard />
          </div>
        )}

        {activeTab === 'education' && (
          <div className="max-w-lg">
            <EducationCard />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4 max-w-lg">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
              <input
                type="email"
                value={portfolio.contact.email}
                onChange={(e) => portfolio.updateContact('email', e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={portfolio.contact.linkedin}
                onChange={(e) => portfolio.updateContact('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">GitHub URL</label>
              <input
                type="url"
                value={portfolio.contact.github}
                onChange={(e) => portfolio.updateContact('github', e.target.value)}
                placeholder="https://github.com/yourprofile"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Twitter URL</label>
              <input
                type="url"
                value={portfolio.contact.twitter}
                onChange={(e) => portfolio.updateContact('twitter', e.target.value)}
                placeholder="https://twitter.com/yourprofile"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
