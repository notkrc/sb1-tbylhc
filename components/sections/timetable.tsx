'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockTimetable = [
  {
    day: 'Monday',
    subjects: [
      { name: 'Mathematics', time: '09:00 - 10:30', color: 'bg-blue-100 dark:bg-blue-900' },
      { name: 'Physics', time: '11:00 - 12:30', color: 'bg-green-100 dark:bg-green-900' },
    ],
  },
  {
    day: 'Tuesday',
    subjects: [
      { name: 'Chemistry', time: '09:00 - 10:30', color: 'bg-purple-100 dark:bg-purple-900' },
      { name: 'English', time: '11:00 - 12:30', color: 'bg-yellow-100 dark:bg-yellow-900' },
    ],
  },
];

export function TimetableSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
            <div key={day} className="space-y-2">
              <h3 className="font-semibold">{day}</h3>
              {mockTimetable
                .find((t) => t.day === day)
                ?.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className={`${subject.color} rounded-lg p-2 text-sm`}
                  >
                    <div className="font-medium">{subject.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {subject.time}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}