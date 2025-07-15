'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function login(formData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/languages-board/');
  
}

export async function signup(formData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

// New: Google OAuth sign-in




export async function signInWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback?next=/languages-board',
    },
  });

  if (error) {
    return redirect('/error');
  }

  // This actually sends the browser to Google’s consent page
  redirect(data.url);
}
