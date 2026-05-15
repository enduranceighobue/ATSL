import {
  Users,
  Calendar,
  CreditCard,
  BarChart3,
  MessageCircle,
  Shield,
  Smartphone,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Guest Management",
    description:
      "Comprehensive guest profiles with preferences, history, and automated communication",
  },
  {
    icon: Calendar,
    title: "Smart Reservations",
    description:
      "Intelligent booking system with real-time availability and dynamic pricing",
  },
  {
    icon: CreditCard,
    title: "Payment Processing",
    description:
      "Secure payment gateway with multiple currencies and automated billing",
  },
  {
    icon: BarChart3,
    title: "Revenue Analytics",
    description:
      "Advanced reporting and forecasting tools to maximize your revenue potential",
  },
  {
    icon: MessageCircle,
    title: "Guest Communication",
    description:
      "Automated messaging system for confirmations, updates, and personalized offers",
  },
  {
    icon: Shield,
    title: "Data Security",
    description:
      "Enterprise-grade security with GDPR compliance and encrypted data storage",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description:
      "Native mobile apps for staff and guests with offline functionality",
  },
  {
    icon: Globe,
    title: "Multi-Property",
    description:
      "Manage multiple properties from a single dashboard with centralized reporting",
  },
];

export default function Feature() {
  return (
    <>

      <section id="features" className="py-20 bg-[#fcf6ee]">
        <div className="container mx-auto px-6">
          <header className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#291a06] mb-6">
              Everything You Need to
              <span className="text-[#8b4513] block">
                Run Your Hotel
              </span>
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <article
                key={index}
                className="group bg-white p-8 rounded-2xl hover:bg-[#f5e8d7] transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
              >
                <div className="bg-[#291a06] w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#6a3711] transition-colors">
                  <feature.icon
                    className="h-8 w-8 text-white"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-xl font-bold text-[#562d0b] mb-4">
                  {feature.title}
                </h3>

                <p className="text-[#6a3711] leading-relaxed">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>

          {/* Integration Section */}
          {/* 
          <aside className="mt-20 bg-gradient-to-r from-[#8b4513] to-[#291a06] rounded-3xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-6">
              Seamless Integrations
            </h3>

            <p className="text-xl mb-8 opacity-90">
              Connect with 100+ popular hotel management tools and platforms
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
              <span className="bg-white/20 px-4 py-2 rounded-full">
                Booking.com
              </span>

              <span className="bg-white/20 px-4 py-2 rounded-full">
                Expedia
              </span>

              <span className="bg-white/20 px-4 py-2 rounded-full">
                Airbnb
              </span>

              <span className="bg-white/20 px-4 py-2 rounded-full">
                TripAdvisor
              </span>

              <span className="bg-white/20 px-4 py-2 rounded-full">
                Stripe
              </span>

              <span className="bg-white/20 px-4 py-2 rounded-full">
                PayPal
              </span>
            </div>
          </aside>
          */}
        </div>
      </section>
    </>
  );
}