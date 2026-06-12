import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en_common from '@/locales/en/common.json';
import fr_common from '@/locales/fr/common.json';
import ar_common from '@/locales/ar/common.json';
import en_explore from '@/locales/en/explore.json';
import fr_explore from '@/locales/fr/explore.json';
import ar_explore from '@/locales/ar/explore.json';

// react-i18next setup (build prompt Section 17). en is the dev default; fr and ar
// ship fully, ar is RTL. The initial language is read from localStorage so it
// matches the `ui` slice; LanguageSwitcher keeps the two in sync afterwards.
const SUPPORTED = ['en', 'fr', 'ar'] as const;

const stored =
  typeof localStorage !== 'undefined' ? localStorage.getItem('locale') : null;
const lng = (SUPPORTED as readonly string[]).includes(stored ?? '')
  ? (stored as string)
  : 'en';

void i18n.use(initReactI18next).init({
  resources: {
    en: { common: en_common, explore: en_explore },
    fr: { common: fr_common, explore: fr_explore },
    ar: { common: ar_common, explore: ar_explore },
  },
  lng,
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'explore'],
  interpolation: { escapeValue: false },
});

export default i18n;
