'use client';

import { PortfolioStore, TemplateStyles, TEMPLATE_DEFAULTS } from '@/store/usePortfolioStore';
import { Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons';
import Image from 'next/image';

interface GlassmorphismTemplateProps { data: PortfolioStore; }

export function GlassmorphismTemplate({ data }: GlassmorphismTemplateProps) {
  const year = new Date().getFullYear();
  const s: TemplateStyles = { ...TEMPLATE_DEFAULTS['glassmorphism'], ...(data.templateStyles || {}) };
  const r = s.borderRadius;
  const bR = s.buttonRadius;
  const maxW = s.maxWidth;
  const p = s.primaryColor;
  const sec = s.secondaryColor;

  const hFont = s.headingFont || 'Outfit';
  const bFont = s.bodyFont || 'Outfit';

  return (
    <div style={{ minHeight: '100vh', background: s.bgColor, fontFamily: `'${bFont}', sans-serif`, position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=${hFont.replace(/ /g,'+')}:wght@300;400;600;700;800&family=${bFont.replace(/ /g,'+')}:wght@400;500;600&display=swap');
        .gl-card { background:${s.cardBg};backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid ${s.borderColor};border-radius:${r}px; }
        .gl-card-hover { transition:all .3s; }
        .gl-card-hover:hover { background:${s.primaryColor}1a;border-color:${s.primaryColor}44;transform:translateY(-4px);box-shadow:0 20px 60px rgba(0,0,0,.3); }
        .gl-nav-link { font-size:.8rem;font-weight:500;color:${s.mutedColor};text-decoration:none;padding:.3rem .85rem;border-radius:999px;transition:all .2s; }
        .gl-nav-link:hover { background:${s.primaryColor}22;color:${s.textColor}; }
        .gl-skill { padding:.55rem 1.1rem;background:${s.cardBg};border:1px solid ${s.borderColor};border-radius:${r}px;font-size:.85rem;font-weight:500;color:${s.mutedColor};transition:all .2s;cursor:default; }
        .gl-skill:hover { background:${s.primaryColor}22;border-color:${s.primaryColor}66;color:${s.primaryColor};transform:translateY(-2px); }
        .gl-btn-primary { display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.75rem;background:linear-gradient(135deg,${p},${sec});border-radius:${bR}px;font-weight:700;font-size:.9rem;color:#fff;text-decoration:none;border:none;cursor:pointer;transition:all .2s;box-shadow:0 8px 32px ${p}55; }
        .gl-btn-primary:hover { transform:translateY(-2px);box-shadow:0 16px 48px ${p}77; }
        .gl-btn-ghost { display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.75rem;background:${s.cardBg};border-radius:${bR}px;font-weight:700;font-size:.9rem;color:${s.mutedColor};text-decoration:none;border:1px solid ${s.borderColor};cursor:pointer;transition:all .2s; }
        .gl-btn-ghost:hover { background:${s.primaryColor}22;border-color:${s.primaryColor}55;transform:translateY(-2px); }
        .gl-proj-link { display:inline-flex;align-items:center;gap:.3rem;font-size:.78rem;font-weight:600;padding:.4rem .85rem;border-radius:${Math.min(r,8)}px;text-decoration:none;transition:all .2s;background:${s.cardBg};color:${s.mutedColor};border:1px solid ${s.borderColor}; }
        .gl-proj-link:hover { background:${p}33;color:${p};border-color:${p}66; }
        .gl-avatar-shape { border-radius:${s.avatarShape==='circle'?'50%':s.avatarShape==='rounded'?r+'px':'4px'}; }

        @media (max-width: 768px) {
          .gl-hero-grid { grid-template-columns: 1fr !important; text-align: center; gap: 2rem !important; padding-top: 3rem !important; }
          .gl-hero-grid > div:last-child { order: -1; }
          .gl-nav-links { display: none !important; }
          .gl-btn-group { justify-content: center; width: 100%; }
          .gl-btn-group > * { width: 100%; justify-content: center !important; }
          .gl-social-group { justify-content: center; }
          .gl-wrap section { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
          .gl-cta-box { padding: 3rem 1.25rem !important; }
          .gl-cta-group { flex-direction: column; width: 100%; }
          .gl-cta-group > * { width: 100%; justify-content: center !important; }
        }
      `}</style>

      {/* Floating orbs */}
      <div style={{ position: 'fixed', width: 500, height: 500, borderRadius: '50%', filter: 'blur(80px)', background: `${p}40`, top: '-100px', right: '-100px', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', width: 400, height: 400, borderRadius: '50%', filter: 'blur(80px)', background: `${sec}33`, bottom: '10%', left: '-100px', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ color: s.textColor, position: 'relative', zIndex: 1 }}>
        {/* Nav */}
        <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: `${s.bgColor}dd`, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: `1px solid ${s.borderColor}`, padding: '1rem 0' }}>
          <div style={{ maxWidth: maxW, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-.02em', display: 'inline-block', backgroundImage: `linear-gradient(90deg, ${p}, ${sec})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent', fontFamily: `'${s.headingFont}', sans-serif` }}>
              {data.name || 'Portfolio'}
            </span>
            <div className="gl-nav-links" style={{ display: 'flex', gap: '.25rem', padding: '.3rem', background: s.cardBg, border: `1px solid ${s.borderColor}`, borderRadius: '999px' }}>
              {['About','Skills','Projects','Contact'].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="gl-nav-link">{l}</a>)}
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section id="about" style={{ maxWidth: maxW, margin: '0 auto', padding: '5rem 2rem 4rem' }}>
          <div className="gl-hero-grid" style={{ display: 'grid', gridTemplateColumns: s.heroLayout === 'split' && data.avatar && s.showAvatar ? '1.2fr 1fr' : '1fr', gap: '4rem', alignItems: 'center' }}>
          <div style={{ textAlign: s.heroLayout === 'center' ? 'center' : 'left', display: 'flex', flexDirection: 'column', alignItems: s.heroLayout === 'center' ? 'center' : 'flex-start' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.4rem 1rem', background: `${p}22`, border: `1px solid ${p}44`, borderRadius: '999px', fontSize: '.75rem', fontWeight: 600, color: p, marginBottom: '1.5rem' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: p, position: 'relative' }}>
                <style>{`@keyframes glPulse{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.8);opacity:0}}`}</style>
                <div style={{ content: '', position: 'absolute', inset: -3, borderRadius: '50%', background: 'rgba(16,185,129,.3)', animation: 'glPulse 2s infinite' }} />
              </div>
              Currently available
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.75rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '1.25rem', fontFamily: `'${s.headingFont}', sans-serif`, color: s.textColor }}>
              {data.name || 'Your Name'}<br />
              <span style={{ display: 'inline-block', backgroundImage: `linear-gradient(135deg, ${p} 0%, ${sec} 100%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>crafting digital</span><br />experiences
            </h1>
            <p style={{ fontSize: '1rem', color: s.mutedColor, lineHeight: 1.75, marginBottom: '2rem', maxWidth: s.heroLayout === 'center' ? 600 : 'none' }}>{data.bio || "Hi! I'm a developer who loves creating beautiful, functional digital products."}</p>
            <div className="gl-btn-group" style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', marginBottom: '1.5rem', justifyContent: s.heroLayout === 'center' ? 'center' : 'flex-start' }}>
              {data.contact.email && <a href={`mailto:${data.contact.email}`} className="gl-btn-primary"><Mail size={16} /> Let&apos;s Talk</a>}
              {data.contact.github && <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="gl-btn-ghost"><GithubIcon size={16} /> GitHub</a>}
            </div>
            <div className="gl-social-group" style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: s.heroLayout === 'center' ? 'center' : 'flex-start' }}>
              {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: s.mutedColor, display: 'flex', alignItems: 'center', gap: 5, fontSize: '.82rem', textDecoration: 'none', transition: 'color .2s' }}><LinkedinIcon size={14} /> LinkedIn</a>}
              {data.contact.twitter && <a href={data.contact.twitter} target="_blank" rel="noopener noreferrer" style={{ color: s.mutedColor, display: 'flex', alignItems: 'center', gap: 5, fontSize: '.82rem', textDecoration: 'none', transition: 'color .2s' }}><TwitterIcon size={14} /> Twitter</a>}
            </div>
          </div>
          {data.avatar && s.showAvatar && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: 280, height: 280 }}>
                <div style={{ position: 'absolute', inset: -12, borderRadius: '50%', border: `1.5px solid ${p}4d`, animation: 'spin 12s linear infinite' }}>
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                  <div style={{ position: 'absolute', top: '10%', right: '-4%', width: 14, height: 14, borderRadius: '50%', background: sec, boxShadow: `0 0 20px ${sec}` }} />
                </div>
                <div className="gl-avatar-shape" style={{ width: '100%', height: '100%', position: 'relative', border: `3px solid ${p}4d`, boxShadow: `0 0 80px ${p}66`, overflow: 'hidden' }}>
                  <Image 
                    src={data.avatar} 
                    alt={data.name || 'Avatar'} 
                    fill 
                    sizes="(max-width: 768px) 140px, 340px"
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
              </div>
            </div>
            )}
          </div>
        </section>

        {/* Skills */}
        {data.skills.length > 0 && (
          <section id="skills" style={{ maxWidth: maxW, margin: '0 auto', padding: `${s.sectionGap}px 2rem` }}>
            <p style={{ fontSize: '.75rem', fontWeight: 600, color: p, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.4rem' }}>Expertise</p>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '2rem', fontFamily: `'${s.headingFont}', sans-serif` }}>Skills & Technologies</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem' }}>
              {data.skills.map(skill => <span key={skill} className="gl-skill">{skill}</span>)}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section id="projects" style={{ maxWidth: maxW, margin: '0 auto', padding: `${s.sectionGap}px 2rem` }}>
            <p style={{ fontSize: '.75rem', fontWeight: 600, color: p, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.4rem' }}>Portfolio</p>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '2rem', fontFamily: `'${s.headingFont}', sans-serif` }}>Selected Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(310px,1fr))', gap: '1.25rem' }}>
              {data.projects.map((project, idx) => (
                <div key={idx} className="gl-card gl-card-hover" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
                  <div style={{ fontSize: '.72rem', fontWeight: 700, color: p, textTransform: 'uppercase', letterSpacing: '.08em' }}>Project {String(idx+1).padStart(2,'0')}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: `'${s.headingFont}', sans-serif` }}>{project.title || `Project ${idx + 1}`}</div>
                  <p style={{ fontSize: '.875rem', color: s.mutedColor, lineHeight: 1.65, flex: 1 }}>{project.description}</p>
                  {project.proficiency != null && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.72rem', color: s.mutedColor, marginBottom: '.4rem' }}>
                        <span>Proficiency</span><span style={{ color: p, fontWeight: 600 }}>{project.proficiency}%</span>
                      </div>
                      <div style={{ height: 4, background: s.borderColor, borderRadius: '999px' }}>
                        <div style={{ width: `${project.proficiency}%`, height: '100%', background: `linear-gradient(90deg, ${p}, ${sec})`, borderRadius: '999px' }} />
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                    {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="gl-proj-link"><GithubIcon size={13} /> Code</a>}
                    {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="gl-proj-link">Live <ExternalLink size={13} /></a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section style={{ maxWidth: maxW, margin: '0 auto', padding: `${s.sectionGap}px 2rem` }}>
            <p style={{ fontSize: '.75rem', fontWeight: 600, color: p, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.4rem' }}>Background</p>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '2rem', fontFamily: `'${s.headingFont}', sans-serif` }}>Education</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem' }}>
              {data.education.map((edu, idx) => (
                <div key={idx} className="gl-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                  <div style={{ fontSize: '.75rem', fontWeight: 700, color: sec }}>{edu.year}</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', fontFamily: `'${s.headingFont}', sans-serif` }}>{edu.degree}</div>
                  <div style={{ fontSize: '.875rem', color: s.mutedColor }}>{edu.institution}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section id="contact" style={{ maxWidth: maxW, margin: '0 auto', padding: `${s.sectionGap}px 2rem` }}>
          <div className="gl-cta-box gl-card" style={{ padding: '4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${p}33 0%, transparent 70%)`, pointerEvents: 'none' }} />
            <p style={{ fontSize: '.75rem', fontWeight: 600, color: p, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.5rem', position: 'relative', zIndex: 1 }}>Let&apos;s work together</p>
            <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '.75rem', position: 'relative', zIndex: 1, fontFamily: `'${s.headingFont}', sans-serif` }}>Have a project in mind?</h2>
            <p style={{ color: s.mutedColor, maxWidth: 380, margin: '0 auto', lineHeight: 1.7, fontSize: '.95rem', position: 'relative', zIndex: 1 }}>I&apos;d love to hear about it. Let&apos;s create something amazing together.</p>
            <div className="gl-cta-group" style={{ display: 'flex', gap: '.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.75rem', position: 'relative', zIndex: 1 }}>
              {data.contact.email && <a href={`mailto:${data.contact.email}`} className="gl-btn-primary"><Mail size={16} /> Send Email</a>}
              {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="gl-btn-ghost"><LinkedinIcon size={16} /> LinkedIn</a>}
            </div>
          </div>
        </section>

        <footer style={{ textAlign: 'center', padding: '1.5rem', fontSize: '.78rem', color: `${s.mutedColor}66`, borderTop: `1px solid ${s.borderColor}` }}>
          © {year} {data.name || 'Portfolio'} · Built with Sitrezhuthu
        </footer>

        <div className="gl-mobile-nav" style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', background: `${s.cardBg}ee`, backdropFilter: 'blur(20px)', padding: '.6rem 1.25rem', borderRadius: '999px', display: 'none', gap: '1.25rem', border: `1px solid ${s.borderColor}`, boxShadow: '0 10px 40px rgba(0,0,0,0.4)', zIndex: 100 }}>
          {['Skills','Projects','Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: '.72rem', color: '#fff', textDecoration: 'none', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em' }}>{l}</a>
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) {
            .gl-mobile-nav { display: flex !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
