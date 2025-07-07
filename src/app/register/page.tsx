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
import Logo from "@/components/ui/Logo";
import { supabase } from "@/lib/supabaseClient";
import { signInWithGoogle } from "@/utils/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";


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
    const handleGoogleSignIn = async () => {
        const url = await signInWithGoogle();
        if (url) {
            window.location.href = url;
        }
    };
    
  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 items-center gap-8 lg:gap-12">
            <div className="w-full max-w-md mx-auto lg:mx-0">
                <Logo className="relative bottom-10 text-center text-2xl hover:opacity-100"/>
                <Card className=" w-full h-7/12 lg:max-w-sm justify-center shadow-md bg-transparent border-0 sm:border sm:bg-card">
                    <CardHeader className="px-3 sm:px-6">
                        <CardTitle className="sm:text-xl">Create your account</CardTitle>
                        <CardDescription >
                        Fill in the information below to get started
                        </CardDescription>
                        <CardAction>
                        <Button variant="link" className="sm:text-md">
                            <Link href={"/login"}>Log In</Link>
                        </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6">
                        <form onSubmit={signUp}>
                            <div className="flex flex-col gap-4 sm:gap-6 mt-4 sm:mt-0">
                                <div className="grid gap-2 sm:gap-4">
                                <Label htmlFor="email" className="sm:text-md">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                </div>
                                <div className="grid gap-2 sm:gap-4">
                                    <Label htmlFor="password" className="sm:text-md" >Password</Label>
                                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="grid gap-2 sm:gap-4">
                                    <Label htmlFor="email" className="sm:text-md" >Confirm Password</Label>
                                    <Input id="password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </div>
                            </div>
                            <Button type="submit" className="w-full mt-4"> Register </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="mt-4 px-3 sm:px-6">
                        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} ><FcGoogle className="size-4" /> Login with Google </Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="hidden lg:block lg:col-span-2">
                <Image 
                    src="sign_up_image.svg" 
                    alt={"Sign up illustration"} 
                    width={600} 
                    height={500} 
                    className="w-full h-auto max-w-2xl mx-auto" 
                />
            </div>
        </div>
    </main>
  );
}

export default RegisterPage;