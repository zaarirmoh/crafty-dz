import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
  /** i18n nameKey, e.g. "categories.ceramics" */
  nameKey: string;
  className?: string;
}

/** Blush, uppercase, letter-spaced category pill. */
export default function CategoryBadge({ nameKey, className }: CategoryBadgeProps) {
  const { t } = useTranslation('common');
  return (
    <span
      className={cn(
        'inline-block rounded-full bg-badge px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wider text-badge-foreground',
        className,
      )}
    >
      {t(nameKey)}
    </span>
  );
}
