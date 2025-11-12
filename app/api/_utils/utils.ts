import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../api';

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;

    const perPage = Number(sp.get('perPage') ?? 12);
    const page = Number(sp.get('page') ?? 1);
    const search = sp.get('search') ?? '';
    const sortBy = sp.get('sortBy') ?? 'created';
    const tag = sp.get('tag');

    const params: Record<string, string | number> = {
      perPage,
      page,
      search,
      sortBy,
    };
    if (tag) params.tag = tag;

    const { data } = await api.get('/notes', { params });
    return NextResponse.json(data);
    // --------------
  } catch (error) {
    const err = error as ApiError;
    return NextResponse.json(
      { error: err.response?.data?.error ?? err.message },
      { status: err.response?.status ?? 500 },
    );
  }
}
