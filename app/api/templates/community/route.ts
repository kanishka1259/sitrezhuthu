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

/** PATCH /api/templates/community — upvote or admin-approve */
export async function PATCH(req: NextRequest) {
  try {
    const decoded = await verifyFirebaseToken(req.headers.get('authorization'));
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const { id, action } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const doc = await CommunityTemplate.findById(id);
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    if (action === 'vote') {
      doc.votes += 1;
    } else if (action === 'approve') {
      doc.status = 'approved';
    } else if (action === 'reject') {
      doc.status = 'rejected';
    }

    await doc.save();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update template' }, { status: 500 });
  }
}
