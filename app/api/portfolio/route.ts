import { dbConnect } from '@/lib/db';
import Portfolio from '@/lib/models/Portfolio';
import User from '@/lib/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const portfolio = await Portfolio.findOne({ userId }).lean();

    if (!portfolio) {
      return NextResponse.json({}, { status: 200 });
    }

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Error fetching user portfolio:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const data = await req.json();

    // Check if username is unique (if provided)
    if (data.username) {
      const existingPortfolio = await Portfolio.findOne({
        username: data.username,
        userId: { $ne: userId },
      });

      if (existingPortfolio) {
        return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
      }
    }

    let portfolio = await Portfolio.findOne({ userId });

    if (portfolio) {
      // Update existing
      Object.assign(portfolio, data);
      portfolio.updatedAt = new Date();
    } else {
      // Create new
      portfolio = new Portfolio({
        userId,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await portfolio.save();

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Error saving portfolio:', error);
    return NextResponse.json({ error: 'Failed to save portfolio' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const data = await req.json();

    let portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    Object.assign(portfolio, data);
    portfolio.updatedAt = new Date();

    await portfolio.save();

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Error updating portfolio:', error);
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;

    await Portfolio.deleteOne({ userId });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    return NextResponse.json({ error: 'Failed to delete portfolio' }, { status: 500 });
  }
}
