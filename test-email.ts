import { sendPurchaseEmail } from './lib/email';

async function test() {
    try {
        const result = await sendPurchaseEmail({
            email: 'test@example.com',
            name: 'Test User',
            pluginName: 'SpeedMaster SEO',
            licenseKey: 'TEST-1234',
            downloadToken: 'TEST-TOKEN'
        });
        console.log('Result:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}
test();
