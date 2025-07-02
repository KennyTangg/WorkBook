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
                <Button variant="default" className="hidden sm:block"><Link href={"/login"}>Login</Link></Button>
                <Button variant="ghost" className="hidden sm:block"><Link href={"/register"}>Sign Up</Link></Button>
            </div>
        </nav>
    );
}

export default NavBar;