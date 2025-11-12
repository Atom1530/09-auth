import { api, ApiError } from '@/lib/api/api';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const { data } = await api.post(
      '/auth/logout',
      {},
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as ApiError).response?.data?.error ?? (error as ApiError).message,
      },
      { status: (error as ApiError).status },
    );
  }
}
