import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/redux/hooks';
import { loginAs } from '@/redux/reducers/AuthReducer';

type SignupRole = 'client' | 'craftsman';

const ROLES: { value: SignupRole; labelKey: string }[] = [
  { value: 'client', labelKey: 'auth.roleClient' },
  { value: 'craftsman', labelKey: 'auth.roleCraftsman' },
];

// Mock auth (build prompt Section 0): selecting a role on register is allowed for demo.
export default function Register() {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState<SignupRole>('client');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginAs(role));
    navigate(role === 'craftsman' ? '/studio' : '/account');
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <span className="eyebrow">{t('brand.name')}</span>
        <h1 className="mt-3 font-display text-3xl text-foreground">{t('auth.registerTitle')}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t('auth.registerSubtitle')}</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label>{t('auth.role')}</Label>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setRole(option.value)}
                  className={cn(
                    'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                    role === option.value
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'bg-card text-muted-foreground hover:text-foreground',
                  )}
                >
                  {t(option.labelKey)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">{t('auth.name')}</Label>
            <Input
              id="name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.dz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" size="lg" className="w-full uppercase tracking-wide">
            {t('auth.createAccount')}
          </Button>
        </form>

        <p className="mt-4 rounded-lg bg-secondary px-3 py-2 text-xs text-muted-foreground">
          {t('auth.demoNote')}
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          {t('auth.haveAccount')}{' '}
          <Link
            to="/login"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {t('nav.login')}
          </Link>
        </p>
      </div>
    </div>
  );
}
