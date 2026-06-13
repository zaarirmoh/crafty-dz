import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAllUsers } from '@/hooks/useAdmin';

export default function AdminUsers() {
  const { t } = useTranslation('admin');
  const { t: tc } = useTranslation('common');
  const { users, loading } = useAllUsers();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl text-foreground">{t('users.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t('users.subtitle')}</p>
      </header>

      {loading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : (
        <div className="overflow-hidden rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('users.name')}</TableHead>
                <TableHead>{t('users.email')}</TableHead>
                <TableHead>{t('users.role')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-foreground">
                      {tc(`roles.${user.role}`)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
