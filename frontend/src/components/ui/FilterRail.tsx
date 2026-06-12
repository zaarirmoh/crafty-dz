import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PriceRangeInput from '@/components/ui/PriceRangeInput';
import { ratingLabel } from '@/components/hoc/GlobalFunctions';
import type { Category, Region } from '@/types';

const ALL_REGIONS = '__all__';

interface FilterRailProps {
  categories: Category[];
  regions: Region[];
  categorySlugs: string[];
  regionSlug?: string;
  minRating: number;
  minPrice?: number;
  maxPrice?: number;
  onToggleCategory: (slug: string) => void;
  onRegion: (slug: string | undefined) => void;
  onMinRating: (value: number) => void;
  onPrice: (min: number | undefined, max: number | undefined) => void;
  onReset: () => void;
}

/** Left filter rail for Explore: category checkboxes, origin, rating, price. */
export default function FilterRail({
  categories,
  regions,
  categorySlugs,
  regionSlug,
  minRating,
  minPrice,
  maxPrice,
  onToggleCategory,
  onRegion,
  onMinRating,
  onPrice,
  onReset,
}: FilterRailProps) {
  const { t } = useTranslation('explore');
  const { t: tc } = useTranslation('common');

  return (
    <aside className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="eyebrow">{t('filterResults')}</p>
        <Button
          variant="ghost"
          size="xs"
          onClick={onReset}
          className="uppercase tracking-wide"
        >
          {t('reset')}
        </Button>
      </div>

      <div className="space-y-3">
        <p className="eyebrow">{t('category')}</p>
        <div className="space-y-2.5">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground"
            >
              <Checkbox
                checked={categorySlugs.includes(category.slug)}
                onCheckedChange={() => onToggleCategory(category.slug)}
              />
              {tc(category.nameKey)}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="eyebrow">{t('origin')}</p>
        <Select
          value={regionSlug ?? ALL_REGIONS}
          onValueChange={(v) => onRegion(v === ALL_REGIONS ? undefined : v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_REGIONS}>{t('allRegions')}</SelectItem>
            {regions.map((region) => (
              <SelectItem key={region.id} value={region.slug}>
                {tc(region.nameKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="eyebrow">{t('minRating')}</p>
          <span className="text-sm text-muted-foreground">
            {minRating > 0 ? ratingLabel(minRating) : '—'}
          </span>
        </div>
        <Slider
          min={0}
          max={5}
          step={0.5}
          value={[minRating]}
          onValueChange={(v) => onMinRating(v[0])}
        />
      </div>

      <div className="space-y-3">
        <p className="eyebrow">{t('priceRange')}</p>
        <PriceRangeInput min={minPrice} max={maxPrice} onChange={onPrice} />
      </div>
    </aside>
  );
}
