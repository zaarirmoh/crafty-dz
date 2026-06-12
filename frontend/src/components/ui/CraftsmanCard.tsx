import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import CategoryBadge from '@/components/ui/CategoryBadge';
import RatingChip from '@/components/ui/RatingChip';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/components/hoc/GlobalFunctions';
import { useAppSelector } from '@/redux/hooks';
import { selectLocale } from '@/redux/selectors/uiSelector';
import type { Craftsman } from '@/types';

interface CraftsmanCardProps {
  craftsman: Craftsman;
  /** i18n nameKeys resolved by the parent (which holds the taxonomy). */
  categoryNameKey?: string;
  regionNameKey?: string;
  className?: string;
}

function CraftsmanCardComponent({
  craftsman,
  categoryNameKey,
  regionNameKey,
  className,
}: CraftsmanCardProps) {
  const { t } = useTranslation('common');
  const locale = useAppSelector(selectLocale);

  return (
    <Link
      to={`/craftsmen/${craftsman.slug}`}
      className={cn(
        'group block overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={craftsman.coverImage}
          alt={craftsman.displayName}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {categoryNameKey && (
          <CategoryBadge nameKey={categoryNameKey} className="absolute start-3 top-3 shadow-sm" />
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg leading-tight text-foreground">
              {craftsman.displayName}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{craftsman.specialty}</p>
          </div>
          <RatingChip rating={craftsman.rating} className="shrink-0" />
        </div>
        {regionNameKey && (
          <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3" />
            {t(regionNameKey)}
          </p>
        )}
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{craftsman.bio}</p>
        <p className="mt-4 text-sm font-semibold text-foreground">
          {t('priceFrom', { price: formatPrice(craftsman.commissionFrom, locale) })}
        </p>
      </div>
    </Link>
  );
}

// Memoized — appears in grids and re-renders often with stable props (Section 20).
const CraftsmanCard = memo(CraftsmanCardComponent);
export default CraftsmanCard;
