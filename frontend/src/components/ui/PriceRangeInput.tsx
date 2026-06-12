import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';

interface PriceRangeInputProps {
  min?: number;
  max?: number;
  onChange: (min: number | undefined, max: number | undefined) => void;
}

const parse = (value: string): number | undefined => {
  if (value === '') return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
};

export default function PriceRangeInput({ min, max, onChange }: PriceRangeInputProps) {
  const { t } = useTranslation('explore');
  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        inputMode="numeric"
        min={0}
        placeholder={t('min')}
        value={min ?? ''}
        onChange={(e) => onChange(parse(e.target.value), max)}
        aria-label={t('min')}
      />
      <span className="text-muted-foreground">—</span>
      <Input
        type="number"
        inputMode="numeric"
        min={0}
        placeholder={t('max')}
        value={max ?? ''}
        onChange={(e) => onChange(min, parse(e.target.value))}
        aria-label={t('max')}
      />
    </div>
  );
}
