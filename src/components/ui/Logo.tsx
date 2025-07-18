import Link from "next/link";
import { cn } from "@/lib/utils"

const Logo = ({ className }: React.ComponentProps<"h1">) => {
    return (
        <Link href={"/"} passHref>
            <h1 className={cn("font-light text-xl sm:text-2xl select-none cursor-pointer transition-opacity hover:opacity-60", className)}>
                WorkBook
            </h1>
        </Link>
    );
}

export default Logo;