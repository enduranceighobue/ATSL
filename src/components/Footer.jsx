import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa6";
import { email, offices } from "../data/company";

const socialLinks = [
  {
    href: "https://www.instagram.com/atslng",
    label: "Instagram",
    icon: FaInstagram,
    hover:
      "hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400",
  },
  {
    href: "https://www.facebook.com/share/1Cqi2fTx7D/",
    label: "Facebook",
    icon: FaFacebookF,
    hover: "hover:bg-[#1877F2]",
  },
  {
    href: "https://www.tiktok.com/@atslng",
    label: "TikTok",
    icon: FaTiktok,
    hover: "hover:bg-black",
  },
  {
    href: "https://youtube.com/@atslng?si=vzKePumah89hagdB",
    label: "YouTube",
    icon: FaYoutube,
    hover: "hover:bg-[#FF0000]",
  },
];

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  function goToFaqs(event) {
    event.preventDefault();

    if (location.pathname === "/" && document.getElementById("faqs")) {
      document.getElementById("faqs").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    navigate("/#faqs");
  }

  return (
    <footer className="bg-[#291a06] font-['Fraunces'] font-normal italic leading-snug text-white" role="contentinfo">
      <div className="mx-auto w-11/12 px-6 py-6">
        <div className="grid grid-cols-3 items-start gap-4 sm:gap-6">
          <div className="text-left">
            <Link
              to="/#faqs"
              onClick={goToFaqs}
              className="text-sm tracking-wide text-[#d2b48c] transition-colors hover:text-[#f5e8d7]"
            >
              FAQs
            </Link>
            <p className="mt-2 text-sm text-[#d2b48c]">{offices}</p>
          </div>

          <div className="text-center leading-tight text-[#f5e8d7]">
            <p className="text-sm">Adaptive Tech Solutions Limited</p>
            <a
              href={`mailto:${email}`}
              className="mt-1 inline-block text-sm transition-colors hover:text-white"
            >
              {email}
            </a>
          </div>

          <div className="text-right">
            <Link
              to="/careers"
              className="mr-[4.5rem] inline-block text-sm tracking-wide text-[#d2b48c] transition-colors hover:text-[#f5e8d7] md:mr-[8.4rem]"
            >
              Careers
            </Link>
          </div>
        </div>

        <div className="mt-5 border-t border-[#d2b48c]/30 pt-4">
          <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-3">
            <p className="text-center text-sm text-[#d2b48c] md:text-left">
              © 2026 Atslng.com All rights reserved.
            </p>

            <nav
              className="flex items-center justify-center gap-4"
              aria-label="Social media"
            >
              {socialLinks.map(({ href, label, icon: Icon, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border border-[#d2b48c]/40 text-[#f5e8d7] transition-all duration-300 hover:border-transparent hover:text-white ${hover}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </nav>

            <nav
              className="flex justify-center md:justify-end"
              aria-label="Legal navigation"
            >
              <div className="grid grid-cols-[max-content_max-content_max-content] gap-x-6 text-center">
                <a
                  href="#"
                  className="text-sm text-[#d2b48c] transition-colors hover:text-white"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-sm text-[#d2b48c] transition-colors hover:text-white"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-sm text-[#d2b48c] transition-colors hover:text-white"
                >
                  Cookie Policy
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
