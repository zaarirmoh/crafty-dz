import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ratingLabel } from '@/components/hoc/GlobalFunctions';

interface RatingChipProps {
  rating: number;
  reviewCount?: number;
  className?: string;
}

/** Small muted pill with a star glyph (build prompt Section 6). */
export default function RatingChip({ rating, reviewCount, className }: RatingChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-foreground',
        className,
      )}
    >
      <Star className="size-3 fill-star text-star" />
      {ratingLabel(rating)}
      {typeof reviewCount === 'number' && (
        <span className="text-muted-foreground">({reviewCount})</span>
      )}
    </span>
  );
}
