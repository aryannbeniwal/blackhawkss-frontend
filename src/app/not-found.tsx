import Link from "next/link";
import { HawkMark } from "@/components/brand/hawk-mark";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-brand-black px-6 text-center">
      <HawkMark className="left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />
      <Logo size={56} />
      <p className="eyebrow mt-10">404</p>
      <h1 className="display-lg mt-3">This post is unmanned</h1>
      <p className="lead mt-4 max-w-md">The page you are looking for does not exist or has moved.</p>
      <div className="mt-8 flex gap-3">
        <Button asChild className="bg-brand-red text-white hover:bg-brand-red-deep">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  );
}
