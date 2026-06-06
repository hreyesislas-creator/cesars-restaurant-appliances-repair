import Link from "next/link";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-ink px-4 pt-28 text-center">
      <div className="absolute inset-0 bg-red-radial opacity-50" aria-hidden />
      <div className="relative">
        <p className="display-xl text-gradient-steel">404</p>
        <h1 className="mt-2 display-md text-white">Page Not Found</h1>
        <p className="mx-auto mt-4 max-w-md text-silver-dark">
          The page you&apos;re looking for doesn&apos;t exist. For commercial
          equipment repair in Houston, call us or head back home.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <a href={SITE.phoneHref} className="btn-outline">
            Call {SITE.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
