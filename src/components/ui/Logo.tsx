import Link from "next/link";
import { cn } from "@/lib/utils"

const Logo = ({ className }: React.ComponentProps<"h1">) => {
    return (
        <h1 className={cn("font-bold text-xl select-none cursor-pointer transition-opacity hover:opacity-60", className)}>
            <Link href={"/"}>WorkBook</Link>
        </h1>
    );
}

export default Logo;