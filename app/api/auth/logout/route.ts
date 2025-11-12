// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/app/api/api';
import { isAxiosError } from 'axios';

export async function POST() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    await api.post('/auth/logout', null, {
      headers: {
        Cookie: `accessToken=${accessToken ?? ''}; refreshToken=${refreshToken ?? ''}`,
      },
    });

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Auth logout error', {
        path: '/auth/logout',
        status: error.response?.status ?? error.status,
        message: error.message,
        data: error.response?.data,
      });
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? error.response?.status ?? 500 },
      );
    }

    console.error('Unexpected logout error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
