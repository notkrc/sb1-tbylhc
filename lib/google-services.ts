import { google } from 'googleapis';
import { getSession } from 'next-auth/react';

export async function getGoogleServices() {
  const session = await getSession();
  if (!session?.accessToken) return null;

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  auth.setCredentials({
    access_token: session.accessToken as string,
  });

  return {
    drive: google.drive({ version: 'v3', auth }),
    calendar: google.calendar({ version: 'v3', auth }),
    gmail: google.gmail({ version: 'v1', auth }),
  };
}