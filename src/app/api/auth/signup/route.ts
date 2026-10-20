import { NextRequest, NextResponse } from 'next/server';
import { fetchFromBackend } from '@/lib/api-client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 },
      );
    }

    const payload: Record<string, unknown> = { email, password };
    if (firstName && typeof firstName === 'string' && firstName.trim()) {
      payload.firstName = firstName.trim();
    }
    if (lastName && typeof lastName === 'string' && lastName.trim()) {
      payload.lastName = lastName.trim();
    }

    const result = await fetchFromBackend('/users/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!result.ok) {
      const errorMsg =
        typeof result.data === 'object' && result.data !== null && 'message' in result.data
          ? Array.isArray((result.data as { message: unknown }).message)
            ? (result.data as { message: string[] }).message.join(', ')
            : String((result.data as { message: unknown }).message)
          : 'Failed to sign up';

      return NextResponse.json(
        {
          success: false,
          error: errorMsg,
          details: result.data,
          coldStart: result.coldStart,
          durationMs: result.durationMs,
        },
        { status: result.status },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: result.data,
        coldStart: result.coldStart,
        durationMs: result.durationMs,
      },
      { status: 201 },
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
