import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  // CORS configuration (optional, but good practice if calling from different origin)
  // res.setHeader('Access-Control-Allow-Credentials', 'true');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  // res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Des champs obligatoires sont manquants.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'PORTFOLIO Contact <onboarding@resend.dev>',
      to: 'julienldev@gmail.com',
      subject: `[NOUVEAU PROJET] - ${name}`,
      replyTo: email,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #3b82f6; background-color: #f8fafc;">
          <strong>Message :</strong><br>
          ${message.replace(/\n/g, '<br>')}
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: 'Une erreur interne est survenue.' });
  }
}
