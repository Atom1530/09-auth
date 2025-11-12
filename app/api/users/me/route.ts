// app/api/users/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api, ApiError } from '@/lib/api/api';
import type { User } from '@/types/user';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const { data } = await api.get<User>('/users/me', {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    });

    return NextResponse.json(data);
  } catch (error) {
    const err = error as ApiError;
    const status = err.response?.status ?? 500;
    const message = err.response?.data?.error ?? err.message;

    return NextResponse.json({ error: message }, { status });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const { data } = await api.patch<User>('/users/me', body, {
      headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    });

    return NextResponse.json(data);
  } catch (error) {
    const err = error as ApiError;
    const status = err.response?.status ?? 500;
    const message = err.response?.data?.error ?? err.message;

    return NextResponse.json({ error: message }, { status });
  }
}
