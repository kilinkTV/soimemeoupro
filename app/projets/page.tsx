import Link from "next/link";
import { getTousLesProjets } from "@/lib/projets";

export const metadata = {
  title: "Tous les projets — DIY vs Pro",
};

export default function ProjetsPage() {
  const projets = getTousLesProjets();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tous les types de projets</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {projets.map((projet) => (
          <li key={projet.id}>
            <Link
              href={`/projets/${projet.id}`}
              className="block rounded-lg border border-slate-200 p-4 hover:border-slate-400"
            >
              <p className="font-medium">{projet.nom}</p>
              <p className="text-sm text-slate-500">{projet.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
