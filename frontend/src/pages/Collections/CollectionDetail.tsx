import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Reveal from '@/components/ui/Reveal';
import CraftsmanCard from '@/components/ui/CraftsmanCard';
import { useCollection } from '@/hooks/useCollections';
import { useTaxonomy } from '@/hooks/useTaxonomy';

export default function CollectionDetail() {
  const { slug = '' } = useParams();
  const { t } = useTranslation('common');
  const { data, loading, notFound } = useCollection(slug);
  const { categoryName, regionName } = useTaxonomy();

  if (loading) {
    return (
      <div>
        <Skeleton className="h-56 w-full rounded-none md:h-72" />
        <div className="page-x py-10">
          <Skeleton className="h-4 w-40" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-foreground">{t('collections.notFound')}</h1>
        <Button asChild variant="outline" className="mt-6 uppercase tracking-wide">
          <Link to="/collections">{t('collections.back')}</Link>
        </Button>
      </div>
    );
  }

  const { collection, craftsmen } = data;

  return (
    <div>
      <div className="relative h-56 overflow-hidden bg-secondary md:h-72">
        <img
          src={collection.coverImage}
          alt={collection.title}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="page-x pb-6">
            <h1 className="font-display text-4xl text-white md:text-5xl">{collection.title}</h1>
          </div>
        </div>
      </div>

      <div className="page-x py-10">
        <Link
          to="/collections"
          className="eyebrow inline-flex items-center gap-1 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 rtl:rotate-180" />
          {t('collections.back')}
        </Link>
        <p className="mt-4 max-w-2xl font-display text-lg leading-relaxed text-muted-foreground">
          {collection.description}
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {craftsmen.map((craftsman, i) => (
            <Reveal key={craftsman.id} delay={i * 60}>
              <CraftsmanCard
                craftsman={craftsman}
                categoryNameKey={categoryName(craftsman.categoryId)}
                regionNameKey={regionName(craftsman.regionId)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
