'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileText, BookOpen, ClipboardList } from 'lucide-react';

const mockMaterials = {
  announcements: [
    { id: 1, title: 'Midterm Exam Schedule', date: '2024-03-20' },
    { id: 2, title: 'Project Submission Guidelines', date: '2024-03-18' },
  ],
  pdfs: [
    { id: 1, name: 'Mathematics Chapter 5', subject: 'Mathematics' },
    { id: 2, name: 'Physics Lab Manual', subject: 'Physics' },
  ],
  assignments: [
    { id: 1, title: 'Math Problem Set 3', subject: 'Mathematics', due: '2024-03-25' },
    { id: 2, title: 'Physics Lab Report', subject: 'Physics', due: '2024-03-22' },
  ],
};

export function MaterialsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Materials</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="announcements">
          <TabsList>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="pdfs">Subject PDFs</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>

          <TabsContent value="announcements">
            <div className="space-y-4">
              {mockMaterials.announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="flex items-start space-x-4 rounded-lg border p-4"
                >
                  <FileText className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">{announcement.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Posted on: {announcement.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pdfs">
            <div className="space-y-4">
              {mockMaterials.pdfs.map((pdf) => (
                <div
                  key={pdf.id}
                  className="flex items-start space-x-4 rounded-lg border p-4"
                >
                  <BookOpen className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">{pdf.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Subject: {pdf.subject}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments">
            <div className="space-y-4">
              {mockMaterials.assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-start space-x-4 rounded-lg border p-4"
                >
                  <ClipboardList className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">{assignment.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Subject: {assignment.subject}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Due: {assignment.due}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}