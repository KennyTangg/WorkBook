import Link from "next/link";

const Logo = () => {
    return (
        <h1 className="font-bold text-xl select-none cursor-pointer transition-opacity hover:opacity-60">
            <Link href={"/"}>WorkBook</Link>
        </h1>
    );
}

export default Logo;