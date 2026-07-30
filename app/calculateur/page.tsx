import Calculateur from "@/components/Calculateur";
import { getTousLesProjets } from "@/lib/projets";

export const metadata = {
  title: "Calculateur DIY vs Pro",
};

export default function CalculateurPage() {
  const projets = getTousLesProjets();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Calculateur DIY vs Pro</h1>
        <p className="text-slate-600 mt-1">
          Choisissez votre projet et renseignez vos paramètres pour obtenir une estimation chiffrée.
        </p>
      </div>
      <Calculateur projets={projets} />
    </div>
  );
}
