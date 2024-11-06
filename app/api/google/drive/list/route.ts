import { getGoogleServices } from '@/lib/google-services';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const services = await getGoogleServices();
    if (!services?.drive) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const response = await services.drive.files.list({
      pageSize: 10,
      fields: 'files(id, name, mimeType, modifiedTime, webViewLink)',
      orderBy: 'modifiedTime desc',
    });

    return NextResponse.json(response.data.files);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
  }
}