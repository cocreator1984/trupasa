import {NextResponse} from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const email = String(data?.email || '').trim();
    const role = String(data?.role || '').trim();

    // Basic email validation
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json({ok: false, error: 'Invalid email'}, {status: 400});
    }

    // In Phase 1 we don't persist; treat as success.
    // Hook up to Formspree/Mailchimp or DB in Phase 2.
    return NextResponse.json({ok: true, email, role});
  } catch (e) {
    return NextResponse.json({ok: false, error: 'Bad request'}, {status: 400});
  }
}
