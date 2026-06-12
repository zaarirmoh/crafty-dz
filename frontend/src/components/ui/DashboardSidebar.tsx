import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  BookOpen,
  Hammer,
  Inbox,
  LayoutDashboard,
  LogOut,
  Tags,
  User as UserIcon,
  Users as UsersIcon,
  Wrench,
} from 'lucide-react';
import Brand from '@/components/ui/Brand';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectRole } from '@/redux/selectors/authSelector';
import { logout } from '@/redux/reducers/AuthReducer';

interface NavItem {
  to: string;
  labelKey: string;
  icon: typeof LayoutDashboard;
  end?: boolean;
}

const STUDIO_NAV: NavItem[] = [
  { to: '/studio', labelKey: 'studioNav.overview', icon: LayoutDashboard, end: true },
  { to: '/studio/profile', labelKey: 'studioNav.profile', icon: UserIcon },
  { to: '/studio/works', labelKey: 'studioNav.works', icon: Hammer },
  { to: '/studio/commissions', labelKey: 'studioNav.commissions', icon: Inbox },
];

const ADMIN_NAV: NavItem[] = [
  { to: '/admin', labelKey: 'adminNav.overview', icon: LayoutDashboard, end: true },
  { to: '/admin/craftsmen', labelKey: 'adminNav.craftsmen', icon: Hammer },
  { to: '/admin/users', labelKey: 'adminNav.users', icon: UsersIcon },
  { to: '/admin/works', labelKey: 'adminNav.works', icon: Wrench },
  { to: '/admin/journal', labelKey: 'adminNav.journal', icon: BookOpen },
  { to: '/admin/taxonomy', labelKey: 'adminNav.taxonomy', icon: Tags },
];

/** Role-aware sidebar for the Studio (craftsman) and Admin areas. */
export default function DashboardSidebar() {
  const role = useAppSelector(selectRole);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');
  const items = role === 'admin' ? ADMIN_NAV : STUDIO_NAV;

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-e bg-card md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Brand />
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {items.map(({ to, labelKey, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
              )
            }
          >
            <Icon className="size-4" />
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>
      <div className="space-y-1 border-t p-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {t('actions.backToSite')}
        </Link>
        <button
          type="button"
          onClick={() => dispatch(logout())}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <LogOut className="size-4" />
          {t('actions.logout')}
        </button>
      </div>
    </aside>
  );
}
