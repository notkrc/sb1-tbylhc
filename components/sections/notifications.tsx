'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const mockNotifications = [
  {
    id: 1,
    type: 'absence',
    title: 'Math Class Cancelled',
    message: 'Prof. Smith will be absent due to personal emergency',
    date: new Date(2024, 2, 15),
  },
  {
    id: 2,
    type: 'announcement',
    title: 'Upcoming Parent-Teacher Meeting',
    message: 'Please mark your calendars for the upcoming meeting',
    date: new Date(2024, 2, 14),
  },
];

export function NotificationsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className="mb-4 flex items-start space-x-4 rounded-lg border p-4"
            >
              {notification.type === 'absence' ? (
                <Bell className="h-5 w-5 text-yellow-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-blue-500" />
              )}
              <div className="flex-1">
                <h3 className="font-semibold">{notification.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {format(notification.date, 'PPP')}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}