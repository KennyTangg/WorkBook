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