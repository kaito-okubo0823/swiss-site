import { NextResponse } from 'next/server';

/**
 * 予約フォーム送信エンドポイント
 *
 * 環境変数:
 *   RESEND_API_KEY        - Resend APIキー (未設定時はモック動作)
 *   RESERVATION_EMAIL_TO  - 受信メールアドレス
 *   RESERVATION_EMAIL_FROM - 送信元 (例: noreply@your-domain.ch)
 */

type ReservationData = {
  date: string;
  time: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  occasion?: string;
  notes?: string;
  locale?: string;
};

export async function POST(request: Request) {
  try {
    const data: ReservationData = await request.json();

    // バリデーション
    if (!data.name || !data.email || !data.date || !data.time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.RESERVATION_EMAIL_TO;
    const fromEmail = process.env.RESERVATION_EMAIL_FROM;

    // 本番モード: Resend API でメール送信
    if (apiKey && toEmail && fromEmail) {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);

      // 店舗宛通知
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `🍽️ 新規予約: ${data.name} (${data.date} ${data.time})`,
        html: buildShopEmailHtml(data),
      });

      // 顧客宛確認メール
      await resend.emails.send({
        from: fromEmail,
        to: data.email,
        subject: 'Alpine Kitchen — Reservation Confirmation',
        html: buildCustomerEmailHtml(data),
      });

      return NextResponse.json({ ok: true, mode: 'live' });
    }

    // モックモード: ログ出力のみ
    console.log('[Reservation MOCK]', data);
    return NextResponse.json({ ok: true, mode: 'mock' });
  } catch (e) {
    console.error('Reservation error:', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

function buildShopEmailHtml(d: ReservationData) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #c9a961;">新規予約</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>日時</strong></td><td>${d.date} ${d.time}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>人数</strong></td><td>${d.guests}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>お名前</strong></td><td>${d.name}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email</strong></td><td>${d.email}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>電話</strong></td><td>${d.phone}</td></tr>
        ${d.occasion ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>機会</strong></td><td>${d.occasion}</td></tr>` : ''}
        ${d.notes ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>備考</strong></td><td>${d.notes}</td></tr>` : ''}
      </table>
    </div>
  `;
}

function buildCustomerEmailHtml(d: ReservationData) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #c9a961;">Alpine Kitchen</h2>
      <p>Dear ${d.name},</p>
      <p>Thank you for your reservation. Below are the details:</p>
      <ul>
        <li><strong>Date:</strong> ${d.date}</li>
        <li><strong>Time:</strong> ${d.time}</li>
        <li><strong>Guests:</strong> ${d.guests}</li>
      </ul>
      <p>We look forward to welcoming you.<br />Alpine Kitchen Team</p>
    </div>
  `;
}
