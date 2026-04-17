'use client';

import { PortfolioStore } from '@/store/usePortfolioStore';
import { Mail, Link, GitBranch, Share2 } from 'lucide-react';

interface MinimalTemplateProps {
  data: PortfolioStore;
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {data.avatar && (
            <img
              src={data.avatar}
              alt={data.name}
              className="w-24 h-24 rounded-full object-cover mb-6 border-2 border-gray-300"
            />
          )}
          <h1 className="text-4xl font-bold mb-2">{data.name || 'Your Name'}</h1>
          <p className="text-lg text-gray-600">{data.bio || 'Your bio goes here'}</p>

          {/* Contact Links */}
          <div className="flex gap-4 mt-6">
            {data.contact.email && (
              <a href={`mailto:${data.contact.email}`} className="text-gray-600 hover:text-gray-900">
                <Mail size={20} />
              </a>
            )}
            {data.contact.linkedin && (
              <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <Link size={20} />
              </a>
            )}
            {data.contact.github && (
              <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <GitBranch size={20} />
              </a>
            )}
            {data.contact.twitter && (
              <a href={data.contact.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <Share2 size={20} />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-6">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill} className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            <div className="space-y-8">
              {data.projects.map((project, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-bold mb-2">{project.title || `Project ${idx + 1}`}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex gap-4">
                    {project.github && (
                      <a href={project.github} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section>
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-6">Education</h2>
            <div className="space-y-6">
              {data.education.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-bold">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-6 text-center text-gray-600">
        <p>© 2024. Made with Portfolio Generator</p>
      </footer>
    </div>
  );
}
