import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Reveal from '@/components/ui/Reveal';
import CraftsmanCard from '@/components/ui/CraftsmanCard';
import StatusPill from '@/components/ui/StatusPill';
import { formatDate, formatPrice } from '@/components/hoc/GlobalFunctions';
import { useFavorites } from '@/hooks/useFavorites';
import { useFavoriteCraftsmen } from '@/hooks/useFavoriteCraftsmen';
import { useClientCommissions } from '@/hooks/useCommissions';
import { useTaxonomy } from '@/hooks/useTaxonomy';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/selectors/authSelector';
import { selectLocale } from '@/redux/selectors/uiSelector';
import { setLocale } from '@/redux/reducers/UiReducer';
import type { Locale, User } from '@/types';

function FavoritesTab() {
  const { t } = useTranslation('common');
  const { ids } = useFavorites();
  const { craftsmen, loading } = useFavoriteCraftsmen(ids);
  const { categoryName, regionName } = useTaxonomy();

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[4/3] w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (craftsmen.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed py-20 text-center">
        <p className="text-muted-foreground">{t('account.noFavorites')}</p>
        <Button asChild variant="outline" className="mt-6 uppercase tracking-wide">
          <Link to="/explore">{t('account.browseArtisans')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {craftsmen.map((craftsman, i) => (
        <Reveal key={craftsman.id} delay={i * 50}>
          <CraftsmanCard
            craftsman={craftsman}
            categoryNameKey={categoryName(craftsman.categoryId)}
            regionNameKey={regionName(craftsman.regionId)}
          />
        </Reveal>
      ))}
    </div>
  );
}

function CommissionsTab({ clientId }: { clientId: string }) {
  const { t } = useTranslation('common');
  const locale = useAppSelector(selectLocale);
  const { commissions, loading } = useClientCommissions(clientId);
  const [cancelled, setCancelled] = useState<Record<string, true>>({});

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (commissions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed py-20 text-center text-muted-foreground">
        {t('account.noCommissions')}
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {commissions.map((commission) => {
        const status = cancelled[commission.id] ? 'cancelled' : commission.status;
        return (
          <li key={commission.id} className="hover-raise rounded-xl border bg-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <Link
                  to={`/craftsmen/${commission.craftsmanSlug}`}
                  className="font-display text-lg text-foreground transition-colors hover:text-primary"
                >
                  {commission.craftsmanName}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">{commission.message}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>{formatDate(commission.createdAt, locale)}</span>
                  {typeof commission.budget === 'number' && (
                    <span>
                      {t('account.budget')}: {formatPrice(commission.budget, locale)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <StatusPill status={status} />
                {status === 'requested' && (
                  <Button
                    variant="ghost"
                    size="xs"
                    className="uppercase tracking-wide"
                    onClick={() => {
                      setCancelled((prev) => ({ ...prev, [commission.id]: true }));
                      toast.success(t('account.cancelled'));
                    }}
                  >
                    {t('account.cancel')}
                  </Button>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function SettingsTab({ user }: { user: User }) {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const locale = useAppSelector(selectLocale);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    toast.success(t('account.saved'));
  };

  return (
    <form onSubmit={submit} className="max-w-lg space-y-4">
      <div className="space-y-2">
        <Label htmlFor="acc-name">{t('account.settingsName')}</Label>
        <Input id="acc-name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="acc-email">{t('account.settingsEmail')}</Label>
        <Input id="acc-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>{t('account.settingsLanguage')}</Label>
        <Select value={locale} onValueChange={(value) => dispatch(setLocale(value as Locale))}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="ar">العربية</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="uppercase tracking-wide">
        {t('account.save')}
      </Button>
    </form>
  );
}

export default function Account() {
  const { t } = useTranslation('common');
  const user = useAppSelector(selectUser);

  // The route guard guarantees a client here; this is a type-narrowing safety net.
  if (!user) return null;

  return (
    <div className="page-x py-12">
      <header className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <span className="eyebrow">{t('account.title')}</span>
        <h1 className="mt-2 font-display text-4xl text-foreground md:text-5xl">
          {t('account.greeting', { name: user.name })}
        </h1>
      </header>

      <Tabs defaultValue="favorites" className="mt-8">
        <TabsList>
          <TabsTrigger value="favorites">{t('account.favorites')}</TabsTrigger>
          <TabsTrigger value="commissions">{t('account.commissions')}</TabsTrigger>
          <TabsTrigger value="settings">{t('account.settings')}</TabsTrigger>
        </TabsList>
        <TabsContent value="favorites" className="mt-6">
          <FavoritesTab />
        </TabsContent>
        <TabsContent value="commissions" className="mt-6">
          <CommissionsTab clientId={user.id} />
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <SettingsTab user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
