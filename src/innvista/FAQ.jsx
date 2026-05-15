import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How quickly can we get started with HotelPro?",
    answer:
      "Most hotels are up and running within 24-48 hours. Our dedicated implementation team will handle data migration, staff training, and system configuration to ensure a smooth transition.",
  },
  {
    question: "Does HotelPro integrate with our existing systems?",
    answer:
      "Yes, HotelPro integrates with 100+ popular hotel management tools including PMS systems, channel managers, payment processors, and booking engines. Our API-first approach ensures seamless connectivity.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer 24/7 customer support through multiple channels including live chat, phone, and email. Each customer gets a dedicated success manager and access to our comprehensive knowledge base and training resources.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>

      <section id="faq" className="py-20 bg-[#fff7e3]">
        <div className="container mx-auto px-6">
          <header className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#562d0b] mb-6">
              Frequently Asked
              <span className="text-[#8b4513] block">
                Questions
              </span>
            </h2>
          </header>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-coffee-50 transition-colors"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-semibold text-[#562d0b] pr-4">
                    {faq.question}
                  </h3>

                  {openIndex === index ? (
                    <ChevronUp
                      className="h-5 w-5 text-[#8b4513] flex-shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronDown
                      className="h-5 w-5 text-[#8b4513] flex-shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </button>

                {openIndex === index && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-6 pb-6"
                  >
                    <p className="text-[#562d0b] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* CTA Section */}
          <footer className="text-center mt-16">
            <button
              onClick={scrollToContact}
              className="bg-[#291a06] text-white px-8 py-3 rounded-full hover:bg-[#562d0b] transition-colors font-semibold"
              aria-label="Contact our support team for more help"
            >
              Contact Our Support Team
            </button>
          </footer>
        </div>
      </section>
    </>
  );
}