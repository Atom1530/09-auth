// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api'; // проверь, чтобы путь совпадал с твоей структурой
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post('/auth/login', body);

    const cookieStore = await cookies();
    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
        };

        if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
        if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
      }

      return NextResponse.json(apiRes.data, { status: apiRes.status });
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Auth login error', {
        path: '/auth/login',
        status: error.response?.status ?? error.status,
        message: error.message,
        data: error.response?.data,
      });

      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? error.response?.status ?? 500 },
      );
    }

    console.error('Unexpected login error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
