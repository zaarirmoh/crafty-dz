import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/components/hoc/GlobalFunctions';
import { useJournalPost } from '@/hooks/useJournal';
import { useAppSelector } from '@/redux/hooks';
import { selectLocale } from '@/redux/selectors/uiSelector';

export default function JournalPost() {
  const { slug = '' } = useParams();
  const { t } = useTranslation('common');
  const locale = useAppSelector(selectLocale);
  const { post, loading, notFound } = useJournalPost(slug);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-6 py-12">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-foreground">{t('journal.notFound')}</h1>
        <Button asChild variant="outline" className="mt-6 uppercase tracking-wide">
          <Link to="/journal">{t('journal.back')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link
        to="/journal"
        className="eyebrow inline-flex items-center gap-1 transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5 rtl:rotate-180" />
        {t('journal.back')}
      </Link>
      <h1 className="mt-6 text-balance font-display text-4xl leading-tight text-foreground md:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        {t('journal.by', { author: post.author })} · {formatDate(post.publishedAt, locale)}
      </p>
      <div className="mt-8 aspect-[16/9] overflow-hidden rounded-2xl border bg-secondary">
        <img src={post.coverImage} alt={post.title} className="size-full object-cover" />
      </div>
      <div className="mt-8 space-y-5">
        {post.body.split('\n\n').map((paragraph, i) => (
          <p key={i} className="font-display text-lg leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
