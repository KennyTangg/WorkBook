import { SupabaseUser, UserProfile } from "@/types";
import { toast } from "sonner";

export function getFriendlyAuthErrorMessage(errorMessage: string): string {
  const message = errorMessage.toLowerCase();

  if (message.includes("invalid login credentials")) {
    return "Email or password is incorrect. Please try again.";
  }

  if (message.includes("user already registered") || message.includes("user already exists")) {
    return "An account with this email already exists.";
  }

  if (message.includes("email rate limit exceeded")) {
    return "You’ve tried too many times. Please wait a moment and try again.";
  }

  if (message.includes("invalid password")) {
    return "Your password is incorrect. Please try again.";
  }

  if (message.includes("invalid email or password")) {
    return "Email or password is incorrect.";
  }

  return "Something went wrong. Please try again.";
}

export function useAuthToast() {
  return {
    error: (message: string) => {
      toast.error(getFriendlyAuthErrorMessage(message));
    },
    success: (message: string) => {
      toast.success(message);
    },
    info: (message: string) => {
      toast(message);
    },
  };
}

export function comingSoon() {
  toast("Coming Soon", {
    description: "This feature is not available yet.",
    duration: 3000,
    style: {
      background: "#2c2c2c",
      color: "#eaeaea",
      border: "1px solid #2c2c2c",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    },
  });
}

export function createSafeUsername( user: SupabaseUser, profile: UserProfile | null ): string {
  return (
    profile?.username ||
    user.user_metadata?.username ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Anonymous"
  );
}