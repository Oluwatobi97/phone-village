import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SessionStore } from '../../../../lib/authStore';
import { ApiResponse } from '../../../../../../shared/types/api';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('pv_session')?.value;

    if (sessionId) {
      SessionStore.invalidateSession(sessionId);
    }

    const res = NextResponse.json({
      success: true,
      message: 'Logged out successfully.',
    } as ApiResponse, { status: 200 });

    res.cookies.set('pv_session', '', {
      httpOnly: true,
      path: '/',
      expires: new Date(0),
    });

    return res;
  } catch (error) {
    console.error('Logout error:', error);
    const response: ApiResponse = {
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error during logout.' },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
