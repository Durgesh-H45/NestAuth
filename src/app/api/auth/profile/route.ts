import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME, fetchFromBackend } from '@/lib/api-client';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: No active session' },
        { status: 401 },
      );
    }

    const result = await fetchFromBackend('/users/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result.ok) {
      if (result.status === 401) {
        // Token expired or invalid, remove stale cookie
        cookieStore.delete(AUTH_COOKIE_NAME);
      }
      return NextResponse.json(
        {
          success: false,
          error:
            result.status === 401
              ? 'Session expired. Please log in again.'
              : 'Failed to fetch user profile',
          details: result.data,
          coldStart: result.coldStart,
          durationMs: result.durationMs,
        },
        { status: result.status },
      );
    }

    return NextResponse.json({
      success: true,
      user: result.data,
      coldStart: result.coldStart,
      durationMs: result.durationMs,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
