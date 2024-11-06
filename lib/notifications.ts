import { requestNotificationPermission } from './firebase';
import { addHours, addDays, isWithinInterval } from 'date-fns';

export interface NotificationSchedule {
  type: 'absence' | 'class-reminder' | 'deadline';
  title: string;
  body: string;
  timestamp: Date;
  data?: Record<string, string>;
}

export async function scheduleNotification(notification: NotificationSchedule) {
  const token = await requestNotificationPermission();
  if (!token) return;

  // Send to your backend to schedule the notification
  await fetch('/api/notifications/schedule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
      notification,
    }),
  });
}

export function scheduleClassReminders(classTime: Date) {
  const reminders = [
    { hours: 24, title: '24 Hour Class Reminder' },
    { hours: 1, title: '1 Hour Class Reminder' },
  ];

  reminders.forEach(({ hours, title }) => {
    const reminderTime = addHours(classTime, -hours);
    if (isWithinInterval(reminderTime, { start: new Date(), end: classTime })) {
      scheduleNotification({
        type: 'class-reminder',
        title,
        body: `Your class starts in ${hours} hour${hours > 1 ? 's' : ''}`,
        timestamp: reminderTime,
        data: {
          url: '/timetable',
        },
      });
    }
  });
}

export function scheduleDeadlineReminder(deadline: Date, title: string) {
  const reminderDate = addDays(deadline, -1);
  scheduleNotification({
    type: 'deadline',
    title: 'Deadline Reminder',
    body: `${title} is due tomorrow`,
    timestamp: reminderDate,
    data: {
      url: '/tasks',
    },
  });
}

export function sendAbsenceNotification(teacherName: string, className: string) {
  scheduleNotification({
    type: 'absence',
    title: 'Teacher Absence Notification',
    body: `${teacherName} will be absent for ${className}`,
    timestamp: new Date(),
    data: {
      url: '/notifications',
    },
  });
}