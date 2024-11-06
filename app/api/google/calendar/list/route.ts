import { getGoogleServices } from '@/lib/google-services';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const services = await getGoogleServices();
    if (!services?.calendar) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const response = await services.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return NextResponse.json(response.data.items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}