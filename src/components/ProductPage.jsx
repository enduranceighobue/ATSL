import { CheckCircle } from "lucide-react";
import { useState } from "react";
import product1 from "../assets/product6.jpeg";
import product2 from "../assets/product7.jpeg";
import product3 from "../assets/product8.jpeg";
import product4 from "../assets/product9.jpeg";
import product5 from "../assets/product5.png";

export default function ProductPage() {

    const [selectedImage, setSelectedImage] = useState(null);

    const cards = [
        {
            title: "Trusted Accross Nigeria",
            image: product1,
        },
        {
            title: "Occupancy Accuracy",
            image: product2,
        },
        {
            title: "Report Generation",
            image: product3,
        },
        {
            title: "POS Integration",
            image: product4,
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
            <div className="text-center sm:mb-12 md:mb-16">
                <p className="text-base sm:text-lg font-bold text-[#8d561e] mb-4">
                    Our Product
                </p>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#291a06] mb-3 sm:mb-4">
                    The Innvista
                </h2>

                <div className="flex justify-center ">
                    <div className="w-16 h-1 bg-amber-600 rounded-full"></div>
                </div>

                <p className="text-base sm:text-lg text-[#8d561e] leading-relaxed mt-5 max-w-2xl mx-auto">
                    Cloud-First, Always Available.
                </p>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">


                {/* LEFT SIDE - TEXT */}
                <div className="order-2 md:order-1">
                    <h2 className="text-3xl md:text-4xl  font-bold text-gray-900 leading-tight">
                        <br />
                        Designed to meet <br />
                        international hospitality standards.
                    </h2>

                    <p className="mt-4 text-gray-600 leading-relaxed">
                        The InnVista a fully integrated, cloud-ready platform purpose-built to streamline every aspect of hotel operations. From the moment a guest books a room to the time they check out, our system ensures a seamless experience for both your team and your guests.
                        Designed with flexibility and ease of use in mind, the platform brings together front office management, online bookings, outlet operations, inventory control, and insightful reporting — all under one roof. Below is an overview of the core modules included in this solution.
                    </p>

                    <ul className="mt-6 space-y-2 text-gray-700 text-sm">
                        <li>• Front Office Booking</li>
                        <li>• ⁠Booking Engine Connected to Website</li>
                        <li>• Room Management</li>
                        <li>• ⁠Inventory Module</li>
                        <li>• ⁠⁠POS/Real-Time Order Taker</li>
                        <li>• ⁠⁠and many more</li>
                    </ul>

                    <a href="#contact">
                        <button className="mt-6 px-6 py-3 bg-[#291a06] text-white rounded-[40px] hover:bg-[#e2a354] transition">
                        Book A Demo
                    </button>
                    </a>
                </div>

                {/* RIGHT SIDE - IMAGE CARDS */}
                <div className="order-1 md:order-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {cards.map((card, index) => (
                        <div key={index} className="space-y-2">

                            {/* TITLE OUTSIDE CARD */}
                            <h3 className="font-semibold text-lg text-gray-900">
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