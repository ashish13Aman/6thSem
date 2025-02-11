export type Role = 'user' | 'admin' | 'issuer';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  role: Role | null;
}

export interface User {
  id: string;
  email?: string;
  phone?: string;
  name: string;
  role: Role;
}