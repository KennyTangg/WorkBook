import { createClient } from "@/utils/supabase/server";

const checkAndUpdateRateLimit = async (userId: string): 
Promise<{ allowed: boolean; error?: string }> => {
    const supabase = createClient();

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("subscription_tier, daily_call_count, last_call_date")
        .eq("id", userId)
        .single();

    if (error || !profile?.subscription_tier) return { allowed: false, error: "User not found" };

    const today = new Date().toISOString().split("T")[0];
    const { subscription_tier, daily_call_count, last_call_date } = profile;

    const rateLimits: Record<string, number | null> = {
        free: 2,
        pro: 4,
        creator: null,
    };

    const limit = rateLimits[subscription_tier];

    // creator plan
    if (limit === null) {
        return { allowed: true };
    }

    // reset counter 
    if (last_call_date !== today) {
        await supabase
        .from("profiles")
        .update({ daily_call_count: 1, last_call_date: today })
        .eq("id", userId);
        return { allowed: true };
    }

    // limit reach
    if (daily_call_count >= limit) {
        return { allowed: false, error: "Daily limit reached" };
    }

    // increment call count
    await supabase
        .from("profiles")
        .update({ daily_call_count: daily_call_count + 1 })
        .eq("id", userId);

    return { allowed: true };
}

export default checkAndUpdateRateLimit;