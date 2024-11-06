'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Calendar, Mail, FolderOpen, AlertCircle, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/components/rich-text-editor'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
});

export function WorkspaceSection() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState<{ id: number; content: string; timestamp: Date }[]>([]);
  const [currentNote, setCurrentNote] = useState('');

  const saveNote = () => {
    if (currentNote.trim()) {
      setNotes([
        ...notes,
        { id: Date.now(), content: currentNote, timestamp: new Date() },
      ]);
      setCurrentNote('');
    }
  };

  const IntegrationAlert = () => (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>Sign in with Google to access this feature.</span>
        <Button onClick={() => signIn('google')} variant="outline" size="sm">
          <LogIn className="mr-2 h-4 w-4" />
          Sign In
        </Button>
      </AlertDescription>
    </Alert>
  );

  const renderContent = (type: 'drive' | 'calendar' | 'emails') => {
    if (!session) {
      return <IntegrationAlert />;
    }

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {type === 'drive' && (
          <>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">Recent Files</h3>
              <p className="text-sm text-muted-foreground">Loading your recent files...</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">Shared with Me</h3>
              <p className="text-sm text-muted-foreground">Loading shared files...</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">Quick Upload</h3>
              <p className="text-sm text-muted-foreground">Drop files here to upload</p>
            </div>
          </>
        )}

        {type === 'calendar' && (
          <div className="col-span-full rounded-lg border p-4">
            <h3 className="font-medium">Upcoming Events</h3>
            <p className="text-sm text-muted-foreground">Loading your calendar events...</p>
          </div>
        )}

        {type === 'emails' && (
          <div className="col-span-full rounded-lg border p-4">
            <h3 className="font-medium">Recent Emails</h3>
            <p className="text-sm text-muted-foreground">Loading your recent emails...</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="notepad">
          <TabsList>
            <TabsTrigger value="notepad" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Rich Notes
            </TabsTrigger>
            <TabsTrigger value="drive" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Drive
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="emails" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Emails
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notepad" className="space-y-4">
            <RichTextEditor
              value={currentNote}
              onChange={setCurrentNote}
            />
            <Button onClick={saveNote}>Save Note</Button>
            <ScrollArea className="h-[300px]">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="mb-4 rounded-lg border p-4"
                >
                  <div dangerouslySetInnerHTML={{ __html: note.content }} />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {note.timestamp.toLocaleString()}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="drive">
            <div className="space-y-4">
              {renderContent('drive')}
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <div className="space-y-4">
              {renderContent('calendar')}
            </div>
          </TabsContent>

          <TabsContent value="emails">
            <div className="space-y-4">
              {renderContent('emails')}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}