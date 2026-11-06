import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "../data/products";

const SLIDE_MS = 2800;

export default function ProductPage() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = products.length;

  useEffect(() => {
    if (paused || count < 2) return undefined;

    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, SLIDE_MS);

    return () => clearInterval(interval);
  }, [count, paused]);

  return (
    <section className="w-full bg-white px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
      <div className="mx-auto w-11/12 max-w-7xl">
        <header className="mb-8 text-center sm:mb-10">
          <h2 className="font-['Fraunces'] text-2xl font-normal italic leading-tight tracking-tight text-[#291a06] sm:text-3xl lg:text-4xl">
            Products
          </h2>
          <div className="mt-3 flex justify-center">
            <div className="h-0.5 w-16 bg-[#cd9432]" />
          </div>
        </header>

        <div
          className="grid"
          aria-live="polite"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {products.map((product, productIndex) => {
            const active = productIndex === index;

            return (
              <article
                key={product.slug}
                id={product.slug}
                inert={active ? undefined : true}
                aria-hidden={active ? undefined : true}
                className={`col-start-1 row-start-1 scroll-mt-28 overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-md transition-opacity duration-700 ${
                  active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <div className="grid items-center gap-8 p-6 md:grid-cols-2 md:p-10">
                  <div
                    className={`flex min-h-64 items-center justify-center rounded-2xl p-6 ${product.logoBg}`}
                  >
                    <img
                      src={product.logo}
                      alt={`${product.displayName} logo`}
                      className="max-h-56 w-full object-contain"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#cd9432]">
                      {product.tagline}
                    </p>
                    <h3 className="mt-2 font-['Fraunces'] text-3xl font-medium text-[#291a06] md:text-4xl">
                      {product.displayName}
                    </h3>
                    <p className="mt-4 leading-relaxed text-[#5c3b16]">
                      {product.summary}
                    </p>

                    <Link
                      to={product.href}
                      tabIndex={active ? undefined : -1}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#291a06] px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
                    >
                      View {product.name}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
