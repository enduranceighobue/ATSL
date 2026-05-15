import { MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { MessageSquare } from "lucide-react";


import whatsapp from "../assets/whatsapicon.png";

// import Navber from "./Navber";
// import Footer from "./Footer";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [successMsg, setSuccessMsg] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = (data) => {
        const errs = {};

        if (!data.name.trim()) {
            errs.name = "Please enter your name.";
        }

        if (!data.email.trim()) {
            errs.email = "Please enter your email address.";
        } else if (!/^[\w-.]+@[\w-]+\.[\w-.]+$/.test(data.email)) {
            errs.email = "Please enter a valid email address.";
        }

        if (!data.message.trim()) {
            errs.message = "Please enter a message.";
        }

        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSuccessMsg(null);
        setIsSubmitting(true);

        const validation = validate(formData);

        setErrors(validation);

        if (Object.keys(validation).length > 0) {
            setTouched({
                name: true,
                email: true,
                phone: true,
                subject: true,
                message: true,
            });

            setIsSubmitting(false);
            return;
        }

        try {
            const formPayload = new FormData();

            formPayload.append(
                "access_key",
                "fcad128c-bc8c-41d5-81dc-481f9c9a9db6"
            );

            formPayload.append("name", formData.name);
            formPayload.append("phone", formData.phone);
            formPayload.append("email", formData.email);
            formPayload.append("subject", formData.subject);
            formPayload.append("message", formData.message);

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formPayload,
                }
            );

            const data = await response.json();

            if (data.success) {
                setSuccessMsg("✅ Your message has been sent successfully!");

                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    subject: "",
                    message: "",
                });

                setErrors({});
                setTouched({});
            } else {
                alert("❌ Failed to send message. Please try again later.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;

        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    const showError = (field) => {
        return Boolean(touched[field] && errors[field]);
    };

    return (
        <>
            {/* <Navber /> */}

            <section className="py-16 px-4 sm:px-6 bg-[#fff7e3] scroll-mt-20">

                <div className="w-11/12 mx-auto">

                    <div className="text-center mb-12">

                        <p className="text-sm font-bold text-[#8d561e] mb-4">
                            Get In Touch
                        </p>

                        <a href="/" aria-label="Home">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#291a06] mb-4">
                                Contact Us
                            </h2>
                        </a>

                        <div className="flex justify-center mb-6">
                            <div className="flex items-center gap-1">
                                {/* <div className="w-12 h-0.5 bg-gray-400"></div> */}
                                <div className="w-16 h-0.5 bg-amber-600"></div>
                                {/* <div className="w-12 h-0.5 bg-gray-400"></div> */}

                            </div>

                        </div>
                        <p className="text-lg text-gray-600">We are always ready to assist — reach us through any of these channels.</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">

                        {/* Contact Info */}
                        <div className="bg-white rounded-lg shadow-md border-t-4 border-[#291a06] p-8">

                            <div className="space-y-8">

                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-[#f5e8d7] rounded-full flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-amber-700" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            Address
                                        </h3>

                                        <p className="text-gray-600">
                                            39A Festac Link Road, Amuwo-Odofin, Lagos State, Nigeria.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-[#f5e8d7] rounded-full flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-amber-700" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            Call Us
                                        </h3>

                                        <p className="text-gray-600">
                                            +234 7036114481
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-[#f5e8d7] rounded-full flex items-center justify-center">
                                        <MessageSquare className="w-6 h-6 text-amber-700" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            WhatsApp Us
                                        </h3>

                                        <p className="text-gray-600">
                                            +234 9160343983
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-[#f5e8d7] rounded-full flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-amber-700" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            Email Us
                                        </h3>

                                        <p className="text-gray-600">
                                            toseni@atslng.com
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-lg shadow-md border-t-4 border-[#291a06] p-8">

                            {successMsg && (
                                <p className="text-[#291a06] mb-4">
                                    {successMsg}
                                </p>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div className="grid grid-cols-2 gap-4">

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full px-4 py-3 border rounded ${showError("name") ? "border-red-500" : ""
                                            }`}
                                    />

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full px-4 py-3 border rounded"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full px-4 py-3 border rounded ${showError("email") ? "border-red-500" : ""
                                            }`}
                                    />

                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full px-4 py-3 border rounded"
                                    />
                                </div>

                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full px-4 py-3 border rounded h-32 ${showError("message") ? "border-red-500" : ""
                                        }`}
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-3 bg-[#291a06] rounded-[40px] cursor-pointer text-white rounded hover:bg-[#3b260b] transition"
                                >
                                    {isSubmitting ? "Sending..." : "Send"}
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            </section>

            {/* <Footer /> */}
        </>
    );
}