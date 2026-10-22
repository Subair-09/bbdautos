import { NextResponse } from 'next/server';
import { ADMIN_TOKEN_NAME } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete(ADMIN_TOKEN_NAME);
  return response;
}
