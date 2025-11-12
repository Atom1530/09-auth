// app/api/notes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import type { AxiosError } from 'axios';
import { api } from '@/lib/api/api';

type ApiErr = AxiosError<{ error?: string }>;

function errorResponse(err: unknown) {
  const error = err as ApiErr;
  const status = error.response?.status ?? 500;
  const msg = error.response?.data?.error ?? error.message ?? 'Unknown error';
  return NextResponse.json({ error: msg }, { status });
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    const { data } = await api.get('/notes', {
      params,
      headers: { Cookie: req.headers.get('cookie') ?? '' },
      withCredentials: true,
    });

    return NextResponse.json(data);
  } catch (err) {
    return errorResponse(err);
  }
}
