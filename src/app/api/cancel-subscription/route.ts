// /app/api/cancel-subscription/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const supabase = createClient();
  const { user } = await supabase.auth.getUser().then((res) => res.data);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('subscription_id')
    .eq('id', user.id)
    .single();

  if (error) {
    return NextResponse.json({ error: 'No active subscription found.' }, { status: 400 });
  }

  try {
    await stripe.subscriptions.update(profile.subscription_id, {
      cancel_at_period_end: true,
    });

    await supabase
      .from('profiles')
      .update({ subscription_tier: 'free' })
      .eq('id', user.id);

    return NextResponse.json({ message: 'Subscription canceled.' });
  } catch (err: unknown) {
    if (err instanceof Error) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
}
