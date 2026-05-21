'use client';

import { PortfolioStore, TemplateStyles, TEMPLATE_DEFAULTS } from '@/store/usePortfolioStore';
import { Mail, ExternalLink, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons';

interface TechMinimalTemplateProps { data: PortfolioStore; }

export function TechMinimalTemplate({ data }: TechMinimalTemplateProps) {
  const year = new Date().getFullYear();
  const s: TemplateStyles = { ...TEMPLATE_DEFAULTS['tech-minimal'], ...(data.templateStyles || {}) };
  const bR = s.buttonRadius;
  const maxW = s.maxWidth;
  const p = s.primaryColor;

  const bFont = s.bodyFont || 'Inter';

  return (
    <div style={{ minHeight: '100vh', background: s.bgColor, color: s.textColor, fontFamily: `'${bFont}', sans-serif` }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=${bFont.replace(/ /g,'+')}:wght@400;500;600&display=swap');
        .tk-mono { font-family: 'JetBrains Mono', monospace; }
        .tk-grid-bg { position:fixed;inset:0;background-image:linear-gradient(${p}0a 1px,transparent 1px),linear-gradient(90deg,${p}0a 1px,transparent 1px);background-size:40px 40px;pointer-events:none;z-index:0; }
        .tk-scanline { position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,${p}04 2px,${p}04 4px);pointer-events:none;z-index:9999; }
        .tk-nav-link { font-family:'JetBrains Mono',monospace;font-size:.75rem;color:${s.mutedColor};text-decoration:none;padding:.4rem .9rem;transition:color .2s; }
        .tk-nav-link:hover { color:${p}; }
        .tk-skill { padding:.85rem 1.1rem;background:${s.cardBg};font-family:'JetBrains Mono',monospace;font-size:.78rem;font-weight:500;color:${s.mutedColor};transition:all .2s;cursor:default;border-right:1px solid ${s.borderColor};border-bottom:1px solid ${s.borderColor};display:flex;align-items:center;gap:.5rem; }
        .tk-skill::before { content:'>';color:${p}66;font-size:.7rem; }
        .tk-skill:hover { background:${p}14;color:${p}; }
        .tk-proj { padding:1.5rem 1.75rem;border-bottom:1px solid ${s.borderColor};transition:background .2s;display:grid;grid-template-columns:auto 1fr auto;gap:1.5rem;align-items:start; }
        .tk-proj:last-child { border-bottom:none; }
        .tk-proj:hover { background:${p}0a; }
        .tk-plink { display:inline-flex;align-items:center;gap:.3rem;font-family:'JetBrains Mono',monospace;font-size:.7rem;color:${p}b3;text-decoration:none;transition:color .2s; }
        .tk-plink:hover { color:${p}; }
        .tk-btn-primary { font-family:'JetBrains Mono',monospace;display:inline-flex;align-items:center;gap:.5rem;padding:.7rem 1.4rem;font-size:.8rem;font-weight:600;text-decoration:none;cursor:pointer;border:none;transition:all .2s;background:${p};color:${s.bgColor};border-radius:${bR}px; }
        .tk-btn-primary:hover { box-shadow:0 0 30px ${p}66; }
        .tk-btn-outline { font-family:'JetBrains Mono',monospace;display:inline-flex;align-items:center;gap:.5rem;padding:.7rem 1.4rem;font-size:.8rem;font-weight:600;text-decoration:none;cursor:pointer;transition:all .2s;background:transparent;color:${p};border:1px solid ${p}66;border-radius:${bR}px; }
        .tk-btn-outline:hover { background:${p}14;border-color:${p}; }
        .tk-social-link { font-family:'JetBrains Mono',monospace;display:inline-flex;align-items:center;gap:.4rem;font-size:.78rem;color:${p}99;text-decoration:none;transition:color .2s; }
        .tk-social-link:hover { color:${p}; }

        @media (max-width: 768px) {
          .tk-nav-links { display: none !important; }
          .tk-proj { grid-template-columns: 1fr; gap: 1rem; }
          .tk-proj > div:first-child { display: none; }
          .tk-proj > div:last-child { flex-direction: row !important; gap: 1rem !important; }
          .tk-edu-item { grid-template-columns: 1fr !important; gap: .5rem !important; }
          .tk-btn-group { flex-direction: column; width: 100%; }
          .tk-btn-group > * { width: 100%; justify-content: center; }
          .tk-contact-box { padding: 2rem !important; }
          .tk-wrap section, .tk-wrap > div { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
        }
      `}</style>

      <div className="tk-grid-bg" />
      <div className="tk-scanline" />

      <div className="tk-wrap" style={{ position: 'relative', zIndex: 1 }}>
        {/* Nav */}
        <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: `${s.bgColor}f2`, backdropFilter: 'blur(8px)', borderBottom: `1px solid ${s.borderColor}` }}>
          <div style={{ maxWidth: maxW, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
            <span className="tk-mono" style={{ fontSize: '.95rem', fontWeight: 700, color: p }}>
              {'>'+'_'} <span style={{ color: s.mutedColor }}>{data.name || 'dev'}</span>
            </span>
            <div className="tk-nav-links" style={{ display: 'flex', gap: 0 }}>
              {['skills','projects','education','contact'].map(l => <a key={l} href={`#${l}`} className="tk-nav-link">{l}</a>)}
            </div>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ maxWidth: maxW, margin: '0 auto', padding: '5rem 2rem 4rem' }}>
          <div className="tk-mono" style={{ fontSize: '.8rem', color: p, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <span style={{ color: s.mutedColor }}>~/portfolio</span>
            <span style={{ color: p }}>$</span>
            <span>whoami</span>
            <span style={{ display: 'inline-block', width: 10, height: '1.1em', background: p, animation: 'tkBlink 1s step-end infinite', verticalAlign: 'text-bottom', marginLeft: 2 }} />
            <style>{`@keyframes tkBlink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-.03em', marginBottom: '1.5rem', fontFamily: `'${s.headingFont}', sans-serif` }}>
            <span style={{ color: p }}>{data.name || 'Your Name'}</span>
            <span className="tk-mono" style={{ color: `${s.mutedColor}66`, fontSize: '.6em', fontWeight: 300, display: 'block', marginTop: '.5rem', letterSpacing: '.02em' }}>
              {data.contact.email || '// developer & creator'}
            </span>
          </h1>
          <p style={{ fontSize: '1rem', color: s.mutedColor, lineHeight: 1.75, maxWidth: 560, marginBottom: '2.5rem', borderLeft: `2px solid ${p}66`, paddingLeft: '1.25rem' }}>
            {data.bio || 'A developer obsessed with clean architecture, performance, and the craft of building things that last.'}
          </p>
          <div className="tk-btn-group" style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
            {data.contact.email && <a href={`mailto:${data.contact.email}`} className="tk-btn-primary"><Terminal size={14} /> ./contact.sh</a>}
            {data.contact.github && <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="tk-btn-outline"><GithubIcon size={14} /> github</a>}
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="tk-social-link"><LinkedinIcon size={12} /> /in/profile</a>}
            {data.contact.twitter && <a href={data.contact.twitter} target="_blank" rel="noopener noreferrer" className="tk-social-link"><TwitterIcon size={12} /> @handle</a>}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <section id="skills" style={{ maxWidth: maxW, margin: '0 auto', padding: `${s.sectionGap}px 2rem`, borderTop: `1px solid ${s.borderColor}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <span className="tk-mono" style={{ fontSize: '.7rem', color: p }}>01.</span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, letterSpacing: '-.01em', fontFamily: `'${s.headingFont}', sans-serif` }}>Skills & Tools</h2>
              <div style={{ flex: 1, height: 1, background: `${p}20` }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: '1px', border: `1px solid ${s.borderColor}` }}>
              {data.skills.map(skill => <div key={skill} className="tk-skill">{skill}</div>)}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section id="projects" style={{ maxWidth: maxW, margin: '0 auto', padding: `${s.sectionGap}px 2rem`, borderTop: `1px solid ${s.borderColor}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <span className="tk-mono" style={{ fontSize: '.7rem', color: p }}>02.</span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, letterSpacing: '-.01em', fontFamily: `'${s.headingFont}', sans-serif` }}>Projects</h2>
              <div style={{ flex: 1, height: 1, background: `${p}20` }} />
            </div>
            <div style={{ border: `1px solid ${s.borderColor}` }}>
              {data.projects.map((project, idx) => (
                <div key={idx} className="tk-proj">
                  <div className="tk-mono" style={{ fontSize: '.7rem', color: `${p}80`, paddingTop: '.2rem' }}>{'0' + (idx+1)}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '.4rem', fontFamily: `'${s.headingFont}', sans-serif` }}>{project.title || `project_${idx+1}`}</div>
                    <p style={{ fontSize: '.85rem', color: s.mutedColor, lineHeight: 1.6 }}>{project.description}</p>
                    {project.proficiency != null && (
                      <div style={{ marginTop: '.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.7rem', color: s.mutedColor, fontFamily: 'JetBrains Mono, monospace', marginBottom: '.3rem' }}>
                          <span>proficiency</span><span style={{ color: p }}>{project.proficiency}%</span>
                        </div>
                        <div style={{ height: 2, background: `${p}1a`, borderRadius: '1px' }}>
                          <div style={{ width: `${project.proficiency}%`, height: '100%', background: p, borderRadius: '1px' }} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem', flexShrink: 0, paddingTop: '.2rem' }}>
                    {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="tk-plink"><GithubIcon size={11} /> src</a>}
                    {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="tk-plink"><ExternalLink size={11} /> live</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section id="education" style={{ maxWidth: maxW, margin: '0 auto', padding: `${s.sectionGap}px 2rem`, borderTop: `1px solid ${s.borderColor}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <span className="tk-mono" style={{ fontSize: '.7rem', color: p }}>03.</span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: `'${s.headingFont}', sans-serif` }}>Education</h2>
              <div style={{ flex: 1, height: 1, background: `${p}20` }} />
            </div>
            <div style={{ border: `1px solid ${s.borderColor}` }}>
              {data.education.map((edu, idx) => (
                <div key={idx} className="tk-edu-item" style={{ padding: '1.25rem 1.75rem', borderBottom: idx < data.education.length-1 ? `1px solid ${s.borderColor}` : 'none', display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1.5rem', alignItems: 'center' }}>
                  <div className="tk-mono" style={{ fontSize: '.75rem', color: `${p}99` }}>{edu.year}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '.95rem', marginBottom: '.2rem', fontFamily: `'${s.headingFont}', sans-serif` }}>{edu.degree}</div>
                    <div style={{ fontSize: '.82rem', color: s.mutedColor }}>{edu.institution}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" style={{ maxWidth: maxW, margin: '0 auto', padding: `${s.sectionGap}px 2rem` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span className="tk-mono" style={{ fontSize: '.7rem', color: p }}>04.</span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: `'${s.headingFont}', sans-serif` }}>Contact</h2>
            <div style={{ flex: 1, height: 1, background: `${p}20` }} />
          </div>
          <div className="tk-contact-box" style={{ border: `1px solid ${p}33`, padding: '3rem', background: `${p}05` }}>
            <p className="tk-mono" style={{ fontSize: '.78rem', color: `${p}99`, marginBottom: '.5rem' }}># Let&apos;s collaborate</p>
            <h3 style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 700, letterSpacing: '-.02em', marginBottom: '.75rem', fontFamily: `'${s.headingFont}', sans-serif` }}>Got a project? Let&apos;s talk.</h3>
            <p style={{ fontSize: '.9rem', color: s.mutedColor, maxWidth: 440, lineHeight: 1.75, marginBottom: '1.5rem' }}>I&apos;m always up for discussing interesting technical challenges and new projects.</p>
            {data.contact.email && <a href={`mailto:${data.contact.email}`} className="tk-btn-primary"><Mail size={14} /> {data.contact.email}</a>}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="tk-social-link"><LinkedinIcon size={12} /> linkedin</a>}
              {data.contact.github && <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="tk-social-link"><GithubIcon size={12} /> github</a>}
              {data.contact.twitter && <a href={data.contact.twitter} target="_blank" rel="noopener noreferrer" className="tk-social-link"><TwitterIcon size={12} /> twitter</a>}
            </div>
          </div>
        </section>

        <footer className="tk-mono" style={{ textAlign: 'center', padding: '1.25rem', borderTop: `1px solid ${s.borderColor}`, fontSize: '.72rem', color: `${s.mutedColor}33` }}>
          {`/* © ${year} ${data.name || 'Portfolio'} — built with sitrezhuthu */`}
        </footer>

        <div className="tk-mobile-nav tk-mono" style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', padding: '.6rem 1.25rem', borderRadius: '4px', display: 'none', gap: '1rem', border: `1px solid ${p}4d`, boxShadow: `0 0 30px ${p}33`, zIndex: 100 }}>
          {['skills','projects','contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: '.65rem', color: p, textDecoration: 'none', fontWeight: 600 }}>{'> '+l}</a>
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) {
            .tk-mobile-nav { display: flex !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
