import { TemplateId, TemplateStyles } from "@/lib/config/templates";

export interface ElementAnimation {
  type: 'none' | 'fade' | 'slideUp' | 'slideLeft' | 'bounce' | 'scale';
  duration: number; // ms
  delay: number;    // ms
}

export interface HoverEffect {
  scale?: number;
  opacity?: number;
  bgColor?: string;
  color?: string;
  shadow?: string;
}

export interface CustomElement {
  id: string;
  type: 'text' | 'shape' | 'image' | 'sticker' | 'button' | 'icon' | 'section' | 'divider';
  x: number;
  y: number;
  // Content
  content?: string;
  src?: string;
  href?: string;
  // Dimensions
  width?: number;
  height?: number;
  // Typography
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline' | 'line-through';
  letterSpacing?: number;
  lineHeight?: number;
  textAlign?: 'left' | 'center' | 'right';
  // Background & Border
  bgColor?: string;
  bgGradient?: string;
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  borderRadius?: number;
  // Shape
  shapeType?: 'circle' | 'triangle' | 'star' | 'square' | 'diamond' | 'pentagon' | 'hexagon';
  size?: number;
  // Effects
  shadow?: string;
  opacity?: number;
  // Transform
  rotation?: number;
  // Layout
  padding?: number;
  // Layer
  zIndex?: number;
  locked?: boolean;
  hidden?: boolean;
  groupId?: string;
  // Interactions
  animation?: ElementAnimation;
  hoverEffect?: HoverEffect;
  clickAction?: 'none' | 'link' | 'scroll';
  clickTarget?: string;
}

export interface Project {
  title: string;
  description: string;
  github: string;
  live: string;
  proficiency?: number;
  image?: string;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
}

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
  twitter: string;
}

export interface PortfolioData {
  _id?: string;
  name: string;
  username?: string;
  slug?: string;
  isPublic: boolean;
  bio: string;
  avatar: string;
  skills: string[];
  projects: Project[];
  education: Education[];
  contact: Contact;
  template: TemplateId;
  templateStyles: TemplateStyles;
  canvasPositions: Record<string, { x: number, y: number }>;
  customElements: CustomElement[];
}
