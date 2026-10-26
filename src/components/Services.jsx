import {
    Wifi,
    Workflow,
    ShieldCheck,
    ArrowRightLeft,
    GraduationCap,
    Handshake,
} from "lucide-react";

const services = [
    {
        icon: Wifi,
        title: "Networking",
        description:
            "Wi-Fi setup and network design that keeps offices, sites, and teams reliably connected.",
    },
    {
        icon: Workflow,
        title: "Product & Process Improvement",
        description:
            "Review how products and processes run, then refine the steps that slow delivery.",
    },
    {
        icon: ShieldCheck,
        title: "Systems, IT Audit & Compliance",
        description:
            "Independent reviews of systems, controls, and compliance so technology stands up to scrutiny.",
    },
    {
        icon: ArrowRightLeft,
        title: "Data & Product Migration",
        description:
            "Upgrades and migrations planned so data and products move without stalling operations.",
    },
    {
        icon: GraduationCap,
        title: "Training",
        description:
            "Practical sessions that leave teams confident with the systems they use every day.",
    },
    {
        icon: Handshake,
        title: "Consultancy & Outsourcing",
        description:
            "IT advice that sets the technical path, and skilled people placed at your clients’ sites to carry it out.",
    },
];

export default function Services() {
    return (
        <section className="flex min-h-[calc(100svh-4.5rem)] flex-col bg-gradient-to-b from-[#fffbf2] to-[#faeed3] px-4 pb-10 pt-6 sm:px-6 sm:pt-8">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-6 text-center sm:mb-8">
                    <h2 className="font-['Fraunces'] text-2xl font-normal italic leading-tight tracking-tight text-[#291a06] sm:text-3xl lg:text-4xl">
                        Services
                    </h2>
                    <div className="mt-3 flex justify-center">
                        <div className="h-0.5 w-16 bg-[#cd9432]" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => {
                        const Icon = service.icon;

                        return (
                            <article
                                key={service.title}
                                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#ead9bf] bg-white/90 p-4 shadow-[0_18px_40px_-28px_rgba(41,26,6,0.55)] transition-all duration-500 hover:-translate-y-1 hover:border-[#cd9432]/80 hover:shadow-[0_28px_50px_-24px_rgba(41,26,6,0.4)] sm:p-5"
                            >
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#cd9432]/35 bg-[#fff8eb] text-[#8d561e] transition-colors duration-500 group-hover:border-[#291a06] group-hover:bg-[#291a06] group-hover:text-[#cd9432]">
                                    <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                                </div>

                                <h3 className="font-['Fraunces'] text-lg font-normal italic leading-snug text-[#291a06]">
                                    {service.title}
                                </h3>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5c4030]">
                                    {service.description}
                                </p>

                                <div className="mt-4 h-0.5 w-10 bg-[#cd9432] transition-all duration-500 group-hover:w-16" />
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
