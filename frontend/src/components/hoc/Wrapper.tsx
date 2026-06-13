import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

// Main public/authenticated layout: navbar + content + footer, wrapped in an
// error boundary. Pages receive this chrome from allroutes.tsx — never recreate it.
export default function Wrapper({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <ErrorBoundary>
        {/* Keyed on the path so each page gently fades in on navigation. */}
        <main key={location.pathname} className="flex-1 animate-in fade-in duration-500">
          {children}
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}
