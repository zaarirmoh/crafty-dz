import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en_common from '@/locales/en/common.json';
import fr_common from '@/locales/fr/common.json';
import ar_common from '@/locales/ar/common.json';

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
    en: { common: en_common },
    fr: { common: fr_common },
    ar: { common: ar_common },
  },
  lng,
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common'],
  interpolation: { escapeValue: false },
});

export default i18n;
