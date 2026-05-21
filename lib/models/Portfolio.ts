import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolio extends Document {
  userId: string; // Firebase UID (string)
  username: string;
  slug?: string;   // custom short URL e.g. "kani"
  isPublic: boolean;
  template: string;
  templateStyles?: Record<string, unknown>;
  name: string;
  bio: string;
  avatar?: string;
  skills: string[];
  canvasPositions?: Record<string, { x: number, y: number }>;
  customElements?: Array<unknown>;
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
  allowedEmails?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema(
  { title: String, description: String, github: String, live: String, proficiency: { type: Number, default: 0 } },
  { _id: false }
);

const EducationSchema = new Schema(
  { institution: String, degree: String, year: String },
  { _id: false }
);

const PortfolioSchema = new Schema<IPortfolio>(
  {
    userId:        { type: String, required: true, index: true }, // Firebase UID
    username:      { type: String, required: true, unique: true, lowercase: true },
    slug:          { type: String, sparse: true, unique: true, lowercase: true, trim: true },
    isPublic:      { type: Boolean, default: true },
    template:      { type: String, default: 'minimal' },
    templateStyles:{ type: Schema.Types.Mixed, default: {} },
    name:          { type: String, default: '' },
    bio:           { type: String, default: '' },
    avatar:        { type: String, default: null },
    skills:        { type: [String], default: [] },
    canvasPositions:{ type: Schema.Types.Mixed, default: {} },
    customElements:{ type: [Schema.Types.Mixed], default: [] },
    projects:      { type: [ProjectSchema], default: [] },
    education:     { type: [EducationSchema], default: [] },
    contact:       { email: String, linkedin: String, github: String, twitter: String },
    allowedEmails: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
