// app/login/page.jsx (App Router) or pages/login.js (Pages Router)
 // if using App Router
'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';


import { createClient } from '@/utils/supabase/client';




export default async function LoginPage() {
      const supabase = await createClient();
  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '100px' }}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google', 'github']} // enable social logins
      />
    </div>
  );
}
