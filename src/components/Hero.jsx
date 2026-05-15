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
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 min-h-screen flex items-center">
          <div className="w-[90%] mx-auto container">

            <div className="max-w-3xl mx-auto text-white text-center">
              <h1 className="font-['Sora'] text-3xl sm:text-4xl lg:text-4xl font-extrabold leading-tight mt-20 tracking-tight">
                Adaptive Tech Solutions Limited
              </h1>

              <div className="mt-6 space-y-5 text-base sm:text-lg leading-relaxed text-gray-200">

                <p>
                  Is your number one Tech Solutions Company that provides
                  simple, safe and effective solutions for all your business
                  processes, complexities and needs.
                </p>

                <p>
                  Our goal is to provide high value consistancy services, rapid
                  solutions development with security embedded every step of the
                  way.
                </p>


              </div>

              <a
                href="/contactus"
                aria-label="ContactUs"
                className="inline-block mt-10 px-5 py-2 border-2 border-amber-600 text-white rounded-[40px] transition-all duration-300 font-medium text-lg overflow-hidden group hover:px-14"
              >
                <span className="inline-block transition-all duration-300 group-hover:tracking-[0.3em]">
                  Get Started
                </span>
              </a>

            </div>
          </div>
        </div>

      </section>
    </>
  );
}