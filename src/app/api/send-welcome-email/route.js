// File: src/app/api/send-welcome-email/route.js

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY); // USE "RESEND_API_KEY" not REACT_APP_

export async function POST(req) {
  try {
    const { email } = await req.json();

    const data = await resend.emails.send({
      from: 'FreshAI <onboarding@resend.dev>',
      to: email,
      subject: 'Thank you for joining the waitlist!',
      text: `Hello,\n\nThank you for signing up for FreshAI's waitlist! We will notify you once we launch.\n\nBest,\nFreshAI Team`,
      html: `<p>Hello,</p><p>Thank you for signing up for FreshAI's waitlist!</p><p>– The FreshAI Team</p>`,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Email error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
}
