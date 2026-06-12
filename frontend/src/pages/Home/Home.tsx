import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Compass, MessagesSquare, PackageCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Reveal from '@/components/ui/Reveal';
import CraftsmanCard from '@/components/ui/CraftsmanCard';
import JournalCard from '@/components/ui/JournalCard';
import { categoryIcon } from '@/lib/icons';
import { useCraftsmen } from '@/hooks/useCraftsmen';
import { useTaxonomy } from '@/hooks/useTaxonomy';
import { useJournal } from '@/hooks/useJournal';

const HERO_IMAGE = 'https://loremflickr.com/1600/2000/pottery,artisan,hands?lock=42';

const STEPS = [
  { icon: Compass, key: 'step1' },
  { icon: MessagesSquare, key: 'step2' },
  { icon: PackageCheck, key: 'step3' },
] as const;

// Module-level helper component (never defined inside Home's render body).
function FeaturedSkeletons() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border bg-card">
          <Skeleton className="aspect-[4/3] w-full rounded-none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      ))}
    </>
  );
}

export default function Home() {
  const { t } = useTranslation('common');
  const { craftsmen: featured, loading: featuredLoading } = useCraftsmen({
    featured: true,
    pageSize: 3,
  });
  const { total: artisanCount } = useCraftsmen({});
  const { categories, regions, categoryName, regionName } = useTaxonomy();
  const { posts, loading: journalLoading } = useJournal(3);

  const stats = [
    { value: artisanCount > 0 ? String(artisanCount) : '—', label: t('home.statArtisans') },
    { value: String(categories.length || 7), label: t('home.statCrafts') },
    { value: String(regions.length || 8), label: t('home.statRegions') },
  ];

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <span className="eyebrow">{t('home.eyebrow')}</span>
          <h1 className="mt-4 text-balance font-display text-5xl leading-[1.05] text-foreground md:text-6xl">
            {t('home.title')}
          </h1>
          <p className="mt-6 max-w-md font-display text-lg text-muted-foreground">
            {t('home.subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="group uppercase tracking-wide">
              <Link to="/explore">
                {t('home.ctaExplore')}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="uppercase tracking-wide">
              <Link to="/journal">{t('home.ctaJournal')}</Link>
            </Button>
          </div>
          <dl className="mt-12 flex flex-wrap gap-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-3xl text-foreground">{stat.value}</dt>
                <dd className="eyebrow mt-1">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="animate-in fade-in zoom-in-95 duration-1000">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border bg-secondary shadow-sm">
            <img src={HERO_IMAGE} alt="" className="size-full object-cover" loading="eager" />
          </div>
        </div>
      </section>

      {/* Featured artisans */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{t('home.featuredTitle')}</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">
              {t('home.featuredSubtitle')}
            </h2>
          </div>
          <Button asChild variant="ghost" className="group hidden shrink-0 sm:inline-flex">
            <Link to="/explore">
              {t('actions.viewAll')}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
            </Link>
          </Button>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredLoading ? (
            <FeaturedSkeletons />
          ) : (
            featured.map((craftsman, i) => (
              <Reveal key={craftsman.id} delay={i * 80}>
                <CraftsmanCard
                  craftsman={craftsman}
                  categoryNameKey={categoryName(craftsman.categoryId)}
                  regionNameKey={regionName(craftsman.regionId)}
                />
              </Reveal>
            ))
          )}
        </div>
      </section>

      {/* Browse by craft */}
      <section className="border-y bg-card/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal>
            <p className="eyebrow">{t('home.browseByCraft')}</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">{t('home.browseSubtitle')}</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category, i) => {
              const Icon = categoryIcon(category.slug);
              return (
                <Reveal key={category.id} delay={i * 60}>
                  <Link
                    to={`/explore?category=${category.slug}`}
                    className="group flex h-full flex-col gap-3 rounded-xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-copper/40 hover:shadow-sm"
                  >
                    <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors duration-300 group-hover:bg-copper group-hover:text-copper-foreground">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-display text-lg text-foreground">
                      {t(category.nameKey)}
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t('home.howTitle')}</p>
          <h2 className="mt-2 font-display text-3xl text-foreground">{t('home.howSubtitle')}</h2>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.key} delay={i * 100}>
                <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-xl text-foreground">
                  {t(`home.${step.key}Title`)}
                </h3>
                <p className="mt-2 text-muted-foreground">{t(`home.${step.key}Desc`)}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Regions */}
      <section className="border-y bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{t('home.regionsTitle')}</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">
              {t('home.regionsSubtitle')}
            </h2>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            {regions.map((region, i) => (
              <Reveal key={region.id} delay={i * 40}>
                <Link
                  to={`/explore?region=${region.slug}`}
                  className="inline-block rounded-full border bg-card px-4 py-2 font-display text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-copper/50 hover:text-primary"
                >
                  {t(region.nameKey)}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* From the Journal */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{t('home.journalTitle')}</p>
            <h2 className="mt-2 font-display text-3xl text-foreground">
              {t('home.journalSubtitle')}
            </h2>
          </div>
          <Button asChild variant="ghost" className="group hidden shrink-0 sm:inline-flex">
            <Link to="/journal">
              {t('actions.viewAll')}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
            </Link>
          </Button>
        </Reveal>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {journalLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[16/10] w-full rounded-xl" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              ))
            : posts.map((post, i) => (
                <Reveal key={post.id} delay={i * 80}>
                  <JournalCard post={post} />
                </Reveal>
              ))}
        </div>
      </section>

      {/* Artisan CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-balance font-display text-4xl text-primary-foreground">
              {t('home.ctaTitle')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/70">
              {t('home.ctaSubtitle')}
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8 uppercase tracking-wide">
              <Link to="/register">{t('home.ctaButton')}</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
