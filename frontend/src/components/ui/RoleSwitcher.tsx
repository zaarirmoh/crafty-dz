import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import type { Role } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectRole } from '@/redux/selectors/authSelector';
import { loginAs, logout } from '@/redux/reducers/AuthReducer';

// Dev-only floating widget (build prompt Section 0) — preview the guest, client,
// craftsman and admin experiences without a real login flow. App renders this
// only when import.meta.env.DEV.
const OPTIONS: (Role | null)[] = [null, 'client', 'craftsman', 'admin'];

export default function RoleSwitcher() {
  const dispatch = useAppDispatch();
  const role = useAppSelector(selectRole);
  const { t } = useTranslation('common');

  return (
    <div className="fixed bottom-4 end-4 z-50 rounded-xl border bg-card/95 p-3 shadow-lg backdrop-blur">
      <p className="eyebrow mb-2">{t('roleSwitcher.title')}</p>
      <div className="flex gap-1">
        {OPTIONS.map((option) => {
          const active = role === option;
          return (
            <button
              key={option ?? 'guest'}
              type="button"
              onClick={() => (option ? dispatch(loginAs(option)) : dispatch(logout()))}
              className={cn(
                'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground',
              )}
            >
              {t(`roles.${option ?? 'guest'}`)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
