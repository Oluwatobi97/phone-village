import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SessionStore, SellerStore, sanitizeUser } from '../../../../lib/authStore';
import { ApiResponse } from '../../../../../../shared/types/api';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('pv_session')?.value;

    if (!sessionId) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Not authenticated.' },
      };
      return NextResponse.json(response, { status: 401 });
    }

    const user = SessionStore.getSessionUser(sessionId);
    if (!user) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Session expired or invalid.' },
      };
      return NextResponse.json(response, { status: 401 });
    }

    const sellerProfile = SellerStore.getProfileByUserId(user.id);
    const listingEligibility = SellerStore.checkListingEligibility(user.id);

    const response: ApiResponse = {
      success: true,
      data: {
        user: sanitizeUser(user),
        sellerProfile: sellerProfile || null,
        listingEligibility,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Me route error:', error);
    const response: ApiResponse = {
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error checking session.' },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
