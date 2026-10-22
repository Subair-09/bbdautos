import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_TOKEN_NAME, ADMIN_SECRET_VALUE } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const validUser = process.env.ADMIN_USER || 'admin';
    const validPass = process.env.ADMIN_PASSWORD || 'bbdautos2026';

    if (
      username?.trim().toLowerCase() === validUser.toLowerCase() &&
      password?.trim() === validPass
    ) {
      const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });
      response.cookies.set(ADMIN_TOKEN_NAME, ADMIN_SECRET_VALUE, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid administrator credentials. Please check your username and password.' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
