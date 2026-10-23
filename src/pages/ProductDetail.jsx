import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Nav from "./Nav";
import Footer from "../components/Footer";
import ProductVideo from "../components/ProductVideo";
import ProductFaq from "../components/ProductFaq";
import { getProduct, hospitalitySuite } from "../data/products";

export default function ProductDetail({ slug }) {
  const product = getProduct(slug);

  useEffect(() => {
    if (!product) return undefined;
    document.title = `${product.displayName} | ATSL`;
    window.scrollTo(0, 0);
    return () => {
      document.title = "ATSL";
    };
  }, [product]);

  if (!product) {
    return (
      <>
        <Nav />
        <main className="bg-[#fffbf2] px-6 py-24 text-center">
          <h1 className="text-3xl font-bold text-[#291a06]">Product not found</h1>
          <Link to="/" className="mt-6 inline-block text-amber-700 underline">
            Back home
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="bg-[#fffbf2]">
        <section className="px-4 py-16 sm:px-6 md:py-20">
          <div className="mx-auto grid w-11/12 max-w-6xl items-center gap-10 md:grid-cols-2">
            <div
              className={`flex min-h-72 items-center justify-center rounded-3xl p-8 ${product.logoBg} ${
                product.logoBg === "bg-white" ? "border border-amber-100 shadow-sm" : ""
              }`}
            >
              <img
                src={product.logo}
                alt={`${product.displayName} logo`}
                className="max-h-72 w-full object-contain"
              />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
                {product.tagline}
              </p>
              <h1 className="mt-3 font-['Fraunces'] text-4xl font-medium leading-tight text-[#291a06] sm:text-5xl">
                {product.displayName}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[#5c3b16] sm:text-lg">
                {product.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#video"
                  className="inline-flex items-center gap-2 rounded-full bg-[#291a06] px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
                >
                  Watch video
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  to="/contactUs"
                  className="inline-flex items-center rounded-full border border-[#291a06] px-6 py-3 text-sm font-semibold text-[#291a06] transition hover:bg-[#291a06] hover:text-white"
                >
                  Book a demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-[#faeed3] px-4 py-16 sm:px-6">
          <div className="mx-auto w-11/12 max-w-6xl">
            <h2 className="font-['Fraunces'] text-3xl font-medium text-[#291a06] md:text-4xl">
              Feature highlights
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {product.highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#291a06] text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-[#291a06]">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-[#5c3b16]">{item.text}</p>
                  </article>
                );
              })}
            </div>

            {product.family === "hospitality" && (
              <aside className="mt-10 rounded-3xl bg-[#291a06] p-8 text-white">
                <h3 className="font-['Fraunces'] text-2xl font-medium">
                  Hospitality suite
                </h3>
                <ul className="mt-5 space-y-3 text-[#f5e8d7]">
                  {hospitalitySuite.map((item) => (
                    <li key={item.name}>
                      <span className="font-semibold text-amber-300">{item.name}.</span>{" "}
                      {item.text}
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </section>

        {product.gallery.length > 0 && (
          <section className="px-4 py-16 sm:px-6">
            <div className="mx-auto w-11/12 max-w-6xl">
              <h2 className="font-['Fraunces'] text-3xl font-medium text-[#291a06] md:text-4xl">
                Inside {product.displayName}
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {product.gallery.map((shot) => (
                  <img
                    key={shot.alt}
                    src={shot.src}
                    alt={shot.alt}
                    className="h-56 w-full rounded-2xl border border-amber-100 object-cover object-top shadow-sm sm:h-64"
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid w-11/12 max-w-6xl gap-12 lg:grid-cols-2">
            <ProductVideo product={product} />
            <ProductFaq product={product} />
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto w-11/12 max-w-6xl rounded-3xl bg-[#291a06] px-8 py-12 text-center text-white">
            <h2 className="font-['Fraunces'] text-3xl font-medium">
              See {product.displayName} with your team
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#f5e8d7]">
              Tell us how you operate and we will walk through the product on a demo.
            </p>
            <Link
              to="/contactUs"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-600 px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-amber-500"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
