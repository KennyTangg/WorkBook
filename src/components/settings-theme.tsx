"use client";

import { useTheme } from "next-themes";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const ClientSettings = ({ user }: {
  user: { 
    id: string; 
    email: string; 
    username: string;
    hasPassword: boolean;
  };
}) => {
  const {theme, setTheme } = useTheme();
  
  const [newUsername, setNewUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameLoading, setnameLoading] = useState(false);
  const router = useRouter();

  const HandleChangePassword = async () => {
    if (password !== confirmPassword){
        alert("Password don't match!");
        return;
    }
    setLoading(true);
    const {error} = await supabase.auth.updateUser({password: password});
    setLoading(false);

    if (error) {
      console.error(error);
      alert("Error updating password: " + error.message);
    } else {
      alert("Password updated successfully!");
    }
  }

  const HandleUsername = async () => {
    setnameLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({username: newUsername })
      .eq("id", user.id)

    setnameLoading(false);
    if(error){
        console.error(error);
        alert("Error updating username: " + error.message);
    } else {
        alert("Username updated successfully!")
    }
    router.refresh();
  }

  return (
    <main className="max-w-5xl mx-auto py-12 px-6 space-y-8">
        <h1 className="text-3xl font-bold ml-2">Settings</h1>
      <Card>
        <CardHeader className="mb-4">
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 mt-4">
          <Label>Email</Label>
          <Input type="email" value={user.email} disabled />

          <Label>Username</Label>
          <Input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />

          <Button onClick={HandleUsername} disabled={nameLoading}>
            {nameLoading ? "Updating..." : "Change Username" }
          </Button>
          {user.hasPassword && (
            <>
            <Label>New Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <Label>Confirm Password</Label>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            <Button onClick={HandleChangePassword} disabled={loading} >       
                {loading ? "Updating..." : "Change Password"}
            </Button>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

export default ClientSettings;