import { NextResponse } from 'next/server';
import { cashfree } from '@/lib/cashfree';

export async function POST(request: Request) {
    try {
        const { pluginId, pluginName, amount, customerName, customerEmail } = await request.json();

        const orderRequest = {
            order_amount: parseFloat(amount),
            order_currency: 'USD',
            customer_details: {
                customer_id: customerEmail.replace(/[^a-zA-Z0-9]/g, '_'), // Rough unique ID
                customer_name: customerName,
                customer_email: customerEmail,
                customer_phone: '9999999999', // Placeholder as required by some PG fields
            },
            order_meta: {
                return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order/success?order_id={order_id}`,
                notify_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/cashfree`,
            },
            order_note: `Purchase of ${pluginName}`,
            order_tags: {
                plugin_id: pluginId,
            }
        };

        const response = await cashfree.PGCreateOrder(orderRequest);

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Cashfree order creation error:', error.response?.data || error.message);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
