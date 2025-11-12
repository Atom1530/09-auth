//app/api/auth/session/route.ts
import { api, ApiError } from '@/app/api/api';
import { parse } from 'cookie';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const { data, headers } = await api.get('/auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const resCookies = headers['set-cookie'];
    if (resCookies) {
      const cookiesArray = Array.isArray(resCookies) ? resCookies : [resCookies];
      for (const cookieItem of cookiesArray) {
        const parsed = parse(cookieItem);

        const options: Partial<ResponseCookie> = {
          maxAge: Number(parsed['Max-Age']),
          path: parsed.path,
          expires: parsed.expires ? new Date(parsed.expires) : undefined,
        };

        if (parsed.accessToken) {
          cookieStore.set('accessToken', parsed.accessToken, options);
        }
        if (parsed.refreshToken) {
          cookieStore.set('refreshToken', parsed.refreshToken, options);
        }
      }

      return NextResponse.json(data);
    }
    return NextResponse.json({ success: false });
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as ApiError).response?.data?.error ?? (error as ApiError).message,
      },
      { status: (error as ApiError).status },
    );
  }
}
