import Link from "next/link";
import { ChevronDownIcon } from "./Icons";

export function Breadcrumbs({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-silver-dark/20 bg-silver-light/30">
      <ol className="container-x flex flex-wrap items-center gap-1.5 py-3 text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className="text-steel hover:text-accent">
                  {item.name}
                </Link>
              ) : (
                <span className="font-semibold text-charcoal" aria-current="page">
                  {item.name}
                </span>
              )}
              {!last && (
                <ChevronDownIcon className="h-3.5 w-3.5 -rotate-90 text-steel/50" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
