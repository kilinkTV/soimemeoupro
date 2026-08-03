import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import AdSlot from "@/components/AdSlot";
import FilAriane, { type CrumbFilAriane } from "@/components/FilAriane";
import H2AvecAncre from "@/components/mdx/H2AvecAncre";
import { getGuideParSlug, getTousLesSlugsGuides } from "@/lib/guides";
import { splitArticleEnDeux } from "@/lib/articles";
import { extraireSectionsMdx } from "@/lib/tableDesMatieres";

const MDX_COMPONENTS = { h2: H2AvecAncre };

export function generateStaticParams() {
  return getTousLesSlugsGuides().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideParSlug(slug);
  if (!guide) return {};
  return {
    title: `${guide.frontmatter.title} — Soi-même ou Pro`,
    description: guide.frontmatter.description,
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideParSlug(slug);

  if (!guide) {
    notFound();
  }

  const [debut, fin] = splitArticleEnDeux(guide.content);
  const sections = extraireSectionsMdx(guide.content);

  const filAriane: CrumbFilAriane[] = [
    { label: "Accueil", href: "/" },
    { label: "Guides pratiques", href: "/guides" },
    { label: guide.frontmatter.title },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <FilAriane items={filAriane} />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{guide.frontmatter.title}</h1>
          <p className="text-slate-600 mt-1 dark:text-slate-400">{guide.frontmatter.description}</p>
        </div>
      </div>

      {sections.length > 1 && (
        <nav aria-label="Sommaire de l'article" className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <a
              key={section.slug}
              href={`#${section.slug}`}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-700 dark:hover:text-brand-400"
            >
              {section.titre}
            </a>
          ))}
        </nav>
      )}

      <AdSlot slot="4444444444" />

      <article className="prose prose-slate max-w-none dark:prose-invert">
        <MDXRemote source={debut} components={MDX_COMPONENTS} />
      </article>

      <AdSlot slot="5555555555" />

      <article className="prose prose-slate max-w-none dark:prose-invert">
        <MDXRemote source={fin} components={MDX_COMPONENTS} />
      </article>
    </div>
  );
}
