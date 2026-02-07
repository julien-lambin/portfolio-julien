import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { 
        clientName, firstName, lastName, companyName,
        logo, photos, logoName, photoNames, // Base64 strings and names
        presentation, services,
        phone, email, address, hours, socials, transferLink
    } = req.body;

    const attachments = [];

    if (logo) {
      // Split to remove "data:image/png;base64," prefix if present
      const content = logo.includes(',') ? logo.split(',')[1] : logo;
      attachments.push({
        content,
        filename: logoName || 'logo.png',
      });
    }

    if (photos && Array.isArray(photos)) {
      photos.forEach((photo, index) => {
        if (photo) {
            const content = photo.includes(',') ? photo.split(',')[1] : photo;
            attachments.push({
                content,
                filename: (photoNames && photoNames[index]) || `photo-${index + 1}.png`,
            });
        }
      });
    }

    const escapeHtml = (str: string) => str?.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m] || m)) || '';

    const { data, error } = await resend.emails.send({
      from: 'Onboarding <onboarding@resend.dev>',
      to: 'julienldev@gmail.com',
      subject: `[ONBOARDING] Nouveau dossier : ${companyName}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #2563eb;">📁 Nouveau dossier d'Onboarding</h2>
            <p><strong>Client :</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)} (${escapeHtml(clientName) || 'N/A'})</p>
            
            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 8px;">1. Identité</h3>
            <p><strong>Entreprise :</strong> ${escapeHtml(companyName)}</p>
            
            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 8px;">2. Contenu</h3>
            <div style="background: #f8fafc; padding: 15px; rounded: 8px;">
                <p><strong>Présentation :</strong><br>${escapeHtml(presentation).replace(/\n/g, '<br>') || 'N/A'}</p>
                <p><strong>Services :</strong><br>${escapeHtml(services).replace(/\n/g, '<br>') || 'N/A'}</p>
                <p><strong>Lien de transfert :</strong> ${transferLink ? `<a href="${transferLink}" style="color: #2563eb;">${escapeHtml(transferLink)}</a>` : 'Aucun'}</p>
            </div>
            
            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 8px;">3. Contact</h3>
            <ul style="list-style: none; padding: 0;">
                <li><strong>Email :</strong> ${escapeHtml(email)}</li>
                <li><strong>Téléphone :</strong> ${escapeHtml(phone) || 'N/A'}</li>
                <li><strong>Adresse :</strong> ${escapeHtml(address) || 'N/A'}</li>
            </ul>

            <h3 style="border-bottom: 1px solid #eee; padding-bottom: 8px;">4. Horaires</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <thead>
                    <tr style="background: #f8fafc; text-align: left;">
                        <th style="padding: 8px; border: 1px solid #eee;">Jour</th>
                        <th style="padding: 8px; border: 1px solid #eee;">Matin</th>
                        <th style="padding: 8px; border: 1px solid #eee;">Après-midi</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(hours as Record<string, any>).map(([day, sched]) => `
                        <tr>
                            <td style="padding: 8px; border: 1px solid #eee;"><strong>${day}</strong></td>
                            <td style="padding: 8px; border: 1px solid #eee;">
                                ${sched.closed ? '<span style="color: #ef4444;">Fermé</span>' : `${sched.amStart} - ${sched.amEnd}`}
                            </td>
                            <td style="padding: 8px; border: 1px solid #eee;">
                                ${sched.closed ? '<span style="color: #ef4444;">Fermé</span>' : `${sched.pmStart} - ${sched.pmEnd}`}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div style="margin-top: 20px;">
                <p><strong>Réseaux :</strong> ${escapeHtml(socials) || 'N/A'}</p>
            </div>
        </div>
      `,
      attachments,
    });

    if (error) {
      console.error("Resend API error:", error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error("Server error:", err);
    return res.status(500).json({ error: err.message || 'Une erreur interne est survenue.' });
  }
}
