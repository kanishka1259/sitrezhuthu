// ─── demo data shown inside the preview modal ───────────────────────────────
export const DEMO: Record<string, unknown> = {
  name: 'Alex Rivera',
  bio: 'Full-stack developer & designer crafting elegant digital experiences. Passionate about clean code, accessibility, and pixel-perfect interfaces.',
  avatar: '',
  skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'GraphQL', 'Figma', 'AWS'],
  projects: [
    { title: 'CloudSync Dashboard', description: 'A real-time analytics platform handling 50 k+ events/day with WebSocket streaming and interactive charts.', github: '#', live: '#', proficiency: 92 },
    { title: 'E-Commerce Engine', description: 'Headless commerce solution with custom CMS, Stripe integration, and sub-200 ms page loads.', github: '#', live: '#', proficiency: 87 },
    { title: 'AI Content Studio', description: 'Generative AI writing tool with GPT-4 integration, draft versioning, and team collaboration.', github: '#', live: '#', proficiency: 78 },
  ],
  education: [
    { degree: 'B.Sc. Computer Science', institution: 'MIT', year: '2018–2022' },
    { degree: 'Full-Stack Bootcamp', institution: 'Codecademy Pro', year: '2022' },
  ],
  contact: { email: 'alex@example.com', github: 'https://github.com', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
  template: 'minimal',
};

// ─── template catalogue ──────────────────────────────────────────────────────
export type TemplateId = 'minimal' | 'cards' | 'dark' | 'glassmorphism' | 'tech-minimal' | 'creative' | 'neon' | 'executive' | 'bento';

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  category: string;
  badge?: string;
  badgeColor?: string;
  gradient: string;
  accentColor: string;
  textColor: string;
  icon: string;
  features: string[];
  usedCount: number;
  likes: number;
  views: number;
}

export const templates: TemplateMeta[] = [
  {
    id: 'minimal',
    name: 'Minimal Pro',
    tagline: 'Less is more',
    description: 'A clean, editorial-style portfolio inspired by top design studios. Crisp typography, monochrome palette, elegant hover effects.',
    category: 'Classic',
    gradient: 'linear-gradient(135deg, #111 0%, #222 100%)',
    accentColor: '#3DAA7A',
    textColor: '#3DAA7A',
    icon: 'minimal',
    features: ['Editorial layout', 'Skill pills', 'Timeline education', 'SEO ready'],
    usedCount: 0,
    likes: 0,
    views: 0,
  },
  {
    id: 'cards',
    name: 'Modern Cards',
    tagline: 'Bold & vibrant',
    description: 'Contemporary card-based design with a cyan/cyan gradient system, animated skill tags, live project stats, and a stunning CTA section.',
    category: 'Modern',
    badge: 'Popular',
    badgeColor: 'rgba(217, 119, 6, 0.2)',
    gradient: 'linear-gradient(135deg, #111 0%, #222 100%)',
    accentColor: '#D97706',
    textColor: '#3DAA7A',
    icon: 'cards',
    features: ['Stats counter', 'Gradient CTA', 'Hover lift cards', 'Animated skills'],
    usedCount: 0,
    likes: 0,
    views: 0,
  },
  {
    id: 'dark',
    name: 'Dark Pro',
    tagline: 'High contrast, bold',
    description: 'A sleek dark-mode portfolio using Space Grotesk and JetBrains Mono. Gradient hero, pulsing availability badge, and glass-like project cards.',
    category: 'Dark',
    badge: 'Trending',
    badgeColor: 'rgba(61, 170, 122, 0.2)',
    gradient: 'linear-gradient(135deg, #0d0d1a 0%, #0f1a2e 100%)',
    accentColor: '#3DAA7A',
    textColor: '#3DAA7A',
    icon: 'dark',
    features: ['Dark glass cards', 'Gradient typography', 'Timeline education', 'Animated dot'],
    usedCount: 0,
    likes: 0,
    views: 0,
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    tagline: 'Frosted & futuristic',
    description: 'Stunning frosted glass cards on a deep indigo gradient. Features floating orbs, a spinning avatar ring, pulsing status badge, and glowing buttons.',
    category: 'Advanced',
    badge: 'Top Pick',
    badgeColor: 'rgba(61, 170, 122, 0.2)',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #533483 100%)',
    accentColor: '#3DAA7A',
    textColor: '#3DAA7A',
    icon: 'glassmorphism',
    features: ['Glass morphism', 'Floating orbs', 'Spinning avatar', 'Gradient glow'],
    usedCount: 0,
    likes: 0,
    views: 0,
  },
  {
    id: 'tech-minimal',
    name: 'Terminal',
    tagline: 'Code-first aesthetic',
    description: "The developer's portfolio. JetBrains Mono throughout, CSS scanlines, grid background, a live terminal prompt, and a pure monochrome palette.",
    category: 'Tech',
    gradient: 'linear-gradient(135deg, #050505 0%, #0d1a10 100%)',
    accentColor: '#3DAA7A',
    textColor: '#3DAA7A',
    icon: 'tech-minimal',
    features: ['Terminal prompt', 'Scanline effect', 'Monospace system', 'Grid background'],
    usedCount: 0,
    likes: 0,
    views: 0,
  },
  {
    id: 'creative',
    name: 'Creative',
    tagline: 'Bold & expressive',
    description: 'A vibrant, design-forward portfolio with gradient hero section, floating background orbs, bold typography, and animated card grid for projects.',
    category: 'Modern',
    badge: 'New',
    badgeColor: 'rgba(61, 170, 122, 0.2)',
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #2e1065 100%)',
    accentColor: '#3DAA7A',
    textColor: '#3DAA7A',
    icon: 'creative',
    features: ['Gradient hero', 'Floating orbs', 'Image cards', 'Animated CTA'],
    usedCount: 0,
    likes: 0,
    views: 0,
  },
  {
    id: 'neon',
    name: 'Neon Cyber',
    tagline: 'Glow in the dark',
    description: 'A cyberpunk-inspired dark portfolio with neon green glow effects, scanline overlay, grid background, monospace code aesthetic, and glowing borders.',
    category: 'Dark',
    badge: 'New',
    badgeColor: 'rgba(0, 255, 136, 0.2)',
    gradient: 'linear-gradient(135deg, #020c08 0%, #041a12 100%)',
    accentColor: '#00FF88',
    textColor: '#e8fff4',
    icon: 'neon',
    features: ['Neon glow', 'Grid bg', 'Scanlines', 'Cyber monospace'],
    usedCount: 0,
    likes: 0,
    views: 0,
  },
  {
    id: 'executive',
    name: 'Executive',
    tagline: 'Clean & corporate',
    description: 'A professional sidebar-based layout perfect for consultants and senior professionals. Features skill bars, clean typography, and a polished resume feel.',
    category: 'Classic',
    badge: 'New',
    badgeColor: 'rgba(61, 170, 122, 0.2)',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
    accentColor: '#3DAA7A',
    textColor: '#3DAA7A',
    icon: 'executive',
    features: ['Sidebar layout', 'Skill bars', 'Resume feel', 'Clean corporate'],
    usedCount: 0,
    likes: 0,
    views: 0,
  },
  {
    id: 'bento',
    name: 'Bento Grid',
    tagline: 'Trendy mosaic layout',
    description: 'The hottest design trend of 2024. A dynamic bento-box grid with mixed card sizes, stats, quote cards, and a modern dashboard-inspired composition.',
    category: 'Modern',
    badge: 'Trending',
    badgeColor: 'rgba(61, 170, 122, 0.2)',
    gradient: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)',
    accentColor: '#3DAA7A',
    textColor: '#3DAA7A',
    icon: 'bento',
    features: ['Bento grid', 'Stats card', 'Quote card', 'Mixed layouts'],
    usedCount: 0,
    likes: 0,
    views: 0,
  },
];

export const categories = ['All', 'Classic', 'Modern', 'Dark', 'Advanced', 'Tech'];

export const SAMPLE_TEMPLATES = [
  {
    _id: 'sample-1',
    templateName: 'Ocean Breeze',
    authorName: 'Jamie Chen',
    description: 'Calm cyan & blue palette with soft rounded corners — perfect for designers.',
    baseTemplate: 'cards',
    status: 'approved',
    votes: 142,
    templateStyles: { primaryColor: '#3DAA7A', secondaryColor: '#3DAA7A', bgColor: '#f0fdfa', textColor: '#134e4a', borderRadius: 20, buttonRadius: 12 },
  },
  {
    _id: 'sample-2',
    templateName: 'Sunset Studio',
    authorName: 'Maya Patel',
    description: 'Warm cyan & rose gradient system with sharp, editorial card styling.',
    baseTemplate: 'minimal',
    status: 'approved',
    votes: 98,
    templateStyles: { primaryColor: '#d97706', secondaryColor: '#3DAA7A', bgColor: '#fffbeb', textColor: '#78350f', borderRadius: 4, buttonRadius: 4 },
  },
  {
    _id: 'sample-3',
    templateName: 'Neon Noir',
    authorName: 'Alex Kim',
    description: 'Deep dark background with hot-cyan neon accents. Pure cyberpunk vibes.',
    baseTemplate: 'dark',
    status: 'approved',
    votes: 231,
    templateStyles: { primaryColor: '#3DAA7A', secondaryColor: '#3DAA7A', bgColor: '#050510', textColor: '#f0f0ff', borderRadius: 16, buttonRadius: 16 },
  },
];
