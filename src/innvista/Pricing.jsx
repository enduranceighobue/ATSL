import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "per location/month",
    description: "Perfect for small hotels and B&Bs",
    features: [
      "Up to 25 rooms",
      "Basic reservation management",
      "Guest check-in/out",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$89",
    period: "per location/month",
    description: "Ideal for mid-size hotels",
    features: [
      "Up to 100 rooms",
      "Advanced reservation system",
      "Revenue management",
      "Channel manager integration",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For hotel chains and large properties",
    features: [
      "Unlimited rooms",
      "Multi-property management",
      "Advanced analytics",
      "24/7 phone support",
    ],
    popular: false,
  },
];

const scrollToDemo = () => {
  const element = document.getElementById("demo");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Pricing() {
  return (
    <>
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <header className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#562d0b] mb-6">
              Simple, Transparent
              <span className="text-[#8b4513] block">Pricing</span>
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <article
                key={index}
                className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular
                    ? "ring-2 ring-[#8b4513] scale-105"
                    : "border border-coffee-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#291a06] text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <header className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-[#562d0b] mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-[#8d561e] mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#562d0b]">
                      {plan.price}
                    </span>
                    <span className="text-[#8b4513] ml-2">
                      {plan.period}
                    </span>
                  </div>
                </header>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-[#8d561e] flex-shrink-0" />
                      <span className="text-[#8d561e]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToDemo}
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    plan.popular
                      ? "bg-[#291a06] text-white hover:bg-[#8d561e]"
                      : "bg-[#f5e8d7] text-[#562d0b] hover:bg-[#d2b48c]"
                  }`}
                >
                  Start Free Trial
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}