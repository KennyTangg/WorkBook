'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";


const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const signUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            console.error(error.message);
            alert(error.message);
        } else if (data.session) {
            console.log('Signed Up:', data);
            router.push('/dashboard');
        } else {
            alert("Check your email for confirmation link!");
        }
    };
    
  return (
    <main className="min-h-screen max-w-6xl grid grid-cols-3 items-center mx-auto">
        <Card className="w-full h-7/12 max-w-sm justify-center shadow-md">
            <CardHeader>
                <CardTitle className="text-xl">Create your account</CardTitle>
                <CardDescription >
                Fill in the information below to get started
                </CardDescription>
                <CardAction>
                <Button variant="link" className="text-md">
                    <Link href={"/login"}>Log In</Link>
                </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form onSubmit={signUp}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-4">
                        <Label htmlFor="email" className="text-md" >Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        </div>
                        <div className="grid gap-4">
                            <Label htmlFor="password" className="text-md" >Password</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="grid gap-4">
                            <Label htmlFor="email" className="text-md" >Confirm Password</Label>
                            <Input id="password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-4"> Register </Button>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-4 mt-4">
                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
            </CardFooter>
        </Card>
        <Image src="sign_up_image.svg" alt={"Image"} width={600} height={500} className="col-span-2 ml-auto" />
    </main>
  );
}

export default RegisterPage;