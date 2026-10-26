import { useCallback, useState } from "react";
import { Play } from "lucide-react";
import { PLACEHOLDER_YOUTUBE_ID } from "../data/products";
import VideoModal from "./VideoModal";

export default function ProductVideo({ product, heading = true, anchorId = "video" }) {
  const [open, setOpen] = useState(false);
  const { youtubeId, poster, fit } = product.video;
  const videoId = youtubeId || PLACEHOLDER_YOUTUBE_ID;
  const close = useCallback(() => setOpen(false), []);

  return (
    <div id={anchorId || undefined}>
      {heading && (
        <h3 className="mb-4 font-['Fraunces'] text-2xl font-medium text-[#291a06] md:text-3xl">
          Watch {product.displayName}
        </h3>
      )}

      <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-lg">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block h-full w-full cursor-pointer"
          aria-label={`Play the ${product.displayName} video`}
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
      </div>

      <VideoModal
        open={open}
        onClose={close}
        youtubeId={videoId}
        title={`${product.displayName} video`}
      />
    </div>
  );
}
