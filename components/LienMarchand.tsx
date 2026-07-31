import { faviconUrl, MARCHANDS, type Marchand } from "@/lib/affiliation";

export default function LienMarchand({
  marchand,
  href,
  className,
}: {
  marchand: Marchand;
  href: string;
  className?: string;
}) {
  const { nom, domaine } = MARCHANDS[marchand];
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={`inline-flex items-center gap-1 ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={faviconUrl(domaine)} alt="" width={14} height={14} className="rounded-sm" />
      {nom}
    </a>
  );
}
