'use client';

import { Bell, Book, Calendar, Inbox, Layout } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { NotificationsSection } from '@/components/sections/notifications';
import { TimetableSection } from '@/components/sections/timetable';
import { WorkspaceSection } from '@/components/sections/workspace';
import { MaterialsSection } from '@/components/sections/materials';
import { TasksSection } from '@/components/sections/tasks';

export function Navigation() {
  return (
    <Tabs defaultValue="notifications" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="hidden sm:inline">Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="timetable" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Timetable</span>
        </TabsTrigger>
        <TabsTrigger value="workspace" className="flex items-center gap-2">
          <Layout className="h-4 w-4" />
          <span className="hidden sm:inline">Workspace</span>
        </TabsTrigger>
        <TabsTrigger value="materials" className="flex items-center gap-2">
          <Book className="h-4 w-4" />
          <span className="hidden sm:inline">Materials</span>
        </TabsTrigger>
        <TabsTrigger value="tasks" className="flex items-center gap-2">
          <Inbox className="h-4 w-4" />
          <span className="hidden sm:inline">Tasks</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="notifications">
        <NotificationsSection />
      </TabsContent>
      <TabsContent value="timetable">
        <TimetableSection />
      </TabsContent>
      <TabsContent value="workspace">
        <WorkspaceSection />
      </TabsContent>
      <TabsContent value="materials">
        <MaterialsSection />
      </TabsContent>
      <TabsContent value="tasks">
        <TasksSection />
      </TabsContent>
    </Tabs>
  );
}