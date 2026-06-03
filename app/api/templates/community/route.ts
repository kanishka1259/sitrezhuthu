import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import CommunityTemplate from '@/lib/models/CommunityTemplate';

import { verifyFirebaseToken } from '@/lib/firebase-admin';

/** GET /api/templates/community — list templates (admin can pass ?status=all or ?status=pending) */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'approved';

    if (status !== 'approved') {
      try {
        const decoded = await verifyFirebaseToken(req.headers.get('authorization'));
        const email = decoded?.email?.toLowerCase();
        if (!email || !ADMIN_EMAILS.includes(email)) {
          return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: 'Unauthorized or Forbidden' }, { status: 401 });
      }
    }

    const query = status === 'all' ? {} : { status };
    const templates = await CommunityTemplate.find(query)
      .sort({ votes: -1, createdAt: -1 })
      .lean();
    return NextResponse.json(templates);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}

/** POST /api/templates/community — submit a new community template */
export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyFirebaseToken(req.headers.get('authorization'));
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const body = await req.json();
    const { authorName, authorEmail, templateName, description, baseTemplate, templateStyles, previewData, customElements } = body;

    if (!authorName || !authorEmail || !templateName) {
      return NextResponse.json({ error: 'authorName, authorEmail and templateName are required' }, { status: 400 });
    }

    const doc = await CommunityTemplate.create({
      authorName, authorEmail, templateName, description,
      baseTemplate: baseTemplate || 'minimal',
      templateStyles: templateStyles || {},
      customElements: customElements || [],
      previewData: previewData || {},
      status: 'pending',
      votes: 0,
    });

    return NextResponse.json({ success: true, id: doc._id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to submit template' }, { status: 500 });
  }
}

const ADMIN_EMAILS = ([
  'kanishka1259@gmail.com',
  'kanishkaa1302@gmail.com',
  'admin@sitrezhuthu.com',
  'admin@portfolio-gen.com',
  process.env.ADMIN_EMAIL,
].filter(Boolean) as string[]).map(e => e.toLowerCase());

/** PATCH /api/templates/community — upvote, view increment, or admin-approve */
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, action } = body;
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    await dbConnect();
    const doc = await CommunityTemplate.findById(id);
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    if (action === 'view') {
      doc.views = (doc.views || 0) + 1;
      await doc.save();
      return NextResponse.json({ success: true, views: doc.views });
    }

    // Other actions (vote, approve, reject) require verification
    const decoded = await verifyFirebaseToken(req.headers.get('authorization'));
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (action === 'vote') {
      doc.votes = (doc.votes || 0) + 1;
    } else if (action === 'unvote') {
      doc.votes = Math.max(0, (doc.votes || 0) - 1);
    } else if (action === 'approve' || action === 'reject') {
      const email = decoded.email?.toLowerCase();
      if (!email || !ADMIN_EMAILS.includes(email)) {
        return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
      }
      doc.status = action === 'approve' ? 'approved' : 'rejected';
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    await doc.save();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update template' }, { status: 500 });
  }
}
