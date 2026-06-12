import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { formatDate } from '@/components/hoc/GlobalFunctions';
import { useAppSelector } from '@/redux/hooks';
import { selectLocale } from '@/redux/selectors/uiSelector';
import type { JournalPost } from '@/types';

interface JournalCardProps {
  post: JournalPost;
  className?: string;
}

export default function JournalCard({ post, className }: JournalCardProps) {
  const locale = useAppSelector(selectLocale);

  return (
    <Link to={`/journal/${post.slug}`} className={cn('group block', className)}>
      <div className="aspect-[16/10] overflow-hidden rounded-xl border bg-secondary">
        <img
          src={post.coverImage}
          alt={post.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <p className="eyebrow mt-4">{formatDate(post.publishedAt, locale)}</p>
      <h3 className="mt-2 font-display text-xl leading-snug text-foreground transition-colors group-hover:text-primary">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
    </Link>
  );
}
