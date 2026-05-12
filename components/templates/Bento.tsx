'use client';

import { PortfolioStore, TemplateStyles, TEMPLATE_DEFAULTS } from '@/store/usePortfolioStore';
import { ArrowUpRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons';
import Image from 'next/image';

interface Props { data: PortfolioStore; }

export function BentoTemplate({ data }: Props) {
  const year = new Date().getFullYear();
  const s: TemplateStyles = data.templateStyles ?? TEMPLATE_DEFAULTS['bento'];
  const fonts = [s.headingFont, s.bodyFont]
    .filter((f, i, a) => a.indexOf(f) === i && f !== 'system-ui')
    .map(f => `family=${f.replace(/ /g, '+')}:wght@300;400;500;600;700;800`).join('&');

  const cardStyle = (extra?: React.CSSProperties): React.CSSProperties => ({
    background: s.cardBg,
    border: `1px solid ${s.borderColor}`,
    borderRadius: s.borderRadius + 4,
    padding: '1.75rem',
    overflow: 'hidden',
    position: 'relative',
    ...extra,
  });

  return (
    <div style={{ minHeight:'100vh', background:s.bgColor, color:s.textColor, fontFamily:`'${s.bodyFont}',sans-serif` }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?${fonts}&display=swap');
        .bt * { box-sizing:border-box; margin:0; }
        .bt-card { transition:transform .2s, box-shadow .2s; }
        .bt-card:hover { transform:translateY(-3px); box-shadow:0 16px 40px rgba(0,0,0,.12); }
        .bt-link { font-size:.82rem; font-weight:600; color:${s.mutedColor}; text-decoration:none; display:inline-flex; align-items:center; gap:.3rem; transition:color .2s; }
        .bt-link:hover { color:${s.textColor}; }
        .bt-skill { display:inline-block; padding:.3rem .8rem; border-radius:${s.borderRadius}px; background:${s.bgColor}; border:1px solid ${s.borderColor}; font-size:.75rem; font-weight:600; color:${s.mutedColor}; }
        .bt-social { width:44px; height:44px; border-radius:12px; background:${s.bgColor}; border:1px solid ${s.borderColor}; display:inline-flex; align-items:center; justify-content:center; color:${s.mutedColor}; text-decoration:none; transition:all .2s; }
        .bt-social:hover { background:${s.primaryColor}; color:#fff; border-color:${s.primaryColor}; transform:scale(1.05); }
        @media (max-width: 900px) {
          .bt-grid { grid-template-columns: 1fr !important; }
          .bt-card { grid-column: span 12 !important; }
          .bt-hero-content { flex-direction: column; text-align: center; }
          .bt-hero-content img { width: 100px !important; height: 100px !important; margin-bottom: 1rem; }
          .bt-nav { flex-direction: column; gap: 1.5rem; text-align: center; }
          .bt-cta { align-items: center !important; }
        }
      `}</style>

      <div className="bt" style={{ maxWidth:1100, margin:'0 auto', padding:'2.5rem 1.5rem' }}>

        {/* ── Nav ── */}
        <nav className="bt-nav" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2.5rem' }}>
          <span style={{ fontWeight:800, fontSize:'1.1rem', fontFamily:`'${s.headingFont}',sans-serif`, letterSpacing:'-.02em' }}>
            {data.name || 'Portfolio'}
          </span>
          <div style={{ display:'flex', gap:'.5rem', alignItems:'center' }}>
            {data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noopener" className="bt-social"><LinkedinIcon size={16}/></a>}
            {data.contact.github && <a href={data.contact.github} target="_blank" rel="noopener" className="bt-social"><GithubIcon size={16}/></a>}
            {data.contact.twitter && <a href={data.contact.twitter} target="_blank" rel="noopener" className="bt-social"><TwitterIcon size={16}/></a>}
            {data.contact.email && <a href={`mailto:${data.contact.email}`} className="bt-social"><Mail size={16}/></a>}
          </div>
        </nav>

        {/* ── Bento Grid ── */}
        <div className="bt-grid" style={{ display:'grid', gridTemplateColumns:'repeat(12,1fr)', gap:'1rem' }}>

          {/* Hero card - spans 8 cols */}
          <div className="bt-card" style={{ ...cardStyle(), gridColumn:'span 8', background:`linear-gradient(135deg, ${s.primaryColor}18, ${s.secondaryColor}10)`, border:`1px solid ${s.primaryColor}25` }}>
            <div className="bt-hero-content" style={{ display:'flex', gap:'1.5rem', alignItems:'center' }}>
              {data.avatar && s.showAvatar && (
                <div style={{ width:80, height:80, position: 'relative', borderRadius: s.avatarShape==='circle'?'50%':'16px', overflow: 'hidden', border:`2px solid ${s.primaryColor}40`, flexShrink:0 }}>
                  <Image 
                    src={data.avatar} 
                    alt={data.name || 'Avatar'} 
                    fill 
                    sizes="80px"
                    style={{ objectFit:'cover' }} 
                  />
                </div>
              )}
              <div>
                <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:`${s.primaryColor}20`, borderRadius:999, padding:'.25rem .75rem', fontSize:'.72rem', fontWeight:700, color:s.primaryColor, marginBottom:'1rem' }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:s.primaryColor }} /> Available
                </div>
                <h1 style={{ fontFamily:`'${s.headingFont}',sans-serif`, fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:800, lineHeight:1.1, letterSpacing:'-.03em', marginBottom:'.5rem' }}>
                  {data.name || 'Your Name'}
                </h1>
                <p style={{ fontSize:'.95rem', color:s.mutedColor, lineHeight:1.7, maxWidth:400 }}>
                  {data.bio || 'Creative developer building memorable digital experiences.'}
                </p>
              </div>
            </div>
          </div>

          {/* CTA card - spans 4 cols */}
          <div className="bt-card bt-cta" style={{ ...cardStyle({ display:'flex', flexDirection:'column', justifyContent:'space-between' }), gridColumn:'span 4', background:s.primaryColor }}>
            <div>
              <div style={{ fontSize:'2rem', marginBottom:'.75rem' }}>👋</div>
              <h3 style={{ fontFamily:`'${s.headingFont}',sans-serif`, fontSize:'1.25rem', fontWeight:700, color:'#3DAA7A', marginBottom:'.5rem' }}>Let's work together</h3>
              <p style={{ fontSize:'.85rem', color:'rgba(61,170,122,.7)', lineHeight:1.6 }}>Open to exciting projects and full-time opportunities.</p>
            </div>
            {data.contact.email && (
              <a href={`mailto:${data.contact.email}`} style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:'1.5rem', padding:'.7rem 1.25rem', background:'rgba(61,170,122,.2)', color:'#3DAA7A', borderRadius:s.buttonRadius+'px', fontWeight:700, fontSize:'.85rem', textDecoration:'none', backdropFilter:'blur(8px)' }}>
                <Mail size={14}/>Say Hello
              </a>
            )}
          </div>

          {/* Skills card - spans 5 cols */}
          {data.skills.length > 0 && (
            <div className="bt-card" style={{ ...cardStyle(), gridColumn:'span 5' }}>
              <h3 style={{ fontFamily:`'${s.headingFont}',sans-serif`, fontWeight:700, fontSize:'1rem', marginBottom:'1.25rem', letterSpacing:'-.01em' }}>Tech Stack</h3>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem' }}>
                {data.skills.map(sk => <span key={sk} className="bt-skill">{sk}</span>)}
              </div>
            </div>
          )}

          {/* Stats card - spans 3 cols */}
          <div className="bt-card" style={{ ...cardStyle({ textAlign:'center' }), gridColumn:'span 3' }}>
            <div style={{ fontSize:'3rem', fontWeight:800, fontFamily:`'${s.headingFont}',sans-serif`, color:s.primaryColor, lineHeight:1 }}>{data.projects.length || 10}+</div>
            <div style={{ fontSize:'.82rem', color:s.mutedColor, fontWeight:500, marginTop:8 }}>Projects Shipped</div>
            <div style={{ marginTop:'1.5rem', fontSize:'2rem', fontWeight:800, fontFamily:`'${s.headingFont}',sans-serif`, color:s.secondaryColor, lineHeight:1 }}>{data.skills.length || 8}+</div>
            <div style={{ fontSize:'.82rem', color:s.mutedColor, fontWeight:500, marginTop:8 }}>Technologies</div>
          </div>

          {/* Quote / bio card - spans 4 cols */}
          <div className="bt-card" style={{ ...cardStyle(), gridColumn:'span 4', display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <div style={{ fontSize:'3rem', color:s.primaryColor, lineHeight:1, marginBottom:'.5rem', opacity:.4 }}>"</div>
            <p style={{ fontSize:'.95rem', color:s.textColor, lineHeight:1.75, fontStyle:'italic', fontWeight:400 }}>
              {data.bio || 'Passionate about clean code, great UX, and building things that matter.'}
            </p>
          </div>

          {/* Projects - each gets 6 cols */}
          {data.projects.slice(0,4).map((p, i) => (
            <div key={i} className="bt-card" style={{ ...cardStyle(), gridColumn: i < 2 ? 'span 6' : 'span 4' }}>
              {!p.image && (
                <div style={{ height:80, background:`linear-gradient(135deg,${s.primaryColor}15,${s.secondaryColor}10)`, borderRadius:s.borderRadius, marginBottom:'1.25rem', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize:'2rem', opacity:.4 }}>{'⬡◈◻◎'[i]}</span>
                </div>
              )}
              {p.image && (
                <div style={{ height:120, position: 'relative', overflow:'hidden', borderRadius:s.borderRadius, marginBottom:'1.25rem' }}>
                  <Image 
                    src={p.image} 
                    alt={p.title || 'Project'} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 320px"
                    style={{ objectFit:'cover' }} 
                  />
                </div>
              )}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'.5rem' }}>
                <h3 style={{ fontFamily:`'${s.headingFont}',sans-serif`, fontWeight:700, fontSize:'1rem' }}>{p.title||`Project ${i+1}`}</h3>
                <div style={{ display:'flex', gap:'.5rem' }}>
                  {p.github && <a href={p.github} target="_blank" rel="noopener" className="bt-link"><GithubIcon size={13}/></a>}
                  {p.live && <a href={p.live} target="_blank" rel="noopener" className="bt-link"><ArrowUpRight size={13}/></a>}
                </div>
              </div>
              <p style={{ fontSize:'.84rem', color:s.mutedColor, lineHeight:1.6 }}>{p.description}</p>
            </div>
          ))}

          {/* Education - spans 12 */}
          {data.education.length > 0 && (
            <div className="bt-card" style={{ ...cardStyle(), gridColumn:'span 12' }}>
              <h3 style={{ fontFamily:`'${s.headingFont}',sans-serif`, fontWeight:700, fontSize:'1rem', marginBottom:'1.25rem' }}>Education</h3>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'1rem' }}>
                {data.education.map((edu, i) => (
                  <div key={i} style={{ display:'flex', gap:'1rem', alignItems:'center', padding:'1rem 1.25rem', background:s.bgColor, borderRadius:s.borderRadius, border:`1px solid ${s.borderColor}` }}>
                    <div style={{ width:40, height:40, borderRadius:12, background:`${s.primaryColor}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.25rem', flexShrink:0 }}>🎓</div>
                    <div>
                      <div style={{ fontWeight:600, fontSize:'.9rem' }}>{edu.degree}</div>
                      <div style={{ fontSize:'.8rem', color:s.mutedColor, marginTop:2 }}>{edu.institution} · {edu.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <footer style={{ textAlign:'center', padding:'3rem 0 1.5rem', color:s.mutedColor, fontSize:'.8rem' }}>
          © {year} {data.name||'Portfolio'} · Built with Sitrezhuthu
        </footer>
      </div>
    </div>
  );
}
