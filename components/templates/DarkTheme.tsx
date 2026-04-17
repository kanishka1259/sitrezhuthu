'use client';

import { PortfolioStore } from '@/store/usePortfolioStore';
import { Mail, Link, GitBranch, Share2, ArrowRight } from 'lucide-react';

interface DarkThemeTemplateProps {
  data: PortfolioStore;
}

export function DarkThemeTemplate({ data }: DarkThemeTemplateProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 sticky top-0 bg-gray-950 bg-opacity-95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {data.name || 'Portfolio'}
          </h1>
          <div className="flex gap-6">
            {data.contact.github && (
              <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
                <GitBranch size={20} />
              </a>
            )}
            {data.contact.linkedin && (
              <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
                <Link size={20} />
              </a>
            )}
            {data.contact.twitter && (
              <a href={data.contact.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
                <Share2 size={20} />
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {data.name || 'Your Name'}
              </h1>
              <p className="text-xl text-gray-400 mb-8">{data.bio || 'Your bio goes here'}</p>
              <button className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-6 py-3 rounded-lg transition">
                Get in Touch <ArrowRight size={20} />
              </button>
            </div>
            {data.avatar && (
              <img
                src={data.avatar}
                alt={data.name}
                className="w-full max-w-sm rounded-lg border-2 border-cyan-500 shadow-2xl shadow-cyan-500/50"
              />
            )}
          </div>
        </div>
      </header>

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="border-b border-gray-800 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-white">Skills & Expertise</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500 border-opacity-20 rounded-lg p-4 hover:border-opacity-100 transition text-center"
                >
                  <p className="font-bold text-cyan-400">{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="border-b border-gray-800 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-white">Featured Work</h2>
            <div className="space-y-8">
              {data.projects.map((project, idx) => (
                <div key={idx} className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-8 hover:border-cyan-500 transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{project.title || `Project ${idx + 1}`}</h3>
                      <p className="text-gray-400">{project.description}</p>
                    </div>
                  </div>

                  {(project.proficiency || project.proficiency === 0) && (
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-300">Proficiency</span>
                        <span className="text-sm font-bold text-cyan-400">{project.proficiency}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          style={{ width: `${project.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    {project.github && (
                      <a
                        href={project.github}
                        className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-2 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitBranch size={20} /> Source Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-2 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ArrowRight size={20} /> Live Demo
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
        <section className="border-b border-gray-800 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-white">Education</h2>
            <div className="space-y-6">
              {data.education.map((edu, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-1 bg-gradient-to-b from-cyan-500 to-blue-500"></div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                    <p className="text-gray-400">{edu.institution}</p>
                    <p className="text-cyan-400 text-sm font-medium mt-1">{edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA & Contact */}
      <section className="py-20 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">Let's Work Together</h2>
          <div className="flex gap-6 justify-center flex-wrap">
            {data.contact.email && (
              <a href={`mailto:${data.contact.email}`} className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-6 py-3 rounded-lg transition">
                <Mail size={20} /> Email Me
              </a>
            )}
            {data.contact.linkedin && (
              <a
                href={data.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black font-bold px-6 py-3 rounded-lg transition"
              >
                <Link size={20} /> LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600">
        <p>© 2024. Made with Portfolio Generator</p>
      </footer>
    </div>
  );
}
