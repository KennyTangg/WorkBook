'use server'

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function signInWithGoogle() {
  const supabase = await createClient();
  const auth_callback_url = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/dashboard`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: auth_callback_url,
    },
  });

  console.log(data);

  if (error) {
    console.error(error);
  }

    if (data.url) {
        redirect(data.url);
    }
  return data.url; 
}
