export default function VideoYoutube({ youtubeId, titre }: { youtubeId: string; titre: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-700 mb-2">Tutoriel vidéo</p>
      <div className="relative w-full overflow-hidden rounded-md" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={titre}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="text-xs text-slate-500 mt-2">{titre}</p>
    </div>
  );
}
