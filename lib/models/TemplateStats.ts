import mongoose, { Schema, Document } from 'mongoose';

export interface ITemplateStats extends Document {
  templateId: string;
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const TemplateStatsSchema = new Schema<ITemplateStats>({
  templateId: { type: String, required: true, unique: true, index: true },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.TemplateStats ||
  mongoose.model<ITemplateStats>('TemplateStats', TemplateStatsSchema);
