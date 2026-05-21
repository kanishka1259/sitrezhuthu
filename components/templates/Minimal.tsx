'use client';

import { PortfolioStore, TemplateStyles, TEMPLATE_DEFAULTS } from '@/store/usePortfolioStore';
import { Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons';
import Image from 'next/image';
import { contrastColor } from '@/lib/colorUtils';

interface MinimalTemplateProps {
  data: PortfolioStore;
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  const year = new Date().getFullYear();
  const s: TemplateStyles = { ...TEMPLATE_DEFAULTS['minimal'], ...(data.templateStyles || {}) };
  const r = s.borderRadius;
  const maxW = s.maxWidth;

  const hFont = s.headingFont || 'Inter';
  const bFont = s.bodyFont || 'Inter';

  const googleFont = [hFont, bFont]
    .filter((f, i, a) => a.indexOf(f) === i && f !== 'system-ui')
    .map((f) => `family=${(f || '').replace(/ /g, '+')}:wght@300;400;500;600;700`)
    .join('&');

  return (
    <div style={{ minHeight: '100vh', background: s.bgColor, color: s.textColor, fontFamily: `'${bFont}', sans-serif` }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?${googleFont}&display=swap');
        .mn-wrap * { box-sizing: border-box; }
        .mn-accent { width: 36px; height: 3px; background: ${s.primaryColor}; display: inline-block; margin-bottom: 1.25rem; border-radius: 2px; }
        .mn-skill { display: inline-block; padding: .35rem .85rem; border: 1.5px solid ${s.borderColor}; border-radius: ${r}px; font-size: .8rem; font-weight: 500; color: ${s.mutedColor}; transition: all .2s; cursor: default; }
        .mn-skill:hover { border-color: ${s.primaryColor}; background: ${s.primaryColor}; color: #fff; }
        .mn-proj { border-top: 1.5px solid ${s.borderColor}; padding: 1.75rem 0; transition: padding .2s; }
        .mn-proj:hover { padding-left: .5rem; }
        .mn-proj:last-child { border-bottom: 1.5px solid ${s.borderColor}; }
        .mn-clink { display: inline-flex; align-items: center; gap: .4rem; font-size: .85rem; color: ${s.mutedColor}; text-decoration: none; transition: color .2s; }
        .mn-clink:hover { color: ${s.textColor}; }
        .mn-edu { display: grid; grid-template-columns: 100px 1fr; gap: 1.5rem; align-items: start; padding: 1.25rem 0; border-top: 1px solid ${s.borderColor}; }
        .mn-nav-link { font-size: .78rem; letter-spacing: .08em; text-transform: uppercase; color: ${s.mutedColor}; text-decoration: none; transition: color .2s; }
        .mn-nav-link:hover { color: ${s.textColor}; }
        .mn-live-btn { display: inline-flex; align-items: center; gap: .3rem; font-size: .8rem; font-weight: 600; color: ${s.textColor}; border-bottom: 1.5px solid ${s.primaryColor}; padding-bottom: 1px; text-decoration: none; transition: opacity .2s; }
        .mn-live-btn:hover { opacity: .6; }
        .mn-avatar-circle { border-radius: ${s.avatarShape === 'circle' ? '50%' : s.avatarShape === 'rounded' ? `${r}px` : '4px'}; }
        
        @media (max-width: 768px) {
          .mn-hero-grid { grid-template-columns: 1fr !important; text-align: center; gap: 1.5rem !important; padding-top: 3rem !important; }
          .mn-hero-grid img { width: 120px !important; height: 120px !important; margin: 0 auto; order: -1; }
          .mn-nav-links { display: none !important; }
          .mn-clinks { justify-content: center; }
          .mn-edu { grid-template-columns: 1fr; gap: .5rem; }
          .mn-wrap section, .mn-wrap header { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
          .mn-proj div { text-align: left; }
          .mn-live-btns { justify-content: flex-start; margin-top: 1rem; width: 100%; }
          .mn-cta-btn { width: 100%; justify-content: center !important; }
          .mn-proj h3 { font-size: 1rem !important; }
          .mn-proj p { font-size: .85rem !important; }
        }
      `}</style>

      <div className="mn-wrap">
        {/* Nav */}
        <nav style={{ borderBottom: `1px solid ${s.borderColor}`, padding: '1.25rem 0', position: 'sticky', top: 0, background: s.bgColor, backdropFilter: 'blur(8px)', zIndex: 10 }}>
          <div style={{ maxWidth: maxW, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 700, fontSize: '1rem', fontFamily: `'${s.headingFont}', sans-serif` }}>{data.name || 'Portfolio'}</span>
            <div className="mn-nav-links" style={{ display: 'flex', gap: '1.75rem' }}>
              {['About','Skills','Work','Contact'].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="mn-nav-link">{l}</a>
              ))}
            </div>
          </div>
        </nav>

        {/* Hero */}
        <header id="about" style={{ maxWidth: maxW, margin: '0 auto', padding: '5rem 2rem 4rem' }}>
          <div className="mn-hero-grid" style={{ display: 'grid', gridTemplateColumns: s.heroLayout === 'split' && data.avatar && s.showAvatar ? '1fr auto' : '1fr', gap: '2rem', alignItems: 'center' }}>
            <div style={{ textAlign: s.heroLayout === 'center' ? 'center' : 'left' }}>
              <p style={{ fontSize: '.8rem', letterSpacing: '.12em', textTransform: 'uppercase', color: s.mutedColor, marginBottom: '1rem' }}>Available for opportunities</p>
              <h1 style={{ fontSize: 'clamp(2.5rem,6vw,4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-.02em', fontFamily: `'${s.headingFont}', sans-serif`, color: s.textColor }}>
                {data.name || 'Your Name'}
              </h1>
              <p style={{ fontSize: '1.1rem', color: s.mutedColor, lineHeight: 1.7, maxWidth: 520, margin: s.heroLayout === 'center' ? '0 auto' : '0' }}>
                {data.bio || 'A passionate developer crafting clean, efficient digital experiences.'}
              </p>
              <div className="mn-clinks" style={{ display: 'flex', gap: '1.25rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: s.heroLayout === 'center' ? 'center' : 'flex-start' }}>
                {data.contact.email && <a href={`mailto:${data.contact.email}`} className="mn-clink"><Mail size={14} /> {data.contact.email}</a>}
                {data.contact.github && <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="mn-clink"><GithubIcon size={14} /> GitHub</a>}
                {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="mn-clink"><LinkedinIcon size={14} /> LinkedIn</a>}
                {data.contact.twitter && <a href={data.contact.twitter} target="_blank" rel="noopener noreferrer" className="mn-clink"><TwitterIcon size={14} /> Twitter</a>}
              </div>
            </div>
            {data.avatar && s.showAvatar && (
              <div style={{ position: 'relative', width: 160, height: 160, flexShrink: 0, margin: s.heroLayout === 'center' ? '0 auto' : '0' }}>
                <Image 
                  src={data.avatar} 
                  alt={data.name || 'Avatar'} 
                  fill
                  sizes="160px"
                  className="mn-avatar-circle" 
                  style={{ objectFit: 'cover', border: `3px solid ${s.borderColor}` }} 
                />
              </div>
            )}
          </div>
        </header>

        {/* Skills */}
        {data.skills.length > 0 && (
          <section id="skills" style={{ maxWidth: maxW, margin: '0 auto', padding: `${s.sectionGap}px 2rem`, borderTop: `1px solid ${s.borderColor}` }}>
            <div className="mn-accent" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: `'${s.headingFont}', sans-serif` }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem' }}>
              {data.skills.map((skill) => <span key={skill} className="mn-skill">{skill}</span>)}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section id="work" style={{ maxWidth: maxW, margin: '0 auto', padding: `${s.sectionGap}px 2rem` }}>
            <div className="mn-accent" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', fontFamily: `'${s.headingFont}', sans-serif` }}>Selected Work</h2>
            <div>
              {data.projects.map((project, idx) => (
                <div key={idx} className="mn-proj">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.5rem' }}>
                        <span style={{ fontSize: '.8rem', color: s.mutedColor, fontWeight: 500 }}>0{idx + 1}</span>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, fontFamily: `'${s.headingFont}', sans-serif` }}>{project.title || `Project ${idx + 1}`}</h3>
                      </div>
                      <p style={{ fontSize: '.9rem', color: s.mutedColor, lineHeight: 1.6 }}>{project.description}</p>
                    </div>
                    <div className="mn-live-btns" style={{ display: 'flex', gap: '.75rem', flexShrink: 0, marginTop: '.25rem' }}>
                      {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="mn-live-btn"><GithubIcon size={13} /> Code</a>}
                      {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="mn-live-btn">Live <ArrowUpRight size={13} /></a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section style={{ maxWidth: maxW, margin: '0 auto', padding: `${s.sectionGap}px 2rem` }}>
            <div className="mn-accent" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: `'${s.headingFont}', sans-serif` }}>Education</h2>
            <div>
              {data.education.map((edu, idx) => (
                <div key={idx} className="mn-edu">
                  <span style={{ fontSize: '.8rem', color: s.mutedColor, fontWeight: 500, paddingTop: '.15rem' }}>{edu.year}</span>
                  <div>
                    <h3 style={{ fontWeight: 600, fontSize: '.975rem', marginBottom: '.2rem' }}>{edu.degree}</h3>
                    <p style={{ fontSize: '.875rem', color: s.mutedColor }}>{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" style={{ maxWidth: maxW, margin: '0 auto', padding: `${s.sectionGap}px 2rem`, borderTop: `1px solid ${s.borderColor}` }}>
          <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-.01em', fontFamily: `'${s.headingFont}', sans-serif` }}>Let&apos;s connect.</h2>
          <p style={{ color: s.mutedColor, marginBottom: '1.5rem', maxWidth: 400 }}>Open to collaborations, full-time roles, and interesting conversations.</p>
          {data.contact.email && (
            <a href={`mailto:${data.contact.email}`} className="mn-cta-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', background: s.primaryColor, color: contrastColor(s.primaryColor), padding: '.75rem 1.5rem', borderRadius: s.buttonRadius + 'px', fontWeight: 600, fontSize: '.9rem', textDecoration: 'none', transition: 'opacity .2s' }}>
              <Mail size={16} /> Get in touch
            </a>
          )}
        </section>

        <footer style={{ borderTop: `1px solid ${s.borderColor}`, padding: '1.5rem 2rem', textAlign: 'center', color: s.mutedColor, fontSize: '.8rem' }}>
          © {year} {data.name || 'Portfolio'} · Built with Sitrezhuthu
        </footer>
        <div className="mn-mobile-nav" style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', padding: '.6rem 1rem', borderRadius: '999px', display: 'none', gap: '1rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 100 }}>
          {['About','Skills','Work','Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: '.7rem', color: '#fff', textDecoration: 'none', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em' }}>{l}</a>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .mn-mobile-nav { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
