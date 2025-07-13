// app/api/auth/callback/route.js  (or wherever you place it)
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'; // your helper

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);

  // OAuth code & optional “next” param
  const code = searchParams.get('code');
  let next = searchParams.get('next') ?? '/';

  // Make sure “next” stays on‑site
  if (!next.startsWith('/')) next = '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host'); // for prod behind LB
      const isLocalEnv = process.env.NODE_ENV === 'development';

      if (isLocalEnv) {
        // dev: no load balancer, so origin is fine
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        // prod behind load balancer (e.g., Vercel):
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        // prod without LB:
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // If we reach here, something failed
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
