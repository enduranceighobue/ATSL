import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDE_MS = 10000;

export default function WalkthroughSlider({ title, slides }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const count = slides.length;
  const slide = slides[index];
  const totalSeconds = Math.round((count * SLIDE_MS) / 1000);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduceMotion || paused || count < 2) return undefined;

    const start = performance.now();
    let frame = 0;

    const tick = (now) => {
      const next = Math.min((now - start) / SLIDE_MS, 1);
      setProgress(next);
      if (next >= 1) {
        setIndex((current) => (current + 1) % count);
        setProgress(0);
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [count, index, paused, reduceMotion]);

  const goTo = (next) => {
    setIndex((next + count) % count);
    setProgress(0);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  return (
    <section className="bg-[#fcfaf4] px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="walkthrough-heading">
      <div className="mx-auto w-11/12 max-w-6xl">
        <header className="mb-8 text-center sm:mb-10">
          <h2
            id="walkthrough-heading"
            className="font-['Fraunces'] text-2xl font-normal italic leading-tight tracking-tight text-[#291a06] sm:text-3xl lg:text-4xl"
          >
            {title}
          </h2>
          <div className="mt-3 flex justify-center">
            <div className="h-0.5 w-16 bg-[#cd9432]" />
          </div>
          
        </header>

        <div
          className="overflow-hidden rounded-3xl border border-[#cd9432]/40 bg-white shadow-[0_24px_50px_-32px_rgba(41,26,6,0.45)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={onKeyDown}
        >
          <div className="grid items-center gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.7fr)] lg:p-8">
            <div className="relative overflow-hidden rounded-2xl border border-[#ead9bf] bg-[#f7f4ee]">
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className="h-auto max-h-[70vh] w-full object-contain object-top"
                style={
                  reduceMotion
                    ? undefined
                    : { transform: `scale(${1 + progress * 0.035})`, transformOrigin: "top center" }
                }
              />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10">
                <div
                  className="h-full bg-[#cd9432]"
                  style={{ width: `${reduceMotion ? 0 : progress * 100}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#cd9432]">
                Walkthrough {index + 1} of {count}
              </p>
              <h3 className="mt-2 font-['Fraunces'] text-2xl font-normal italic text-[#291a06] sm:text-3xl">
                {slide.title}
              </h3>
              <p className="mt-3 leading-relaxed text-[#5c3b16]">{slide.text}</p>
              <p className="mt-3 text-sm text-[#8d561e]">{SLIDE_MS / 1000} seconds</p>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#291a06] text-[#291a06] transition hover:bg-[#291a06] hover:text-white"
                  aria-label="Previous walkthrough"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#291a06] text-[#291a06] transition hover:bg-[#291a06] hover:text-white"
                  aria-label="Next walkthrough"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto border-t border-[#ead9bf] px-4 py-4 sm:px-6" role="tablist" aria-label="Walkthroughs">
            {slides.map((item, itemIndex) => {
              const selected = itemIndex === index;
              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => goTo(itemIndex)}
                  className={`shrink-0 cursor-pointer rounded-full px-4 py-2 font-['Fraunces'] text-sm italic transition ${
                    selected
                      ? "bg-[#291a06] text-[#e6c35c]"
                      : "bg-[#fcfaf4] text-[#291a06] hover:bg-[#f3e6cc]"
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
