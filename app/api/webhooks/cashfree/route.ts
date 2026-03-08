import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateLicenseKey } from '@/lib/license';
import { sendPurchaseEmail } from '@/lib/email';
import { cashfree } from '@/lib/cashfree';

export async function POST(request: Request) {
    try {
        const rawBody = await request.text();
        const signature = request.headers.get('x-webhook-signature');
        const timestamp = request.headers.get('x-webhook-timestamp');

        if (!signature || !timestamp) {
            return NextResponse.json({ error: 'Missing headers' }, { status: 400 });
        }

        // Use SDK to verify signature
        let event;
        try {
            event = cashfree.PGVerifyWebhookSignature(signature, rawBody, timestamp);
        } catch (err) {
            console.error('Webhook signature verification failed');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        const eventType = event.type;
        const payload = event.object;

        if (eventType === 'ORDER_PAID_SUCCESS') {
            const orderData = payload.order;
            const customerData = payload.customer_details;

            const supabase = await createClient();

            // 1. Record the order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    buyer_email: customerData.customer_email,
                    buyer_name: customerData.customer_name,
                    amount: orderData.order_amount,
                    cashfree_order_id: orderData.order_id,
                    status: 'paid',
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Generate license key
            const licenseKey = generateLicenseKey();

            const { error: licenseError } = await supabase
                .from('licenses')
                .insert({
                    order_id: order.id,
                    license_key: licenseKey,
                });

            if (licenseError) throw licenseError;

            // 3. Generate secure download token and save to DB
            const downloadToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 24);

            const { error: tokenError } = await supabase
                .from('download_tokens')
                .insert({
                    order_id: order.id,
                    plugin_slug: orderData.order_tags?.plugin_id || "speedmaster-seo",
                    token: downloadToken,
                    expires_at: expiresAt.toISOString(),
                });

            if (tokenError) throw tokenError;

            // 4. Send email with license and the REAL download token
            await sendPurchaseEmail({
                email: customerData.customer_email,
                name: customerData.customer_name,
                pluginName: "SpeedMaster SEO",
                licenseKey: licenseKey,
                downloadToken: downloadToken,
            });

            return NextResponse.json({ status: 'success' });
        }

        return NextResponse.json({ status: 'ignored' });
    } catch (error: any) {
        console.error('Webhook processing error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
