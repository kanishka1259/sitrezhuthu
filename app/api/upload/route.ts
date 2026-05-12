import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken }       from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    // Verify the user is authenticated
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await verifyFirebaseToken(authHeader);

    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Since we are storing directly as Base64 in the database to keep it 100% free,
    // we restrict the file size to 1MB to prevent slowing down the database.
    if (file.size > 1 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 1 MB for free storage)' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    // Convert the image file directly to a Base64 string
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = buffer.toString('base64');
    
    // Construct the data URL which can be used directly in <img src="..." />
    const dataUrl = `data:${file.type};base64,${base64String}`;

    // Return the data URL. The frontend will save this string into MongoDB.
    return NextResponse.json({ url: dataUrl });
    
  } catch (err: any) {
    console.error('Upload Error:', err);
    const status = err.message?.includes('Authorization') ? 401 : 500;
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status });
  }
}
