import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ProductFaq({ product, heading = true, anchorId = "faq" }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div id={anchorId || undefined}>
      {heading && (
        <h3 className="mb-4 font-['Fraunces'] text-2xl font-medium text-[#291a06] md:text-3xl">
          Questions about {product.displayName}
        </h3>
      )}

      <div className="space-y-3">
        {product.faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <article
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-[#291a06]">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-amber-700 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <p className="px-5 pb-5 leading-relaxed text-[#5c3b16]">
                  {faq.answer}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
