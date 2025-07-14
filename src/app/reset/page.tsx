'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthToast } from "@/utils/helpers";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();
  const { success, error: showError } = useAuthToast();

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        router.push("/login");
      }
    });
  }, [router]);

  const handleUpdatePassword = async () => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      showError(error.message);
    } else {
      success("Password updated!");
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full">
        <h1 className="text-xl font-semibold mb-4">Reset Your Password</h1>
        <Input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button className="w-full mt-4" onClick={handleUpdatePassword}>
          Update Password
        </Button>
      </div>
    </main>
  );
}
