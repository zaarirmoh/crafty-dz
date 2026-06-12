import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HERO_IMAGE = 'https://loremflickr.com/1600/1000/pottery,artisan,hands?lock=42';

// Presentational craft strip (links into Explore filters). The real, data-driven
// listing lives on the Explore page in Phase 2.
const CRAFTS = [
  { slug: 'ceramics-pottery', key: 'categories.ceramics' },
  { slug: 'copper-brass', key: 'categories.copper' },
  { slug: 'textiles-rugs', key: 'categories.textiles' },
  { slug: 'silver-filigree', key: 'categories.filigree' },
  { slug: 'leather-craft', key: 'categories.leather' },
  { slug: 'woodwork', key: 'categories.woodwork' },
  { slug: 'fine-arts', key: 'categories.fineArts' },
];

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="eyebrow">{t('home.eyebrow')}</span>
          <h1 className="mt-4 text-balance font-display text-5xl leading-[1.05] text-foreground md:text-6xl">
            {t('home.title')}
          </h1>
          <p className="mt-6 max-w-md font-display text-lg text-muted-foreground">
            {t('home.subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="uppercase tracking-wide">
              <Link to="/explore">
                {t('home.ctaExplore')}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="uppercase tracking-wide">
              <Link to="/journal">{t('home.ctaJournal')}</Link>
            </Button>
          </div>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-2xl border bg-secondary shadow-sm">
          <img src={HERO_IMAGE} alt="" className="size-full object-cover" loading="eager" />
        </div>
      </section>

      <section className="border-y bg-card/40">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <p className="eyebrow">{t('home.browseByCraft')}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {CRAFTS.map((craft) => (
              <Link
                key={craft.slug}
                to={`/explore?category=${craft.slug}`}
                className="rounded-full bg-badge px-4 py-2 text-sm font-medium uppercase tracking-wide text-badge-foreground transition-transform hover:-translate-y-0.5"
              >
                {t(craft.key)}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
