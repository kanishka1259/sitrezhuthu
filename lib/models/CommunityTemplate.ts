import mongoose, { Schema, Document } from 'mongoose';

export interface ICommunityTemplate extends Document {
  authorName: string;
  authorEmail: string;
  templateName: string;
  description: string;
  baseTemplate: string;
  templateStyles: Record<string, unknown>;
  customElements?: unknown[];
  previewData: Record<string, unknown>;
  status: 'pending' | 'approved' | 'rejected';
  votes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const CommunityTemplateSchema = new Schema<ICommunityTemplate>({
  authorName: { type: String, required: true },
  authorEmail: { type: String, required: true },
  templateName: { type: String, required: true },
  description: { type: String, default: '' },
  baseTemplate: { type: String, default: 'minimal' },
  templateStyles: { type: Schema.Types.Mixed, default: {} },
  customElements: { type: Schema.Types.Mixed, default: [] },
  previewData: { type: Schema.Types.Mixed, default: {} },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  votes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

// P1: Compound index — approved-templates queries sort by votes+createdAt
CommunityTemplateSchema.index({ status: 1, votes: -1, createdAt: -1 });

export default mongoose.models.CommunityTemplate ||
  mongoose.model<ICommunityTemplate>('CommunityTemplate', CommunityTemplateSchema);
