import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import type { CommissionStatus, CraftsmanStatus } from '@/types';

type Status = CommissionStatus | CraftsmanStatus;

const STYLES: Record<Status, string> = {
  requested: 'bg-badge text-badge-foreground',
  accepted: 'bg-copper/15 text-copper',
  in_progress: 'bg-copper/15 text-copper',
  completed: 'bg-primary text-primary-foreground',
  declined: 'bg-destructive/10 text-destructive',
  cancelled: 'bg-secondary text-muted-foreground',
  pending: 'bg-badge text-badge-foreground',
  approved: 'bg-primary text-primary-foreground',
  suspended: 'bg-destructive/10 text-destructive',
};

interface StatusPillProps {
  status: Status;
  className?: string;
}

/** Colored pill for commission / craftsman status. */
export default function StatusPill({ status, className }: StatusPillProps) {
  const { t } = useTranslation('common');
  return (
    <span
      className={cn(
        'inline-block rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
        STYLES[status],
        className,
      )}
    >
      {t(`status.${status}`)}
    </span>
  );
}
