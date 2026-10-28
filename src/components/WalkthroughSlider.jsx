import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDE_MS = 4000;

export default function WalkthroughSlider({ slides }) {
  const [index, setIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const count = slides.length;
  const slide = slides[index];
  const viewerSlide = slides[viewerIndex];

  useEffect(() => {
    if (viewerOpen || count < 2) return undefined;

    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, SLIDE_MS);

    return () => clearInterval(interval);
  }, [count, viewerOpen]);

  useEffect(() => {
    if (!viewerOpen) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") setViewerOpen(false);
      if (event.key === "ArrowRight") {
        setViewerIndex((current) => (current + 1) % count);
      }
      if (event.key === "ArrowLeft") {
        setViewerIndex((current) => (current - 1 + count) % count);
      }
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [count, viewerOpen]);

  const openViewer = () => {
    setViewerIndex(index);
    setViewerOpen(true);
  };

  const closeViewer = () => {
    setIndex(viewerIndex);
    setViewerOpen(false);
  };

  const stepViewer = (direction) => {
    setViewerIndex((current) => (current + direction + count) % count);
  };

  return (
    <div>
      <button
        type="button"
        onClick={openViewer}
        className="block w-full cursor-pointer overflow-hidden rounded-2xl border border-[#ead9bf] bg-white text-left shadow-sm"
        aria-label={`Open ${slide.title}`}
      >
        <div className="relative" aria-live="polite">
          <img
            src={slides[0].src}
            alt=""
            aria-hidden="true"
            className="invisible h-auto max-h-[74vh] w-full object-contain"
          />
          {slides.map((item, slideIndex) => (
            <img
              key={item.src}
              src={item.src}
              alt={slideIndex === index ? item.alt : ""}
              aria-hidden={slideIndex === index ? undefined : true}
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
                slideIndex === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        <p className="border-t border-[#ead9bf] px-4 py-3 text-center font-['Fraunces'] text-lg italic text-[#291a06]">
          {slide.title}
        </p>
      </button>

      {viewerOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-4 py-8"
          onClick={closeViewer}
          role="presentation"
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              stepViewer(-1);
            }}
            className="absolute left-3 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-[#291a06] shadow-md transition hover:bg-amber-100 sm:left-6"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>

          <figure
            className="mx-14 w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={viewerSlide.src}
              alt={viewerSlide.alt}
              className="max-h-[78vh] w-full object-contain"
            />
            <figcaption className="mt-3 text-center font-['Fraunces'] text-xl italic text-white">
              {viewerSlide.title}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              stepViewer(1);
            }}
            className="absolute right-3 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-[#291a06] shadow-md transition hover:bg-amber-100 sm:right-6"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
