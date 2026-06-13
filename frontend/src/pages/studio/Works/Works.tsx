import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/components/hoc/GlobalFunctions';
import { useMyCraftsman, useMyWorks } from '@/hooks/useStudio';
import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/selectors/authSelector';
import { selectLocale } from '@/redux/selectors/uiSelector';

export default function StudioWorks() {
  const { t } = useTranslation('studio');
  const user = useAppSelector(selectUser);
  const locale = useAppSelector(selectLocale);
  const { craftsman } = useMyCraftsman(user?.id ?? '');
  const { works, loading } = useMyWorks(craftsman?.id ?? '');
  const [removed, setRemoved] = useState<Record<string, true>>({});

  const visible = works.filter((w) => !removed[w.id]);

  return (
    <div className="space-y-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-foreground">{t('works.title')}</h1>
          <p className="mt-2 text-muted-foreground">{t('works.subtitle')}</p>
        </div>
        <Button asChild className="shrink-0 gap-2 uppercase tracking-wide">
          <Link to="/studio/works/new">
            <Plus className="size-4" />
            {t('works.new')}
          </Link>
        </Button>
      </header>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed py-20 text-center text-muted-foreground">
          {t('works.empty')}
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((work) => (
            <li
              key={work.id}
              className="hover-raise flex items-center gap-4 rounded-xl border bg-card p-4"
            >
              <img
                src={work.images[0]}
                alt={work.title}
                loading="lazy"
                className="size-16 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-lg text-foreground">{work.title}</p>
                {typeof work.price === 'number' && (
                  <p className="text-sm text-muted-foreground">{formatPrice(work.price, locale)}</p>
                )}
              </div>
              <span
                className={cn(
                  'rounded-full px-2.5 py-0.5 text-xs font-medium',
                  work.status === 'published'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground',
                )}
              >
                {t(`works.${work.status}`)}
              </span>
              <Button asChild variant="ghost" size="sm">
                <Link to={`/studio/works/${work.id}/edit`}>{t('works.edit')}</Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => {
                  setRemoved((prev) => ({ ...prev, [work.id]: true }));
                  toast.success(t('works.deleted'));
                }}
              >
                {t('works.delete')}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
