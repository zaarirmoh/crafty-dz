import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { useAppSelector } from '@/redux/hooks';
import { selectRole } from '@/redux/selectors/authSelector';

// Sidebar + topbar shell for the back-office areas. The sidebar renders a
// role-appropriate nav (craftsman → Studio, admin → Admin).
export default function DashboardWrapper({ children }: { children: ReactNode }) {
  const role = useAppSelector(selectRole);
  const { t } = useTranslation('common');

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <span className="eyebrow">{role === 'admin' ? t('nav.admin') : t('nav.studio')}</span>
          <LanguageSwitcher />
        </header>
        <ErrorBoundary>
          <main className="flex-1 p-6">{children}</main>
        </ErrorBoundary>
      </div>
    </div>
  );
}
