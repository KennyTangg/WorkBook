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
import Image from "next/image";

const LoginPage = () => {
  return (
    <main className="min-h-screen max-w-6xl grid grid-cols-3 items-center mx-auto">
        <Image src="sign_in_image.svg" alt={"Image"} width={600} height={500} className="col-span-2" />
        <Card className="w-full h-1/2 max-w-sm justify-center shadow-md">
            <CardHeader>
                <CardTitle className="text-xl">Login to your account</CardTitle>
                <CardDescription >
                Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                <Button variant="link" className="text-md">Sign Up</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-4">
                    <Label htmlFor="email" className="text-md" >Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                    </div>
                    <div className="grid gap-4">
                    <div className="flex items-center">
                        <Label htmlFor="password" className="text-md" >Password</Label>
                        <a
                        href="#"
                        className="text-sm ml-auto inline-block underline-offset-4 hover:underline"
                        >
                        Forgot your password?
                        </a>
                    </div>
                    <Input id="password" type="password" required />
                    </div>
                </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-4 mt-4">
                <Button type="submit" className="w-full">
                Login
                </Button>
                <Button variant="outline" className="w-full">
                Login with Google
                </Button>
            </CardFooter>
        </Card>
    </main>
  );
}

export default LoginPage;