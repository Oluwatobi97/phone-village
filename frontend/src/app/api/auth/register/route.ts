import { NextResponse } from 'next/server';
import { UserStore, checkRateLimit } from '../../../../lib/authStore';
import { RegisterInput } from '../../../../../../shared/types/auth';
import { ApiResponse } from '../../../../../../shared/types/api';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(`reg_${ip}`, 10, 15 * 60 * 1000)) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'RATE_LIMITED', message: 'Too many registration attempts. Please try again later.' },
      };
      return NextResponse.json(response, { status: 429 });
    }

    const body: RegisterInput = await request.json();

    if (!body.email || !body.email.includes('@')) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Valid email address is required.' },
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (!body.phone || body.phone.trim().length < 10) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Valid phone number is required.' },
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (!body.password || body.password.length < 8) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Password must be at least 8 characters long.' },
      };
      return NextResponse.json(response, { status: 400 });
    }

    try {
      const { user, rawVerificationToken } = UserStore.registerUser(body);

      const response: ApiResponse = {
        success: true,
        message: 'Account registered successfully. Please verify your email.',
        data: {
          user,
          verificationToken: rawVerificationToken,
        },
      };

      return NextResponse.json(response, { status: 201 });
    } catch (err) {
      const errorObj = err as Error;
      if (errorObj.message === 'DUPLICATE_EMAIL') {
        const response: ApiResponse = {
          success: false,
          error: { code: 'DUPLICATE_ACCOUNT', message: 'An account with this email address already exists.' },
        };
        return NextResponse.json(response, { status: 409 });
      }
      if (errorObj.message === 'DUPLICATE_PHONE') {
        const response: ApiResponse = {
          success: false,
          error: { code: 'DUPLICATE_ACCOUNT', message: 'An account with this phone number already exists.' },
        };
        return NextResponse.json(response, { status: 409 });
      }
      throw err;
    }
  } catch (error) {
    console.error('Registration error:', error);
    const response: ApiResponse = {
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error during registration.' },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
