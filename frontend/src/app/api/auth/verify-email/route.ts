import { NextResponse } from 'next/server';
import { TokenStore, UserStore } from '../../../../lib/authStore';
import { ApiResponse } from '../../../../../../shared/types/api';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Verification token is required.' },
      };
      return NextResponse.json(response, { status: 400 });
    }

    const tokenRecord = TokenStore.verifyAndConsumeToken(token, 'VERIFICATION');
    if (!tokenRecord) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'Verification token is invalid, expired, or already used.' },
      };
      return NextResponse.json(response, { status: 400 });
    }

    UserStore.verifyEmail(tokenRecord.userId);

    const response: ApiResponse = {
      success: true,
      message: 'Email address verified successfully. You can now use all buyer features.',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Verify email error:', error);
    const response: ApiResponse = {
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error during email verification.' },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
