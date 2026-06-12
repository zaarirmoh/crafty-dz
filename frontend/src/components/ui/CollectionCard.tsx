import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import type { Collection } from '@/types';

interface CollectionCardProps {
  collection: Collection;
  className?: string;
}

export default function CollectionCard({ collection, className }: CollectionCardProps) {
  const { t } = useTranslation('common');
  return (
    <Link
      to={`/collections/${collection.slug}`}
      className={cn(
        'group block overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <div className="aspect-[16/10] overflow-hidden bg-secondary">
        <img
          src={collection.coverImage}
          alt={collection.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl text-foreground">{collection.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{collection.description}</p>
        <p className="eyebrow mt-3">
          {t('collections.artisans', { count: collection.craftsmanIds.length })}
        </p>
      </div>
    </Link>
  );
}
