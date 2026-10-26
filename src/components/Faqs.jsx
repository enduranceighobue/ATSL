import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { products } from "../data/products";

const faqs = products.flatMap((product) => product.faqs).slice(0, 5);

function scrollToContactForm() {
  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="faqs"
      className="scroll-mt-[4.5rem] border-t border-[#cd9432] bg-[#fcfaf4] px-4 py-14 sm:px-6 sm:py-16"
      aria-labelledby="faqs-heading"
    >
      <div className="mx-auto w-11/12 max-w-3xl">
        <header className="mb-8 text-center sm:mb-10">
          <h2
            id="faqs-heading"
            className="font-['Fraunces'] text-2xl font-normal italic leading-tight tracking-tight text-[#291a06] sm:text-3xl lg:text-4xl"
          >
            FAQs
          </h2>
          <div className="mt-3 flex justify-center">
            <div className="h-0.5 w-16 bg-[#cd9432]" />
          </div>
        </header>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-[#cd9432]/70 bg-[#fcfaf4]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#cd9432]/10"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-['Fraunces'] text-base font-normal italic leading-snug text-[#291a06] sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#cd9432] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <p
                    id={`faq-answer-${index}`}
                    className="border-t border-[#cd9432]/40 px-5 py-4 text-sm leading-relaxed text-[#291a06] sm:text-base"
                  >
                    {faq.answer}
                  </p>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={scrollToContactForm}
            className="cursor-pointer rounded-full border border-[#cd9432] bg-[#cd9432] px-8 py-3 font-['Fraunces'] text-sm font-normal italic text-black transition hover:bg-[#e6c35c]"
          >
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
}
