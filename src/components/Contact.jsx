import { MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { email, offices, phones, whatsappLink } from "../data/company";
import ContactForm from "./ContactForm";

export default function Contact() {
    return (
        <>
            {/* <Navber /> */}

            <section className="min-h-[calc(100svh-4.5rem)] bg-[#fff7e3] px-4 pb-12 pt-6 sm:px-6 sm:pt-8">

                <div className="mx-auto w-full sm:w-11/12">

                    <div className="mb-8 text-center">
                        <h2 className="font-['Fraunces'] text-2xl font-normal italic leading-tight tracking-tight text-[#291a06] sm:text-3xl lg:text-4xl">
                            Contact Us
                        </h2>
                        <div className="mt-3 mb-6 flex justify-center">
                            <div className="h-0.5 w-16 bg-[#cd9432]" />
                        </div>
                        <p className="text-lg text-gray-600">We are always ready to assist — reach us through any of these channels.</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">

                        {/* Contact Info */}
                        <div className="bg-white rounded-lg shadow-md border-t-4 border-[#291a06] p-5 sm:p-8">

                            <div className="space-y-8">

                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-[#f5e8d7] rounded-full flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-amber-700" />
                                    </div>

                                    <div>
                                        <h3 className="mb-2 font-['Fraunces'] text-xl font-normal italic leading-snug text-[#291a06]">
                                            Location
                                        </h3>

                                        <p className="text-gray-600">
                                            {offices}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-[#f5e8d7] rounded-full flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-amber-700" />
                                    </div>

                                    <div>
                                        <h3 className="mb-2 font-['Fraunces'] text-xl font-normal italic leading-snug text-[#291a06]">
                                            Contact Us
                                        </h3>

                                        <div className="space-y-1">
                                            {phones.map((phone, index) => (
                                                <a
                                                    key={phone.e164}
                                                    href={whatsappLink(phone.e164)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 whitespace-nowrap text-sm leading-none text-gray-600 hover:text-amber-700 sm:text-base"
                                                >
                                                    {index === 0 ? (
                                                        <FaWhatsapp
                                                            className="h-4 w-4 shrink-0 text-[#25D366]"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <Phone
                                                            className="h-4 w-4 shrink-0 text-amber-700"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                    <span>{phone.display}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                               
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-[#f5e8d7] rounded-full flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-amber-700" />
                                    </div>

                                    <div>
                                        <h3 className="mb-2 font-['Fraunces'] text-xl font-normal italic leading-snug text-[#291a06]">
                                            Email Us
                                        </h3>

                                        <a
                                            href={`mailto:${email}`}
                                            className="text-gray-600 hover:text-amber-700"
                                        >
                                            {email}
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Contact Form */}
                        <div id="contact-form" className="scroll-mt-[4.5rem] bg-white rounded-lg shadow-md border-t-4 border-[#291a06] p-8">
                            <ContactForm />
                        </div>

                    </div>
                </div>
            </section>

            {/* <Footer /> */}
        </>
    );
}