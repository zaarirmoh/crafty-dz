import { memo, type MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, MapPin } from 'lucide-react';
import CategoryBadge from '@/components/ui/CategoryBadge';
import RatingChip from '@/components/ui/RatingChip';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/components/hoc/GlobalFunctions';
import { useAppSelector } from '@/redux/hooks';
import { selectLocale } from '@/redux/selectors/uiSelector';
import { selectRole } from '@/redux/selectors/authSelector';
import { useFavorites } from '@/hooks/useFavorites';
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
  const role = useAppSelector(selectRole);
  const navigate = useNavigate();
  const { isFavorite, toggle } = useFavorites();

  // Favorites are client-only; guests who tap the heart go to /login
  // (build prompt Section 5.5). Craftsman/admin don't see the heart.
  const showHeart = role === null || role === 'client';
  const favorited = isFavorite(craftsman.id);

  const onHeart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (role === 'client') toggle(craftsman.id);
    else navigate('/login');
  };

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md',
        className,
      )}
    >
      <Link
        to={`/craftsmen/${craftsman.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
              <h3 className="truncate font-display text-xl leading-tight text-foreground">
                {craftsman.displayName}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{craftsman.specialty}</p>
            </div>
            <RatingChip rating={craftsman.rating} className="shrink-0" />
          </div>
          {regionNameKey && (
            <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-4" />
              {t(regionNameKey)}
            </p>
          )}
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{craftsman.bio}</p>
          <p className="mt-4 text-sm font-semibold text-foreground">
            {t('priceFrom', { price: formatPrice(craftsman.commissionFrom, locale) })}
          </p>
        </div>
      </Link>

      {showHeart && (
        <button
          type="button"
          onClick={onHeart}
          aria-label={t('account.toggleFavorite')}
          aria-pressed={favorited}
          className="absolute end-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-background/85 shadow-sm backdrop-blur transition-colors hover:bg-background"
        >
          <Heart
            className={cn(
              'size-5 transition-colors',
              favorited ? 'fill-destructive text-destructive' : 'text-muted-foreground',
            )}
          />
        </button>
      )}
    </div>
  );
}

// Memoized — appears in grids and re-renders often with stable props (Section 20).
const CraftsmanCard = memo(CraftsmanCardComponent);
export default CraftsmanCard;
