import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAppSelector } from '@/redux/hooks';
import { selectIsAuthenticated } from '@/redux/selectors/authSelector';
import type { Craftsman } from '@/types';

interface CommissionCTAProps {
  craftsman: Craftsman;
}

// Guests are routed to /login (business rule mirrors favorites, Section 5.5);
// authenticated users get a mock request dialog that fires a toast on submit.
export default function CommissionCTA({ craftsman }: CommissionCTAProps) {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [budget, setBudget] = useState('');

  if (!isAuthenticated) {
    return (
      <Button size="lg" className="uppercase tracking-wide" onClick={() => navigate('/login')}>
        {t('profile.requestCommission')}
      </Button>
    );
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setOpen(false);
    setMessage('');
    setBudget('');
    toast.success(t('profile.commissionSent', { name: craftsman.displayName }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="uppercase tracking-wide">
          {t('profile.requestCommission')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>
              {t('profile.commissionDialogTitle', { name: craftsman.displayName })}
            </DialogTitle>
            <DialogDescription>{t('profile.commissionDialogDesc')}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="commission-message">{t('profile.messageLabel')}</Label>
              <Textarea
                id="commission-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="commission-budget">{t('profile.budgetLabel')}</Label>
              <Input
                id="commission-budget"
                type="number"
                inputMode="numeric"
                min={0}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              {t('profile.cancel')}
            </Button>
            <Button type="submit">{t('profile.send')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
