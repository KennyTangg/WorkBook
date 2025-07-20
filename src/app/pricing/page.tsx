import SimplePricing from "@/components/simple-pricing";
import { getDashboardData } from "@/lib/getDashboardData";
import { getUser } from '@/lib/getUser';

const Pricing = async () => {
  const user = await getUser();
  const { profile } = await getDashboardData(user.id);

  return <SimplePricing user={user} currentPlan={profile.subscription_tier} />;
}

export default Pricing;
