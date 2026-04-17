import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolio extends Document {
  userId: mongoose.Types.ObjectId;
  username: string;
  template: 'minimal' | 'cards' | 'dark';
  name: string;
  bio: string;
  avatar?: string;
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
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema(
  {
    title: String,
    description: String,
    github: String,
    live: String,
    proficiency: { type: Number, default: 0 },
  },
  { _id: false }
);

const EducationSchema = new Schema(
  {
    institution: String,
    degree: String,
    year: String,
  },
  { _id: false }
);

const PortfolioSchema = new Schema<IPortfolio>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    template: {
      type: String,
      enum: ['minimal', 'cards', 'dark'],
      default: 'minimal',
    },
    name: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: null,
    },
    skills: {
      type: [String],
      default: [],
    },
    projects: {
      type: [ProjectSchema],
      default: [],
    },
    education: {
      type: [EducationSchema],
      default: [],
    },
    contact: {
      email: String,
      linkedin: String,
      github: String,
      twitter: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
