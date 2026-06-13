import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMyCraftsman } from '@/hooks/useStudio';
import { useTaxonomy } from '@/hooks/useTaxonomy';
import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/selectors/authSelector';
import type { Craftsman } from '@/types';

// Form lives in a child so its state initializes from the loaded craftsman once,
// without a state-syncing effect.
function ProfileForm({ craftsman }: { craftsman: Craftsman }) {
  const { t } = useTranslation('studio');
  const { t: tc } = useTranslation('common');
  const { regions } = useTaxonomy();
  const [displayName, setDisplayName] = useState(craftsman.displayName);
  const [specialty, setSpecialty] = useState(craftsman.specialty);
  const [regionId, setRegionId] = useState(craftsman.regionId);
  const [bio, setBio] = useState(craftsman.bio);
  const [coverImage, setCoverImage] = useState(craftsman.coverImage);
  const [commissionFrom, setCommissionFrom] = useState(String(craftsman.commissionFrom));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    toast.success(t('profile.saved'));
  };

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-5">
      <div className="space-y-2">
        <Label htmlFor="p-name">{t('profile.displayName')}</Label>
        <Input id="p-name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="p-specialty">{t('profile.specialty')}</Label>
        <Input id="p-specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>{t('profile.region')}</Label>
        <Select value={regionId} onValueChange={setRegionId}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.id} value={region.id}>
                {tc(region.nameKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="p-bio">{t('profile.bio')}</Label>
        <Textarea id="p-bio" rows={5} value={bio} onChange={(e) => setBio(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="p-cover">{t('profile.coverImage')}</Label>
        <Input id="p-cover" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="p-price">{t('profile.commissionFrom')}</Label>
        <Input
          id="p-price"
          type="number"
          inputMode="numeric"
          min={0}
          value={commissionFrom}
          onChange={(e) => setCommissionFrom(e.target.value)}
        />
      </div>
      <Button type="submit" className="uppercase tracking-wide">
        {t('profile.save')}
      </Button>
    </form>
  );
}

export default function StudioProfile() {
  const { t } = useTranslation('studio');
  const user = useAppSelector(selectUser);
  const { craftsman, loading } = useMyCraftsman(user?.id ?? '');

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl text-foreground">{t('profile.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t('profile.subtitle')}</p>
      </header>
      {loading || !craftsman ? (
        <div className="max-w-2xl space-y-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-11 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <ProfileForm craftsman={craftsman} />
      )}
    </div>
  );
}
