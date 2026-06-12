import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/redux/hooks';
import { loginAs } from '@/redux/reducers/AuthReducer';

// Mock auth (build prompt Section 0): no real request — sign in as a demo client.
export default function Login() {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginAs('client'));
    navigate('/account');
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <span className="eyebrow">{t('brand.name')}</span>
        <h1 className="mt-3 font-display text-3xl text-foreground">{t('auth.loginTitle')}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t('auth.loginSubtitle')}</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" size="lg" className="w-full uppercase tracking-wide">
            {t('auth.signIn')}
          </Button>
        </form>

        <p className="mt-4 rounded-lg bg-secondary px-3 py-2 text-xs text-muted-foreground">
          {t('auth.demoNote')}
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          {t('auth.noAccount')}{' '}
          <Link
            to="/register"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {t('nav.register')}
          </Link>
        </p>
      </div>
    </div>
  );
}
