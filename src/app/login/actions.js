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

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // redirect URL after sign in, adjust if needed
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog`,
    },
  });

  if (error) {
    return redirect('/error');
  }

  // OAuth redirects the user, so no revalidate or redirect here needed
}
