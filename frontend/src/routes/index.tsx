import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import Wrapper from '@/components/hoc/Wrapper';
import WrapperByHeaderOnly from '@/components/hoc/WrapperByHeaderOnly';
import DashboardWrapper from '@/components/hoc/DashboardWrapper';
import { useAppSelector } from '@/redux/hooks';
import { selectIsAuthenticated, selectRole } from '@/redux/selectors/authSelector';
import allRoutes, { type AppRoute } from '@/routes/allroutes';

// Reads each route, applies its layout + role guard. Auth logic lives ONLY here,
// never inside page components (build prompt Section 11).
const LAYOUTS = {
  default: Wrapper,
  'header-only': WrapperByHeaderOnly,
  dashboard: DashboardWrapper,
} as const;

const PageFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">…</div>
);

function RouteGuard({ route }: { route: AppRoute }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const role = useAppSelector(selectRole);
  const Component = route.component;

  // No roles → public. Has roles → must be authenticated AND role ∈ roles.
  if (route.roles && route.roles.length > 0) {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (!role || !route.roles.includes(role)) return <Navigate to="/" replace />;
  }

  const content = (
    <Suspense fallback={<PageFallback />}>
      <Component />
    </Suspense>
  );

  if (route.layout === 'none') return content;
  const Layout = LAYOUTS[route.layout];
  return <Layout>{content}</Layout>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        {/* Top-level safety net: a suspend in a layout (outside the per-route
            boundary) is caught here instead of blanking the whole app. */}
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {allRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={<RouteGuard route={route} />} />
            ))}
          </Routes>
        </Suspense>
      </TooltipProvider>
    </BrowserRouter>
  );
}
