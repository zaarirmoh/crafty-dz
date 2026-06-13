import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import DashboardNav from '@/components/ui/DashboardNav';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAppSelector } from '@/redux/hooks';
import { selectRole } from '@/redux/selectors/authSelector';
import { selectDir } from '@/redux/selectors/uiSelector';

// Sidebar + topbar shell for the back-office areas. The sidebar renders a
// role-appropriate nav (craftsman → Studio, admin → Admin); on mobile it
// collapses into a slide-in sheet.
export default function DashboardWrapper({ children }: { children: ReactNode }) {
  const role = useAppSelector(selectRole);
  const dir = useAppSelector(selectDir);
  const { t } = useTranslation('common');
  const [navOpen, setNavOpen] = useState(false);
  const areaLabel = role === 'admin' ? t('nav.admin') : t('nav.studio');

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-3 border-b px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Sheet open={navOpen} onOpenChange={setNavOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label={areaLabel}>
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={dir === 'rtl' ? 'right' : 'left'} className="w-72 p-0">
                <SheetTitle className="sr-only">{areaLabel}</SheetTitle>
                <DashboardNav onNavigate={() => setNavOpen(false)} />
              </SheetContent>
            </Sheet>
            <span className="eyebrow">{areaLabel}</span>
          </div>
          <LanguageSwitcher />
        </header>
        <ErrorBoundary>
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </ErrorBoundary>
      </div>
    </div>
  );
}
