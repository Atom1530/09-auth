// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';
import type { ApiError } from '@/app/api/api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();

    const { data, headers } = await api.post('/auth/login', userData);

    const resCookies = headers['set-cookie'];
    if (!resCookies) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cookiesArray = Array.isArray(resCookies) ? resCookies : [resCookies];
    const cookiesData = await cookies();

    for (const cookieItem of cookiesArray) {
      const parsed = parse(cookieItem);

      const options = {
        maxAge: Number(parsed['Max-Age']),
        path: parsed.path,
        expires: parsed.expires ? new Date(parsed.expires) : undefined,
      };

      if (parsed.accessToken) {
        cookiesData.set('accessToken', parsed.accessToken, options);
      }
      if (parsed.refreshToken) {
        cookiesData.set('refreshToken', parsed.refreshToken, options);
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    const resErr = error as ApiError;

    return NextResponse.json(
      { error: resErr.response?.data?.error ?? resErr.message },
      { status: resErr.status },
    );
  }
}
