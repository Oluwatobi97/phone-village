import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SessionStore, SellerStore } from '../../../../lib/authStore';
import { ApiResponse } from '../../../../../../shared/types/api';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('pv_session')?.value;

    if (!sessionId) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required.' },
      };
      return NextResponse.json(response, { status: 401 });
    }

    const user = SessionStore.getSessionUser(sessionId);
    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Invalid session.' },
      };
      return NextResponse.json(response, { status: 401 });
    }

    const profile = SellerStore.getProfileByUserId(user.id);

    const response: ApiResponse = {
      success: true,
      data: {
        hasProfile: Boolean(profile),
        status: profile ? profile.status : 'NOT_ONBOARDED',
        profile: profile || null,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Sellers status error:', error);
    const response: ApiResponse = {
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error checking seller status.' },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
