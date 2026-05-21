import { cookies }                from 'next/headers';
import { revalidatePath }           from 'next/cache';
import { dbConnect }              from '@/lib/db';
import Portfolio                  from '@/lib/models/Portfolio';
import { MinimalTemplate }        from '@/components/templates/Minimal';
import { ModernCardsTemplate }    from '@/components/templates/ModernCards';
import { DarkThemeTemplate }      from '@/components/templates/DarkTheme';
import { GlassmorphismTemplate }  from '@/components/templates/Glassmorphism';
import { TechMinimalTemplate }    from '@/components/templates/TechMinimal';
import { CreativeTemplate }       from '@/components/templates/Creative';
import { NeonTemplate }           from '@/components/templates/Neon';
import { ExecutiveTemplate }      from '@/components/templates/Executive';
import { BentoTemplate }          from '@/components/templates/Bento';
import { FreeformCanvas }         from '@/components/templates/FreeformCanvas';
import { ErrorBoundary }          from '@/components/common/ErrorBoundary';
import { notFound }               from 'next/navigation';
import Link                       from 'next/link';
import type { Metadata }          from 'next';
import { TEMPLATE_DEFAULTS, type TemplateId, type PortfolioStore }      from '@/store/usePortfolioStore';
import { Lock, Mail }                   from 'lucide-react';

interface PageProps {
  params: Promise<{ username: string }>;
}

// Reserved app paths — never matched by this catch-all
const RESERVED = new Set([
  'editor', 'dashboard', 'templates', 'settings', 'login', 'signup',
  'admin', 'api', 'about', 'blog', 'contact', 'projects', 'skills',
  'experience', 'services', 'testimonials', 'forgot-password',
]);

/** Find portfolio by username OR custom slug */
async function findPortfolio(handle: string) {
  await dbConnect();
  const raw =
    (await Portfolio.findOne({ username: handle }).lean()) ??
    (await Portfolio.findOne({ slug: handle }).lean());
  if (!raw) return null;
  return JSON.parse(JSON.stringify(raw));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { username } = await params;
    if (RESERVED.has(username.toLowerCase())) return { title: 'SITREZHUTHU' };
    const p = await findPortfolio(username);
    if (!p || !p.isPublic) return { title: 'Portfolio | SITREZHUTHU' };
    return {
      title:       `${p.name} — Portfolio | SITREZHUTHU`,
      description: p.bio,
      openGraph: {
        title:       `${p.name} — Portfolio`,
        description: p.bio,
        images:      p.avatar ? [p.avatar] : [],
      },
    };
  } catch {
    return { title: 'Portfolio | SITREZHUTHU' };
  }
}

async function verifyEmail(formData: FormData) {
  'use server';
  const email = formData.get('email') as string;
  const portfolioId = formData.get('portfolioId') as string;
  const username = formData.get('username') as string;
  
  await dbConnect();
  const p = await Portfolio.findById(portfolioId);
  if (p && p.allowedEmails && p.allowedEmails.some((e: string) => e.toLowerCase() === email.trim().toLowerCase())) {
     const cookieStore = await cookies();
     cookieStore.set(`access_${portfolioId}`, 'granted', { maxAge: 60 * 60 * 24 * 30 });
     revalidatePath(`/${username}`);
  }
}


export default async function PublicPortfolioPage({ params }: PageProps) {
  const { username } = await params;

  // Bail out immediately for reserved paths
  if (RESERVED.has(username.toLowerCase())) notFound();

  const portfolio = await findPortfolio(username);

  if (!portfolio) notFound();

  /* ── Private portfolio gate ───────────────────────────────── */
  let hasAccess = portfolio.isPublic;
  
  if (!hasAccess) {
    const cookieStore = await cookies();
    const accessCookie = cookieStore.get(`access_${portfolio._id}`);
    if (accessCookie && accessCookie.value === 'granted') {
      hasAccess = true;
    }
  }

  if (!hasAccess) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#09050f,#12082a,#09050f)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#3DAA7A', gap: '1rem', padding: '2rem' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(167,139,250,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <Lock size={28} style={{ color: '#3DAA7A' }} />
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, textAlign: 'center' }}>This portfolio is private</h1>
        <p style={{ color: 'rgba(61,170,122,.5)', textAlign: 'center', maxWidth: 400, marginBottom: '1.5rem' }}>
          Please enter your email to view this portfolio if you have been granted access.
        </p>
        
        <form action={verifyEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: 320 }}>
          <input type="hidden" name="portfolioId" value={portfolio._id} />
          <input type="hidden" name="username" value={username} />
          <div style={{ position: 'relative' }}>
            <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#3DAA7A' }} />
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              required
              style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', background: 'rgba(61,170,122,0.05)', border: '1px solid rgba(61,170,122,0.1)', borderRadius: 12, color: '#3DAA7A', outline: 'none' }}
            />
          </div>
          <button type="submit" style={{ padding: '0.85rem', background: 'linear-gradient(135deg,#3DAA7A,#3DAA7A)', borderRadius: 12, color: '#3DAA7A', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            Request Access
          </button>
        </form>

        <Link href="/" style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'rgba(61,170,122,.4)', textDecoration: 'none' }}>
          Back to SITREZHUTHU
        </Link>
      </div>
    );
  }

  /* ── Merge template styles ────────────────────────────────── */
  const baseStyles   = TEMPLATE_DEFAULTS[portfolio.template as TemplateId] ?? TEMPLATE_DEFAULTS['minimal'];
  const mergedStyles = { ...baseStyles, ...(portfolio.templateStyles || {}) };
  const data         = { ...portfolio, templateStyles: mergedStyles } as PortfolioStore;

  const renderTemplate = () => {
    switch (portfolio.template) {
      case 'minimal':       return <MinimalTemplate       data={data} />;
      case 'cards':         return <ModernCardsTemplate   data={data} />;
      case 'dark':          return <DarkThemeTemplate     data={data} />;
      case 'glassmorphism': return <GlassmorphismTemplate data={data} />;
      case 'tech-minimal':  return <TechMinimalTemplate   data={data} />;
      case 'creative':      return <CreativeTemplate      data={data} />;
      case 'neon':          return <NeonTemplate          data={data} />;
      case 'executive':     return <ExecutiveTemplate     data={data} />;
      case 'bento':         return <BentoTemplate         data={data} />;
      case 'custom':        return <FreeformCanvas        data={data} isEditor={false} />;
      default:              return <MinimalTemplate       data={data} />;
    }
  };

  return (
    <>
      {/* Floating "Made with" badge */}
      <div style={{ position: 'fixed', bottom: '1.25rem', right: '1.25rem', zIndex: 9999 }}>
        <Link href="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '0.5rem 1rem', background: 'rgba(9,5,15,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: 999, fontSize: '0.72rem', fontWeight: 700, color: '#3DAA7A', textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3DAA7A', display: 'inline-block' }} />
          Made with SITREZHUTHU
        </Link>
      </div>

      <ErrorBoundary>
        {renderTemplate()}
      </ErrorBoundary>
    </>
  );
}
