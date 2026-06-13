import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, Hammer, Inbox, Users as UsersIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import StatCard from '@/components/ui/StatCard';
import StatusPill from '@/components/ui/StatusPill';
import { useAdminStats, useAllCraftsmen } from '@/hooks/useAdmin';

export default function AdminOverview() {
  const { t } = useTranslation('admin');
  const { stats, loading } = useAdminStats();
  const { craftsmen } = useAllCraftsmen();
  const pending = craftsmen.filter((c) => c.status === 'pending');

  if (loading || !stats) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl text-foreground">{t('overview.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t('overview.subtitle')}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={t('overview.artisans')} value={stats.artisans} icon={Hammer} />
        <StatCard label={t('overview.clients')} value={stats.clients} icon={UsersIcon} />
        <StatCard label={t('overview.pending')} value={stats.pendingApprovals} icon={Clock} />
        <StatCard label={t('overview.commissions')} value={stats.commissions} icon={Inbox} />
      </div>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-foreground">{t('overview.pendingQueue')}</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/craftsmen">{t('overview.reviewAll')}</Link>
          </Button>
        </div>
        {pending.length === 0 ? (
          <p className="mt-4 text-muted-foreground">{t('overview.noPending')}</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {pending.map((craftsman) => (
              <li
                key={craftsman.id}
                className="hover-raise flex items-center justify-between gap-4 rounded-xl border bg-card p-4"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{craftsman.displayName}</p>
                  <p className="truncate text-sm text-muted-foreground">{craftsman.specialty}</p>
                </div>
                <StatusPill status={craftsman.status} className="shrink-0" />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
