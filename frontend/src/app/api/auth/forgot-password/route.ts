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

    if (!checkRateLimit(`forgot_${email}`, 3, 15 * 60 * 1000)) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'RATE_LIMITED', message: 'Too many password reset requests. Please wait 15 minutes.' },
      };
      return NextResponse.json(response, { status: 429 });
    }

    const user = UserStore.findUserByEmail(email);
    if (user) {
      const resetToken = TokenStore.createPasswordResetToken(user.id);
      
      const response: ApiResponse = {
        success: true,
        message: 'If an account exists for this email, password reset instructions have been re-issued.',
        data: { resetToken },
      };
      return NextResponse.json(response, { status: 200 });
    }

    // Generic response to prevent user enumeration
    const response: ApiResponse = {
      success: true,
      message: 'If an account exists for this email, password reset instructions have been re-issued.',
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Forgot password error:', error);
    const response: ApiResponse = {
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error during password reset request.' },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
