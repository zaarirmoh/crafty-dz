import { Check, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectLocale } from '@/redux/selectors/uiSelector';
import { setLocale } from '@/redux/reducers/UiReducer';

const LOCALES: Locale[] = ['en', 'fr', 'ar'];

/** Switches the active locale; the App effect mirrors it to i18n + <html dir>. */
export default function LanguageSwitcher() {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectLocale);
  const { t } = useTranslation('common');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2" aria-label={t('language.label')}>
          <Globe className="size-5" />
          <span className="uppercase">{current}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => dispatch(setLocale(locale))}
            className="gap-2"
          >
            <Check className={cn('size-4', locale === current ? 'opacity-100' : 'opacity-0')} />
            {t(`language.${locale}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
