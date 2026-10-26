import { useEffect } from "react";
import { X } from "lucide-react";

export default function VideoModal({ open, onClose, youtubeId, title }) {
    useEffect(() => {
        if (!open) return undefined;

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

    if (!open || !youtubeId) return null;

    return (
        <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 px-4 py-8"
            onClick={onClose}
            role="presentation"
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="relative w-full max-w-4xl"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close video"
                    className="absolute -top-11 right-0 rounded-full p-1 text-white transition hover:text-amber-200"
                >
                    <X className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
                    <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
}
