import { CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ProductPage() {

    const [selectedImage, setSelectedImage] = useState(null);

    const cards = [
        {
            title: "Trusted Accross Nigeria",
            image: "/src/assets/product5.png",
        },
        {
            title: "Occupancy Accuracy",
            image: "/src/assets/product1.png",
        },
        {
            title: "Report Generation",
            image: "/src/assets/product3.png",
        },
        {
            title: "POS Integration",
            image: "/src/assets/product4.png",
        },
    ];

    return (
        <section className="w-full py-20 px-6 md:px-16 bg-[#fffbf2]">
            {/* IMAGE MODAL */}
            {selectedImage && (
                <div
                    onClick={() => setSelectedImage(null)}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                >
                    <img
                        src={selectedImage}
                        alt="Preview"
                        className="max-w-5xl w-full max-h-[90vh] object-contain rounded-lg"
                    />
                </div>
            )}
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <p className="text-sm font-bold text-[#8d561e] mb-4">
                    Our Promise
                </p>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#291a06] mb-3 sm:mb-4">
                    Our Product
                </h2>

                <div className="flex justify-center">
                    <div className="w-16 h-1 bg-amber-600 rounded-full"></div>
                </div>

                <p className="text-base sm:text-lg text-[#8d561e] leading-relaxed mt-6 max-w-2xl mx-auto">
                    Create Smart Solutions for Every Business Need.
                </p>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">


                {/* LEFT SIDE - TEXT */}
                <div className="order-2 md:order-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                        High Value. <br />
                        Rapid Delivery. <br />
                        Security First.
                    </h2>

                    <p className="mt-4 text-gray-600 leading-relaxed">
                        We provide high value consistency services, rapid solutions development
                        with security embedded every step of the way. Our expert team delivers
                        within scope and on time with the highest professionalism.
                    </p>

                    <ul className="mt-6 space-y-2 text-gray-700 text-sm">
                        <li>• Security embedded at every development stage</li>
                        <li>• On-time and within-budget delivery guaranteed</li>
                        <li>• Agile development with rapid turnaround</li>
                        <li>• Dedicated 24/7 technical support team</li>
                    </ul>

                    <button className="mt-6 px-6 py-3 bg-[#291a06] text-white rounded-[40px] hover:bg-gray-800 transition">
                        Book A Demo
                    </button>
                </div>

                {/* RIGHT SIDE - IMAGE CARDS */}
                <div className="order-1 md:order-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {cards.map((card, index) => (
                        <div key={index} className="space-y-2">

                            {/* TITLE OUTSIDE CARD */}
                            <h3 className="font-semibold text-lg text-gray-900">
                                {card.title}
                            </h3>

                            {/* IMAGE CARD */}
                            <div
                                onClick={() => setSelectedImage(card.image)}
                                className="cursor-pointer rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition"
                            >
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-48 sm:h-52 object-cover hover:scale-105 transition duration-500"
                                />
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}