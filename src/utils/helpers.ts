import { SupabaseUser, UserProfile } from "@/types";
import { toast } from "sonner";

export function getFriendlyAuthErrorMessage(errorMessage: string): string {
  const message = errorMessage.toLowerCase();

  if (message.includes("invalid login credentials") || message.includes("invalid email or password")) {
    return "Email or password is incorrect. Please try again.";
  }

  if (message.includes("user already registered") || message.includes("user already exists")) {
    return "An account with this email already exists.";
  }

  if (message.includes("email rate limit exceeded") || message.includes("rate limit")) {
    return "You’ve tried too many times. Please wait a moment and try again.";
  }

  if (message.includes("invalid password")) {
    return "Your password is incorrect. Please try again.";
  }

  if (message.includes("user not found")) {
    return "No account was found with that email address.";
  }

  if (
    message.includes("reset token invalid") ||
    message.includes("missing reset token") ||
    message.includes("jwt malformed")
  ) {
    return "Your password reset link is invalid. Please request a new one.";
  }

  if (
    message.includes("reset token expired") ||
    message.includes("jwt expired") ||
    message.includes("token has expired")
  ) {
    return "Your password reset link has expired. Please request a new one.";
  }

  if (
    message.includes("missing refresh token") ||
    message.includes("invalid token") ||
    message.includes("could not find session") ||
    message.includes("no active session")
  ) {
    return "Your session is invalid or expired. If you opened the link on a different device or browser, please try again from the same device you requested it from.";
  }

  if (message.includes("new password") && message.includes("should be at least")) {
    return "Your new password is too short. Please use a longer password.";
  }

  if (message.includes("password should be at least")) {
    return "Your password must be longer. Please try a more secure one.";
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