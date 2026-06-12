import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import Reveal from '@/components/ui/Reveal';
import CraftsmanCard from '@/components/ui/CraftsmanCard';
import FilterRail from '@/components/ui/FilterRail';
import SortSelect, { type SortValue } from '@/components/ui/SortSelect';
import { useCraftsmen } from '@/hooks/useCraftsmen';
import { useTaxonomy } from '@/hooks/useTaxonomy';
import type { CraftsmenFilters } from '@/api/fetchCraftsmen';

const PAGE_SIZE = 9;

// Module-level helper (never defined inside Explore's render body).
function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

export default function Explore() {
  const { t } = useTranslation('explore');
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, regions, categoryName, regionName } = useTaxonomy();

  // ── Read filter state from the URL (shareable / bookmarkable) ───────────────
  const categorySlugs = searchParams.getAll('category');
  const regionSlug = searchParams.get('region') ?? undefined;
  const minRating = Number(searchParams.get('minRating') ?? '0') || 0;
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const sort = (searchParams.get('sort') as SortValue | null) ?? undefined;
  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);

  // Slugs → ids (resolved once taxonomy loads; refetch follows automatically).
  const categoryIds = categories.filter((c) => categorySlugs.includes(c.slug)).map((c) => c.id);
  const regionId = regions.find((r) => r.slug === regionSlug)?.id;

  const filters: CraftsmenFilters = {
    categories: categoryIds.length ? categoryIds : undefined,
    region: regionId,
    minRating: minRating || undefined,
    minPrice,
    maxPrice,
    sort,
    page,
    pageSize: PAGE_SIZE,
  };
  const { craftsmen, total, loading, error } = useCraftsmen(filters);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // ── URL updaters ────────────────────────────────────────────────────────────
  const commit = (next: URLSearchParams, resetPage = true) => {
    if (resetPage) next.delete('page');
    setSearchParams(next, { replace: true });
  };
  const toggleCategory = (slug: string) => {
    const next = new URLSearchParams(searchParams);
    const current = next.getAll('category');
    next.delete('category');
    const nextSet = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    nextSet.forEach((s) => next.append('category', s));
    commit(next);
  };
  const setRegion = (slug?: string) => {
    const next = new URLSearchParams(searchParams);
    if (slug) next.set('region', slug);
    else next.delete('region');
    commit(next);
  };
  const setMinRating = (value: number) => {
    const next = new URLSearchParams(searchParams);
    if (value > 0) next.set('minRating', String(value));
    else next.delete('minRating');
    commit(next);
  };
  const setPrice = (min?: number, max?: number) => {
    const next = new URLSearchParams(searchParams);
    if (min != null) next.set('minPrice', String(min));
    else next.delete('minPrice');
    if (max != null) next.set('maxPrice', String(max));
    else next.delete('maxPrice');
    commit(next);
  };
  const setSort = (value: SortValue) => {
    const next = new URLSearchParams(searchParams);
    next.set('sort', value);
    commit(next, false);
  };
  const goToPage = (target: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(target));
    setSearchParams(next, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const reset = () => setSearchParams(new URLSearchParams(), { replace: true });

  const rail = (
    <FilterRail
      categories={categories}
      regions={regions}
      categorySlugs={categorySlugs}
      regionSlug={regionSlug}
      minRating={minRating}
      minPrice={minPrice}
      maxPrice={maxPrice}
      onToggleCategory={toggleCategory}
      onRegion={setRegion}
      onMinRating={setMinRating}
      onPrice={setPrice}
      onReset={reset}
    />
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="font-display text-4xl text-foreground md:text-5xl">{t('title')}</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{t('subtitle')}</p>
      </header>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {loading ? '…' : t('results', { count: total })}
        </p>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 lg:hidden">
                <SlidersHorizontal className="size-4" />
                {t('filterResults')}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto p-6">
              <SheetTitle className="sr-only">{t('filterResults')}</SheetTitle>
              <SheetDescription className="sr-only">{t('subtitle')}</SheetDescription>
              {rail}
            </SheetContent>
          </Sheet>
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr]">
        <div className="hidden h-fit lg:sticky lg:top-24 lg:block">{rail}</div>

        <div>
          {error ? (
            <p className="py-24 text-center text-muted-foreground">{t('error')}</p>
          ) : loading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : craftsmen.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display text-2xl text-foreground">{t('empty')}</p>
              <p className="mt-2 text-muted-foreground">{t('emptyHint')}</p>
              <Button onClick={reset} variant="outline" className="mt-6 uppercase tracking-wide">
                {t('reset')}
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
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

              {totalPages > 1 && (
                <Pagination className="mt-12">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        aria-label={t('prevPage')}
                        aria-disabled={page <= 1}
                        onClick={(e) => {
                          e.preventDefault();
                          if (page > 1) goToPage(page - 1);
                        }}
                        className={page <= 1 ? 'pointer-events-none opacity-40' : ''}
                      >
                        <ChevronLeft className="size-4 rtl:rotate-180" />
                      </PaginationLink>
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          isActive={page === i + 1}
                          onClick={(e) => {
                            e.preventDefault();
                            goToPage(i + 1);
                          }}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        aria-label={t('nextPage')}
                        aria-disabled={page >= totalPages}
                        onClick={(e) => {
                          e.preventDefault();
                          if (page < totalPages) goToPage(page + 1);
                        }}
                        className={page >= totalPages ? 'pointer-events-none opacity-40' : ''}
                      >
                        <ChevronRight className="size-4 rtl:rotate-180" />
                      </PaginationLink>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
