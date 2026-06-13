import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const { t } = useTranslation('common');
  return (
    <div className="page-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-7xl leading-none text-copper">404</p>
      <h1 className="mt-5 font-display text-3xl text-foreground">{t('pages.notFound')}</h1>
      <p className="mt-3 max-w-md text-muted-foreground">{t('notFound.message')}</p>
      <Button asChild className="mt-7 uppercase tracking-wide">
        <Link to="/">{t('notFound.back')}</Link>
      </Button>
    </div>
  );
}
