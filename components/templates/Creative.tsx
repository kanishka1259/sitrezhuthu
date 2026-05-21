'use client';

import { PortfolioStore, TemplateStyles, TEMPLATE_DEFAULTS } from '@/store/usePortfolioStore';
import { ArrowUpRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons';
import Image from 'next/image';

interface Props { data: PortfolioStore; }

export function CreativeTemplate({ data }: Props) {
  const year = new Date().getFullYear();
  const s: TemplateStyles = { ...TEMPLATE_DEFAULTS['creative'], ...(data.templateStyles || {}) };
  const hFont = s.headingFont || 'Outfit';
  const bFont = s.bodyFont || 'Inter';

  const fonts = [hFont, bFont]
    .filter((f, i, a) => a.indexOf(f) === i && f !== 'system-ui')
    .map(f => `family=${(f || '').replace(/ /g, '+')}:wght@300;400;500;600;700;800`).join('&');

  return (
    <div style={{ minHeight: '100vh', background: s.bgColor, color: s.textColor, fontFamily: `'${bFont}', sans-serif`, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?${fonts}&display=swap');
        .cr-wrap * { box-sizing: border-box; margin: 0; }
        .cr-nav-link { font-size:.82rem; font-weight:600; text-transform:uppercase; letter-spacing:.1em; color:${s.mutedColor}; text-decoration:none; transition:color .2s; }
        .cr-nav-link:hover { color:${s.textColor}; }
        .cr-proj { position:relative; border-radius:${s.borderRadius + 8}px; overflow:hidden; background:${s.cardBg}; border:1px solid ${s.borderColor}; transition:transform .3s, box-shadow .3s; }
        .cr-proj:hover { transform:translateY(-6px); box-shadow:0 24px 48px rgba(0,0,0,.2); }
        .cr-skill { display:inline-block; padding:.3rem .9rem; border-radius:999px; background:${s.cardBg}; border:1px solid ${s.borderColor}; font-size:.8rem; font-weight:600; color:${s.mutedColor}; transition:all .2s; }
        .cr-skill:hover { border-color:${s.primaryColor}; color:${s.primaryColor}; background:${s.primaryColor}18; }
        .cr-link { display:inline-flex; align-items:center; gap:.3rem; font-size:.82rem; font-weight:600; color:${s.mutedColor}; text-decoration:none; transition:color .2s; }
        .cr-link:hover { color:${s.textColor}; }
        .cr-cta-btn { display:inline-flex; align-items:center; gap:.5rem; padding:.85rem 2rem; background:${s.primaryColor}; color:#fff; border-radius:${s.buttonRadius}px; font-weight:700; font-size:.95rem; text-decoration:none; transition:transform .2s, box-shadow .2s; }
        .cr-cta-btn:hover { transform:translateY(-2px); box-shadow:0 12px 32px ${s.primaryColor}55; }
        .cr-outline-btn { display:inline-flex; align-items:center; gap:.5rem; padding:.85rem 2rem; background:transparent; color:${s.textColor}; border:2px solid ${s.borderColor}; border-radius:${s.buttonRadius}px; font-weight:600; font-size:.95rem; text-decoration:none; transition:border-color .2s, color .2s; }
        .cr-outline-btn:hover { border-color:${s.primaryColor}; color:${s.primaryColor}; }
      `}</style>

      <div className="cr-wrap">
        {/* ── Nav ── */}
        <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.5rem 3rem', position:'sticky', top:0, zIndex:20, background:s.bgColor+'ee', backdropFilter:'blur(12px)', borderBottom:`1px solid ${s.borderColor}` }}>
          <span style={{ fontWeight:800, fontSize:'1.1rem', fontFamily:`'${s.headingFont}',sans-serif`, letterSpacing:'-.02em' }}>
            <span style={{ color: s.primaryColor }}>{data.name?.charAt(0) || 'P'}</span>{data.name?.slice(1) || 'ortfolio'}
          </span>
          <div style={{ display:'flex', gap:'2rem' }}>
            {['About','Work','Skills','Contact'].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="cr-nav-link">{l}</a>)}
          </div>
          {data.contact.email && <a href={`mailto:${data.contact.email}`} className="cr-cta-btn" style={{ padding:'.5rem 1.25rem', fontSize:'.82rem' }}>Hire Me</a>}
        </nav>

        {/* ── Hero ── */}
        <header id="about" style={{ position:'relative', overflow:'hidden', padding:'6rem 3rem 5rem', maxWidth: s.maxWidth, margin:'0 auto' }}>
          {/* Decorative blobs */}
          <div style={{ position:'absolute', top:-100, right:-100, width:400, height:400, borderRadius:'50%', background:`radial-gradient(circle, ${s.primaryColor}22, transparent 70%)`, pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:-80, left:-80, width:300, height:300, borderRadius:'50%', background:`radial-gradient(circle, ${s.secondaryColor}18, transparent 70%)`, pointerEvents:'none' }} />

          <div style={{ display:'grid', gridTemplateColumns: data.avatar && s.showAvatar ? '1fr auto' : '1fr', gap:'3rem', alignItems:'center', position:'relative' }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${s.primaryColor}15`, border:`1px solid ${s.primaryColor}30`, borderRadius:999, padding:'.35rem 1rem', fontSize:'.78rem', fontWeight:700, color:s.primaryColor, letterSpacing:'.05em', textTransform:'uppercase', marginBottom:'1.5rem' }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:s.primaryColor, animation:'pulse 2s infinite' }} /> Available for work
              </div>
              <h1 style={{ fontSize:'clamp(3rem,7vw,5.5rem)', fontWeight:800, lineHeight:1.05, letterSpacing:'-.03em', fontFamily:`'${s.headingFont}',sans-serif`, marginBottom:'1.5rem' }}>
                {data.name || 'Your Name'}
              </h1>
              <p style={{ fontSize:'1.15rem', color:s.mutedColor, lineHeight:1.75, maxWidth:520, marginBottom:'2.5rem' }}>
                {data.bio || 'A creative developer building exceptional digital experiences with modern web technologies.'}
              </p>
              <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'2rem' }}>
                {data.contact.email && <a href={`mailto:${data.contact.email}`} className="cr-cta-btn"><Mail size={16}/>Get in touch</a>}
                {data.contact.github && <a href={data.contact.github} target="_blank" rel="noopener" className="cr-outline-btn"><GithubIcon size={15}/>GitHub</a>}
              </div>
              <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
                {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noopener" className="cr-link"><LinkedinIcon size={14}/>LinkedIn</a>}
                {data.contact.twitter && <a href={data.contact.twitter} target="_blank" rel="noopener" className="cr-link"><TwitterIcon size={14}/>Twitter</a>}
              </div>
            </div>
            {data.avatar && s.showAvatar && (
              <div style={{ position:'relative', flexShrink:0 }}>
                <div style={{ position:'absolute', inset:-8, borderRadius:s.avatarShape === 'circle' ? '50%' : `${s.borderRadius+8}px`, background:`linear-gradient(135deg, ${s.primaryColor}, ${s.secondaryColor})`, zIndex:0 }} />
                <div style={{ width:220, height:220, position:'relative', zIndex:1, overflow: 'hidden', borderRadius: s.avatarShape === 'circle' ? '50%' : s.avatarShape === 'rounded' ? `${s.borderRadius}px` : '4px', border:`4px solid ${s.bgColor}` }}>
                  <Image 
                    src={data.avatar} 
                    alt={data.name || 'Avatar'} 
                    fill 
                    sizes="220px"
                    style={{ objectFit:'cover' }} 
                  />
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ── Skills ── */}
        {data.skills.length > 0 && (
          <section id="skills" style={{ maxWidth:s.maxWidth, margin:'0 auto', padding:`${s.sectionGap}px 3rem`, borderTop:`1px solid ${s.borderColor}` }}>
            <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2rem' }}>
              <div style={{ width:40, height:4, background:s.primaryColor, borderRadius:2 }} />
              <h2 style={{ fontSize:'1.75rem', fontWeight:800, fontFamily:`'${s.headingFont}',sans-serif`, letterSpacing:'-.02em' }}>Tech Stack</h2>
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.6rem' }}>
              {data.skills.map(sk => <span key={sk} className="cr-skill">{sk}</span>)}
            </div>
          </section>
        )}

        {/* ── Projects ── */}
        {data.projects.length > 0 && (
          <section id="work" style={{ maxWidth:s.maxWidth, margin:'0 auto', padding:`${s.sectionGap}px 3rem` }}>
            <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2.5rem' }}>
              <div style={{ width:40, height:4, background:s.primaryColor, borderRadius:2 }} />
              <h2 style={{ fontSize:'1.75rem', fontWeight:800, fontFamily:`'${s.headingFont}',sans-serif`, letterSpacing:'-.02em' }}>Selected Work</h2>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'1.5rem' }}>
              {data.projects.map((p, i) => (
                <div key={i} className="cr-proj">
                  {p.image && (
                    <div style={{ height:180, position: 'relative', overflow:'hidden' }}>
                      <Image 
                        src={p.image} 
                        alt={p.title || 'Project'} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 320px"
                        style={{ objectFit:'cover' }} 
                      />
                    </div>
                  )}
                  {!p.image && (
                    <div style={{ height:140, background:`linear-gradient(135deg, ${s.primaryColor}20, ${s.secondaryColor}15)`, display:'flex', alignItems:'center', justifyContent:'center', borderBottom:`1px solid ${s.borderColor}` }}>
                      <span style={{ fontSize:'3rem', opacity:.4 }}>{i % 2 === 0 ? '⬡' : '◈'}</span>
                    </div>
                  )}
                  <div style={{ padding:'1.5rem' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'.75rem' }}>
                      <h3 style={{ fontWeight:700, fontSize:'1.1rem', fontFamily:`'${s.headingFont}',sans-serif` }}>{p.title || `Project ${i+1}`}</h3>
                      <span style={{ fontSize:'.72rem', fontWeight:700, color:s.primaryColor, background:`${s.primaryColor}15`, padding:'.2rem .6rem', borderRadius:6 }}>0{i+1}</span>
                    </div>
                    <p style={{ fontSize:'.88rem', color:s.mutedColor, lineHeight:1.65, marginBottom:'1.25rem' }}>{p.description}</p>
                    <div style={{ display:'flex', gap:'.75rem' }}>
                      {p.github && <a href={p.github} target="_blank" rel="noopener" className="cr-link"><GithubIcon size={13}/>Code</a>}
                      {p.live && <a href={p.live} target="_blank" rel="noopener" className="cr-link">Live <ArrowUpRight size={13}/></a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Education ── */}
        {data.education.length > 0 && (
          <section style={{ maxWidth:s.maxWidth, margin:'0 auto', padding:`${s.sectionGap}px 3rem`, borderTop:`1px solid ${s.borderColor}` }}>
            <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2rem' }}>
              <div style={{ width:40, height:4, background:s.primaryColor, borderRadius:2 }} />
              <h2 style={{ fontSize:'1.75rem', fontWeight:800, fontFamily:`'${s.headingFont}',sans-serif`, letterSpacing:'-.02em' }}>Education</h2>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              {data.education.map((edu, i) => (
                <div key={i} style={{ display:'flex', gap:'2rem', alignItems:'center', padding:'1.25rem 1.5rem', background:s.cardBg, borderRadius:s.borderRadius, border:`1px solid ${s.borderColor}` }}>
                  <div style={{ width:52, height:52, borderRadius:12, background:`${s.primaryColor}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', flexShrink:0 }}>🎓</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:'1rem' }}>{edu.degree}</div>
                    <div style={{ fontSize:'.88rem', color:s.mutedColor, marginTop:4 }}>{edu.institution} · {edu.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Contact ── */}
        <section id="contact" style={{ maxWidth:s.maxWidth, margin:'0 auto', padding:`${s.sectionGap}px 3rem` }}>
          <div style={{ background:`linear-gradient(135deg, ${s.primaryColor}18, ${s.secondaryColor}10)`, border:`1px solid ${s.primaryColor}30`, borderRadius:s.borderRadius+8, padding:'3.5rem', textAlign:'center' }}>
            <h2 style={{ fontSize:'clamp(2rem,5vw,3rem)', fontWeight:800, letterSpacing:'-.03em', fontFamily:`'${s.headingFont}',sans-serif`, marginBottom:'1rem' }}>
              Let&apos;s build something<br/><span style={{ color:s.primaryColor }}>amazing together</span>
            </h2>
            <p style={{ color:s.mutedColor, marginBottom:'2rem', fontSize:'1.05rem', lineHeight:1.7 }}>Open to exciting opportunities, collaborations and projects.</p>
            {data.contact.email && (
              <a href={`mailto:${data.contact.email}`} className="cr-cta-btn" style={{ fontSize:'1rem', padding:'1rem 2.5rem' }}><Mail size={18}/>Say Hello</a>
            )}
          </div>
        </section>

        <footer style={{ borderTop:`1px solid ${s.borderColor}`, padding:'1.5rem 3rem', display:'flex', alignItems:'center', justifyContent:'space-between', color:s.mutedColor, fontSize:'.82rem' }}>
          <span>© {year} {data.name || 'Portfolio'}</span>
          <span>Built with Sitrezhuthu</span>
        </footer>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
    </div>
  );
}
