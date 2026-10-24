import { NextResponse } from 'next/server';
import { UserStore, SessionStore, hashPassword, checkRateLimit, sanitizeUser } from '../../../../lib/authStore';
import { ApiResponse } from '../../../../../../shared/types/api';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(`login_${ip}`, 10, 15 * 60 * 1000)) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'RATE_LIMITED', message: 'Too many failed login attempts. Please wait 15 minutes.' },
      };
      return NextResponse.json(response, { status: 429 });
    }

    const { identifier, password } = await request.json();

    if (!identifier || !password) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Identifier and password are required.' },
      };
      return NextResponse.json(response, { status: 400 });
    }

    const user = UserStore.findUserByIdentifier(identifier);
    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid phone/email or password.' },
      };
      return NextResponse.json(response, { status: 401 });
    }

    const inputHash = hashPassword(password);
    if (inputHash !== user.passwordHash) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid phone/email or password.' },
      };
      return NextResponse.json(response, { status: 401 });
    }

    const sessionId = SessionStore.createSession(user.id);

    const res = NextResponse.json({
      success: true,
      message: 'Login successful.',
      data: {
        user: sanitizeUser(user),
      },
    } as ApiResponse, { status: 200 });

    res.cookies.set('pv_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (error) {
    console.error('Login error:', error);
    const response: ApiResponse = {
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error during login.' },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
