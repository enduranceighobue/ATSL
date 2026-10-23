import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "../data/products";
import ProductVideo from "./ProductVideo";
import ProductFaq from "./ProductFaq";

export default function ProductPage() {
  return (
    <section id="product" className="scroll-mt-24 w-full bg-[#fffbf2] px-4 py-20 sm:px-6">
      <div className="mx-auto w-11/12 max-w-7xl">
        <header className="mb-14 text-center">
          <p className="mb-4 text-base font-bold text-[#8d561e]">Our Products</p>
          <h2 className="font-['Fraunces'] text-3xl font-medium text-[#291a06] sm:text-4xl lg:text-5xl">
            InnVista, PlogInn, and StafPay
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 rounded-full bg-amber-600" />
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#8d561e] sm:text-lg">
            Hospitality management, a channel manager, and people operations.
            Each product has its own page.
          </p>
        </header>

        <div className="mb-16 grid gap-4 sm:grid-cols-3">
          {products.map((product) => (
            <a
              key={product.slug}
              href={`#${product.slug}`}
              className="rounded-2xl border border-amber-100 bg-white px-5 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="font-semibold text-[#291a06]">{product.displayName}</p>
              <p className="mt-1 text-sm text-[#8d561e]">{product.tagline}</p>
            </a>
          ))}
        </div>

        <div className="space-y-16">
          {products.map((product) => (
            <article
              key={product.slug}
              id={product.slug}
              className="scroll-mt-28 overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-md"
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
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
                    {product.tagline}
                  </p>
                  <h3 className="mt-2 font-['Fraunces'] text-3xl font-medium text-[#291a06] md:text-4xl">
                    {product.displayName}
                  </h3>
                  <p className="mt-4 leading-relaxed text-[#5c3b16]">
                    {product.summary}
                  </p>

                  <ul className="mt-6 space-y-2 text-sm text-[#291a06]">
                    {product.highlights.slice(0, 4).map((item) => (
                      <li key={item.title}>• {item.title}</li>
                    ))}
                  </ul>

                  <Link
                    to={product.href}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#291a06] px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
                  >
                    View {product.name}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-8 border-t border-amber-100 bg-[#fffbf2] p-6 md:grid-cols-2 md:p-10">
                <ProductVideo product={product} anchorId={`${product.slug}-video`} />
                <ProductFaq product={product} anchorId={`${product.slug}-faq`} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
