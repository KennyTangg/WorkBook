'use client';

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent,  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import Logo from "@/components/ui/Logo";
import {signInWithGoogle} from "@/utils/actions";
import { useAuthToast } from "@/utils/helpers";
import { ArrowLeft } from "lucide-react";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
 const { error: showError, success: showSuccess, info: showInfo } = useAuthToast();
    const signIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const {data, error} = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
      showError(error.message);
        } else if (data.session) {
      showSuccess("Logged in successfully!");
            router.push('/dashboard');
        } else {
      showInfo("Check your email for the confirmation link!");
        }
    }
    const handleGoogleSignIn = async () => {
        const url = await signInWithGoogle();
        if (url) {
            window.location.href = url;
        }
    };
  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <button
            onClick={() => router.back()}
            className="absolute top-8 left-10 flex items-center gap-1 text-base sm:text-lg text-muted-foreground hover:text-foreground transition-all hover:cursor-pointer"
        >
            <ArrowLeft className="size-4 sm:size-5" /> Back
        </button>
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 items-center gap-8 lg:gap-12">
            <div className="hidden lg:block lg:col-span-2">
                <Image 
                    src="sign_in_image.svg" 
                    alt={"Sign in illustration"} 
                    width={600} 
                    height={500} 
                    className="w-full h-auto max-w-2xl mx-auto" 
                />
            </div>
            <div className="w-full max-w-md mx-auto lg:mx-0">
                <Logo className="relative bottom-10 text-center text-2xl hover:opacity-100"/>
                <Card className="w-full h-auto lg:max-w-sm justify-center shadow-md bg-transparent border-0 sm:border sm:bg-card">
                    <CardHeader className="px-4 sm:px-6">
                        <CardTitle className="sm:text-xl">Login to your account</CardTitle>
                        <CardDescription >
                        Enter your email below to login to your account
                        </CardDescription>
                        <CardAction>
                        <Button variant="link" className="sm:text-md">
                            <Link href={"/register"}>Sign Up</Link>
                        </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6">
                        <form onSubmit={signIn}>
                            <div className="flex flex-col gap-4 sm:gap-6 mt-4 sm:mt-0">
                                <div className="grid gap-2 sm:gap-4">
                                <Label htmlFor="email" className="sm:text-md" >Email</Label>
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
                                <div className="flex items-center">
                                    <Label htmlFor="password" className="sm:text-md" >Password</Label>
                                    <a
                                    href="#"
                                    className="text-sm ml-auto inline-block underline-offset-4 hover:underline"
                                    >
                                    Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                            </div>
                            <Button type="submit" className="w-full mt-4"> Login </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="mt-4 px-4 sm:px-6">
                        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} ><FcGoogle className="size-4" /> Login with Google </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </main>
  );
}

export default LoginPage;