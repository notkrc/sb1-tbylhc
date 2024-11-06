import { Header } from '@/components/header';
import { Navigation } from '@/components/navigation';
import { MainContent } from '@/components/main-content';
import { Suspense } from 'react';
import Loading from './loading';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<Loading />}>
        <main className="container mx-auto p-4">
          <MainContent />
          <Navigation />
        </main>
      </Suspense>
    </div>
  );
}