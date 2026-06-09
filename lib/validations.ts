import { z } from 'zod';

/**
 * Accepts a string, empty string, or null/undefined — always outputs a string.
 * Prevents null contact fields from leaking into MongoDB.
 */
const nullableStr = z
  .string()
  .nullable()
  .optional()
  .transform((v) => v ?? '');

const nullableEmail = z
  .string()
  .nullable()
  .optional()
  .transform((v) => v ?? '')
  .pipe(z.string().email().or(z.literal('')));

export const portfolioSchema = z.object({
  _id:      z.string().optional(),
  name:     z.string().max(100).optional().or(z.literal('')),
  username: z.string().min(3).max(30).optional(),
  slug:     z.string().min(2).optional().or(z.literal('')),
  bio:      z.string().max(500).optional().or(z.literal('')),
  avatar:   z.string().optional().or(z.literal('')),
  template: z.string().optional(),
  templateStyles:  z.record(z.string(), z.any()).optional(),
  skills:          z.array(z.string()).optional(),
  projects: z.array(z.object({
    title:       z.string().optional(),
    description: z.string().optional(),
    github:      z.string().optional(),
    live:        z.string().optional(),
    image:       z.string().optional(),
    proficiency: z.number().min(0).max(100).optional(),
  })).optional(),
  education: z.array(z.object({
    degree:      z.string().optional(),
    institution: z.string().optional(),
    year:        z.string().optional(),
  })).optional(),
  contact: z.object({
    email:    nullableEmail,
    github:   nullableStr,
    linkedin: nullableStr,
    twitter:  nullableStr,
  }).optional(),
  customElements:  z.array(z.any()).optional(),
  canvasPositions: z.record(z.string(), z.object({ x: z.number(), y: z.number() })).optional(),
  allowedEmails:   z.array(z.string()).optional(),
  isPublic:        z.boolean().optional(),
});

export type PortfolioInput = z.infer<typeof portfolioSchema>;
