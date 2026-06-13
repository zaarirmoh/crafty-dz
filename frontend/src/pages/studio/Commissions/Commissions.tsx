import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import StatusPill from '@/components/ui/StatusPill';
import { formatDate, formatPrice } from '@/components/hoc/GlobalFunctions';
import { useMyCraftsman } from '@/hooks/useStudio';
import { useCraftsmanCommissions } from '@/hooks/useCommissions';
import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/selectors/authSelector';
import { selectLocale } from '@/redux/selectors/uiSelector';
import type { CommissionStatus } from '@/types';

export default function StudioCommissions() {
  const { t } = useTranslation('studio');
  const user = useAppSelector(selectUser);
  const locale = useAppSelector(selectLocale);
  const { craftsman } = useMyCraftsman(user?.id ?? '');
  const { commissions, loading } = useCraftsmanCommissions(craftsman?.id ?? '');
  const [overrides, setOverrides] = useState<Record<string, CommissionStatus>>({});

  const update = (id: string, status: CommissionStatus, messageKey: string) => {
    setOverrides((prev) => ({ ...prev, [id]: status }));
    toast.success(t(messageKey));
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl text-foreground">{t('commissions.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t('commissions.subtitle')}</p>
      </header>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      ) : commissions.length === 0 ? (
        <div className="rounded-2xl border border-dashed py-20 text-center text-muted-foreground">
          {t('commissions.empty')}
        </div>
      ) : (
        <ul className="space-y-4">
          {commissions.map((commission) => {
            const status = overrides[commission.id] ?? commission.status;
            return (
              <li key={commission.id} className="hover-raise rounded-xl border bg-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-display text-lg text-foreground">{commission.clientName}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{commission.message}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>{formatDate(commission.createdAt, locale)}</span>
                      {typeof commission.budget === 'number' && (
                        <span>
                          {t('commissions.budget')}: {formatPrice(commission.budget, locale)}
                        </span>
                      )}
                    </div>
                  </div>
                  <StatusPill status={status} className="shrink-0" />
                </div>

                {(status === 'requested' ||
                  status === 'accepted' ||
                  status === 'in_progress') && (
                  <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                    {status === 'requested' && (
                      <>
                        <Button
                          size="sm"
                          className="uppercase tracking-wide"
                          onClick={() =>
                            update(commission.id, 'accepted', 'commissions.accepted')
                          }
                        >
                          {t('commissions.accept')}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="uppercase tracking-wide text-destructive hover:text-destructive"
                          onClick={() =>
                            update(commission.id, 'declined', 'commissions.declined')
                          }
                        >
                          {t('commissions.decline')}
                        </Button>
                      </>
                    )}
                    {status === 'accepted' && (
                      <Button
                        size="sm"
                        className="uppercase tracking-wide"
                        onClick={() =>
                          update(commission.id, 'in_progress', 'commissions.updated')
                        }
                      >
                        {t('commissions.markInProgress')}
                      </Button>
                    )}
                    {status === 'in_progress' && (
                      <Button
                        size="sm"
                        className="uppercase tracking-wide"
                        onClick={() => update(commission.id, 'completed', 'commissions.updated')}
                      >
                        {t('commissions.markCompleted')}
                      </Button>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
