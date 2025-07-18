import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="font-extralight text-xl sm:text-2xl select-none mb-4" > WorkBook </h1>
      <Image src="/404_image.svg" alt={"404 image"} width={400} height={400} draggable={false} />
      <h1 className="text-2xl sm:text-4xl font-bold my-4 ">Page Not Found </h1>
      <p className="text-gray-500 mb-6 txt-sm sm:text-base">Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="text-primary underline text-sm sm:text-base">Go back home</Link>
    </div>
  );
}
