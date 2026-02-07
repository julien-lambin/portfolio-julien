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
        phone, email, address, hours, socials
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

    const { data, error } = await resend.emails.send({
      from: 'Onboarding <onboarding@resend.dev>',
      to: 'julienldev@gmail.com',
      subject: `[ONBOARDING] Nouveau dossier : ${companyName}`,
      replyTo: email,
      html: `
        <h1>Nouveau Dossier Client : ${companyName}</h1>
        <p><strong>Client :</strong> ${firstName} ${lastName} (${clientName || 'N/A'})</p>
        
        <h2>1. Identité</h2>
        <p><strong>Entreprise :</strong> ${companyName}</p>
        
        <h2>2. Contenu</h2>
        <h3>Présentation</h3>
        <p>${presentation?.replace(/\n/g, '<br>') || 'Non renseigné'}</p>
        <h3>Services</h3>
        <p>${services?.replace(/\n/g, '<br>') || 'Non renseigné'}</p>
        
        <h2>3. Contact</h2>
        <ul>
            <li><strong>Email :</strong> ${email}</li>
            <li><strong>Téléphone :</strong> ${phone}</li>
            <li><strong>Adresse :</strong> ${address}</li>
            <li><strong>Horaires :</strong> ${hours}</li>
            <li><strong>Réseaux :</strong> ${socials}</li>
        </ul>
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
