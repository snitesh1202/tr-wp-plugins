import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Validate token
    const { data: tokenData, error: tokenError } = await supabase
        .from('download_tokens')
        .select('*')
        .eq('token', token)
        .single();

    if (tokenError || !tokenData) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 404 });
    }

    // 2. Check expiration
    const expiresAt = new Date(tokenData.expires_at);
    if (expiresAt < new Date()) {
        return NextResponse.json({ error: 'Token has expired' }, { status: 403 });
    }

    // 3. Generate signed URL from Supabase Storage
    // Bucket "plugins", File name should be [plugin_slug].zip
    const { data: signedUrlData, error: signedUrlError } = await supabase
        .storage
        .from('plugins')
        .createSignedUrl(`${tokenData.plugin_slug}.zip`, 60); // valid for 60 seconds

    if (signedUrlError) {
        console.error('Signed URL error:', signedUrlError);
        return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 });
    }

    // 4. Update usage count
    await supabase
        .from('download_tokens')
        .update({ used_count: tokenData.used_count + 1 })
        .eq('id', tokenData.id);

    // 5. Redirect to the signed URL
    return NextResponse.redirect(signedUrlData.signedUrl);
}
