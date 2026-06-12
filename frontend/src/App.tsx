import { useEffect } from 'react';
import i18n from '@/lib/i18n';
import AppRouter from '@/routes';
import RoleSwitcher from '@/components/ui/RoleSwitcher';
import { Toaster } from '@/components/ui/sonner';
import { useAppSelector } from '@/redux/hooks';
import { selectDir, selectLocale } from '@/redux/selectors/uiSelector';

export default function App() {
  const locale = useAppSelector(selectLocale);
  const dir = useAppSelector(selectDir);

  // Keep <html lang/dir> and the i18n language in sync with the ui slice.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, [locale, dir]);

  return (
    <>
      <AppRouter />
      <Toaster position="bottom-center" />
      {import.meta.env.DEV && <RoleSwitcher />}
    </>
  );
}
