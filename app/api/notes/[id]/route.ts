// app/api/notes/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '@/lib/api/api';
import type { Note } from '@/types/note';
import { cookies } from 'next/headers';

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: NextRequest, { params }: Props) {
  const { id } = await params;

  try {
    const cookieHeader = cookies().toString();

    const { data } = await api.get<Note>(`/notes/${id}`, {
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
export async function POST(_req: NextRequest, { params }: Props) {
  const { id } = await params;

  try {
    const cookieHeader = cookies().toString();

    const { data } = await api.get<Note>(`/notes/${id}`, {
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
