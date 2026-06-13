import DashboardNav from '@/components/ui/DashboardNav';

/** Desktop sidebar shell. The nav itself is shared with the mobile sheet. */
export default function DashboardSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-e bg-card md:flex md:flex-col">
      <DashboardNav />
    </aside>
  );
}
