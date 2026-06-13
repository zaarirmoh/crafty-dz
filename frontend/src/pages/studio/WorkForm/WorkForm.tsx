import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { useWork } from '@/hooks/useStudio';
import { useTaxonomy } from '@/hooks/useTaxonomy';
import type { Work, WorkStatus } from '@/types';

interface FormProps {
  work: Work | null;
  isEdit: boolean;
}

function WorkFormFields({ work, isEdit }: FormProps) {
  const { t } = useTranslation('studio');
  const { t: tc } = useTranslation('common');
  const navigate = useNavigate();
  const { categories } = useTaxonomy();
  const [title, setTitle] = useState(work?.title ?? '');
  const [description, setDescription] = useState(work?.description ?? '');
  const [categoryId, setCategoryId] = useState(work?.categoryId ?? '');
  const [price, setPrice] = useState(work?.price != null ? String(work.price) : '');
  const [image, setImage] = useState(work?.images[0] ?? '');
  const [status, setStatus] = useState<WorkStatus>(work?.status ?? 'draft');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    toast.success(t('works.saved'));
    navigate('/studio/works');
  };

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-5">
      <header>
        <h1 className="font-display text-3xl text-foreground">
          {isEdit ? t('works.editTitle') : t('works.newTitle')}
        </h1>
      </header>

      <div className="space-y-2">
        <Label htmlFor="w-title">{t('works.fieldTitle')}</Label>
        <Input id="w-title" required value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="w-desc">{t('works.fieldDescription')}</Label>
        <Textarea
          id="w-desc"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>{t('works.fieldCategory')}</Label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {tc(category.nameKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="w-price">{t('works.fieldPrice')}</Label>
          <Input
            id="w-price"
            type="number"
            inputMode="numeric"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>{t('works.fieldStatus')}</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as WorkStatus)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">{t('works.draft')}</SelectItem>
              <SelectItem value="published">{t('works.published')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="w-image">{t('works.fieldImage')}</Label>
        <Input id="w-image" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="uppercase tracking-wide">
          {t('works.save')}
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="uppercase tracking-wide"
          onClick={() => navigate('/studio/works')}
        >
          {t('works.cancel')}
        </Button>
      </div>
    </form>
  );
}

export default function WorkForm() {
  const { t } = useTranslation('studio');
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { work, loading } = useWork(id ?? '');

  if (isEdit && loading) {
    return (
      <div className="max-w-2xl space-y-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-11 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (isEdit && !work) {
    return <p className="py-20 text-center text-muted-foreground">{t('works.notFound')}</p>;
  }

  return <WorkFormFields work={work} isEdit={isEdit} />;
}
