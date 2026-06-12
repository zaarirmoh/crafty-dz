import { cn } from '@/lib/utils';
import { formatPrice } from '@/components/hoc/GlobalFunctions';
import { useAppSelector } from '@/redux/hooks';
import { selectLocale } from '@/redux/selectors/uiSelector';
import type { Work } from '@/types';

interface WorkCardProps {
  work: Work;
  className?: string;
}

export default function WorkCard({ work, className }: WorkCardProps) {
  const locale = useAppSelector(selectLocale);
  return (
    <figure className={cn('group overflow-hidden rounded-xl border bg-card', className)}>
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={work.images[0]}
          alt={work.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <figcaption className="p-4">
        <p className="font-display text-foreground">{work.title}</p>
        {typeof work.price === 'number' && (
          <p className="mt-1 text-sm text-muted-foreground">{formatPrice(work.price, locale)}</p>
        )}
      </figcaption>
    </figure>
  );
}
