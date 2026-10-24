import {
    Wifi,
    Workflow,
    ShieldCheck,
    Users,
    ArrowRightLeft,
    GraduationCap,
    Compass,
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
        icon: Users,
        title: "Staff Outsourcing",
        description:
            "Skilled people placed at your clients’ sites, supporting the work where it actually happens.",
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
        icon: Compass,
        title: "Consultancy",
        description:
            "Clear IT advice that turns a business problem into a technical path you can act on.",
    },
];

// const STATS = [
//     { value: "20+", label: "Projects Delivered" },
//     { value: "20+", label: "Enterprise Clients" },
//     { value: "99%", label: "Uptime Guaranteed" },
//     { value: "24/7", label: "Support Available" },
// ];

export default function Services() {
    return (
        <>
            <section className="bg-gradient-to-b from-[#fffbf2] to-[#faeed3] px-4 py-16 sm:px-6 sm:py-20 md:py-24">
                <div className="mx-auto w-full max-w-6xl">
                    <div className="mb-12 text-center sm:mb-16">
                        <p className="font-['Outfit'] text-xs font-medium uppercase tracking-[0.32em] text-[#8d561e]">
                            IT Consultancy
                        </p>
                        <h2 className="mt-4 font-['Fraunces'] text-3xl font-medium tracking-tight text-[#291a06] sm:text-4xl lg:text-5xl">
                            Our Services
                        </h2>
                        <div className="mt-5 flex justify-center">
                            <div className="h-px w-16 bg-[#d4a017]" />
                        </div>
                        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#6b4524] sm:text-base">
                            Networking, process, compliance, people, and the upgrades that keep a business moving.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            const isLast = index === services.length - 1;

                            return (
                                <article
                                    key={service.title}
                                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#ead9bf] bg-white/90 p-6 shadow-[0_18px_40px_-28px_rgba(41,26,6,0.55)] transition-all duration-500 hover:-translate-y-1 hover:border-[#d4a017]/80 hover:shadow-[0_28px_50px_-24px_rgba(41,26,6,0.4)] sm:p-7 ${
                                        isLast
                                            ? "sm:col-span-2 sm:w-full sm:max-w-md sm:justify-self-center lg:col-span-1 lg:col-start-2 lg:max-w-none"
                                            : ""
                                    }`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -right-1 -top-3 font-['Fraunces'] text-6xl font-medium leading-none text-[#d4a017]/15 transition-colors duration-500 group-hover:text-[#d4a017]/30 sm:text-7xl"
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#d4a017]/35 bg-[#fff8eb] text-[#8d561e] transition-colors duration-500 group-hover:border-[#291a06] group-hover:bg-[#291a06] group-hover:text-[#d4a017]">
                                        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                                    </div>

                                    <h3 className="font-['Fraunces'] text-xl font-medium leading-snug text-[#291a06] sm:text-[1.35rem]">
                                        {service.title}
                                    </h3>
                                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5c4030] sm:text-[0.95rem]">
                                        {service.description}
                                    </p>

                                    <div className="mt-6 h-px w-10 bg-[#d4a017] transition-all duration-500 group-hover:w-16" />
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* <div className="bg-[#291a06] px-4 py-12 sm:px-6 sm:py-16">
                <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 text-center sm:gap-10 lg:grid-cols-4">
                    {STATS.map((stat) => (
                        <div
                            key={stat.label}
                            className="group transition-all duration-300 hover:-translate-y-2"
                        >
                            <h3 className="font-['Fraunces'] text-3xl font-medium tracking-wide text-[#d4a017] sm:text-4xl">
                                {stat.value}
                            </h3>
                            <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-gray-300 sm:text-xs sm:tracking-[0.2em]">
                                {stat.label}
                            </p>
                            <div className="mx-auto mt-4 h-px w-10 bg-[#d4a017] transition-all duration-300 group-hover:w-16" />
                        </div>
                    ))}
                </div>
            </div> */}
        </>
    );
}
