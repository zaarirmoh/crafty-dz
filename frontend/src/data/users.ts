import type { Role, User } from '@/types';
import { avatarFor } from './images';

// Mock user accounts. Craftsman records (data/craftsmen.ts) link to these via
// `userId`. The three demo accounts below drive the dev RoleSwitcher and mock auth.
export const users: User[] = [
  // ── Demo accounts (used by the dev RoleSwitcher / mock auth) ────────────────
  { id: 'user-c1', name: 'Yasmina Aït Saïd', email: 'yasmina@dzaircraft.dz', role: 'craftsman', avatar: avatarFor('Yasmina Ait Said'), locale: 'fr' },
  { id: 'user-client-amel', name: 'Amel Benali', email: 'amel@example.dz', role: 'client', avatar: avatarFor('Amel Benali'), locale: 'fr' },
  { id: 'user-admin', name: 'Nadia Cherifi', email: 'admin@dzaircraft.dz', role: 'admin', avatar: avatarFor('Nadia Cherifi'), locale: 'en' },

  // ── Remaining craftsman accounts (one per craftsman record) ─────────────────
  { id: 'user-c2', name: 'Brahim Cherif', email: 'brahim@dzaircraft.dz', role: 'craftsman', avatar: avatarFor('Brahim Cherif'), locale: 'ar' },
  { id: 'user-c3', name: 'Naïma Boukhalfa', email: 'naima@dzaircraft.dz', role: 'craftsman', avatar: avatarFor('Naima Boukhalfa'), locale: 'fr' },
  { id: 'user-c4', name: 'Slimane Haddad', email: 'slimane@dzaircraft.dz', role: 'craftsman', avatar: avatarFor('Slimane Haddad'), locale: 'ar' },
  { id: 'user-c5', name: 'Farida Belkacem', email: 'farida@dzaircraft.dz', role: 'craftsman', avatar: avatarFor('Farida Belkacem'), locale: 'fr' },
  { id: 'user-c6', name: 'Karim Ould Ali', email: 'karim.o@dzaircraft.dz', role: 'craftsman', avatar: avatarFor('Karim Ould Ali'), locale: 'ar' },
  { id: 'user-c7', name: 'Lila Mansouri', email: 'lila@dzaircraft.dz', role: 'craftsman', avatar: avatarFor('Lila Mansouri'), locale: 'fr' },
  { id: 'user-c8', name: 'Rachid Zerrouki', email: 'rachid@dzaircraft.dz', role: 'craftsman', avatar: avatarFor('Rachid Zerrouki'), locale: 'ar' },
  { id: 'user-c9', name: 'Souad Hamidi', email: 'souad@dzaircraft.dz', role: 'craftsman', avatar: avatarFor('Souad Hamidi'), locale: 'fr' },
  { id: 'user-c10', name: 'Amine Drici', email: 'amine@dzaircraft.dz', role: 'craftsman', avatar: avatarFor('Amine Drici'), locale: 'fr' },
  { id: 'user-c11', name: 'Hocine Lalmi', email: 'hocine@dzaircraft.dz', role: 'craftsman', avatar: avatarFor('Hocine Lalmi'), locale: 'ar' },
  { id: 'user-c12', name: 'Djamila Saadi', email: 'djamila@dzaircraft.dz', role: 'craftsman', avatar: avatarFor('Djamila Saadi'), locale: 'fr' },
  { id: 'user-c13', name: 'Tarek Benhamou', email: 'tarek@dzaircraft.dz', role: 'craftsman', avatar: avatarFor('Tarek Benhamou'), locale: 'ar' },

  // ── Extra clients (for reviews & commissions) ───────────────────────────────
  { id: 'user-client-omar', name: 'Omar Tlili', email: 'omar@example.dz', role: 'client', avatar: avatarFor('Omar Tlili'), locale: 'ar' },
  { id: 'user-client-sara', name: 'Sara Khelifi', email: 'sara@example.dz', role: 'client', avatar: avatarFor('Sara Khelifi'), locale: 'en' },
];

/** Resolve a user by id (used by mock api/ functions). */
export const findUser = (id: string): User | undefined =>
  users.find((u) => u.id === id);

/** One representative account per role — backs `loginAs(role)` and RoleSwitcher. */
export const demoUsers: Record<Role, User> = {
  client: users.find((u) => u.id === 'user-client-amel')!,
  craftsman: users.find((u) => u.id === 'user-c1')!,
  admin: users.find((u) => u.id === 'user-admin')!,
};
