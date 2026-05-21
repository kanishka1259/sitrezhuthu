'use client';

import { useState } from 'react';
import { Trash2, Plus, Image as ImageIcon, Loader2 } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { useFirebaseAuth } from '@/lib/firebase-auth-context';

export function ProjectCard() {
  const { projects, addProject, updateProject, removeProject } = usePortfolioStore();
  const { getIdToken } = useFirebaseAuth();
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  const handleImageUpload = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingIdx(idx);
    try {
      const token = await getIdToken();
      const formData = new FormData();
      formData.append('file', file);
      formData.append('isAvatar', 'false');
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Upload failed with status ${res.status}`);
      }
      const data = await res.json();
      updateProject(idx, 'image', data.url);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload project image';
      alert(message);
    } finally {
      setUploadingIdx(null);
    }
  };

  const inputCls = 'editor-input';
  const labelCls = 'editor-label';

  return (
    <div className="space-y-6">
      {projects.map((project, idx) => (
        <div key={idx} style={{ padding: '1.5rem', background: 'var(--editor-card-bg)', border: '1px solid var(--editor-card-border)', borderRadius: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '1rem', color: '#3DAA7A' }}>Project {idx + 1}</h3>
            <button
              onClick={() => removeProject(idx)}
              style={{ color: '#ef4444', background: 'rgba(239,68,68,0.1)', border: 'none', padding: '0.4rem', borderRadius: 8, cursor: 'pointer', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background  = 'rgba(239,68,68,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background  = 'rgba(239,68,68,0.1)'; }}
              title="Delete project"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className={labelCls} style={{ marginTop: 0 }}>Project Title</label>
              <input type="text" value={project.title} onChange={(e) => updateProject(idx, 'title', e.target.value)} placeholder="E-Commerce Platform" className={inputCls} />
            </div>

            <div>
              <label className={labelCls}>Description</label>
              <textarea value={project.description} onChange={(e) => updateProject(idx, 'description', e.target.value)} placeholder="Built a highly scalable platform..." rows={3} className={inputCls} style={{ resize: 'vertical' }} />
            </div>

            {/* Image Upload */}
            <div>
              <label className={labelCls}>Cover Image (Optional)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--editor-input-bg)', border: '1px solid var(--editor-input-border)', borderRadius: 16, padding: '1rem' }}>
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.image} alt="Project Cover" style={{ width: 80, height: 60, borderRadius: 10, objectFit: 'cover', border: '1px solid var(--editor-border)' }} />
                ) : (
                  <div style={{ width: 80, height: 60, borderRadius: 10, background: 'var(--editor-card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ImageIcon size={24} color="#3DAA7A" />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(idx, e)} disabled={uploadingIdx === idx} style={{ fontSize: '0.85rem', color: '#3DAA7A', fontWeight: 400 }} />
                  {uploadingIdx === idx && <div style={{ fontSize: '0.8rem', color: '#3DAA7A', marginTop: 4, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}><Loader2 size={12} className="animate-spin" /> Uploading...</div>}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label className={labelCls}>Live URL</label>
                <input type="url" value={project.live} onChange={(e) => updateProject(idx, 'live', e.target.value)} placeholder="https://example.com" className={inputCls} />
              </div>
              <div style={{ flex: 1 }}>
                <label className={labelCls}>GitHub URL</label>
                <input type="url" value={project.github} onChange={(e) => updateProject(idx, 'github', e.target.value)} placeholder="https://github.com/user/repo" className={inputCls} />
              </div>
            </div>

          </div>
        </div>
      ))}

      <button
        onClick={addProject}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: 8, padding: '1rem', border: '2px dashed var(--editor-border-strong)', borderRadius: 20, color: '#3DAA7A', fontWeight: 600, fontSize: '0.9rem', background: 'transparent', cursor: 'pointer', transition: 'all .2s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor  = '#3DAA7A'; e.currentTarget.style.color  = '#3DAA7A'; e.currentTarget.style.background  = 'var(--editor-card-bg)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor  = 'var(--editor-border-strong)'; e.currentTarget.style.color  = '#3DAA7A'; e.currentTarget.style.background  = 'transparent'; }}
      >
        <Plus size={18} /> Add New Project
      </button>
    </div>
  );
}
