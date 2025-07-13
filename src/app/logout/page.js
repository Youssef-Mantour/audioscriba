import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function LogoutPage() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  }

  // ❌ This causes the error because it's called during render
  //revalidatePath('/', 'layout');
  //revalidatePath('/languages-board');

  redirect('/');
}
