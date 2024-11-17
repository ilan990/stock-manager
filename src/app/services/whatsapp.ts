// app/services/whatsapp.ts
import querystring from 'querystring';
import https from 'https';
import prisma from '@/lib/prisma';

interface WhatsAppMessageOptions {
  to: string;
  body: string;
}

export async function sendWhatsAppMessage({ to, body }: WhatsAppMessageOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      hostname: 'api.ultramsg.com',
      path: `/${process.env.ULTRASMG_INSTANCE_ID}/messages/chat`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    };

    const req = https.request(options, (res) => {
      const chunks: Buffer[] = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const body = Buffer.concat(chunks);
        console.log('WhatsApp API Response:', body.toString());
        resolve();
      });
    });

    req.on('error', (error) => {
      console.error('Error sending WhatsApp message:', error);
      reject(error);
    });

    const postData = querystring.stringify({
      token: process.env.ULTRASMG_AUTH_TOKEN,
      to: to,
      body: body
    });

    req.write(postData);
    req.end();
  });
}

export async function createMessage(bottleId: string, newQuantity: number): Promise<void> {
  try {
    // Récupérer les informations de la bouteille
    const bottle = await prisma.bottle.findUnique({
      where: { id: bottleId }
    });

    if (!bottle) {
      throw new Error(`Bottle with ID ${bottleId} not found`);
    }

    // Construire le message
    const message = `Alert: Le stock de ${bottle.name} est bas (${newQuantity} restants)`;

    // Envoyer le message WhatsApp
    await sendWhatsAppMessage({
      to: '+33783769291',
      body: message
    });

  } catch (error) {
    console.error('Error creating and sending WhatsApp message:', error);
    throw error;
  }
}