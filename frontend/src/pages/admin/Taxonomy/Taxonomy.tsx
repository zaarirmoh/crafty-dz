import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { categoryIcon } from '@/lib/icons';
import { useTaxonomy } from '@/hooks/useTaxonomy';

export default function AdminTaxonomy() {
  const { t } = useTranslation('admin');
  const { t: tc } = useTranslation('common');
  const { categories, regions, loading } = useTaxonomy();
  const [removed, setRemoved] = useState<Record<string, true>>({});

  const remove = (id: string) => {
    setRemoved((prev) => ({ ...prev, [id]: true }));
    toast.success(t('taxonomy.deleted'));
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl text-foreground">{t('taxonomy.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t('taxonomy.subtitle')}</p>
      </header>

      {loading ? (
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          <section className="rounded-xl border bg-card p-5">
            <p className="eyebrow">{t('taxonomy.categories')}</p>
            <ul className="mt-4 space-y-2">
              {categories
                .filter((c) => !removed[c.id])
                .map((category) => {
                  const Icon = categoryIcon(category.slug);
                  return (
                    <li
                      key={category.id}
                      className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2"
                    >
                      <Icon className="size-4 text-muted-foreground" />
                      <span className="flex-1 text-foreground">{tc(category.nameKey)}</span>
                      <button
                        type="button"
                        aria-label={t('taxonomy.delete')}
                        onClick={() => remove(category.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <X className="size-4" />
                      </button>
                    </li>
                  );
                })}
            </ul>
          </section>

          <section className="rounded-xl border bg-card p-5">
            <p className="eyebrow">{t('taxonomy.regions')}</p>
            <ul className="mt-4 space-y-2">
              {regions
                .filter((r) => !removed[r.id])
                .map((region) => (
                  <li
                    key={region.id}
                    className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2"
                  >
                    <span className="flex-1 text-foreground">{tc(region.nameKey)}</span>
                    <button
                      type="button"
                      aria-label={t('taxonomy.delete')}
                      onClick={() => remove(region.id)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <X className="size-4" />
                    </button>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
