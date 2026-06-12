import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/** Espresso marketing footer. */
export default function Footer() {
  const { t } = useTranslation('common');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl">{t('brand.name')}</p>
            <p className="mt-3 text-sm text-primary-foreground/70">{t('footer.tagline')}</p>
          </div>
          <div>
            <p className="eyebrow text-primary-foreground/60">{t('footer.discover')}</p>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link to="/explore" className="hover:text-primary-foreground">
                  {t('nav.explore')}
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-primary-foreground">
                  {t('nav.collections')}
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-primary-foreground">
                  {t('nav.journal')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60">
          © {year} {t('brand.name')}. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
