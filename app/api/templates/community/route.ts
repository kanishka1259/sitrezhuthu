import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import CommunityTemplate from '@/lib/models/CommunityTemplate';
import { verifyFirebaseToken } from '@/lib/firebase-admin';

// ── P1: Admin email list — moved from hardcoded values to env var ─────────────
// Set ADMIN_EMAILS in .env.local as a comma-separated list:
//   ADMIN_EMAILS=admin@sitrezhuthu.com,other@example.com
const ADMIN_EMAILS: string[] = (
  process.env.ADMIN_EMAILS || 'admin@sitrezhuthu.com,admin@portfolio-gen.com'
)
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

function isAdmin(email?: string | null): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}

/** GET /api/templates/community
 *  - Public (?status=approved, default): returns templates WITHOUT authorEmail.
 *  - Admin (?status=pending|all): requires Firebase auth + admin role, returns full data.
 */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'approved';

    // Non-public queries require admin auth
    if (status !== 'approved') {
      try {
        const decoded = await verifyFirebaseToken(req.headers.get('authorization'));
        if (!isAdmin(decoded?.email)) {
          return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const query = status === 'all' ? {} : { status };

    // P1: Strip authorEmail from public responses to prevent email harvesting
    const projection = status === 'approved' ? '-authorEmail' : '';

    const templates = await CommunityTemplate.find(query)
      .select(projection)
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
    const {
      authorName, authorEmail, templateName, description,
      baseTemplate, templateStyles, previewData, customElements,
    } = body;

    if (!authorName || !authorEmail || !templateName) {
      return NextResponse.json(
        { error: 'authorName, authorEmail and templateName are required' },
        { status: 400 }
      );
    }

    // Basic email format check on submission
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(authorEmail)) {
      return NextResponse.json({ error: 'Invalid authorEmail format' }, { status: 400 });
    }

    const doc = await CommunityTemplate.create({
      authorName:     String(authorName).slice(0, 100),
      authorEmail:    String(authorEmail).toLowerCase().slice(0, 200),
      templateName:   String(templateName).slice(0, 100),
      description:    description ? String(description).slice(0, 500) : '',
      baseTemplate:   baseTemplate || 'minimal',
      templateStyles: templateStyles  || {},
      customElements: customElements  || [],
      previewData:    previewData     || {},
      status: 'pending',
      votes: 0,
    });

    return NextResponse.json({ success: true, id: doc._id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to submit template' }, { status: 500 });
  }
}

/** PATCH /api/templates/community — upvote, view increment, or admin-approve */
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, action } = body;

    if (!id || !action) {
      return NextResponse.json({ error: 'id and action are required' }, { status: 400 });
    }

    await dbConnect();
    const doc = await CommunityTemplate.findById(id);
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // view is unauthenticated (passive tracking)
    if (action === 'view') {
      doc.views = (doc.views || 0) + 1;
      await doc.save();
      return NextResponse.json({ success: true, views: doc.views });
    }

    // All other actions require a valid Firebase token
    let decoded;
    try {
      decoded = await verifyFirebaseToken(req.headers.get('authorization'));
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (action === 'vote') {
      doc.votes = (doc.votes || 0) + 1;
    } else if (action === 'unvote') {
      doc.votes = Math.max(0, (doc.votes || 0) - 1);
    } else if (action === 'approve' || action === 'reject') {
      if (!isAdmin(decoded?.email)) {
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
