import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import Reveal from '@/components/ui/Reveal';
import CategoryBadge from '@/components/ui/CategoryBadge';
import RatingChip from '@/components/ui/RatingChip';
import WorkCard from '@/components/ui/WorkCard';
import CommissionCTA from '@/components/ui/CommissionCTA';
import { cn } from '@/lib/utils';
import { formatDate, formatPrice } from '@/components/hoc/GlobalFunctions';
import { useCraftsman } from '@/hooks/useCraftsman';
import { useTaxonomy } from '@/hooks/useTaxonomy';
import { useAppSelector } from '@/redux/hooks';
import { selectLocale } from '@/redux/selectors/uiSelector';

export default function CraftsmanProfile() {
  const { slug = '' } = useParams();
  const { t } = useTranslation('common');
  const locale = useAppSelector(selectLocale);
  const { craftsman, works, reviews, loading, notFound } = useCraftsman(slug);
  const { categoryName, regionName } = useTaxonomy();

  if (loading) {
    return (
      <div>
        <Skeleton className="h-64 w-full rounded-none md:h-80" />
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative -mt-16 space-y-4 rounded-2xl border bg-card p-8 shadow-sm">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !craftsman) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-foreground">{t('profile.notFound')}</h1>
        <Button asChild variant="outline" className="mt-6 uppercase tracking-wide">
          <Link to="/explore">{t('profile.backToExplore')}</Link>
        </Button>
      </div>
    );
  }

  const categoryKey = categoryName(craftsman.categoryId);
  const regionKey = regionName(craftsman.regionId);

  return (
    <article>
      <div className="relative h-64 overflow-hidden bg-secondary md:h-80">
        <img
          src={craftsman.coverImage}
          alt={craftsman.displayName}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="relative -mt-16 rounded-2xl border bg-card p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                {categoryKey && <CategoryBadge nameKey={categoryKey} />}
                <RatingChip rating={craftsman.rating} reviewCount={craftsman.reviewCount} />
              </div>
              <h1 className="mt-4 font-display text-4xl text-foreground">
                {craftsman.displayName}
              </h1>
              <p className="mt-1 text-lg text-muted-foreground">{craftsman.specialty}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
                {regionKey && (
                  <span className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    {t(regionKey)}
                  </span>
                )}
                <span>{t('profile.years', { count: craftsman.yearsExperience })}</span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <p className="font-display text-2xl text-foreground">
                {t('priceFrom', { price: formatPrice(craftsman.commissionFrom, locale) })}
              </p>
              <CommissionCTA craftsman={craftsman} />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="eyebrow">{t('profile.about')}</h2>
          <p className="mt-3 max-w-2xl font-display text-lg leading-relaxed text-muted-foreground">
            {craftsman.bio}
          </p>
        </Reveal>

        <section className="mt-12">
          <h2 className="eyebrow">{t('profile.gallery')}</h2>
          {works.length === 0 ? (
            <p className="mt-4 text-muted-foreground">{t('profile.noWorks')}</p>
          ) : (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {works.map((work, i) => (
                <Reveal key={work.id} delay={i * 60}>
                  <WorkCard work={work} />
                </Reveal>
              ))}
            </div>
          )}
        </section>

        <section className="mt-12 pb-20">
          <h2 className="eyebrow">{t('profile.reviews')}</h2>
          {reviews.length === 0 ? (
            <p className="mt-4 text-muted-foreground">{t('profile.noReviews')}</p>
          ) : (
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {reviews.map((review) => (
                <Reveal key={review.id}>
                  <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarImage src={review.authorAvatar} alt={review.authorName} />
                        <AvatarFallback>{review.authorName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{review.authorName}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(review.createdAt, locale)}
                        </p>
                      </div>
                      <div className="ms-auto flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'size-3.5',
                              i < Math.round(review.rating)
                                ? 'fill-star text-star'
                                : 'text-border',
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
