import { supabase } from '@/utils/supabase/client';
import { NextRequest } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent( body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Invalid Stripe signature:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  console.log('🔔 Stripe webhook received:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;
    const tier = session.metadata?.subscription_tier || "free";
    const userId = session.client_reference_id;
    const subscriptionId = session.subscription as string;

    console.log('Session Info:', { email, tier, userId, subscriptionId });

    if (!email || !tier || !subscriptionId) {
      console.error('Missing email, tier, or subscription ID in session');
      return new Response('Bad session data', { status: 400 });
    }

    const { error } = await supabase
      .from('profiles')
      .update({ 
        subscription_tier: tier,
        subscription_id: subscriptionId,
       })
      .eq('id', userId);

    if (error) {
      console.error('Supabase update failed:', error);
      return new Response('Supabase error', { status: 500 });
    }

    console.log(`Updated ${email} to tier: ${tier}`);
  }

  return new Response('OK', { status: 200 });
}
