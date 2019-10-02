import { sendTestEmail } from '../../context/user-notifications/email';

export default async function(fastify, opts) {
  // TODO: (bdietz) - add role checking for admin
  fastify.post('/admin/email/test', async function({
    body: { email, subject, text },
  }) {
    await sendTestEmail({ email, subject, text });
    return { sent: true };
  });
}
