import { cookies } from 'next/headers';

export const ADMIN_TOKEN_NAME = 'bbdautos_admin_auth';
export const ADMIN_SECRET_VALUE = 'bbd_authenticated_session_secret_2026';

export function isAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_TOKEN_NAME);
    return token?.value === ADMIN_SECRET_VALUE;
  } catch {
    return false;
  }
}
