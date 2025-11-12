// app/api/users/me/route.ts
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/app/api/api';
import { isAxiosError } from 'axios';

export async function GET() {
  try {
    const cookieStore = await cookies();

    const res = await api.get('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Users/me GET error', {
        path: '/users/me',
        status: error.status ?? error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? error.response?.status ?? 500 },
      );
    }
    console.error('Unexpected Users/me GET error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const body = await request.json();

    const res = await api.patch('/users/me', body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Users/me PATCH error', {
        path: '/users/me',
        status: error.status ?? error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? error.response?.status ?? 500 },
      );
    }
    console.error('Unexpected Users/me PATCH error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
