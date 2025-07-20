import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const priceIdToTier: Record<string, 'pro' | 'creator'> = {
  'price_1RmcscBXXNQaF2mYRCytDzjm': 'pro',     // Pro Monthly
  'price_1RmcwABXXNQaF2mYgr4cSayI': 'pro',     // Pro Yearly
  'price_1RmdPABXXNQaF2mYwVo164W6': 'creator', // Creator Monthly
  'price_1RmdQnBXXNQaF2mYZNlVSLNb': 'creator', // Creator Yearly
};

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user }} = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { priceId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    customer_email: user.email,
    client_reference_id: user.id,
    metadata: {
      subscription_tier: priceIdToTier[priceId],
    },
  });

  return NextResponse.json({ url: session.url });
}
