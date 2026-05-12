import { z } from 'zod';

export const portfolioSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, 'Name is required').max(50).optional().or(z.literal('')),
  username: z.string().min(3).max(30).optional(),
  slug: z.string().min(3).max(40).optional().or(z.literal('')),
  bio: z.string().max(500).optional().or(z.literal('')),
  avatar: z.string().optional().or(z.literal('')),
  template: z.string().optional(),
  templateStyles: z.record(z.string(), z.any()).optional(),
  skills: z.array(z.string()).optional(),
  projects: z.array(z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    github: z.string().optional(),
    live: z.string().optional(),
    image: z.string().optional(),
    proficiency: z.number().min(0).max(100).optional(),
  })).optional(),
  education: z.array(z.object({
    degree: z.string().optional(),
    institution: z.string().optional(),
    year: z.string().optional(),
  })).optional(),
  contact: z.object({
    email: z.string().email().optional().or(z.literal('')),
    github: z.string().optional().or(z.literal('')),
    linkedin: z.string().optional().or(z.literal('')),
    twitter: z.string().optional().or(z.literal('')),
  }).optional(),
  customElements: z.array(z.any()).optional(),
  isPublic: z.boolean().optional(),
});

export type PortfolioInput = z.infer<typeof portfolioSchema>;
