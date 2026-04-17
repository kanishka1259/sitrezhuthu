'use client';

import { PortfolioStore } from '@/store/usePortfolioStore';
import { Mail, Link, GitBranch, Share2, ExternalLink } from 'lucide-react';

interface ModernCardsTemplateProps {
  data: PortfolioStore;
}

export function ModernCardsTemplate({ data }: ModernCardsTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-center gap-8">
            {data.avatar && (
              <img
                src={data.avatar}
                alt={data.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            )}
            <div>
              <h1 className="text-5xl font-bold mb-2">{data.name || 'Your Name'}</h1>
              <p className="text-xl text-blue-100">{data.bio || 'Your bio goes here'}</p>

              <div className="flex gap-4 mt-6">
                {data.contact.email && (
                  <a href={`mailto:${data.contact.email}`} className="hover:text-blue-200 transition">
                    <Mail size={24} />
                  </a>
                )}
                {data.contact.linkedin && (
                  <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition">
                    <Link size={24} />
                  </a>
                )}
                {data.contact.github && (
                  <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition">
                    <GitBranch size={24} />
                  </a>
                )}
                {data.contact.twitter && (
                  <a href={data.contact.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition">
                    <Share2 size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.skills.map((skill) => (
                <div key={skill} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 text-center">
                  <p className="font-semibold text-gray-800">{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.projects.map((project, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{project.title || `Project ${idx + 1}`}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  {(project.proficiency || project.proficiency === 0) && (
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Proficiency</span>
                        <span className="text-sm font-medium text-gray-700">{project.proficiency}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          style={{ width: `${project.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3 pt-4">
                    {project.github && (
                      <a
                        href={project.github}
                        className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitBranch size={18} /> Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={18} /> Live
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
        <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Education</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {data.education.map((edu, idx) => (
                <div key={idx} className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{edu.degree}</h3>
                  <p className="text-gray-700 font-medium">{edu.institution}</p>
                  <p className="text-gray-600 mt-2">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>© 2024. Made with Portfolio Generator</p>
      </footer>
    </div>
  );
}
