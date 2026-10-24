import { NextResponse } from 'next/server';
import { MOCK_LISTINGS } from '../../../data/mockData';
import { ApiResponse } from '../../../../../shared/types/api';

export async function GET() {
  const response: ApiResponse = {
    success: true,
    data: MOCK_LISTINGS,
  };
  return NextResponse.json(response, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.price) {
      const response: ApiResponse = {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Phone title and price are required.' },
      };
      return NextResponse.json(response, { status: 400 });
    }

    const newListing = {
      id: `ph-api-${Date.now()}`,
      ...body,
      postedDate: 'Just now',
    };

    const response: ApiResponse = {
      success: true,
      message: 'Phone listing created successfully.',
      data: newListing,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('API Phones error:', error);
    const response: ApiResponse = {
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error creating listing.' },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
