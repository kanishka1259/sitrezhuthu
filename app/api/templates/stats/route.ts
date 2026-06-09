import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import TemplateStats from '@/lib/models/TemplateStats';
import { verifyFirebaseToken } from '@/lib/firebase-admin';

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
      return NextResponse.json(
        { error: 'id and valid action ("like" | "unlike" | "view") are required' },
        { status: 400 }
      );
    }

    // like / unlike require an authenticated user to prevent stat-inflation attacks.
    // view is intentionally unauthenticated (passive engagement tracking).
    if (action !== 'view') {
      try {
        await verifyFirebaseToken(req.headers.get('authorization'));
      } catch {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    let doc;
    if (action === 'unlike') {
      // Floor likes at 0 — only decrement when likes > 0
      doc = await TemplateStats.findOneAndUpdate(
        { templateId: id, likes: { $gt: 0 } },
        { $inc: { likes: -1 } },
        { new: true }
      );
      // If no document matched (likes already 0 or doc doesn't exist), return current state
      if (!doc) {
        doc = await TemplateStats.findOneAndUpdate(
          { templateId: id },
          {},
          { new: true, upsert: true }
        );
      }
    } else {
      const field = action === 'view' ? 'views' : 'likes';
      doc = await TemplateStats.findOneAndUpdate(
        { templateId: id },
        { $inc: { [field]: 1 } },
        { new: true, upsert: true }
      );
    }

    return NextResponse.json({ success: true, likes: doc?.likes ?? 0, views: doc?.views ?? 0 });
  } catch (err) {
    console.error('Failed to update template stats:', err);
    return NextResponse.json({ error: 'Failed to update template stats' }, { status: 500 });
  }
}
