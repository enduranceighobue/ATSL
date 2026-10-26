import { useEffect, useState } from "react";

const CONTACT_REASONS = [
    { value: "general", label: "General enquiry" },
    { value: "product", label: "Product or service enquiry" },
    { value: "partnership", label: "Partnership" },
    { value: "support", label: "Support" },
];

const emptyForm = {
    name: "",
    phone: "",
    email: "",
    reason: "",
    message: "",
};

function reasonLabel(value) {
    return CONTACT_REASONS.find((item) => item.value === value)?.label ?? "";
}

async function readSubmitResult(response) {
    const data = await response.json().catch(() => ({}));
    const succeeded = data.success === true || data.success === "true";

    if (!response.ok || !succeeded) {
        throw new Error(data.message || "Failed to send. Please try again later.");
    }
}

export default function ContactForm({
    initialReason = "",
    subjectOverride = "",
    productName = "",
    suppressSuccessToast = false,
    onSuccess,
}) {
    const [formData, setFormData] = useState({
        ...emptyForm,
        reason: initialReason,
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [toast, setToast] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!toast) return undefined;

        const timeout = window.setTimeout(() => setToast(null), 6000);
        return () => window.clearTimeout(timeout);
    }, [toast]);

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

        if (!data.reason) {
            errs.reason = "Please select a reason for contacting us.";
        }

        if (!data.message.trim()) {
            errs.message = "Please enter a message.";
        }

        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setToast(null);
        setIsSubmitting(true);

        const validation = validate(formData);

        setErrors(validation);

        if (Object.keys(validation).length > 0) {
            setTouched({
                name: true,
                email: true,
                phone: true,
                reason: true,
                message: true,
            });

            setIsSubmitting(false);
            return;
        }

        const selectedReason = reasonLabel(formData.reason);
        const subject = subjectOverride || selectedReason;

        try {
            const formPayload = new FormData();

            formPayload.append("name", formData.name);
            formPayload.append("phone", formData.phone);
            formPayload.append("email", formData.email);
            formPayload.append("reason", selectedReason);
            formPayload.append("message", formData.message);
            if (productName) {
                formPayload.append("product", productName);
            }
            formPayload.append(
                "access_key",
                "fcad128c-bc8c-41d5-81dc-481f9c9a9db6"
            );
            formPayload.append("subject", subject);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formPayload,
            });

            await readSubmitResult(response);

            if (!suppressSuccessToast) {
                setToast({
                    type: "success",
                    message: "Your message has been sent successfully.",
                });
            }

            setFormData({ ...emptyForm, reason: initialReason });
            setErrors({});
            setTouched({});
            onSuccess?.("Your message has been sent successfully.");
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
        }));

        setErrors((prev) => {
            if (!prev[name]) return prev;
            const next = { ...prev };
            delete next[name];
            return next;
        });
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
                    className={`fixed top-5 right-5 z-[90] w-[min(92vw,24rem)] rounded-lg px-4 py-3 text-sm text-white shadow-lg ${
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

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="name"
                            className={`w-full rounded border px-4 py-3 ${showError("name") ? "border-red-500" : ""}`}
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
                        autoComplete="tel"
                        className="w-full rounded border px-4 py-3"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="email"
                            className={`w-full rounded border px-4 py-3 ${showError("email") ? "border-red-500" : ""}`}
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
                            className={`w-full rounded border bg-white px-4 py-3 ${showError("reason") ? "border-red-500" : ""} ${formData.reason ? "text-gray-900" : "text-gray-500"}`}
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

                <div>
                    <textarea
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`h-32 w-full rounded border px-4 py-3 ${showError("message") ? "border-red-500" : ""}`}
                    />
                    {showError("message") && (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer rounded-[40px] bg-[#291a06] px-6 py-3 text-white transition hover:bg-[#3b260b] disabled:cursor-wait disabled:opacity-70"
                >
                    {isSubmitting ? "Sending..." : "Send"}
                </button>
            </form>
        </>
    );
}
