import Link from "next/link";
import { cn } from "@/lib/utils"
import { NotebookText } from "lucide-react";

const Logo = ({ className }: React.ComponentProps<"h1">) => {
    return (
        <Link href={"/"} passHref>
            <div className={cn("ml-auto flex items-center gap-1", className)}>
              <NotebookText className="size-5 sm:size-6 stroke-1"/>
              <h1 className="font-light text-xl sm:text-2xl select-none cursor-pointer"> WorkBook </h1>
            </div>
        </Link>
    );
}

export default Logo;