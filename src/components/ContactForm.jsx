import { useEffect, useId, useState } from "react";

const CONTACT_REASONS = [
    { value: "general", label: "General enquiry" },
    { value: "product", label: "Product or service enquiry" },
    { value: "partnership", label: "Partnership" },
    { value: "support", label: "Support" },
];

const MESSAGE_MAX_LENGTH = 60;

const emptyForm = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    reason: "",
    message: "",
};

const inputClass =
    "w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-[#291a06] outline-none transition placeholder:text-[#9b8877] focus:ring-4 focus:ring-[#cd9432]/15";

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
    const formId = useId();
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

        if (!data.firstName.trim()) {
            errs.firstName = "Enter your first name.";
        }

        if (!data.lastName.trim()) {
            errs.lastName = "Enter your last name.";
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
                firstName: true,
                lastName: true,
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

            formPayload.append(
                "name",
                `${formData.firstName.trim()} ${formData.lastName.trim()}`
            );
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

            <div className="mb-4">
                <h3 className="font-['Fraunces'] text-xl font-normal italic leading-snug text-[#291a06]">
                    Send us a message
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                        <label htmlFor={`${formId}-first-name`} className="text-xs font-medium text-[#5c4030]">
                            First name
                        </label>
                        <input
                            type="text"
                            id={`${formId}-first-name`}
                            name="firstName"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="given-name"
                            aria-invalid={showError("firstName")}
                            aria-describedby={showError("firstName") ? `${formId}-first-name-error` : undefined}
                            className={`${inputClass} ${showError("firstName") ? "border-red-500 focus:border-red-500" : "border-[#ead9bf] focus:border-[#cd9432]"}`}
                        />
                        {showError("firstName") && (
                            <p id={`${formId}-first-name-error`} className="text-xs text-red-600">{errors.firstName}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor={`${formId}-last-name`} className="text-xs font-medium text-[#5c4030]">
                            Last name
                        </label>
                        <input
                            type="text"
                            id={`${formId}-last-name`}
                            name="lastName"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="family-name"
                            aria-invalid={showError("lastName")}
                            aria-describedby={showError("lastName") ? `${formId}-last-name-error` : undefined}
                            className={`${inputClass} ${showError("lastName") ? "border-red-500 focus:border-red-500" : "border-[#ead9bf] focus:border-[#cd9432]"}`}
                        />
                        {showError("lastName") && (
                            <p id={`${formId}-last-name-error`} className="text-xs text-red-600">{errors.lastName}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                        <label htmlFor={`${formId}-email`} className="text-xs font-medium text-[#5c4030]">
                            Email
                        </label>
                        <input
                            type="email"
                            id={`${formId}-email`}
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="email"
                            aria-invalid={showError("email")}
                            aria-describedby={showError("email") ? `${formId}-email-error` : undefined}
                            className={`${inputClass} ${showError("email") ? "border-red-500 focus:border-red-500" : "border-[#ead9bf] focus:border-[#cd9432]"}`}
                        />
                        {showError("email") && (
                            <p id={`${formId}-email-error`} className="text-xs text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor={`${formId}-phone`} className="text-xs font-medium text-[#5c4030]">
                            Phone <span className="text-[#9b8877]">(optional)</span>
                        </label>
                        <input
                            type="tel"
                            id={`${formId}-phone`}
                            name="phone"
                            placeholder="Phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="tel"
                            aria-invalid={showError("phone")}
                            className={`${inputClass} ${showError("phone") ? "border-red-500 focus:border-red-500" : "border-[#ead9bf] focus:border-[#cd9432]"}`}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label htmlFor={`${formId}-reason`} className="text-xs font-medium text-[#5c4030]">
                        How can we help?
                    </label>
                    <select
                        id={`${formId}-reason`}
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={showError("reason")}
                        aria-describedby={showError("reason") ? `${formId}-reason-error` : undefined}
                        className={`${inputClass} ${showError("reason") ? "border-red-500 focus:border-red-500" : "border-[#ead9bf] focus:border-[#cd9432]"} ${formData.reason ? "" : "text-[#9b8877]"}`}
                    >
                        <option value="">Select a reason</option>
                        {CONTACT_REASONS.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    {showError("reason") && (
                        <p id={`${formId}-reason-error`} className="text-xs text-red-600">{errors.reason}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label htmlFor={`${formId}-message`} className="text-xs font-medium text-[#5c4030]">
                        Message
                    </label>
                    <textarea
                        id={`${formId}-message`}
                        name="message"
                        placeholder="Tell us what you need"
                        value={formData.message}
                        maxLength={MESSAGE_MAX_LENGTH}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={showError("message")}
                        aria-describedby={`${formId}-message-count${showError("message") ? ` ${formId}-message-error` : ""}`}
                        className={`${inputClass} h-20 resize-none ${showError("message") ? "border-red-500 focus:border-red-500" : "border-[#ead9bf] focus:border-[#cd9432]"}`}
                    />
                    <p id={`${formId}-message-count`} className="text-right text-xs text-[#8a715d]">
                        {MESSAGE_MAX_LENGTH - formData.message.length} characters remaining
                    </p>
                    {showError("message") && (
                        <p id={`${formId}-message-error`} className="text-xs text-red-600">{errors.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#291a06] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#3b260b] focus:outline-none focus:ring-4 focus:ring-[#cd9432]/25 disabled:cursor-wait disabled:opacity-70"
                >
                    {isSubmitting ? "Sending..." : "Send message"}
                </button>
            </form>
        </>
    );
}
