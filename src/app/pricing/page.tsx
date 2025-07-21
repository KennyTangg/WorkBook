import SimplePricing from "@/components/simple-pricing";
import { getDashboardData } from "@/lib/getDashboardData";
import { getUser } from '@/lib/getUser';

const Pricing = async () => {
  const user = await getUser();
  
  if (!user) {
    return <SimplePricing user={null} currentPlan={null} />;
  }

  const [dashboard] = await Promise.all([
    getDashboardData(user.id),
  ]);

  return <SimplePricing user={user} currentPlan={dashboard.profile.subscription_tier} />;
}

export default Pricing;
