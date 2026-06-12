import type { ReactNode } from 'react';
import Navbar from '@/components/ui/Navbar';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

// Minimal layout: navbar only, no footer. Used for auth pages and full-bleed flows.
export default function WrapperByHeaderOnly({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <ErrorBoundary>
        <main className="flex-1">{children}</main>
      </ErrorBoundary>
    </div>
  );
}
