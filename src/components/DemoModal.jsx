import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ContactForm from "./ContactForm";

export default function DemoModal({ open, onClose, productName }) {
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (!open) {
            setSuccessMessage("");
            return undefined;
        }

        const onKey = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKey);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [open, onClose]);

    useEffect(() => {
        if (!open || !successMessage) return undefined;

        const timeout = window.setTimeout(onClose, 1600);
        return () => window.clearTimeout(timeout);
    }, [open, successMessage, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-8 sm:items-center"
            onClick={onClose}
            role="presentation"
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="demo-modal-title"
                className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close demo form"
                    className="absolute top-4 right-4 rounded-full p-1 text-[#291a06] transition hover:bg-amber-50"
                >
                    <X className="h-5 w-5" aria-hidden="true" />
                </button>

                {successMessage ? (
                    <p role="status" className="py-10 text-center text-lg text-[#291a06]">
                        {successMessage}
                    </p>
                ) : (
                    <>
                        <h2
                            id="demo-modal-title"
                            className="pr-8 font-['Fraunces'] text-2xl font-medium text-[#291a06] sm:text-3xl"
                        >
                            Book a demo
                        </h2>
                        <p className="mt-2 mb-6 text-sm text-[#8d561e]">
                            Tell us about {productName} and we will get back to you.
                        </p>
                        <ContactForm
                            initialReason="product"
                            subjectOverride={`Demo request: ${productName}`}
                            productName={productName}
                            suppressSuccessToast
                            onSuccess={setSuccessMessage}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
