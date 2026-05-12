'use client';

import { PortfolioStore, TemplateStyles, TEMPLATE_DEFAULTS } from '@/store/usePortfolioStore';
import { Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons';
import Image from 'next/image';

interface Props { data: PortfolioStore; }

export function ExecutiveTemplate({ data }: Props) {
  const year = new Date().getFullYear();
  const s: TemplateStyles = data.templateStyles ?? TEMPLATE_DEFAULTS['executive'];
  const fonts = [s.headingFont, s.bodyFont]
    .filter((f, i, a) => a.indexOf(f) === i && f !== 'system-ui')
    .map(f => `family=${f.replace(/ /g, '+')}:wght@300;400;500;600;700;800`).join('&');

  return (
    <div style={{ minHeight:'100vh', background:s.bgColor, color:s.textColor, fontFamily:`'${s.bodyFont}',sans-serif` }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?${fonts}&display=swap');
        .ex * { box-sizing:border-box; margin:0; }
        .ex-link { font-size:.82rem; color:${s.mutedColor}; text-decoration:none; display:inline-flex; align-items:center; gap:.35rem; font-weight:500; transition:color .2s; }
        .ex-link:hover { color:${s.textColor}; }
        .ex-proj { padding:2rem; border:1px solid ${s.borderColor}; background:${s.cardBg}; transition:all .25s; position:relative; }
        .ex-proj:first-child { border-radius:${s.borderRadius}px ${s.borderRadius}px 0 0; }
        .ex-proj:last-child { border-radius:0 0 ${s.borderRadius}px ${s.borderRadius}px; }
        .ex-proj + .ex-proj { border-top:none; }
        .ex-proj:hover { background:${s.cardBg}ee; }
        .ex-skill { display:inline-block; padding:.3rem .85rem; border:1px solid ${s.borderColor}; border-radius:4px; font-size:.78rem; font-weight:500; color:${s.mutedColor}; background:${s.cardBg}; transition:all .2s; }
        .ex-skill:hover { border-color:${s.primaryColor}; color:${s.primaryColor}; }
        .ex-nav-link { font-size:.8rem; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:${s.mutedColor}; text-decoration:none; transition:color .2s; }
        .ex-nav-link:hover { color:${s.textColor}; }
      `}</style>

      <div className="ex">
        {/* ── Sidebar + Main layout ── */}
        <div style={{ display:'grid', gridTemplateColumns:'300px 1fr', minHeight:'100vh' }}>

          {/* ── Sidebar ── */}
          <aside style={{ background:s.primaryColor, color:'#3DAA7A', display:'flex', flexDirection:'column', padding:'3rem 2rem', position:'sticky', top:0, height:'100vh', overflowY:'auto' }}>
            {/* Avatar */}
            {data.avatar && s.showAvatar ? (
              <div style={{ position: 'relative', width:100, height:100, borderRadius: s.avatarShape==='circle'?'50%':s.avatarShape==='rounded'?`${s.borderRadius}px`:'4px', overflow: 'hidden', marginBottom:'1.5rem', border:'3px solid rgba(61,170,122,0.3)' }}>
                <Image 
                  src={data.avatar} 
                  alt={data.name || 'Avatar'} 
                  fill 
                  sizes="100px"
                  style={{ objectFit:'cover' }} 
                />
              </div>
            ) : (
              <div style={{ width:100, height:100, borderRadius:'50%', background:'rgba(61,170,122,0.15)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.5rem', fontSize:'2rem', fontWeight:700 }}>
                {(data.name||'P').charAt(0)}
              </div>
            )}

            <h1 style={{ fontFamily:`'${s.headingFont}',sans-serif`, fontSize:'1.6rem', fontWeight:800, lineHeight:1.2, marginBottom:'.5rem', letterSpacing:'-.02em' }}>{data.name || 'Your Name'}</h1>

            <div style={{ width:32, height:3, background:'rgba(61,170,122,0.4)', borderRadius:2, marginBottom:'1.25rem' }} />

            <p style={{ fontSize:'.88rem', lineHeight:1.7, opacity:.85, marginBottom:'2rem' }}>{data.bio || 'A passionate professional with a strong focus on delivering results.'}</p>

            {/* Nav links */}
            <nav style={{ display:'flex', flexDirection:'column', gap:'.6rem', marginBottom:'2.5rem' }}>
              {['About','Experience','Skills','Contact'].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize:'.82rem', fontWeight:600, color:'rgba(61,170,122,0.7)', textDecoration:'none', letterSpacing:'.04em', display:'flex', alignItems:'center', gap:8, transition:'color .2s, transform .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color='#3DAA7A'; e.currentTarget.style.transform='translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color='rgba(61,170,122,0.7)'; e.currentTarget.style.transform='none'; }}>
                  <span style={{ width:20, height:1.5, background:'rgba(61,170,122,0.4)', display:'inline-block' }} />{l}
                </a>
              ))}
            </nav>

            {/* Contact info */}
            <div style={{ marginTop:'auto', display:'flex', flexDirection:'column', gap:'.75rem' }}>
              <div style={{ width:'100%', height:1, background:'rgba(61,170,122,0.15)', marginBottom:'.5rem' }} />
              {data.contact.email && <a href={`mailto:${data.contact.email}`} style={{ fontSize:'.78rem', color:'rgba(61,170,122,0.75)', textDecoration:'none', display:'flex', alignItems:'center', gap:8, wordBreak:'break-all' }}><Mail size={13}/>{data.contact.email}</a>}
              {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noopener" style={{ fontSize:'.78rem', color:'rgba(61,170,122,0.75)', textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}><LinkedinIcon size={13}/>LinkedIn</a>}
              {data.contact.github && <a href={data.contact.github} target="_blank" rel="noopener" style={{ fontSize:'.78rem', color:'rgba(61,170,122,0.75)', textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}><GithubIcon size={13}/>GitHub</a>}
              {data.contact.twitter && <a href={data.contact.twitter} target="_blank" rel="noopener" style={{ fontSize:'.78rem', color:'rgba(61,170,122,0.75)', textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}><TwitterIcon size={13}/>Twitter</a>}
            </div>
          </aside>

          {/* ── Main content ── */}
          <main style={{ padding:'3.5rem', overflowY:'auto' }}>

            {/* ── About ── */}
            <section id="about" style={{ marginBottom:'4rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
                <div style={{ width:3, height:28, background:s.primaryColor, borderRadius:2 }} />
                <h2 style={{ fontFamily:`'${s.headingFont}',sans-serif`, fontSize:'1.4rem', fontWeight:700, letterSpacing:'-.01em' }}>Professional Summary</h2>
              </div>
              <p style={{ fontSize:'1rem', color:s.mutedColor, lineHeight:1.85, maxWidth:600, padding:'1.5rem', background:s.cardBg, borderRadius:s.borderRadius, border:`1px solid ${s.borderColor}` }}>
                {data.bio || 'A seasoned professional bringing years of expertise and a proven track record of delivering exceptional results across diverse domains.'}
              </p>
            </section>

            {/* ── Projects / Experience ── */}
            {data.projects.length > 0 && (
              <section id="experience" style={{ marginBottom:'4rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
                  <div style={{ width:3, height:28, background:s.primaryColor, borderRadius:2 }} />
                  <h2 style={{ fontFamily:`'${s.headingFont}',sans-serif`, fontSize:'1.4rem', fontWeight:700, letterSpacing:'-.01em' }}>Selected Projects</h2>
                </div>
                <div style={{ display:'flex', flexDirection:'column' }}>
                  {data.projects.map((p, i) => (
                    <div key={i} className="ex-proj">
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'.5rem' }}>
                        <h3 style={{ fontFamily:`'${s.headingFont}',sans-serif`, fontWeight:700, fontSize:'1.05rem' }}>{p.title || `Project ${i+1}`}</h3>
                        <div style={{ display:'flex', gap:'.75rem', flexShrink:0 }}>
                          {p.github && <a href={p.github} target="_blank" rel="noopener" className="ex-link"><GithubIcon size={13}/>Code</a>}
                          {p.live && <a href={p.live} target="_blank" rel="noopener" className="ex-link">View <ArrowUpRight size={13}/></a>}
                        </div>
                      </div>
                      <p style={{ fontSize:'.9rem', color:s.mutedColor, lineHeight:1.7 }}>{p.description}</p>
                      {p.proficiency && (
                        <div style={{ marginTop:'1rem' }}>
                          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.72rem', color:s.mutedColor, fontWeight:600, marginBottom:4 }}>
                            <span>Proficiency</span><span>{p.proficiency}%</span>
                          </div>
                          <div style={{ height:4, background:s.borderColor, borderRadius:2 }}>
                            <div style={{ height:'100%', width:`${p.proficiency}%`, background:s.primaryColor, borderRadius:2 }} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── Skills ── */}
            {data.skills.length > 0 && (
              <section id="skills" style={{ marginBottom:'4rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
                  <div style={{ width:3, height:28, background:s.primaryColor, borderRadius:2 }} />
                  <h2 style={{ fontFamily:`'${s.headingFont}',sans-serif`, fontSize:'1.4rem', fontWeight:700, letterSpacing:'-.01em' }}>Core Competencies</h2>
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem' }}>
                  {data.skills.map(sk => <span key={sk} className="ex-skill">{sk}</span>)}
                </div>
              </section>
            )}

            {/* ── Education ── */}
            {data.education.length > 0 && (
              <section style={{ marginBottom:'4rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
                  <div style={{ width:3, height:28, background:s.primaryColor, borderRadius:2 }} />
                  <h2 style={{ fontFamily:`'${s.headingFont}',sans-serif`, fontSize:'1.4rem', fontWeight:700, letterSpacing:'-.01em' }}>Education</h2>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                  {data.education.map((edu, i) => (
                    <div key={i} style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:'1.25rem', alignItems:'center', padding:'1.25rem 1.5rem', border:`1px solid ${s.borderColor}`, borderRadius:s.borderRadius, background:s.cardBg }}>
                      <div style={{ fontSize:'.8rem', fontWeight:700, color:s.primaryColor, textAlign:'center', padding:'.4rem .7rem', background:`${s.primaryColor}12`, borderRadius:8, whiteSpace:'nowrap' }}>{edu.year}</div>
                      <div>
                        <div style={{ fontWeight:700, fontSize:'.95rem' }}>{edu.degree}</div>
                        <div style={{ fontSize:'.85rem', color:s.mutedColor, marginTop:2 }}>{edu.institution}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── Contact CTA ── */}
            <section id="contact" style={{ padding:'2.5rem', background:`${s.primaryColor}08`, border:`1px solid ${s.primaryColor}22`, borderRadius:s.borderRadius, textAlign:'center' }}>
              <h2 style={{ fontFamily:`'${s.headingFont}',sans-serif`, fontSize:'1.5rem', fontWeight:700, marginBottom:'0.75rem' }}>Open to Opportunities</h2>
              <p style={{ color:s.mutedColor, marginBottom:'1.5rem', fontSize:'.95rem', lineHeight:1.6 }}>Looking for the right fit? Let's have a conversation.</p>
              {data.contact.email && (
                <a href={`mailto:${data.contact.email}`} style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'.85rem 2rem', background:s.primaryColor, color:'#3DAA7A', borderRadius:s.buttonRadius+'px', fontWeight:700, fontSize:'.9rem', textDecoration:'none' }}>
                  <Mail size={16}/>Get in touch
                </a>
              )}
            </section>

            <footer style={{ marginTop:'4rem', paddingTop:'1.5rem', borderTop:`1px solid ${s.borderColor}`, color:s.mutedColor, fontSize:'.8rem', textAlign:'center' }}>
              © {year} {data.name || 'Portfolio'} · All rights reserved
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
