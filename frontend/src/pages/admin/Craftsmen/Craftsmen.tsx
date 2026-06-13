import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import StatusPill from '@/components/ui/StatusPill';
import { useAllCraftsmen } from '@/hooks/useAdmin';
import type { Craftsman, CraftsmanStatus } from '@/types';

export default function AdminCraftsmen() {
  const { t } = useTranslation('admin');
  const { craftsmen, loading } = useAllCraftsmen();
  const [overrides, setOverrides] = useState<Record<string, CraftsmanStatus>>({});
  const [removed, setRemoved] = useState<Record<string, true>>({});

  const setStatus = (craftsman: Craftsman, status: CraftsmanStatus, messageKey: string) => {
    setOverrides((prev) => ({ ...prev, [craftsman.id]: status }));
    toast.success(t(messageKey, { name: craftsman.displayName }));
  };
  const reject = (craftsman: Craftsman) => {
    setRemoved((prev) => ({ ...prev, [craftsman.id]: true }));
    toast.success(t('craftsmen.rejected', { name: craftsman.displayName }));
  };

  const visible = craftsmen.filter((c) => !removed[c.id]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl text-foreground">{t('craftsmen.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t('craftsmen.subtitle')}</p>
      </header>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((craftsman) => {
            const status = overrides[craftsman.id] ?? craftsman.status;
            return (
              <li
                key={craftsman.id}
                className="hover-raise flex flex-wrap items-center gap-4 rounded-xl border bg-card p-4"
              >
                <img
                  src={craftsman.coverImage}
                  alt={craftsman.displayName}
                  loading="lazy"
                  className="size-14 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-lg text-foreground">
                    {craftsman.displayName}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">{craftsman.specialty}</p>
                </div>
                <StatusPill status={status} className="shrink-0" />
                <div className="flex shrink-0 gap-2">
                  {status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        className="uppercase tracking-wide"
                        onClick={() => setStatus(craftsman, 'approved', 'craftsmen.approved')}
                      >
                        {t('craftsmen.approve')}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="uppercase tracking-wide text-destructive hover:text-destructive"
                        onClick={() => reject(craftsman)}
                      >
                        {t('craftsmen.reject')}
                      </Button>
                    </>
                  )}
                  {status === 'approved' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="uppercase tracking-wide text-destructive hover:text-destructive"
                      onClick={() => setStatus(craftsman, 'suspended', 'craftsmen.suspended')}
                    >
                      {t('craftsmen.suspend')}
                    </Button>
                  )}
                  {status === 'suspended' && (
                    <Button
                      size="sm"
                      className="uppercase tracking-wide"
                      onClick={() => setStatus(craftsman, 'approved', 'craftsmen.reinstated')}
                    >
                      {t('craftsmen.reinstate')}
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
