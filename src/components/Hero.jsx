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
      <section className="relative min-h-screen overflow-hidden">

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
        <div className="relative z-20 min-h-screen flex items-center">
          <div className="w-[90%] mx-auto container py-28">

            <div className="max-w-2xl text-white">
              <p className="font-['Outfit'] text-[11px] sm:text-xs uppercase tracking-[0.42em] text-amber-400">
                Seamless
                <span className="mx-3 text-amber-500/80">|</span>
                Secure
                <span className="mx-3 text-amber-500/80">|</span>
                Simple
              </p>

              <h1 className="mt-6 font-['Fraunces'] text-4xl sm:text-6xl lg:text-7xl font-medium leading-[0.95] tracking-tight">
                Cloud-based
                <span className="block italic font-normal text-amber-100">
                  solutions.
                </span>
              </h1>

              <p className="mt-6 font-['Outfit'] text-sm sm:text-base uppercase tracking-[0.22em] text-white/80">
                Adaptive Tech Solutions Limited
              </p>

              <div className="mt-6 max-w-xl space-y-4 text-sm sm:text-base font-light leading-relaxed text-gray-200">
                <p>
                  Is your number one Tech Solutions Company that provides
                  simple, safe and effective solutions for all your business
                  processes, complexities and needs.
                </p>

                <p>
                  Our goal is to provide high value consistency services, rapid
                  solutions development with security embedded every step of the
                  way.
                </p>
              </div>

              <a
                href="#contact"
                aria-label="Contact"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-amber-600 px-7 py-3 font-['Outfit'] text-sm uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-amber-500 hover:gap-5"
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