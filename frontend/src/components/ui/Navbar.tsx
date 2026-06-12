import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogOut } from 'lucide-react';
import Brand from '@/components/ui/Brand';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectIsAuthenticated, selectUser } from '@/redux/selectors/authSelector';
import { logout } from '@/redux/reducers/AuthReducer';

const PUBLIC_LINKS = [
  { to: '/explore', key: 'nav.explore' },
  { to: '/collections', key: 'nav.collections' },
  { to: '/journal', key: 'nav.journal' },
];

const ROLE_HOME: Record<string, string> = {
  client: '/account',
  craftsman: '/studio',
  admin: '/admin',
};

const ROLE_HOME_LABEL: Record<string, string> = {
  client: 'nav.account',
  craftsman: 'nav.studio',
  admin: 'nav.admin',
};

/** Public/authenticated top navigation chrome. */
export default function Navbar() {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuth = useAppSelector(selectIsAuthenticated);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="page-x flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Brand />
          <nav className="hidden items-center gap-6 md:flex">
            {PUBLIC_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors hover:text-foreground',
                    isActive ? 'text-foreground' : 'text-muted-foreground',
                  )
                }
              >
                {t(link.key)}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {isAuth && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={user.name}
                >
                  <Avatar className="size-9">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t(`roles.${user.role}`)}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={ROLE_HOME[user.role]}>{t(ROLE_HOME_LABEL[user.role])}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => dispatch(logout())} className="gap-2">
                  <LogOut className="size-4" />
                  {t('actions.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">{t('nav.login')}</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">{t('nav.register')}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
