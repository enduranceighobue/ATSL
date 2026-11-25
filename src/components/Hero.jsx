import { useEffect, useState } from "react";

import heroImage1 from "../assets/innvista2.jpg";
import heroImage3 from "../assets/innivis.jpg";

const images = [heroImage1, heroImage3];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [canFade, setCanFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative h-svh overflow-hidden bg-[#120c06]">

        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt=""
            fetchPriority={index === 0 ? "high" : "low"}
            decoding="async"
            onLoad={() => {
              if (index === 0) setCanFade(true);
            }}
            className={`absolute inset-0 h-full w-full object-cover object-center ${
              canFade ? "transition-opacity duration-700 ease-in-out" : ""
            } ${index === currentImage ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/60 to-black/30"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-20">
          <div className="absolute bottom-10 left-1/2 w-[90%] -translate-x-1/2 text-white">
            <div className="flex w-full max-w-md items-center justify-between font-['Outfit'] text-xs uppercase tracking-[0.18em] text-amber-400 max-[300px]:text-[10px] max-[300px]:tracking-normal sm:text-sm sm:tracking-[0.42em]">
              <span>Seamless</span>
              <span className="text-center text-amber-500/80">|</span>
              <span>Secure</span>
              <span className="text-center text-amber-500/80">|</span>
              <span>Simple</span>
            </div>

            <h1 className="mt-0 grid w-full max-w-md grid-cols-[minmax(0,1fr)_1.2rem_minmax(0,1fr)_1.2rem_minmax(0,1fr)] font-['Fraunces'] text-xl font-normal italic leading-tight text-amber-100 sm:text-2xl">
              <span className="col-start-3 justify-self-center">solutions.</span>
            </h1>
          </div>

          <a
            href="#contact"
            aria-label="Contact"
            className="absolute bottom-2 left-[56%] inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-amber-600 px-2.5 py-1 font-['Outfit'] text-[10px] uppercase leading-none tracking-[0.12em] text-white transition-all duration-300 hover:gap-2 hover:bg-amber-500 max-[300px]:left-[52%] max-[300px]:gap-0 max-[300px]:px-2 max-[300px]:text-[9px] sm:left-[53%]"
          >
            Get Started
            <span aria-hidden="true">→</span>
          </a>
        </div>

      </section>
    </>
  );
}