import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAllWorks } from '@/hooks/useAdmin';

export default function AdminWorks() {
  const { t } = useTranslation('admin');
  const { t: ts } = useTranslation('studio');
  const { works, loading } = useAllWorks();
  const [removed, setRemoved] = useState<Record<string, true>>({});

  const visible = works.filter((w) => !removed[w.id]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl text-foreground">{t('works.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t('works.subtitle')}</p>
      </header>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
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
                <p className="truncate text-sm text-muted-foreground">
                  {t('works.by', { name: work.craftsmanName })}
                </p>
              </div>
              <span
                className={cn(
                  'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium',
                  work.status === 'published'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground',
                )}
              >
                {ts(`works.${work.status}`)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0 text-destructive hover:text-destructive"
                onClick={() => {
                  setRemoved((prev) => ({ ...prev, [work.id]: true }));
                  toast.success(t('works.removed'));
                }}
              >
                {t('works.remove')}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
