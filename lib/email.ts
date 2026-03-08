export async function sendPurchaseEmail({
  email,
  name,
  pluginName,
  licenseKey,
  downloadToken,
}: {
  email: string;
  name: string;
  pluginName: string;
  licenseKey: string;
  downloadToken: string;
}) {
  const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/download/${downloadToken}`;
  const senderApiToken = process.env.SENDER_API_TOKEN;

  // Render HTML content
  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #3B82F6;">Thank you for your purchase, ${name}!</h2>
      <p>Your order for <strong>${pluginName}</strong> was successful.</p>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Your License Key</p>
        <p style="margin: 10px 0 0 0; font-family: monospace; font-size: 20px; font-weight: bold; color: #111;">${licenseKey}</p>
      </div>

      <a href="${downloadUrl}" style="display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Download Plugin</a>
      
      <p style="margin-top: 30px; font-size: 14px; color: #888;">
        This download link will expire in 24 hours. If you need a new link, please visit our support page.
      </p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
      <p style="font-size: 12px; color: #aaa;">© ${new Date().getFullYear()} PluginMarket. One-time payment, lifetime updates.</p>
    </div>
  `;

  try {
    const response = await fetch('https://api.sender.net/v2/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${senderApiToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        from: {
          email: 'info@thoughtsrefilling.com', // Updated to match user's apparent domain
          name: 'PluginMarket',
        },
        to: [
          {
            email: email,
            name: name,
          },
        ],
        subject: `Your License Key for ${pluginName}`,
        html: htmlContent,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending email via Sender.net:', error);
    throw error;
  }
}
