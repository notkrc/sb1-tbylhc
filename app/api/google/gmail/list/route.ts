import { getGoogleServices } from '@/lib/google-services';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const services = await getGoogleServices();
    if (!services?.gmail) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const response = await services.gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
      q: 'in:inbox',
    });

    const emails = await Promise.all(
      response.data.messages?.map(async (message) => {
        const details = await services.gmail.users.messages.get({
          userId: 'me',
          id: message.id!,
          format: 'metadata',
          metadataHeaders: ['Subject', 'From', 'Date'],
        });

        return {
          id: details.data.id,
          snippet: details.data.snippet,
          subject: details.data.payload?.headers?.find(h => h.name === 'Subject')?.value,
          from: details.data.payload?.headers?.find(h => h.name === 'From')?.value,
          date: details.data.payload?.headers?.find(h => h.name === 'Date')?.value,
        };
      }) || []
    );

    return NextResponse.json(emails);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 });
  }
}