import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface BrandProps {
  className?: string;
}

/** Wordmark that links home, in the Fraunces display face. */
export default function Brand({ className }: BrandProps) {
  const { t } = useTranslation('common');
  return (
    <Link
      to="/"
      className={cn(
        'font-display text-xl font-semibold tracking-tight text-foreground',
        className,
      )}
    >
      {t('brand.name')}
    </Link>
  );
}
