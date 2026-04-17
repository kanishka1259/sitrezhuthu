import { dbConnect } from '@/lib/db';
import Portfolio from '@/lib/models/Portfolio';
import { MinimalTemplate } from '@/components/templates/Minimal';
import { ModernCardsTemplate } from '@/components/templates/ModernCards';
import { DarkThemeTemplate } from '@/components/templates/DarkTheme';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

interface PortfolioData {
  name: string;
  bio: string;
  avatar: string;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
    github?: string;
    live?: string;
    proficiency?: number;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  contact: {
    email?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  template: 'minimal' | 'cards' | 'dark';
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  try {
    await dbConnect();
    const { username } = await params;
    const portfolio = await Portfolio.findOne({ username }).lean();

    if (!portfolio) {
      return {
        title: 'Portfolio | PortfolioGen',
      };
    }

    return {
      title: `${portfolio.name} - Portfolio | PortfolioGen`,
      description: portfolio.bio,
      openGraph: {
        title: `${portfolio.name} - Portfolio`,
        description: portfolio.bio,
        images: portfolio.avatar ? [portfolio.avatar] : [],
      },
    };
  } catch {
    return {
      title: 'Portfolio | PortfolioGen',
    };
  }
}

async function getPortfolio(username: string): Promise<PortfolioData | null> {
  try {
    await dbConnect();
    const portfolio = await Portfolio.findOne({ username }).lean();
    return portfolio as PortfolioData | null;
  } catch {
    return null;
  }
}

export default async function PublicPortfolioPage({ params }: PageProps) {
  const { username } = await params;
  const portfolio = await getPortfolio(username);

  if (!portfolio) {
    notFound();
  }

  const renderTemplate = () => {
    const portfolioData = portfolio as any;
    switch (portfolio.template) {
      case 'minimal':
        return <MinimalTemplate data={portfolioData} />;
      case 'cards':
        return <ModernCardsTemplate data={portfolioData} />;
      case 'dark':
        return <DarkThemeTemplate data={portfolioData} />;
      default:
        return <MinimalTemplate data={portfolioData} />;
    }
  };

  return (
    <>
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/" className="px-4 py-2 bg-white text-gray-900 rounded-lg shadow-lg hover:bg-gray-50 transition">
          ← Back
        </Link>
      </div>

      {/* Portfolio */}
      {renderTemplate()}
    </>
  );
}
