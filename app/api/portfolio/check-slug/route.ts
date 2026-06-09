import { NextRequest, NextResponse } from 'next/server';
import { dbConnect }  from '@/lib/db';
import Portfolio      from '@/lib/models/Portfolio';
import { verifyFirebaseToken } from '@/lib/firebase-admin';

/** GET /api/portfolio/check-slug?slug=kani */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const uid  = await verifyFirebaseToken(req.headers.get('authorization')).then(d => d.uid);
    const slug = req.nextUrl.searchParams.get('slug')?.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });
    if (slug.length < 2) return NextResponse.json({ available: false, reason: 'Too short (min 2 chars)' });
    const existing = await Portfolio.findOne({ slug, userId: { $ne: uid } }).lean();
    return NextResponse.json({ available: !existing, slug });
  } catch (err: unknown) {
    const error = err as Error;
    const status = error.message?.includes('Authorization') || error.message?.includes('Missing') ? 401 : 500;
    return NextResponse.json({ error: error.message || 'Failed to check slug' }, { status });
  }
}
