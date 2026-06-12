import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/components/ui/skeleton';
import Reveal from '@/components/ui/Reveal';
import CollectionCard from '@/components/ui/CollectionCard';
import { useCollections } from '@/hooks/useCollections';

export default function Collections() {
  const { t } = useTranslation('common');
  const { collections, loading, error } = useCollections();

  return (
    <div className="page-x py-12">
      <header className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="font-display text-4xl text-foreground md:text-5xl">
          {t('collections.title')}
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{t('collections.subtitle')}</p>
      </header>

      <div className="mt-10 grid gap-8 md:grid-cols-3 2xl:grid-cols-4">
        {error ? (
          <p className="col-span-full py-20 text-center text-muted-foreground">{t('error.title')}</p>
        ) : loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))
        ) : collections.length === 0 ? (
          <p className="col-span-full py-20 text-center text-muted-foreground">
            {t('collections.empty')}
          </p>
        ) : (
          collections.map((collection, i) => (
            <Reveal key={collection.id} delay={i * 70}>
              <CollectionCard collection={collection} />
            </Reveal>
          ))
        )}
      </div>
    </div>
  );
}
