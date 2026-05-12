'use client';

import { PortfolioStore, TemplateStyles, TEMPLATE_DEFAULTS } from '@/store/usePortfolioStore';
import { Mail, ExternalLink, Code2, GraduationCap, Briefcase } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons';
import Image from 'next/image';

interface DarkThemeTemplateProps { data: PortfolioStore; }

export function DarkThemeTemplate({ data }: DarkThemeTemplateProps) {
  const year = new Date().getFullYear();
  const s: TemplateStyles = data.templateStyles ?? TEMPLATE_DEFAULTS['dark'];
  const r = s.borderRadius;
  const bR = s.buttonRadius;
  const maxW = s.maxWidth;
  const p = s.primaryColor;
  const sec = s.secondaryColor;

  return (
    <div style={{ minHeight: '100vh', background: s.bgColor, color: s.textColor, fontFamily: `'${s.bodyFont}', sans-serif` }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=${s.headingFont.replace(/ /g,'+')}:wght@400;600;700&family=${s.bodyFont.replace(/ /g,'+')}:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .dk-nav-link { font-size:.82rem;color:${s.mutedColor};text-decoration:none;transition:color .2s;letter-spacing:.04em; }
        .dk-nav-link:hover { color:${p}; }
        .dk-skill { padding:.75rem 1rem;background:${s.cardBg};border:1px solid ${s.borderColor};border-radius:${r}px;font-size:.85rem;font-weight:500;text-align:center;transition:all .2s;cursor:default; }
        .dk-skill:hover { background:${p}1a;border-color:${p}66;color:${p}; }
        .dk-proj { padding:1.5rem;background:${s.cardBg};border:1px solid ${s.borderColor};border-radius:${r}px;transition:all .25s;display:flex;flex-direction:column;gap:1rem; }
        .dk-proj:hover { border-color:${p}66;background:${p}0d;transform:translateY(-3px); }
        .dk-link { display:inline-flex;align-items:center;gap:.35rem;font-size:.8rem;font-weight:600;color:${p};text-decoration:none;padding:.35rem .75rem;border:1px solid ${p}4d;border-radius:6px;transition:all .2s; }
        .dk-link:hover { background:${p}26; }
        .dk-cta { display:inline-flex;align-items:center;gap:.5rem;padding:.8rem 1.6rem;background:linear-gradient(135deg,${p},${sec});border-radius:${bR}px;font-weight:600;font-size:.9rem;color:#fff;text-decoration:none;cursor:pointer;border:none;transition:opacity .2s,transform .2s; }
        .dk-cta:hover { opacity:.9;transform:translateY(-1px); }
        .dk-cta-ghost { display:inline-flex;align-items:center;gap:.5rem;padding:.8rem 1.6rem;border:1px solid ${s.borderColor};border-radius:${bR}px;font-weight:600;font-size:.9rem;color:${s.mutedColor};text-decoration:none;cursor:pointer;background:transparent;transition:border-color .2s,color .2s; }
        .dk-cta-ghost:hover { border-color:${p};color:${p}; }
        .dk-avatar-shape { border-radius:${s.avatarShape==='circle'?'50%':s.avatarShape==='rounded'?r+'px':'4px'}; }
      `}</style>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: `${s.bgColor}eb`, backdropFilter: 'blur(12px)', borderBottom: `1px solid ${s.borderColor}`, padding: '1rem 0' }}>
        <div style={{ maxWidth: maxW, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-.01em', background: `linear-gradient(90deg,${p},${sec})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: `'${s.headingFont}', sans-serif` }}>
            {data.name || 'Portfolio'}
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Skills','Projects','Education','Contact'].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="dk-nav-link">{l}</a>)}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: maxW, margin: '0 auto', padding: '6rem 2rem 4rem', display: 'grid', gridTemplateColumns: s.heroLayout === 'split' && data.avatar && s.showAvatar ? '1fr auto' : '1fr', gap: '3rem', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', padding: '.35rem .85rem', border: `1px solid ${p}4d`, borderRadius: '999px', fontSize: '.75rem', color: p, fontFamily: 'JetBrains Mono, monospace', marginBottom: '1.5rem' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: p, animation: 'dkBlink 1.5s infinite' }} />
            Open to work
            <style>{`@keyframes dkBlink{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem,6vw,4rem)', fontWeight: 700, letterSpacing: '-.03em', lineHeight: 1.08, marginBottom: '1.5rem', fontFamily: `'${s.headingFont}', sans-serif` }}>
            Hi, I'm{' '}<span style={{ background: `linear-gradient(135deg, ${p} 0%, ${sec} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{data.name || 'Your Name'}</span>
          </h1>
          <p style={{ fontSize: '1rem', color: s.mutedColor, lineHeight: 1.75, maxWidth: 520, marginBottom: '2.5rem' }}>{data.bio || 'A passionate developer building elegant, scalable solutions for the modern web.'}</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {data.contact.email && <a href={`mailto:${data.contact.email}`} className="dk-cta"><Mail size={16} /> Get in Touch</a>}
            {data.contact.github && <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="dk-cta-ghost"><GithubIcon size={16} /> GitHub</a>}
          </div>
        </div>
        {data.avatar && s.showAvatar && (
          <div style={{ width: 200, height: 200, position: 'relative', flexShrink: 0 }}>
            <Image 
              src={data.avatar} 
              alt={data.name || 'Avatar'} 
              fill 
              sizes="200px"
              className="dk-avatar-shape" 
              style={{ objectFit: 'cover', border: `2px solid ${p}4d`, boxShadow: `0 0 60px ${p}4d` }} 
            />
          </div>
        )}
      </div>

      {/* Skills */}
      {data.skills.length > 0 && (
        <section id="skills" style={{ maxWidth: maxW, margin: '0 auto', padding: '4rem 2rem', borderTop: `1px solid ${s.borderColor}` }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.75rem', color: p, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.5rem' }}><Code2 size={12} style={{ display: 'inline', marginRight: 6 }} />Skills & Tools</p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-.02em', marginBottom: '2.5rem', fontFamily: `'${s.headingFont}', sans-serif` }}>What I Work With</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: '.75rem' }}>
            {data.skills.map(skill => <div key={skill} className="dk-skill">{skill}</div>)}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section id="projects" style={{ maxWidth: maxW, margin: '0 auto', padding: '4rem 2rem', borderTop: `1px solid ${s.borderColor}` }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.75rem', color: p, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.5rem' }}><Briefcase size={12} style={{ display: 'inline', marginRight: 6 }} />Work</p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-.02em', marginBottom: '2.5rem', fontFamily: `'${s.headingFont}', sans-serif` }}>Featured Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '1.25rem' }}>
            {data.projects.map((project, idx) => (
              <div key={idx} className="dk-proj">
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.75rem', color: `${p}99` }}>project_{String(idx+1).padStart(2,'0')}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: `'${s.headingFont}', sans-serif` }}>{project.title || `Project ${idx + 1}`}</div>
                <p style={{ fontSize: '.875rem', color: s.mutedColor, lineHeight: 1.65, flex: 1 }}>{project.description}</p>
                {project.proficiency != null && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.75rem', color: s.mutedColor, marginBottom: '.4rem' }}>
                      <span>Proficiency</span><span>{project.proficiency}%</span>
                    </div>
                    <div style={{ height: 4, background: s.borderColor, borderRadius: '999px' }}>
                      <div style={{ width: `${project.proficiency}%`, height: '100%', background: `linear-gradient(90deg, ${p}, ${sec})`, borderRadius: '999px' }} />
                    </div>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                  {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="dk-link"><GithubIcon size={13} /> Code</a>}
                  {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="dk-link"><ExternalLink size={13} /> Live</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section id="education" style={{ maxWidth: maxW, margin: '0 auto', padding: '4rem 2rem', borderTop: `1px solid ${s.borderColor}` }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.75rem', color: p, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.5rem' }}><GraduationCap size={12} style={{ display: 'inline', marginRight: 6 }} />Background</p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-.02em', marginBottom: '2.5rem', fontFamily: `'${s.headingFont}', sans-serif` }}>Education</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {data.education.map((edu, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1.5rem', padding: '1.4rem 0', borderBottom: `1px solid ${s.borderColor}` }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '.2rem' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: `linear-gradient(135deg,${p},${sec})`, flexShrink: 0 }} />
                  {idx < data.education.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 30, background: `linear-gradient(to bottom, ${p}30, transparent)`, marginTop: 4 }} />}
                </div>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.75rem', color: sec, marginBottom: '.35rem' }}>{edu.year}</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '.2rem', fontFamily: `'${s.headingFont}', sans-serif` }}>{edu.degree}</div>
                  <div style={{ color: s.mutedColor, fontSize: '.875rem' }}>{edu.institution}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" style={{ maxWidth: maxW, margin: '0 auto', padding: '4rem 2rem 5rem', borderTop: `1px solid ${s.borderColor}`, textAlign: 'center' }}>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.75rem', color: p, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.5rem' }}>// reach out</p>
        <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 700, letterSpacing: '-.02em', marginBottom: '.75rem', fontFamily: `'${s.headingFont}', sans-serif` }}>
          Let's build something{' '}<span style={{ background: `linear-gradient(90deg,${p},${sec})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>great</span>
        </h2>
        <p style={{ color: s.mutedColor, maxWidth: 400, margin: '0 auto 2rem', lineHeight: 1.7 }}>Whether you have a project in mind or just want to chat — my inbox is always open.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {data.contact.email && <a href={`mailto:${data.contact.email}`} className="dk-cta"><Mail size={16} /> Email Me</a>}
          {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="dk-cta-ghost"><LinkedinIcon size={16} /> LinkedIn</a>}
          {data.contact.twitter && <a href={data.contact.twitter} target="_blank" rel="noopener noreferrer" className="dk-cta-ghost"><TwitterIcon size={16} /> Twitter</a>}
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '1.5rem', fontSize: '.78rem', color: `${s.mutedColor}66`, borderTop: `1px solid ${s.borderColor}`, fontFamily: 'JetBrains Mono, monospace' }}>
        © {year} {data.name} · Crafted with Sitrezhuthu
      </footer>
    </div>
  );
}
