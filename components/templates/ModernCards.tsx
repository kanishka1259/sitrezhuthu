'use client';

import { PortfolioStore, TemplateStyles, TEMPLATE_DEFAULTS } from '@/store/usePortfolioStore';
import { Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons';
import Image from 'next/image';

interface ModernCardsTemplateProps { data: PortfolioStore; }

export function ModernCardsTemplate({ data }: ModernCardsTemplateProps) {
  const year = new Date().getFullYear();
  const s: TemplateStyles = data.templateStyles ?? TEMPLATE_DEFAULTS['cards'];
  const r = s.borderRadius;
  const bR = s.buttonRadius;
  const maxW = s.maxWidth;
  const p = s.primaryColor;
  const sec = s.secondaryColor;

  return (
    <div style={{ minHeight: '100vh', background: s.bgColor, color: s.textColor, fontFamily: `'${s.bodyFont}', sans-serif` }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=${s.headingFont.replace(/ /g,'+')}:wght@400;700;800&family=${s.bodyFont.replace(/ /g,'+')}:wght@400;500;600&display=swap');
        .mc-nav-link { font-size:.82rem;font-weight:600;color:${s.mutedColor};text-decoration:none;transition:color .2s; }
        .mc-nav-link:hover { color:${p}; }
        .mc-skill { padding:.55rem 1.1rem;background:${s.cardBg};border:1.5px solid ${s.borderColor};border-radius:${r}px;font-size:.85rem;font-weight:600;color:${s.textColor};transition:all .2s;cursor:default; }
        .mc-skill:hover { border-color:${p};color:${p};background:${p}08;transform:translateY(-2px); }
        .mc-proj { background:${s.cardBg};border-radius:${r}px;padding:1.75rem;border:1.5px solid ${s.borderColor};transition:all .3s;display:flex;flex-direction:column;gap:.875rem; }
        .mc-proj:hover { border-color:${p}4d;box-shadow:0 12px 40px ${p}22;transform:translateY(-4px); }
        .mc-edu-card { background:${s.cardBg};border-radius:${r}px;padding:1.5rem;border:1.5px solid ${s.borderColor};display:flex;flex-direction:column;gap:.5rem; }
        .mc-btn-primary { display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.75rem;background:${p};border-radius:${bR}px;font-weight:700;font-size:.875rem;color:#fff;text-decoration:none;transition:all .2s;border:none;cursor:pointer; }
        .mc-btn-primary:hover { opacity:.88;transform:translateY(-2px);box-shadow:0 12px 30px ${p}55; }
        .mc-btn-ghost { display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.75rem;background:${s.cardBg};border-radius:${bR}px;font-weight:700;font-size:.875rem;color:${s.textColor};text-decoration:none;border:1.5px solid ${s.borderColor};transition:all .2s;cursor:pointer; }
        .mc-btn-ghost:hover { border-color:${p};color:${p};transform:translateY(-2px); }
        .mc-avatar-shape { border-radius:${s.avatarShape==='circle'?'50%':s.avatarShape==='rounded'?r+'px':'4px'}; }

        @media (max-width: 768px) {
          .mc-hero-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; text-align: center; padding-top: 3rem !important; }
          .mc-hero-grid img { width: 140px !important; height: 140px !important; margin: 0 auto; order: -1; }
          .mc-nav-links { display: none !important; }
          .mc-stats-grid { grid-template-columns: 1fr !important; }
          .mc-btn-group { justify-content: center; width: 100%; }
          .mc-btn-group > * { width: 100%; justify-content: center !important; }
          .mc-social-group { justify-content: center; }
          .mc-section-header { flex-direction: column; align-items: center !important; text-align: center; gap: .5rem !important; }
          .mc-cta-box { padding: 3rem 1.25rem !important; }
          .mc-cta-group { flex-direction: column; width: 100%; }
          .mc-cta-group > * { width: 100%; justify-content: center !important; }
          .mc-wrap section { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: s.bgColor + 'cc', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${s.borderColor}`, padding: '1rem 0' }}>
        <div style={{ maxWidth: maxW, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-.02em', color: s.textColor, fontFamily: `'${s.headingFont}', sans-serif` }}>
            {data.name || 'Portfolio'}<span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: p, marginLeft: 2, verticalAlign: 'super' }} />
          </span>
          <div className="mc-nav-links" style={{ display: 'flex', gap: '1.75rem' }}>
            {['Skills','Projects','Education','Contact'].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="mc-nav-link">{l}</a>)}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: maxW, margin: '0 auto', padding: '5rem 2rem 3rem' }}>
        <div className="mc-hero-grid" style={{ display: 'grid', gridTemplateColumns: s.heroLayout === 'split' && data.avatar && s.showAvatar ? '1fr 1fr' : '1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.45rem', padding: '.4rem 1rem', background: `${p}14`, border: `1px solid ${p}33`, borderRadius: '999px', fontSize: '.75rem', fontWeight: 600, color: p, marginBottom: '1.5rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: p, display: 'inline-block' }} /> Available for work
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.03em', color: s.textColor, marginBottom: '1.25rem', fontFamily: `'${s.headingFont}', sans-serif` }}>
              I'm <span style={{ background: `linear-gradient(135deg, ${p} 0%, ${sec} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{data.name || 'Your Name'}</span>,<br />a creative developer
            </h1>
            <p style={{ fontSize: '1rem', color: s.mutedColor, lineHeight: 1.75, marginBottom: '2rem' }}>{data.bio || 'I build beautiful, performant digital products that make an impact.'}</p>
            <div className="mc-btn-group" style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
              {data.contact.email && <a href={`mailto:${data.contact.email}`} className="mc-btn-primary"><Mail size={16} /> Get in Touch</a>}
              {data.contact.github && <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="mc-btn-ghost"><GithubIcon size={16} /> GitHub</a>}
            </div>
            <div className="mc-social-group" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: s.mutedColor, display: 'flex', alignItems: 'center', gap: 5, fontSize: '.82rem', fontWeight: 600, textDecoration: 'none' }}><LinkedinIcon size={15} /> LinkedIn</a>}
              {data.contact.twitter && <a href={data.contact.twitter} target="_blank" rel="noopener noreferrer" style={{ color: s.mutedColor, display: 'flex', alignItems: 'center', gap: 5, fontSize: '.82rem', fontWeight: 600, textDecoration: 'none' }}><TwitterIcon size={15} /> Twitter</a>}
            </div>
          </div>
          {data.avatar && s.showAvatar && (
            <div style={{ width: '100%', maxWidth: 360, aspectRatio: '1', position: 'relative' }}>
              <Image 
                src={data.avatar} 
                alt={data.name || 'Avatar'} 
                fill 
                sizes="(max-width: 768px) 140px, 360px"
                className="mc-avatar-shape" 
                style={{ objectFit: 'cover', border: `3px solid ${s.borderColor}`, boxShadow: `0 32px 80px ${p}33` }} 
              />
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <div className="mc-stats-grid" style={{ maxWidth: maxW, margin: '0 auto', padding: '0 2rem 4rem', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
        {[{ val: data.projects.length, lbl: 'Projects' }, { val: data.skills.length, lbl: 'Skills' }, { val: data.education.length, lbl: 'Degrees' }].map((st, i) => (
          <div key={i} style={{ background: s.cardBg, borderRadius: r, padding: '1.25rem', textAlign: 'center', border: `1.5px solid ${s.borderColor}` }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: p, letterSpacing: '-.02em', fontFamily: `'${s.headingFont}', sans-serif` }}>{st.val}</div>
            <div style={{ fontSize: '.75rem', color: s.mutedColor, marginTop: '.25rem', fontWeight: 500 }}>{st.lbl}</div>
          </div>
        ))}
      </div>

      {/* Skills */}
      {data.skills.length > 0 && (
        <section id="skills" style={{ maxWidth: maxW, margin: '0 auto', padding: '3rem 2rem' }}>
          <div className="mc-section-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ padding: '.3rem .9rem', background: `${p}1a`, borderRadius: '999px', fontSize: '.72rem', fontWeight: 700, color: p, textTransform: 'uppercase', letterSpacing: '.06em' }}>Skills</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: s.textColor, letterSpacing: '-.02em', fontFamily: `'${s.headingFont}', sans-serif` }}>My Toolkit</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.625rem' }}>
            {data.skills.map(skill => <span key={skill} className="mc-skill">{skill}</span>)}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section id="projects" style={{ maxWidth: maxW, margin: '0 auto', padding: '3rem 2rem' }}>
          <div className="mc-section-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ padding: '.3rem .9rem', background: `${p}1a`, borderRadius: '999px', fontSize: '.72rem', fontWeight: 700, color: p, textTransform: 'uppercase', letterSpacing: '.06em' }}>Projects</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: s.textColor, letterSpacing: '-.02em', fontFamily: `'${s.headingFont}', sans-serif` }}>Things I've Built</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(310px,1fr))', gap: '1.25rem' }}>
            {data.projects.map((project, idx) => (
              <div key={idx} className="mc-proj">
                <div style={{ width: 46, height: 46, borderRadius: r, background: `linear-gradient(135deg, ${p}1f, ${sec}1f)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>🚀</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: s.textColor, fontFamily: `'${s.headingFont}', sans-serif` }}>{project.title || `Project ${idx + 1}`}</div>
                <p style={{ fontSize: '.875rem', color: s.mutedColor, lineHeight: 1.65, flex: 1 }}>{project.description}</p>
                {project.proficiency != null && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.75rem', color: s.mutedColor, marginBottom: '.4rem' }}>
                      <span style={{ fontWeight: 600 }}>Proficiency</span><span style={{ fontWeight: 700, color: p }}>{project.proficiency}%</span>
                    </div>
                    <div style={{ height: 6, background: s.borderColor, borderRadius: '999px' }}>
                      <div style={{ width: `${project.proficiency}%`, height: '100%', background: `linear-gradient(90deg, ${p}, ${sec})`, borderRadius: '999px' }} />
                    </div>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '.6rem' }}>
                  {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.78rem', fontWeight: 700, padding: '.4rem .85rem', borderRadius: Math.min(r, 8), textDecoration: 'none', background: s.textColor, color: s.bgColor }}><GithubIcon size={13} /> Code</a>}
                  {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.78rem', fontWeight: 700, padding: '.4rem .85rem', borderRadius: Math.min(r, 8), textDecoration: 'none', background: `${p}14`, color: p }}>Live <ArrowUpRight size={13} /></a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section id="education" style={{ maxWidth: maxW, margin: '0 auto', padding: '3rem 2rem' }}>
          <div className="mc-section-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ padding: '.3rem .9rem', background: `${p}1a`, borderRadius: '999px', fontSize: '.72rem', fontWeight: 700, color: p, textTransform: 'uppercase', letterSpacing: '.06em' }}>Education</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: s.textColor, letterSpacing: '-.02em', fontFamily: `'${s.headingFont}', sans-serif` }}>Academic Background</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem' }}>
            {data.education.map((edu, idx) => (
              <div key={idx} className="mc-edu-card">
                <span style={{ fontSize: '.75rem', fontWeight: 700, color: p, background: `${p}14`, padding: '.2rem .65rem', borderRadius: 6, alignSelf: 'flex-start' }}>{edu.year}</span>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: s.textColor, fontFamily: `'${s.headingFont}', sans-serif` }}>{edu.degree}</div>
                <div style={{ fontSize: '.875rem', color: s.mutedColor }}>{edu.institution}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section id="contact" style={{ maxWidth: maxW, margin: '0 auto', padding: '3rem 2rem 5rem' }}>
        <div className="mc-cta-box" style={{ background: `linear-gradient(135deg, ${p}, ${sec})`, borderRadius: r, padding: '4rem', textAlign: 'center', color: '#3DAA7A', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(61,170,122,.08)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', opacity: .7, marginBottom: '.75rem' }}>Let's connect</p>
            <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '.75rem', fontFamily: `'${s.headingFont}', sans-serif` }}>Ready to work together?</h2>
            <p style={{ opacity: .75, maxWidth: 420, margin: '0 auto', lineHeight: 1.7, fontSize: '.95rem' }}>I'm always excited to take on new challenges and bring creative ideas to life.</p>
          </div>
          <div className="mc-cta-group" style={{ display: 'flex', gap: '.75rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1, marginTop: '1.75rem' }}>
            {data.contact.email && <a href={`mailto:${data.contact.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '.45rem', padding: '.8rem 1.5rem', background: '#3DAA7A', color: p, borderRadius: bR, fontWeight: 700, fontSize: '.875rem', textDecoration: 'none' }}><Mail size={16} /> Email Me</a>}
            {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '.45rem', padding: '.8rem 1.5rem', background: 'rgba(61,170,122,.15)', color: '#3DAA7A', borderRadius: bR, fontWeight: 700, fontSize: '.875rem', textDecoration: 'none', border: '1.5px solid rgba(61,170,122,.3)' }}><LinkedinIcon size={16} /> LinkedIn</a>}
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '1.5rem', fontSize: '.8rem', color: s.mutedColor, borderTop: `1px solid ${s.borderColor}` }}>
        © {year} {data.name || 'Portfolio'} · Built with Sitrezhuthu
      </footer>

      <div className="mc-mobile-nav" style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', background: `${p}cc`, backdropFilter: 'blur(12px)', padding: '.6rem 1.25rem', borderRadius: '999px', display: 'none', gap: '1.25rem', border: `1px solid ${p}4d`, boxShadow: `0 10px 40px ${p}33`, zIndex: 100 }}>
        {['Skills','Projects','Education','Contact'].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: '.72rem', color: '#fff', textDecoration: 'none', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em' }}>{l}</a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mc-mobile-nav { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
