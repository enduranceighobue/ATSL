import { MapPin, Phone, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { email, offices, phones, whatsappLink } from "../data/company";

const CONTACT_REASONS = [
    { value: "general", label: "General enquiry" },
    { value: "product", label: "Product or service enquiry" },
    { value: "partnership", label: "Partnership" },
    { value: "support", label: "Support" },
    { value: "career", label: "Apply for a role" },
];

const APPLY_REASON = "career";
const MAX_CV_BYTES = 5 * 1024 * 1024;
const CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

const emptyForm = {
    name: "",
    phone: "",
    email: "",
    reason: "",
    role: "",
    message: "",
};

function reasonLabel(value) {
    return CONTACT_REASONS.find((item) => item.value === value)?.label ?? "";
}

function isAllowedCv(file) {
    const name = file.name.toLowerCase();
    return CV_EXTENSIONS.some((extension) => name.endsWith(extension));
}

function friendlySendError(message) {
    if (/activation/i.test(message)) {
        return `Open the activation email sent to ${email} and click the link once, then send the application again.`;
    }

    if (/pro feature|file upload/i.test(message)) {
        return "The email service blocked the CV. Please try again in a moment.";
    }

    return message;
}

async function readSubmitResult(response) {
    const data = await response.json().catch(() => ({}));
    const succeeded = data.success === true || data.success === "true";

    if (!response.ok || !succeeded) {
        throw new Error(
            friendlySendError(data.message || "Failed to send. Please try again later.")
        );
    }
}

export default function Contact() {
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState(emptyForm);
    const [cvFile, setCvFile] = useState(null);

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [toast, setToast] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!toast) return undefined;

        const timeout = window.setTimeout(() => setToast(null), 6000);
        return () => window.clearTimeout(timeout);
    }, [toast]);

    const isApplication = formData.reason === APPLY_REASON;

    const validate = (data, file) => {
        const errs = {};
        const applying = data.reason === APPLY_REASON;

        if (!data.name.trim()) {
            errs.name = "Please enter your name.";
        }

        if (!data.email.trim()) {
            errs.email = "Please enter your email address.";
        } else if (!/^[\w-.]+@[\w-]+\.[\w-.]+$/.test(data.email)) {
            errs.email = "Please enter a valid email address.";
        }

        if (!data.reason) {
            errs.reason = "Please select a reason for contacting us.";
        }

        if (applying && !data.role.trim()) {
            errs.role = "Please enter the role you are applying for.";
        }

        if (applying && !file) {
            errs.cv = "Please upload your CV.";
        } else if (applying && file && !isAllowedCv(file)) {
            errs.cv = "Upload a PDF or Word document.";
        } else if (applying && file && file.size > MAX_CV_BYTES) {
            errs.cv = "CV must be 5 MB or smaller.";
        }

        if (!data.message.trim()) {
            errs.message = applying
                ? "Please add a short note with your application."
                : "Please enter a message.";
        }

        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setToast(null);
        setIsSubmitting(true);

        const validation = validate(formData, cvFile);

        setErrors(validation);

        if (Object.keys(validation).length > 0) {
            setTouched({
                name: true,
                email: true,
                phone: true,
                reason: true,
                role: true,
                cv: true,
                message: true,
            });

            setIsSubmitting(false);
            return;
        }

        const selectedReason = reasonLabel(formData.reason);
        const subject = isApplication
            ? `Job application: ${formData.role.trim()}`
            : selectedReason;

        try {
            const formPayload = new FormData();

            formPayload.append("name", formData.name);
            formPayload.append("phone", formData.phone);
            formPayload.append("email", formData.email);
            formPayload.append("reason", selectedReason);
            formPayload.append("message", formData.message);

            if (isApplication) {
                formPayload.append("role", formData.role.trim());
                formPayload.append("attachment", cvFile, cvFile.name);
                formPayload.append("_subject", subject);
                formPayload.append("_replyto", formData.email);
                formPayload.append("_template", "table");
                formPayload.append("_captcha", "false");
                formPayload.append("_honey", "");

                const response = await fetch(
                    `https://formsubmit.co/ajax/${email}`,
                    {
                        method: "POST",
                        body: formPayload,
                        headers: { Accept: "application/json" },
                    }
                );

                await readSubmitResult(response);
            } else {
                formPayload.append(
                    "access_key",
                    "fcad128c-bc8c-41d5-81dc-481f9c9a9db6"
                );
                formPayload.append("subject", subject);

                const response = await fetch(
                    "https://api.web3forms.com/submit",
                    {
                        method: "POST",
                        body: formPayload,
                    }
                );

                await readSubmitResult(response);
            }

            setToast({
                type: "success",
                message: isApplication
                    ? "Your application has been sent. We will be in touch."
                    : "Your message has been sent successfully.",
            });

            setFormData(emptyForm);
            setCvFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            setErrors({});
            setTouched({});
        } catch (err) {
            console.error(err);
            setToast({
                type: "error",
                message: err instanceof Error && err.message
                    ? err.message
                    : "Something went wrong. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "reason" && value !== APPLY_REASON ? { role: "" } : {}),
        }));

        setErrors((prev) => {
            if (!prev[name] && !(name === "reason" && value !== APPLY_REASON)) {
                return prev;
            }

            const next = { ...prev };
            delete next[name];
            if (name === "reason" && value !== APPLY_REASON) {
                delete next.role;
                delete next.cv;
            }
            return next;
        });

        if (name === "reason" && value !== APPLY_REASON) {
            setCvFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] ?? null;
        setCvFile(file);
        setErrors((prev) => {
            if (!prev.cv) return prev;
            const next = { ...prev };
            delete next.cv;
            return next;
        });
        setTouched((prev) => ({
            ...prev,
            cv: true,
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
            {toast && (
                <div
                    role="status"
                    aria-live="polite"
                    className={`fixed top-5 right-5 z-[80] w-[min(92vw,24rem)] rounded-lg px-4 py-3 text-sm text-white shadow-lg ${
                        toast.type === "success" ? "bg-green-600" : "bg-red-600"
                    }`}
                >
                    <div className="flex items-start justify-between gap-3">
                        <p>{toast.message}</p>
                        <button
                            type="button"
                            onClick={() => setToast(null)}
                            aria-label="Dismiss message"
                            className="shrink-0 text-lg leading-none text-white/80 hover:text-white"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

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
                        <p className="text-lg text-gray-600">We are always ready to assist — reach us through any of these channels, or use the form to apply for a role.</p>
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
                                            {offices}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-[#f5e8d7] rounded-full flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-amber-700" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            Contact Us
                                        </h3>

                                        <div className="space-y-1">
                                            {phones.map((phone, index) => (
                                                <a
                                                    key={phone.e164}
                                                    href={whatsappLink(phone.e164)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-gray-600 hover:text-amber-700"
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
                                                    {phone.display}
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
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
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
                        <div className="bg-white rounded-lg shadow-md border-t-4 border-[#291a06] p-8">

                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                    <div>
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
                                        {showError("name") && (
                                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                        )}
                                    </div>

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

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                    <div>
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
                                        {showError("email") && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <select
                                            name="reason"
                                            value={formData.reason}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-label="Reason for contacting ATSL"
                                            className={`w-full px-4 py-3 border rounded bg-white ${showError("reason") ? "border-red-500" : ""
                                                } ${formData.reason ? "text-gray-900" : "text-gray-500"}`}
                                        >
                                            <option value="">Reason for contacting</option>
                                            {CONTACT_REASONS.map((item) => (
                                                <option key={item.value} value={item.value}>
                                                    {item.label}
                                                </option>
                                            ))}
                                        </select>
                                        {showError("reason") && (
                                            <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
                                        )}
                                    </div>
                                </div>

                                {isApplication && (
                                    <div className="space-y-4 rounded-lg border border-[#f5e8d7] bg-[#fff7e3] p-4">
                                        <p className="text-sm text-[#291a06]">
                                            Tell us the role and attach your CV. We will reply to the email above.
                                        </p>

                                        <div>
                                            <input
                                                type="text"
                                                name="role"
                                                placeholder="Role you are applying for"
                                                value={formData.role}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`w-full px-4 py-3 border rounded bg-white ${showError("role") ? "border-red-500" : ""
                                                    }`}
                                            />
                                            {showError("role") && (
                                                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="cv" className="mb-2 block text-sm font-medium text-[#291a06]">
                                                Upload CV
                                                <span className="ml-1 font-normal text-gray-500">
                                                    (PDF or Word, max 5 MB)
                                                </span>
                                            </label>
                                            <input
                                                id="cv"
                                                ref={fileInputRef}
                                                type="file"
                                                name="cv"
                                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                onChange={handleFileChange}
                                                className={`w-full rounded border bg-white px-4 py-3 text-sm text-gray-700 file:mr-4 file:rounded-full file:border-0 file:bg-[#291a06] file:px-4 file:py-2 file:text-sm file:text-white ${showError("cv") ? "border-red-500" : ""
                                                    }`}
                                            />
                                            {showError("cv") && (
                                                <p className="mt-1 text-sm text-red-600">{errors.cv}</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <textarea
                                        name="message"
                                        placeholder={isApplication ? "Cover note" : "Message"}
                                        value={formData.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full px-4 py-3 border rounded h-32 ${showError("message") ? "border-red-500" : ""
                                            }`}
                                    />
                                    {showError("message") && (
                                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-3 bg-[#291a06] rounded-[40px] cursor-pointer text-white rounded hover:bg-[#3b260b] transition"
                                >
                                    {isSubmitting
                                        ? "Sending..."
                                        : isApplication
                                            ? "Send application"
                                            : "Send"}
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