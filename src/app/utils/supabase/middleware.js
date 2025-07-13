import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function updateSession(request) {
  // Start with the default “pass‑through” response
  let supabaseResponse = NextResponse.next({ request });

  // Create a Supabase client that reads / writes cookies from this request
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Persist cookies on the incoming request object…
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          // …and mirror them on the response we’ll return
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // --- Do not place other code here; see Supabase docs ---

  // **IMPORTANT: DO NOT REMOVE** - keeps the session in sync
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect unauthenticated users who aren’t already on /login or /auth
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Always return the response whose cookies Supabase populated
  return supabaseResponse;
}
