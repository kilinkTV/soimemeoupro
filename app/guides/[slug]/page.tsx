import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import AdSlot from "@/components/AdSlot";
import FaqSchema from "@/components/FaqSchema";
import FilAriane, { type CrumbFilAriane } from "@/components/FilAriane";
import { MDX_COMPONENTS } from "@/components/mdx/mdxComponents";
import SommaireArticle from "@/components/SommaireArticle";
import { getGuideParSlug, getTousLesSlugsGuides } from "@/lib/guides";
import { splitArticleEnDeux } from "@/lib/articles";
import { lierPremieresOccurrencesGlossaire } from "@/lib/liensGlossaire";
import { dateMajAffichee } from "@/lib/dateMaj";
import { extraireFaqMdx } from "@/lib/faq";
import { extraireSectionsMdx } from "@/lib/tableDesMatieres";
import { extraireSourcePrincipale } from "@/lib/sources";

export function generateStaticParams() {
  return getTousLesSlugsGuides().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideParSlug(slug);
  if (!guide) return {};
  const title = `${guide.frontmatter.title} — Soi-même ou Pro`;
  const description = guide.frontmatter.description;
  return {
    title,
    description,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: { title, description, images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideParSlug(slug);

  if (!guide) {
    notFound();
  }

  const [debut, fin] = splitArticleEnDeux(lierPremieresOccurrencesGlossaire(guide.content));
  const sections = extraireSectionsMdx(guide.content);
  const faq = extraireFaqMdx(guide.content);
  const sourcePrincipale = extraireSourcePrincipale(guide.content);

  const filAriane: CrumbFilAriane[] = [
    { label: "Accueil", href: "/" },
    { label: "Guides pratiques", href: "/guides" },
    { label: guide.frontmatter.title },
  ];

  return (
    <div className="space-y-6">
      <FaqSchema items={faq} />
      <div className="space-y-3">
        <FilAriane items={filAriane} />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{guide.frontmatter.title}</h1>
          <p className="text-slate-600 mt-1 dark:text-slate-400">{guide.frontmatter.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-2.5 text-sm dark:border-brand-900/40 dark:bg-brand-950/30">
          <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-brand-600 dark:text-brand-400">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Vérifié le {dateMajAffichee()}
          </span>
          {sourcePrincipale && (
            <>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-slate-500 dark:text-slate-400">Source officielle :</span>
              <a
                href={sourcePrincipale.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-700 underline hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
              >
                {sourcePrincipale.label}
              </a>
            </>
          )}
        </div>
      </div>

      <SommaireArticle sections={sections} />

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
