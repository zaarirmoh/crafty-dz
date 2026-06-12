import type { ReactNode } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

// Main public/authenticated layout: navbar + content + footer, wrapped in an
// error boundary. Pages receive this chrome from allroutes.tsx — never recreate it.
export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <ErrorBoundary>
        <main className="flex-1">{children}</main>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}
