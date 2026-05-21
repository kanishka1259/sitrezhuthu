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

export const TEMPLATE_DEFAULTS: Record<TemplateId, TemplateStyles> = {
  minimal: {
    primaryColor: '#050505', secondaryColor: '#383838', bgColor: '#fafaf8',
    textColor: '#1a1a1a', mutedColor: '#6b7280', cardBg: '#f3f4f6', borderColor: '#e5e7eb',
    headingFont: 'Inter', bodyFont: 'Inter',
    borderRadius: 8, buttonRadius: 8, maxWidth: 900, sectionGap: 30,
    showAvatar: true, avatarShape: 'circle', heroLayout: 'split',
  },
  cards: {
    primaryColor: '#4f46e5', secondaryColor: '#818cf8', bgColor: '#f8f7ff',
    textColor: '#1e1b4b', mutedColor: '#64748b', cardBg: '#ffffff', borderColor: '#e0e7ff',
    headingFont: 'Space Grotesk', bodyFont: 'Inter',
    borderRadius: 16, buttonRadius: 12, maxWidth: 1100, sectionGap: 40,
    showAvatar: true, avatarShape: 'circle', heroLayout: 'split',
  },
  dark: {
    primaryColor: '#a78bfa', secondaryColor: '#c084fc', bgColor: '#060612',
    textColor: '#e8e8e8', mutedColor: '#94a3b8', cardBg: '#1e1e2e', borderColor: '#2d2d3b',
    headingFont: 'Space Grotesk', bodyFont: 'Inter',
    borderRadius: 16, buttonRadius: 12, maxWidth: 1100, sectionGap: 40,
    showAvatar: true, avatarShape: 'circle', heroLayout: 'split',
  },
  glassmorphism: {
    primaryColor: '#0ea5e9', secondaryColor: '#38bdf8', bgColor: '#1a1a2e',
    textColor: '#e0f2fe', mutedColor: '#94a3b8', cardBg: '#252542', borderColor: '#333355',
    headingFont: 'Outfit', bodyFont: 'Outfit',
    borderRadius: 20, buttonRadius: 12, maxWidth: 1100, sectionGap: 30,
    showAvatar: true, avatarShape: 'circle', heroLayout: 'split',
  },
  'tech-minimal': {
    primaryColor: '#00ff88', secondaryColor: '#00cc66', bgColor: '#050505',
    textColor: '#e2e8f0', mutedColor: '#64748b', cardBg: '#111111', borderColor: '#222222',
    headingFont: 'JetBrains Mono', bodyFont: 'Inter',
    borderRadius: 0, buttonRadius: 0, maxWidth: 1100, sectionGap: 35,
    showAvatar: false, avatarShape: 'square', heroLayout: 'left',
  },
  creative: {
    primaryColor: '#e11d48', secondaryColor: '#fb7185', bgColor: '#fafafa',
    textColor: '#0f0f0f', mutedColor: '#6b7280', cardBg: '#ffffff', borderColor: '#e5e7eb',
    headingFont: 'Outfit', bodyFont: 'Inter',
    borderRadius: 16, buttonRadius: 12, maxWidth: 1100, sectionGap: 40,
    showAvatar: true, avatarShape: 'circle', heroLayout: 'split',
  },
  neon: {
    primaryColor: '#d946ef', secondaryColor: '#e879f9', bgColor: '#050508',
    textColor: '#fdf4ff', mutedColor: '#a1a1aa', cardBg: '#18181b', borderColor: '#27272a',
    headingFont: 'Space Grotesk', bodyFont: 'Inter',
    borderRadius: 8, buttonRadius: 6, maxWidth: 1100, sectionGap: 40,
    showAvatar: true, avatarShape: 'circle', heroLayout: 'split',
  },
  executive: {
    primaryColor: '#0f172a', secondaryColor: '#334155', bgColor: '#f8fafc',
    textColor: '#0f172a', mutedColor: '#64748b', cardBg: '#ffffff', borderColor: '#e2e8f0',
    headingFont: 'Plus Jakarta Sans', bodyFont: 'Inter',
    borderRadius: 12, buttonRadius: 8, maxWidth: 1200, sectionGap: 35,
    showAvatar: true, avatarShape: 'rounded', heroLayout: 'split',
  },
  bento: {
    primaryColor: '#059669', secondaryColor: '#10b981', bgColor: '#f9fafb',
    textColor: '#111827', mutedColor: '#6b7280', cardBg: '#ffffff', borderColor: '#e5e7eb',
    headingFont: 'Space Grotesk', bodyFont: 'Inter',
    borderRadius: 20, buttonRadius: 12, maxWidth: 1100, sectionGap: 32,
    showAvatar: true, avatarShape: 'circle', heroLayout: 'split',
  },
  custom: {
    primaryColor: '#3DAA7A', secondaryColor: '#10b981', bgColor: '#FAF9F6',
    textColor: '#1a1a1a', mutedColor: '#6b7280', cardBg: '#ffffff', borderColor: '#e5e7eb',
    headingFont: 'Space Grotesk', bodyFont: 'Inter',
    borderRadius: 12, buttonRadius: 8, maxWidth: 1000, sectionGap: 35,
    showAvatar: true, avatarShape: 'circle', heroLayout: 'split',
    canvasBg: '#FAF9F6', canvasWidth: 1440, canvasHeight: 1800,
  },
};
