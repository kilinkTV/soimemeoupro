import Link from "next/link";
import type { ComponentProps } from "react";
import H2AvecAncre from "./H2AvecAncre";

// Les liens internes (ex. un guide qui en référence un autre) restent une navigation
// normale (next/link) ; les liens externes (sources Légifrance, BOFIP...) s'ouvrent
// dans un nouvel onglet pour ne pas faire quitter le site en cours de lecture.
function LienMdx({ href, children, ...props }: ComponentProps<"a">) {
  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

export const MDX_COMPONENTS = { h2: H2AvecAncre, a: LienMdx };
