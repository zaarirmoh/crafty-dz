import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Hammer, Inbox, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import StatCard from '@/components/ui/StatCard';
import StatusPill from '@/components/ui/StatusPill';
import { formatDate, ratingLabel } from '@/components/hoc/GlobalFunctions';
import { useMyCraftsman, useMyWorks } from '@/hooks/useStudio';
import { useCraftsmanCommissions } from '@/hooks/useCommissions';
import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/selectors/authSelector';
import { selectLocale } from '@/redux/selectors/uiSelector';

export default function StudioOverview() {
  const { t } = useTranslation('studio');
  const user = useAppSelector(selectUser);
  const locale = useAppSelector(selectLocale);
  const { craftsman, loading } = useMyCraftsman(user?.id ?? '');
  const { works } = useMyWorks(craftsman?.id ?? '');
  const { commissions } = useCraftsmanCommissions(craftsman?.id ?? '');

  if (loading || !craftsman) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-72" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const published = works.filter((w) => w.status === 'published').length;
  const pending = commissions.filter((c) => c.status === 'requested').length;

  const filled = [
    craftsman.displayName,
    craftsman.specialty,
    craftsman.bio,
    craftsman.coverImage,
    craftsman.regionId,
    craftsman.categoryId,
    craftsman.commissionFrom > 0 ? 'x' : '',
    craftsman.gallery.length > 0 ? 'x' : '',
  ].filter(Boolean).length;
  const completeness = Math.round((filled / 8) * 100);

  const recent = commissions.slice(0, 4);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl text-foreground">
          {t('welcome', { name: craftsman.displayName })}
        </h1>
        <p className="mt-2 text-muted-foreground">{t('subtitle')}</p>
      </header>

      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-center justify-between">
          <p className="eyebrow">{t('completeness')}</p>
          <span className="font-display text-lg text-foreground">{completeness}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-copper transition-all duration-500"
            style={{ width: `${completeness}%` }}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={t('stats.works')} value={works.length} icon={Hammer} />
        <StatCard label={t('stats.published')} value={published} icon={CheckCircle2} />
        <StatCard label={t('stats.pending')} value={pending} icon={Inbox} />
        <StatCard label={t('stats.rating')} value={ratingLabel(craftsman.rating)} icon={Star} />
      </div>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-foreground">{t('recentRequests')}</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/studio/commissions">{t('viewAll')}</Link>
          </Button>
        </div>
        {recent.length === 0 ? (
          <p className="mt-4 text-muted-foreground">{t('noRequests')}</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {recent.map((commission) => (
              <li
                key={commission.id}
                className="hover-raise flex items-center justify-between gap-4 rounded-xl border bg-card p-4"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{commission.clientName}</p>
                  <p className="truncate text-sm text-muted-foreground">{commission.message}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden text-xs text-muted-foreground sm:inline">
                    {formatDate(commission.createdAt, locale)}
                  </span>
                  <StatusPill status={commission.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
