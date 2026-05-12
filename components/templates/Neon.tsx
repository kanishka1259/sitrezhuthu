'use client';

import { PortfolioStore, TemplateStyles, TEMPLATE_DEFAULTS } from '@/store/usePortfolioStore';
import { ArrowUpRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons';
import Image from 'next/image';

interface Props { data: PortfolioStore; }

export function NeonTemplate({ data }: Props) {
  const year = new Date().getFullYear();
  const s: TemplateStyles = data.templateStyles ?? TEMPLATE_DEFAULTS['neon'];
  const fonts = [s.headingFont, s.bodyFont]
    .filter((f, i, a) => a.indexOf(f) === i && f !== 'system-ui')
    .map(f => `family=${f.replace(/ /g, '+')}:wght@300;400;500;600;700;800`).join('&');
  const neon = s.primaryColor;
  const neon2 = s.secondaryColor;

  return (
    <div style={{ minHeight:'100vh', background:s.bgColor, color:s.textColor, fontFamily:`'${s.bodyFont}',sans-serif`, overflowX:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?${fonts}&display=swap');
        .nn * { box-sizing:border-box; margin:0; }
        .nn-nav-link { font-size:.8rem; font-weight:700; text-transform:uppercase; letter-spacing:.12em; color:${s.mutedColor}; text-decoration:none; transition:color .2s, text-shadow .2s; }
        .nn-nav-link:hover { color:${neon}; text-shadow:0 0 10px ${neon}88; }
        .nn-skill { display:inline-flex; align-items:center; gap:6px; padding:.35rem .9rem; border-radius:6px; border:1px solid ${neon}44; background:${neon}08; font-size:.78rem; font-weight:700; color:${neon}; letter-spacing:.04em; font-family:'${s.headingFont}',monospace; transition:all .2s; }
        .nn-skill:hover { border-color:${neon}; background:${neon}18; box-shadow:0 0 12px ${neon}44; }
        .nn-proj { background:${s.cardBg}; border:1px solid ${s.borderColor}; border-radius:${s.borderRadius}px; padding:1.75rem; transition:all .3s; position:relative; overflow:hidden; }
        .nn-proj::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,${neon},${neon2}); opacity:0; transition:opacity .3s; }
        .nn-proj:hover { border-color:${neon}55; box-shadow:0 0 30px ${neon}20; transform:translateY(-4px); }
        .nn-proj:hover::before { opacity:1; }
        .nn-link { font-size:.8rem; font-weight:700; color:${neon}; text-decoration:none; display:inline-flex; align-items:center; gap:.3rem; transition:text-shadow .2s; }
        .nn-link:hover { text-shadow:0 0 8px ${neon}; }
        .nn-glow-btn { display:inline-flex; align-items:center; gap:.5rem; padding:.85rem 2rem; background:transparent; border:1.5px solid ${neon}; color:${neon}; border-radius:${s.buttonRadius}px; font-weight:700; font-size:.9rem; text-decoration:none; font-family:'${s.headingFont}',monospace; letter-spacing:.06em; text-transform:uppercase; transition:all .2s; }
        .nn-glow-btn:hover { background:${neon}15; box-shadow:0 0 24px ${neon}55, inset 0 0 16px ${neon}22; }
        .nn-solid-btn { display:inline-flex; align-items:center; gap:.5rem; padding:.85rem 2rem; background:${neon}; color:#000; border:none; border-radius:${s.buttonRadius}px; font-weight:800; font-size:.9rem; text-decoration:none; font-family:'${s.headingFont}',monospace; letter-spacing:.06em; text-transform:uppercase; transition:all .2s; }
        .nn-solid-btn:hover { box-shadow:0 0 30px ${neon}99; transform:translateY(-2px); }
      `}</style>

      <div className="nn">
        {/* ── Scanline overlay ── */}
        <div style={{ position:'fixed', inset:0, backgroundImage:'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)', pointerEvents:'none', zIndex:1 }} />

        {/* ── Nav ── */}
        <nav style={{ position:'sticky', top:0, zIndex:40, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.25rem 3rem', background:s.bgColor+'dd', backdropFilter:'blur(20px)', borderBottom:`1px solid ${neon}22` }}>
          <div style={{ fontFamily:`'${s.headingFont}',monospace`, fontWeight:800, fontSize:'1.2rem', color:neon, textShadow:`0 0 20px ${neon}77`, letterSpacing:'.1em' }}>
            {`<${(data.name || 'DEV').split(' ')[0].toUpperCase()}/>`}
          </div>
          <div style={{ display:'flex', gap:'2rem' }}>
            {['About','Stack','Projects','Contact'].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nn-nav-link">{l}</a>)}
          </div>
          {data.contact.github && <a href={data.contact.github} target="_blank" rel="noopener" className="nn-glow-btn" style={{ padding:'.4rem 1rem', fontSize:'.72rem' }}><GithubIcon size={13}/>GitHub</a>}
        </nav>

        {/* ── Hero ── */}
        <header id="about" style={{ position:'relative', maxWidth:s.maxWidth, margin:'0 auto', padding:'6rem 3rem 5rem', zIndex:2 }}>
          {/* Grid bg */}
          <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(${neon}08 1px,transparent 1px),linear-gradient(90deg,${neon}08 1px,transparent 1px)`, backgroundSize:'60px 60px', pointerEvents:'none' }} />

          <div style={{ position:'relative', display:'grid', gridTemplateColumns: data.avatar && s.showAvatar ? '1fr 280px' : '1fr', gap:'3rem', alignItems:'center' }}>
            <div>
              <div style={{ fontFamily:`'${s.headingFont}',monospace`, fontSize:'.82rem', color:neon, letterSpacing:'.15em', textTransform:'uppercase', marginBottom:'1rem', opacity:.8 }}>// Available for opportunities</div>
              <h1 style={{ fontSize:'clamp(2.8rem,7vw,5rem)', fontWeight:800, letterSpacing:'-.02em', lineHeight:1.05, fontFamily:`'${s.headingFont}',sans-serif`, marginBottom:'1rem' }}>
                {data.name || 'Your Name'}
              </h1>
              <div style={{ height:3, width:80, background:`linear-gradient(90deg,${neon},${neon2})`, borderRadius:2, marginBottom:'1.5rem', boxShadow:`0 0 16px ${neon}88` }} />
              <p style={{ fontSize:'1.1rem', color:s.mutedColor, lineHeight:1.8, maxWidth:500, marginBottom:'2.5rem' }}>
                {data.bio || 'Building next-generation digital experiences with bleeding-edge technology.'}
              </p>
              <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                {data.contact.email && <a href={`mailto:${data.contact.email}`} className="nn-solid-btn"><Mail size={16}/>Contact</a>}
                {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noopener" className="nn-glow-btn"><LinkedinIcon size={15}/>LinkedIn</a>}
              </div>
            </div>
            {data.avatar && s.showAvatar && (
              <div style={{ position:'relative', flexShrink:0, display:'flex', justifyContent:'center' }}>
                <div style={{ position:'absolute', inset:-2, borderRadius: s.avatarShape==='circle'?'50%':`${s.borderRadius}px`, background:`linear-gradient(135deg,${neon},${neon2})`, filter:`blur(8px)`, opacity:.7 }} />
                <div style={{ width:240, height:240, position:'relative', borderRadius: s.avatarShape==='circle'?'50%':s.avatarShape==='rounded'?`${s.borderRadius}px`:'4px', overflow:'hidden', border:`2px solid ${neon}66` }}>
                  <Image src={data.avatar} alt={data.name || 'Avatar'} fill sizes="240px" style={{ objectFit:'cover' }} />
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ── Skills ── */}
        {data.skills.length > 0 && (
          <section id="stack" style={{ maxWidth:s.maxWidth, margin:'0 auto', padding:'4rem 3rem', position:'relative', zIndex:2 }}>
            <h2 style={{ fontFamily:`'${s.headingFont}',monospace`, fontSize:'1.5rem', fontWeight:800, color:neon, letterSpacing:'.08em', marginBottom:'1.75rem', textTransform:'uppercase' }}>
              <span style={{ color:s.mutedColor }}>//</span> Tech Stack
            </h2>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.6rem' }}>
              {data.skills.map(sk => <span key={sk} className="nn-skill"><span style={{ color:neon2 }}>▸</span>{sk}</span>)}
            </div>
          </section>
        )}

        {/* ── Projects ── */}
        {data.projects.length > 0 && (
          <section id="projects" style={{ maxWidth:s.maxWidth, margin:'0 auto', padding:'4rem 3rem', position:'relative', zIndex:2 }}>
            <h2 style={{ fontFamily:`'${s.headingFont}',monospace`, fontSize:'1.5rem', fontWeight:800, color:neon, letterSpacing:'.08em', marginBottom:'1.75rem', textTransform:'uppercase' }}>
              <span style={{ color:s.mutedColor }}>//</span> Projects
            </h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'1.25rem' }}>
              {data.projects.map((p, i) => (
                <div key={i} className="nn-proj">
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
                    <span style={{ fontFamily:`'${s.headingFont}',monospace`, fontSize:'.72rem', color:neon, letterSpacing:'.1em', textTransform:'uppercase', fontWeight:700 }}>Project_{String(i+1).padStart(2,'0')}</span>
                    <div style={{ display:'flex', gap:'.6rem' }}>
                      {p.github && <a href={p.github} target="_blank" rel="noopener" className="nn-link"><GithubIcon size={14}/></a>}
                      {p.live && <a href={p.live} target="_blank" rel="noopener" className="nn-link"><ArrowUpRight size={14}/></a>}
                    </div>
                  </div>
                  <h3 style={{ fontWeight:700, fontSize:'1.1rem', fontFamily:`'${s.headingFont}',sans-serif`, marginBottom:'.5rem' }}>{p.title || `Project ${i+1}`}</h3>
                  <p style={{ fontSize:'.88rem', color:s.mutedColor, lineHeight:1.65 }}>{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Education ── */}
        {data.education.length > 0 && (
          <section style={{ maxWidth:s.maxWidth, margin:'0 auto', padding:'3rem 3rem', position:'relative', zIndex:2 }}>
            <h2 style={{ fontFamily:`'${s.headingFont}',monospace`, fontSize:'1.5rem', fontWeight:800, color:neon, letterSpacing:'.08em', marginBottom:'1.5rem', textTransform:'uppercase' }}>
              <span style={{ color:s.mutedColor }}>//</span> Education
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'1.25rem', padding:'1rem 1.25rem', border:`1px solid ${neon}22`, borderRadius:s.borderRadius, marginBottom:'.75rem', background:`${neon}05` }}>
                <div style={{ fontFamily:`'${s.headingFont}',monospace`, fontSize:'.72rem', color:neon, fontWeight:700, minWidth:70, textAlign:'right' }}>{edu.year}</div>
                <div style={{ width:1, height:40, background:`${neon}33` }} />
                <div>
                  <div style={{ fontWeight:700, fontSize:'.95rem' }}>{edu.degree}</div>
                  <div style={{ fontSize:'.82rem', color:s.mutedColor, marginTop:2 }}>{edu.institution}</div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ── Contact ── */}
        <section id="contact" style={{ maxWidth:s.maxWidth, margin:'0 auto', padding:'5rem 3rem 7rem', position:'relative', zIndex:2, textAlign:'center' }}>
          <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:400, height:200, background:`radial-gradient(ellipse, ${neon}15, transparent 70%)`, pointerEvents:'none' }} />
          <h2 style={{ fontFamily:`'${s.headingFont}',monospace`, fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:800, marginBottom:'1rem', letterSpacing:'-.01em', position:'relative' }}>
            <span style={{ color:neon, textShadow:`0 0 40px ${neon}77` }}>Ready</span> to build?
          </h2>
          <p style={{ color:s.mutedColor, marginBottom:'2.5rem', fontSize:'1.05rem', position:'relative' }}>Let's collaborate and ship something great.</p>
          {data.contact.email && (
            <a href={`mailto:${data.contact.email}`} className="nn-solid-btn" style={{ position:'relative', fontSize:'1rem', padding:'1.1rem 2.5rem' }}>
              <Mail size={18}/>{data.contact.email}
            </a>
          )}
        </section>

        <footer style={{ borderTop:`1px solid ${neon}18`, padding:'1.25rem 3rem', display:'flex', justifyContent:'space-between', color:s.mutedColor, fontSize:'.78rem', fontFamily:`'${s.headingFont}',monospace`, letterSpacing:'.06em', position:'relative', zIndex:2 }}>
          <span>{`/* © ${year} ${data.name || 'Portfolio'} */`}</span>
          <span>Sitrezhuthu.dev</span>
        </footer>
      </div>
    </div>
  );
}
