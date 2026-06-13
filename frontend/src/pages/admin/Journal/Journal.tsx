import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/components/hoc/GlobalFunctions';
import { useJournal } from '@/hooks/useJournal';
import { useAppSelector } from '@/redux/hooks';
import { selectLocale } from '@/redux/selectors/uiSelector';

export default function AdminJournal() {
  const { t } = useTranslation('admin');
  const locale = useAppSelector(selectLocale);
  const { posts, loading } = useJournal();
  const [removed, setRemoved] = useState<Record<string, true>>({});

  const visible = posts.filter((p) => !removed[p.id]);

  return (
    <div className="space-y-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-foreground">{t('journal.title')}</h1>
          <p className="mt-2 text-muted-foreground">{t('journal.subtitle')}</p>
        </div>
        <Button
          className="shrink-0 gap-2 uppercase tracking-wide"
          onClick={() => toast(t('journal.newToast'))}
        >
          <Plus className="size-4" />
          {t('journal.new')}
        </Button>
      </header>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((post) => (
            <li
              key={post.id}
              className="hover-raise flex items-center gap-4 rounded-xl border bg-card p-4"
            >
              <img
                src={post.coverImage}
                alt={post.title}
                loading="lazy"
                className="size-16 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-lg text-foreground">{post.title}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {t('journal.by', { author: post.author })} · {formatDate(post.publishedAt, locale)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0 text-destructive hover:text-destructive"
                onClick={() => {
                  setRemoved((prev) => ({ ...prev, [post.id]: true }));
                  toast.success(t('journal.deleted'));
                }}
              >
                {t('journal.delete')}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
