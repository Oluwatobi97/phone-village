import { NextResponse } from 'next/server';
import { TokenStore, UserStore, SessionStore } from '../../../../lib/authStore';
import { ApiResponse } from '../../../../../../shared/types/api';

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword || newPassword.length < 8) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Token and new password (min 8 characters) are required.' },
      };
      return NextResponse.json(response, { status: 400 });
    }

    const tokenRecord = TokenStore.verifyAndConsumeToken(token, 'PASSWORD_RESET');
    if (!tokenRecord) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'Password reset token is invalid, expired, or already used.' },
      };
      return NextResponse.json(response, { status: 400 });
    }

    UserStore.updatePassword(tokenRecord.userId, newPassword);
    
    // Security Best Practice: Invalidate existing sessions after password change
    SessionStore.invalidateAllUserSessions(tokenRecord.userId);

    const response: ApiResponse = {
      success: true,
      message: 'Password updated successfully. Please log in with your new password.',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Reset password error:', error);
    const response: ApiResponse = {
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error during password reset.' },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
