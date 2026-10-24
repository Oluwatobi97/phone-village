import { NextResponse } from 'next/server';
import { UserStore, TokenStore, checkRateLimit } from '../../../../lib/authStore';
import { ApiResponse } from '../../../../../../shared/types/api';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Email address is required.' },
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (!checkRateLimit(`resend_${email}`, 3, 15 * 60 * 1000)) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'RATE_LIMITED', message: 'Too many resend attempts. Please wait 15 minutes.' },
      };
      return NextResponse.json(response, { status: 429 });
    }

    const user = UserStore.findUserByEmail(email);
    if (user && !user.emailVerified) {
      const newToken = TokenStore.createVerificationToken(user.id);
      
      const response: ApiResponse = {
        success: true,
        message: 'If an unverified account exists, a new verification link has been re-issued.',
        data: { verificationToken: newToken },
      };
      return NextResponse.json(response, { status: 200 });
    }

    // Generic response to prevent user enumeration
    const response: ApiResponse = {
      success: true,
      message: 'If an unverified account exists, a new verification link has been re-issued.',
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Resend verification error:', error);
    const response: ApiResponse = {
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error during resend.' },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
