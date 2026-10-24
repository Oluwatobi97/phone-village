import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SessionStore, SellerStore } from '../../../../lib/authStore';
import { SellerOnboardingInput } from '../../../../../../shared/types/seller';
import { ApiResponse } from '../../../../../../shared/types/api';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('pv_session')?.value;

    if (!sessionId) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required to onboard as a seller.' },
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

    const body: SellerOnboardingInput = await request.json();

    if (!body.storeName || body.storeName.trim().length < 2) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Store / Display name is required.' },
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (!body.contactPhone || body.contactPhone.trim().length < 10) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Valid contact phone is required.' },
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (!body.physicalAddress || body.physicalAddress.trim().length < 5) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Physical shop/store address is required.' },
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (!body.termsAccepted) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Seller terms and IMEICheck safety rules must be accepted.' },
      };
      return NextResponse.json(response, { status: 400 });
    }

    const profile = SellerStore.upsertProfile(user.id, body);
    const eligibility = SellerStore.checkListingEligibility(user.id);

    const response: ApiResponse = {
      success: true,
      message: 'Seller profile created and verified successfully.',
      data: {
        profile,
        eligibility,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Sellers onboard error:', error);
    const response: ApiResponse = {
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error during seller onboarding.' },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
