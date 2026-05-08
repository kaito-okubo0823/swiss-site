import { NextResponse } from 'next/server';

type ContactData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // honeypot
};

export async function POST(request: Request) {
  try {
    const data: ContactData = await request.json();

    // ハニーポット (botは隠しフィールドに記入する)
    if (data.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL_TO;
    const fromEmail = process.env.RESERVATION_EMAIL_FROM;

    if (apiKey && toEmail && fromEmail) {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: data.email,
        subject: `📩 ${data.subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h3>Contact from ${data.name}</h3>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <hr />
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
        `,
      });

      return NextResponse.json({ ok: true, mode: 'live' });
    }

    console.log('[Contact MOCK]', data);
    return NextResponse.json({ ok: true, mode: 'mock' });
  } catch (e) {
    console.error('Contact error:', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
