import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/components/ui/skeleton';
import Reveal from '@/components/ui/Reveal';
import JournalCard from '@/components/ui/JournalCard';
import { useJournal } from '@/hooks/useJournal';

export default function Journal() {
  const { t } = useTranslation('common');
  const { posts, loading, error } = useJournal();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="font-display text-4xl text-foreground md:text-5xl">{t('journal.title')}</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{t('journal.subtitle')}</p>
      </header>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {error ? (
          <p className="col-span-full py-20 text-center text-muted-foreground">{t('error.title')}</p>
        ) : loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[16/10] w-full rounded-xl" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          ))
        ) : posts.length === 0 ? (
          <p className="col-span-full py-20 text-center text-muted-foreground">
            {t('journal.empty')}
          </p>
        ) : (
          posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 70}>
              <JournalCard post={post} />
            </Reveal>
          ))
        )}
      </div>
    </div>
  );
}
