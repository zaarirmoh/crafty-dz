import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type SortValue = 'rating' | 'price_asc' | 'price_desc';

interface SortSelectProps {
  value?: SortValue;
  onChange: (value: SortValue) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  const { t } = useTranslation('explore');
  return (
    <Select value={value ?? 'rating'} onValueChange={(v) => onChange(v as SortValue)}>
      <SelectTrigger className="w-[190px]" aria-label={t('sortBy')}>
        <SelectValue placeholder={t('sortBy')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="rating">{t('sortRating')}</SelectItem>
        <SelectItem value="price_asc">{t('sortPriceAsc')}</SelectItem>
        <SelectItem value="price_desc">{t('sortPriceDesc')}</SelectItem>
      </SelectContent>
    </Select>
  );
}
