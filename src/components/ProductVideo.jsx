import { useState } from "react";
import { Play } from "lucide-react";
import { YOUTUBE_CHANNEL } from "../data/products";

export default function ProductVideo({ product, heading = true, anchorId = "video" }) {
  const [playing, setPlaying] = useState(false);
  const { youtubeId, src, poster, fit } = product.video;
  const hasMedia = Boolean(youtubeId || src);

  const play = () => {
    if (!hasMedia) {
      window.open(YOUTUBE_CHANNEL, "_blank", "noopener,noreferrer");
      return;
    }
    setPlaying(true);
  };

  return (
    <div id={anchorId || undefined}>
      {heading && (
        <h3 className="mb-4 font-['Fraunces'] text-2xl font-medium text-[#291a06] md:text-3xl">
          Watch {product.displayName}
        </h3>
      )}

      <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-lg">
        {playing && youtubeId ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={`${product.displayName} video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : playing && src ? (
          <video
            className="h-full w-full"
            src={src}
            poster={poster}
            controls
            autoPlay
          />
        ) : (
          <button
            type="button"
            onClick={play}
            className="group relative block h-full w-full cursor-pointer"
            aria-label={
              hasMedia
                ? `Play the ${product.displayName} video`
                : `Watch ${product.displayName} on the ATSL YouTube channel`
            }
          >
            <img
              src={poster}
              alt=""
              className={`h-full w-full ${
                fit === "contain" ? "object-contain p-6 sm:p-10" : "object-cover"
              }`}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 transition group-hover:via-black/35" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#291a06] shadow-lg transition group-hover:scale-105">
              <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
            </span>
            <span className="absolute bottom-4 left-4 right-4 text-left text-sm font-medium tracking-wide text-white sm:text-base">
              {product.displayName} walkthrough
            </span>
          </button>
        )}
      </div>

      {!hasMedia && (
        <p className="mt-3 text-sm text-[#8d561e]">
          Plays on the{" "}
          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline decoration-amber-600 underline-offset-2 hover:text-[#291a06]"
          >
            ATSL YouTube channel
          </a>
          .
        </p>
      )}
    </div>
  );
}
