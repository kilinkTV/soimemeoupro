import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export interface CrumbFilAriane {
  label: string;
  // Absent pour le dernier élément (la page courante, non cliquable).
  href?: string;
}

export default function FilAriane({ items }: { items: CrumbFilAriane[] }) {
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
  }));

  return (
    <>
      <nav aria-label="Fil d'Ariane" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1.5 text-slate-500 dark:text-slate-400">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">
                  /
                </span>
              )}
              {item.href ? (
                <Link href={item.href} className="transition-colors hover:text-brand-700 dark:hover:text-brand-400">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-slate-700 dark:text-slate-300">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement,
          }),
        }}
      />
    </>
  );
}
