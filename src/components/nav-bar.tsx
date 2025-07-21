import Link from "next/link";
import Logo from "./ui/Logo";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";

const NavBar = () => {
    return (
        <nav className="flex items-center justify-between py-4 px-2 sm:px-0">
            <Logo />
            <div className="flex gap-x-4">
                <ModeToggle />
                <Link href={"/login"} prefetch passHref className="hidden sm:block">
                    <Button variant="default" className="hidden sm:block">Login</Button>
                </Link>
                <Link href={"/register"} prefetch passHref className="hidden sm:block">
                    <Button variant="ghost" className="hidden sm:block">Sign Up</Button>
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;