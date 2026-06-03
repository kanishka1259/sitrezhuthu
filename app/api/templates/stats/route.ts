import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import TemplateStats from '@/lib/models/TemplateStats';

/** GET /api/templates/stats — retrieve likes/views for official templates */
export async function GET() {
  try {
    await dbConnect();
    const stats = await TemplateStats.find({}).lean();
    return NextResponse.json(stats);
  } catch (err) {
    console.error('Failed to fetch template stats:', err);
    return NextResponse.json({ error: 'Failed to fetch template stats' }, { status: 500 });
  }
}

/** PATCH /api/templates/stats — increment like or view count of an official template */
export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, action } = body;

    if (!id || !['like', 'unlike', 'view'].includes(action)) {
      return NextResponse.json({ error: 'id and valid action ("like" | "unlike" | "view") are required' }, { status: 400 });
    }

    const field = action === 'view' ? 'views' : 'likes';
    const incVal = action === 'unlike' ? -1 : 1;

    const doc = await TemplateStats.findOneAndUpdate(
      { templateId: id },
      { $inc: { [field]: incVal } },
      { new: true, upsert: true }
    );


    return NextResponse.json({ success: true, likes: doc.likes, views: doc.views });
  } catch (err) {
    console.error('Failed to update template stats:', err);
    return NextResponse.json({ error: 'Failed to update template stats' }, { status: 500 });
  }
}
