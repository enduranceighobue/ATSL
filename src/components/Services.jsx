
import { Code, Smartphone, Cloud, Shield, Database, Zap } from 'lucide-react';



export default function Services() {

    const services = [
        {
            icon: Code,
            title: 'Web Development',
            description: 'Custom web applications built with modern frameworks.',
        },
        {
            icon: Smartphone,
            title: 'Mobile Apps',
            description: 'Native and cross-platform mobile applications for iOS devices.',
        },
        {
            icon: Cloud,
            title: 'Cloud Solutions',
            description: 'Scalable cloud infrastructure and migration services for your business.',
        },
        {
            icon: Shield,
            title: 'Cybersecurity',
            description: 'Comprehensive security solutions to protect your digital assets and data.',
        },
        {
            icon: Database,
            title: 'Database Management',
            description: 'Expert database design, optimization, and management services.',
        },
        {
            icon: Zap,
            title: 'IT Consulting',
            description: 'Strategic technology consulting to drive your business forward.',
        },
    ];


    const STATS = [
        { value: "20+", label: "Projects Delivered" },
        { value: "20+", label: "Enterprise Clients" },
        { value: "99%", label: "Uptime Guaranteed" },
        { value: "24/7", label: "Support Available" },
    ];



    return (
        <>
            <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#fffbf2] to-[#faeed3]">
                <div className="w-11/12 mx-auto">
                    <div className="text-center mb-10 sm:mb-12 md:mb-16">

                        < p className="text-sm font-bold text-[#8d561e] mb-4"> WHAT WE DO</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#291a06] mb-3 sm:mb-4">Our Services</h2>

                        <div className="flex justify-center">
                            {/* <div className="w-16 h-1 bg-gray-300 rounded-full"></div> */}
                            <div className="w-16 h-1 bg-amber-600 rounded-full"></div>
                            {/* <div className="w-16 h-1 bg-gray00 rounded-full"></div>  */}
                        </div>

                        <p className="text-base sm:text-lg text-[#8d561e] leading-relaxed mt-6 max-w-2xl mx-auto">End-to-end technology solutions tailored to move your business forward.</p>

                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-items-center sm:gap-8">          {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#f5e8d7] rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-700" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-[#291a06] mb-2 sm:mb-3">{service.title}</h3>
                                <p className="text-sm sm:text-base text-[#291a06] leading-relaxed">{service.description}</p>
                            </div>
                        );
                    })}
                    </div>


                </div>



            </section>

            <div className="bg-[#291a06] py-12 sm:py-16 mx-auto">

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">

                    {STATS.map((stat, index) => (
                        <div
                            key={index}
                            className="group transition-all duration-300 hover:-translate-y-2"
                        >

                            <h3 className="text-2xl sm:text-3xl lg:text-3xl font-extrabold text-[#d4a017] tracking-wide drop-shadow-lg">
                                {stat.value}
                            </h3>

                            <p className="mt-4 text-sm sm:text-base uppercase tracking-[0.2em] text-gray-300 font-light">
                                {stat.label}
                            </p>

                            {/* Decorative Line */}
                            <div className="w-14 h-[2px] bg-[#d4a017] mx-auto mt-4 rounded-full group-hover:w-20 transition-all duration-300"></div>

                        </div>
                    ))}
                </div>
            </div>


        </>
    )
}