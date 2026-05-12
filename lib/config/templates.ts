export interface TemplateStyles {
  // Colors
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
  textColor: string;
  mutedColor: string;
  cardBg: string;
  borderColor: string;
  // Typography
  headingFont: string;
  bodyFont: string;
  // Shape
  borderRadius: number;
  buttonRadius: number;
  // Layout
  maxWidth: number;
  sectionGap: number;
  showAvatar: boolean;
  avatarShape: 'circle' | 'square' | 'rounded';
  heroLayout: 'left' | 'center' | 'split';
  // Canvas-specific
  canvasBg?: string;
  canvasWidth?: number;
  canvasHeight?: number;
}

export type TemplateId = 'minimal' | 'cards' | 'dark' | 'glassmorphism' | 'tech-minimal' | 'creative' | 'neon' | 'executive' | 'bento' | 'custom';

const JADE_PRIMARY = '#3DAA7A';

export const TEMPLATE_DEFAULTS: Record<TemplateId, TemplateStyles> = {
  minimal: {
    primaryColor: JADE_PRIMARY, secondaryColor: JADE_PRIMARY, bgColor: '#fafaf8',
    textColor: '#1a1a1a', mutedColor: '#6b7280', cardBg: '#f3f4f6', borderColor: '#e5e7eb',
    headingFont: 'Inter', bodyFont: 'Inter',
    borderRadius: 8, buttonRadius: 8, maxWidth: 900, sectionGap: 30,
    showAvatar: true, avatarShape: 'circle', heroLayout: 'split',
  },
  cards: {
    primaryColor: JADE_PRIMARY, secondaryColor: JADE_PRIMARY, bgColor: '#f8f7ff',
    textColor: '#1e1b4b', mutedColor: '#64748b', cardBg: JADE_PRIMARY, borderColor: '#e0e7ff',
    headingFont: 'Space Grotesk', bodyFont: 'Inter',
    borderRadius: 16, buttonRadius: 12, maxWidth: 1100, sectionGap: 40,
    showAvatar: true, avatarShape: 'circle', heroLayout: 'split',
  },
  dark: {
    primaryColor: JADE_PRIMARY, secondaryColor: JADE_PRIMARY, bgColor: '#060612',
    textColor: '#e8e8e8', mutedColor: '#94a3b8', cardBg: 'rgba(61,170,122,0.05)', borderColor: 'rgba(61,170,122,0.08)',
    headingFont: 'Space Grotesk', bodyFont: 'Inter',
    borderRadius: 16, buttonRadius: 12, maxWidth: 1100, sectionGap: 40,
    showAvatar: true, avatarShape: 'circle', heroLayout: 'split',
  },
  glassmorphism: {
    primaryColor: JADE_PRIMARY, secondaryColor: JADE_PRIMARY, bgColor: '#1a1a2e',
    textColor: JADE_PRIMARY, mutedColor: 'rgba(61,170,122,0.6)', cardBg: 'rgba(61,170,122,0.07)', borderColor: 'rgba(61,170,122,0.12)',
    headingFont: 'Outfit', bodyFont: 'Outfit',
    borderRadius: 20, buttonRadius: 12, maxWidth: 1100, sectionGap: 30,
    showAvatar: true, avatarShape: 'circle', heroLayout: 'split',
  },
  'tech-minimal': {
    primaryColor: JADE_PRIMARY, secondaryColor: JADE_PRIMARY, bgColor: '#050505',
    textColor: '#e2e8f0', mutedColor: '#64748b', cardBg: 'rgba(0,255,136,0.03)', borderColor: 'rgba(0,255,136,0.12)',
    headingFont: 'JetBrains Mono', bodyFont: 'Inter',
    borderRadius: 0, buttonRadius: 0, maxWidth: 1100, sectionGap: 35,
    showAvatar: false, avatarShape: 'square', heroLayout: 'left',
  },
  creative: {
    primaryColor: JADE_PRIMARY, secondaryColor: JADE_PRIMARY, bgColor: '#fafafa',
    textColor: '#0f0f0f', mutedColor: '#6b7280', cardBg: JADE_PRIMARY, borderColor: '#e5e7eb',
    headingFont: 'Outfit', bodyFont: 'Inter',
    borderRadius: 16, buttonRadius: 12, maxWidth: 1100, sectionGap: 40,
    showAvatar: true, avatarShape: 'circle', heroLayout: 'split',
  },
  neon: {
    primaryColor: JADE_PRIMARY, secondaryColor: JADE_PRIMARY, bgColor: '#050508',
    textColor: '#e8fff4', mutedColor: '#4d7a6a', cardBg: '#0a0f0d', borderColor: 'rgba(0,255,136,0.1)',
    headingFont: 'Space Grotesk', bodyFont: 'Inter',
    borderRadius: 8, buttonRadius: 6, maxWidth: 1100, sectionGap: 40,
    showAvatar: true, avatarShape: 'circle', heroLayout: 'split',
  },
  executive: {
    primaryColor: JADE_PRIMARY, secondaryColor: JADE_PRIMARY, bgColor: '#f8fafc',
    textColor: '#0f172a', mutedColor: '#64748b', cardBg: JADE_PRIMARY, borderColor: '#e2e8f0',
    headingFont: 'Plus Jakarta Sans', bodyFont: 'Inter',
    borderRadius: 12, buttonRadius: 8, maxWidth: 1200, sectionGap: 35,
    showAvatar: true, avatarShape: 'rounded', heroLayout: 'split',
  },
  bento: {
    primaryColor: JADE_PRIMARY, secondaryColor: JADE_PRIMARY, bgColor: '#f9fafb',
    textColor: '#111827', mutedColor: '#6b7280', cardBg: JADE_PRIMARY, borderColor: '#e5e7eb',
    headingFont: 'Space Grotesk', bodyFont: 'Inter',
    borderRadius: 20, buttonRadius: 12, maxWidth: 1100, sectionGap: 32,
    showAvatar: true, avatarShape: 'circle', heroLayout: 'split',
  },
  custom: {
    primaryColor: JADE_PRIMARY, secondaryColor: JADE_PRIMARY, bgColor: '#FAF9F6',
    textColor: '#f1f5f9', mutedColor: '#94a3b8', cardBg: '#1e1e2e', borderColor: 'rgba(61,170,122,0.1)',
    headingFont: 'Space Grotesk', bodyFont: 'Inter',
    borderRadius: 12, buttonRadius: 8, maxWidth: 1000, sectionGap: 35,
    showAvatar: true, avatarShape: 'circle', heroLayout: 'split',
    canvasBg: '#FAF9F6', canvasWidth: 1440, canvasHeight: 1800,
  },
};
