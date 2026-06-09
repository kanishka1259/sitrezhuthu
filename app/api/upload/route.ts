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

    // Base64 encoding inflates file size by ~33%. With avatar + project images
    // all stored inline in a single MongoDB document (16 MB hard limit), we cap
    // each upload at 500 KB to leave headroom for portfolio data.
    const MAX_FILE_BYTES = 500 * 1024; // 500 KB
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: 'File too large (max 500 KB for inline storage)' }, { status: 400 });
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
    
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Upload Error:', error);
    const status = error.message?.includes('Authorization') ? 401 : 500;
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status });
  }
}
