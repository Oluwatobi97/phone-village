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

    const eligibility = SellerStore.checkListingEligibility(user.id);

    const response: ApiResponse = {
      success: true,
      data: eligibility,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Sellers eligibility error:', error);
    const response: ApiResponse = {
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error checking eligibility.' },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
