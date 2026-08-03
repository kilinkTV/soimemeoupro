import type { ReactNode } from "react";
import { slugifier } from "@/lib/slugifier";

function texteBrut(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(texteBrut).join("");
  if (typeof node === "object" && "props" in node) {
    return texteBrut((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

// Rend les titres ## des articles MDX avec un id ancré (slug identique à celui
// généré par lib/tableDesMatieres.ts), pour que la mini table des matières de la
// fiche projet puisse sauter directement à la bonne section.
export default function H2AvecAncre({ children }: { children?: ReactNode }) {
  const id = slugifier(texteBrut(children));
  return (
    <h2 id={id} className="scroll-mt-24">
      {children}
    </h2>
  );
}
