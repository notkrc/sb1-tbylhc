'use client';

import { AbsenceReport } from '@/components/sections/absence-report';
import { useAppStore } from '@/lib/store';

export function MainContent() {
  const isTeacherMode = useAppStore((state) => state.isTeacherMode);

  return (
    <>
      {isTeacherMode && <AbsenceReport />}
    </>
  );
}