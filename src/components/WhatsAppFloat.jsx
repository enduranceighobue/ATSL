import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { X } from "lucide-react";
import { phones, whatsappLink } from "../data/company";

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-[70] flex flex-col items-end gap-3 sm:right-6">
      {open && (
        <div className="w-72 rounded-2xl border border-[#d9f5e5] bg-white p-4 shadow-2xl">
          <p className="text-sm font-semibold text-[#291a06]">Chat on WhatsApp</p>
          <p className="mt-1 text-xs leading-relaxed text-[#8d561e]">
            Both office lines are on WhatsApp. Choose one to start a chat.
          </p>
          <div className="mt-3 space-y-2">
            {phones.map((phone) => (
              <a
                key={phone.e164}
                href={whatsappLink(phone.e164)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-xl bg-[#25D366] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe5d]"
              >
                <span>{phone.display}</span>
                <FaWhatsapp className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close WhatsApp office lines" : "Open WhatsApp office lines"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:bg-[#1ebe5d]"
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <FaWhatsapp className="h-7 w-7" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
