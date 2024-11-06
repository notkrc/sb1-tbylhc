'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/toaster';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { ErrorBoundary } from '@/components/error-boundary';

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ErrorBoundary>
      <SessionProvider refetchInterval={0}>
        <NextThemesProvider {...props} attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </NextThemesProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
}