import { MDXRemote } from "next-mdx-remote/rsc";
import Calculateur from "@/components/Calculateur";
import type { Guide } from "@/components/Calculateur";
import { getTousLesProjets } from "@/lib/projets";
import { getTousLesArticles, splitArticleEnDeux } from "@/lib/articles";

export const metadata = {
  title: "Calculateur Soi-même ou Pro",
};

export default function CalculateurPage() {
  const projets = getTousLesProjets();
  const articles = getTousLesArticles();

  const guides: Record<string, Guide> = Object.fromEntries(
    articles.map((article) => {
      const [debut, fin] = splitArticleEnDeux(article.content);
      return [
        article.slug,
        {
          titre: article.frontmatter.title,
          description: article.frontmatter.description,
          contenuDebut: <MDXRemote source={debut} />,
          contenuFin: <MDXRemote source={fin} />,
        },
      ];
    })
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Calculateur Soi-même ou Pro</h1>
        <p className="text-slate-600 mt-1">
          Choisissez votre projet et renseignez vos paramètres pour obtenir une estimation chiffrée.
        </p>
      </div>
      <Calculateur projets={projets} guides={guides} />
    </div>
  );
}
