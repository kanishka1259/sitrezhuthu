'use client';

'use client';

import { usePortfolioStore } from '@/store/usePortfolioStore';
import { MinimalTemplate } from '@/components/templates/Minimal';
import { ModernCardsTemplate } from '@/components/templates/ModernCards';
import { DarkThemeTemplate } from '@/components/templates/DarkTheme';

export function LivePreview() {
  const portfolio = usePortfolioStore();

  return (
    <div id="portfolio-preview" className="w-full bg-gray-50">
      {portfolio.template === 'minimal' && <MinimalTemplate data={portfolio} />}
      {portfolio.template === 'cards' && <ModernCardsTemplate data={portfolio} />}
      {portfolio.template === 'dark' && <DarkThemeTemplate data={portfolio} />}
    </div>
  );
}
