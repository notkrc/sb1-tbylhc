'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';

interface Email {
  id: string;
  snippet: string;
  subject: string;
  from: string;
  date: string;
}

export function useGoogleGmail() {
  const { data: session } = useSession();
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.accessToken) {
      fetchEmails();
    }
  }, [session]);

  const fetchEmails = async () => {
    try {
      const response = await fetch('/api/google/gmail/list');
      const data = await response.json();
      setEmails(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch emails',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return { emails, loading };
}