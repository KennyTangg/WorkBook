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
import Link from "next/link";

const RegisterPage = () => {
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
                <form>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-4">
                    <Label htmlFor="email" className="text-md" >Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                    />
                    </div>
                    <div className="grid gap-4">
                    <div className="flex items-center">
                        <Label htmlFor="password" className="text-md" >Password</Label>
                    </div>
                    <Input id="password" type="password" required />
                    </div>
                    <div className="grid gap-4">
                    <Label htmlFor="email" className="text-md" >Confirm Password</Label>
                    <Input id="password" type="password" required />
                    </div>
                </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-4 mt-4">
                <Button type="submit" className="w-full">
                Register
                </Button>
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