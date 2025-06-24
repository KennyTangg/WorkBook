import Logo from "./ui/Logo";
import { buttonVariants } from "./ui/button";

const NavBar = () => {
    return (
        <nav className="flex items-center justify-between py-4">
            <Logo />
            <div className="flex gap-x-4">
                <button className={buttonVariants({ variant: "default" })}>
                Login
                </button>
                <button className={buttonVariants({ variant: "ghost" })}>
                Sign Up
                </button>
            </div>
        </nav>
    );
}

export default NavBar;