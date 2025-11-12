// app/api/notes/[id]/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/app/api/api';
import { isAxiosError } from 'axios';

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;

    const res = await api(`/notes/${id}`, {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Notes GET error', {
        path: '/notes/[id]',
        status: error.response?.status ?? error.status,
        message: error.message,
        data: error.response?.data,
      });
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? error.response?.status ?? 500 },
      );
    }
    console.error('Unexpected Notes GET error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;

    const res = await api.delete(`/notes/${id}`, {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Notes DELETE error', {
        path: '/notes/[id]',
        status: error.response?.status ?? error.status,
        message: error.message,
        data: error.response?.data,
      });
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? error.response?.status ?? 500 },
      );
    }
    console.error('Unexpected Notes DELETE error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;
    const body = await request.json();

    const res = await api.patch(`/notes/${id}`, body, {
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Notes PATCH error', {
        path: '/notes/[id]',
        status: error.response?.status ?? error.status,
        message: error.message,
        data: error.response?.data,
      });
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? error.response?.status ?? 500 },
      );
    }
    console.error('Unexpected Notes PATCH error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
