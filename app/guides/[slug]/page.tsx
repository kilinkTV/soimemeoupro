import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import AdSlot from "@/components/AdSlot";
import FaqSchema from "@/components/FaqSchema";
import FilAriane, { type CrumbFilAriane } from "@/components/FilAriane";
import { MDX_COMPONENTS } from "@/components/mdx/mdxComponents";
import SommaireArticle from "@/components/SommaireArticle";
import { getGuideParSlug, getTousLesSlugsGuides } from "@/lib/guides";
import { splitArticleEnDeux } from "@/lib/articles";
import { dateMajAffichee } from "@/lib/dateMaj";
import { extraireFaqMdx } from "@/lib/faq";
import { extraireSectionsMdx } from "@/lib/tableDesMatieres";

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

  const [debut, fin] = splitArticleEnDeux(guide.content);
  const sections = extraireSectionsMdx(guide.content);
  const faq = extraireFaqMdx(guide.content);

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
          <p className="mt-1 text-xs text-slate-400">Dernière vérification : {dateMajAffichee()}</p>
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
