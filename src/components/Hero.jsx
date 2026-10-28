import { useEffect, useState } from "react";

import heroImage1 from "../assets/innvista2.png";
import heroImage3 from "../assets/innivis.png";

export default function Hero() {
  const images = [heroImage1, heroImage3];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative h-svh overflow-hidden">

        {/* Background Images */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out ${index === currentImage
              ? "opacity-100 scale-110"
              : "opacity-0 scale-100"
              }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/30"></div>

        {/* Hero Content */}
        <div className="relative z-20 flex h-full items-center">
          <div className="container mx-auto w-[90%]">
            <div className="max-w-md text-left text-white">
              <p className="font-['Outfit'] text-xs uppercase tracking-[0.42em] text-amber-400 sm:text-sm">
                Seamless
                <span className="mx-3 text-amber-500/80">|</span>
                Secure
                <span className="mx-3 text-amber-500/80">|</span>
                Simple
              </p>

              <h1 className="mt-4 font-['Fraunces'] text-2xl font-normal italic leading-tight tracking-tight text-amber-100 sm:text-3xl lg:text-4xl">
                solutions.
              </h1>

              <a
                href="#contact"
                aria-label="Contact"
                className="mt-5 inline-flex items-center gap-1 rounded-full bg-amber-600 px-2.5 py-1 font-['Outfit'] text-[10px] uppercase leading-none tracking-[0.12em] text-white transition-all duration-300 hover:gap-2 hover:bg-amber-500"
              >
                Get Started
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}