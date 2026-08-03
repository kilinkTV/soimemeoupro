import { MDXRemote } from "next-mdx-remote/rsc";
import Comparateur from "@/components/Comparateur";
import type { Guide } from "@/components/Comparateur";
import H2AvecAncre from "@/components/mdx/H2AvecAncre";
import { getTousLesProjets } from "@/lib/projets";
import { getTousLesArticles, splitArticleEnDeux } from "@/lib/articles";
import { extraireSectionsMdx } from "@/lib/tableDesMatieres";

const MDX_COMPONENTS = { h2: H2AvecAncre };

export const metadata = {
  title: "Comparateur Soi-même ou Pro",
};

export default function ComparateurPage() {
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
          sections: extraireSectionsMdx(article.content),
          contenuDebut: <MDXRemote source={debut} components={MDX_COMPONENTS} />,
          contenuFin: <MDXRemote source={fin} components={MDX_COMPONENTS} />,
        },
      ];
    })
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Comparateur Soi-même ou Pro</h1>
        <p className="text-slate-600 mt-1 dark:text-slate-400">
          Choisissez votre projet et renseignez vos paramètres pour obtenir une estimation chiffrée.
        </p>
      </div>
      <Comparateur projets={projets} guides={guides} />
    </div>
  );
}

