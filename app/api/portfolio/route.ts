import { dbConnect }           from '@/lib/db';
import Portfolio               from '@/lib/models/Portfolio';
import { verifyFirebaseToken } from '@/lib/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';
import { portfolioSchema } from '@/lib/validations';

const serialize = (obj: unknown) => JSON.parse(JSON.stringify(obj));

async function getUserId(req: NextRequest): Promise<string> {
  const token = await verifyFirebaseToken(req.headers.get('authorization'));
  return token.uid;
}

/* ── GET /api/portfolio ─────────────────────────────────────── */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const uid = await getUserId(req);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const portfolio = await Portfolio.findOne({ _id: id, userId: uid }).lean();
      if (!portfolio) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(serialize(portfolio));
    } else {
      const all = searchParams.get('all');
      if (all === 'true') {
        const portfolios = await Portfolio.find({ userId: uid }).sort({ updatedAt: -1 }).lean();
        return NextResponse.json(serialize(portfolios));
      } else {
        const portfolio = await Portfolio.findOne({ userId: uid }).sort({ updatedAt: -1 }).lean();
        return NextResponse.json(serialize(portfolio || {}));
      }
    }
  } catch (err: unknown) {
    const error = err as Error;
    const status = error.message?.includes('Authorization') ? 401 : 500;
    return NextResponse.json({ error: error.message || 'Failed to fetch portfolio(s)' }, { status });
  }
}

/* ── POST /api/portfolio ─────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const uid  = await getUserId(req);
    const body = await req.json();

    // Validate with Zod
    const validation = portfolioSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid data', details: validation.error.format() }, { status: 400 });
    }
    const data = validation.data;

    // Helper to check uniqueness
    async function checkUnique(field: string, value: string, excludeId?: string) {
      const query: Record<string, unknown> = { [field]: value };
      if (excludeId) query._id = { $ne: excludeId };
      return await Portfolio.findOne(query);
    }

    if (data.slug) {
      data.slug = data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 40);
      if (await checkUnique('slug', data.slug, data._id)) {
        return NextResponse.json({ error: 'This custom URL is already taken.' }, { status: 400 });
      }
    }

    if (data.username) {
      data.username = data.username.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      const baseUsername = data.username;
      let counter = 1;
      while (await checkUnique('username', data.username, data._id)) {
        data.username = `${baseUsername}-${counter}`;
        counter++;
      }
    }

    let portfolio;
    if (data._id) {
      portfolio = await Portfolio.findOne({ _id: data._id, userId: uid });
      if (portfolio) {
        Object.assign(portfolio, { ...data, userId: uid });
        await portfolio.save();
      } else {
        return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
      }
    } else {
      portfolio = new Portfolio({ ...data, userId: uid });
      await portfolio.save();
    }

    return NextResponse.json(serialize(portfolio));
  } catch (err: unknown) {
    const error = err as Error;
    const status = error.message?.includes('Authorization') ? 401 : 500;
    return NextResponse.json({ error: error.message || 'Failed to save portfolio' }, { status });
  }
}

/* ── DELETE /api/portfolio ───────────────────────────────────── */
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const uid = await getUserId(req);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (id) {
      await Portfolio.deleteOne({ _id: id, userId: uid });
    } else {
      await Portfolio.deleteMany({ userId: uid });
    }
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const error = err as Error;
    const status = error.message?.includes('Authorization') ? 401 : 500;
    return NextResponse.json({ error: error.message || 'Failed to delete portfolio' }, { status });
  }
}
