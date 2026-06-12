import { useTranslation } from 'react-i18next';

interface PagePlaceholderProps {
  titleKey: string;
  descKey?: string;
}

/** Temporary, on-brand placeholder for routes whose real page lands in a later phase. */
export default function PagePlaceholder({
  titleKey,
  descKey = 'placeholder.comingSoon',
}: PagePlaceholderProps) {
  const { t } = useTranslation('common');
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <span className="eyebrow mb-4">{t('placeholder.underConstruction')}</span>
      <h1 className="font-display text-4xl text-foreground">{t(titleKey)}</h1>
      <p className="mt-4 font-display text-lg text-muted-foreground">{t(descKey)}</p>
    </section>
  );
}
