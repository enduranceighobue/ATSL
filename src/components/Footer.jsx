import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import logo from "../assets/atsl-logo.svg";

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);

  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Footer() {
  return (
    <>
      <footer className="bg-[#291a06] text-white" role="contentinfo">
        <div className="w-11/12 mx-auto px-6 py-16">
          <div className="flex justify-center">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2 flex flex-col items-center text-center">
              {/* <div className="flex items-center space-x-2 mb-6">
                <img src={logo} className="w-12 h-15" alt="" />
              </div> */}
              <address className="space-y-4 not-italic">
                <div className="flex items-center justify-center gap-3">
                  <a
                    href="https://www.instagram.com/adaptive.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#f5e8d7] hover:text-pink-400 transition-colors"
                  >
                    <FaInstagram className="h-5 w-5" />
                    Adaptive Tech Solutions Limited.
                  </a>
                </div>
                {/* <div className="flex items-center justify-center gap-3">
                  <a
                    href="https://www.instagram.com/adaptive.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#f5e8d7] hover:text-pink-400 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="text-white">@atslng</span>
                  </a>
                </div> */}

                {/* <div className="flex items-center justify-center gap-3">
                  <MapPin
                    className="h-5 w-5 text-[#d2b48c]"
                    aria-hidden="true"
                  />

                  <span className="text-[#f5e8d7]">
                    San Francisco, CA
                  </span>
                </div> */}
              </address>
            </div>

          </div>

          {/* Bottom Section */}
          <div className="border-t border-coffee-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-[#d2b48c] text-sm">
                © 2026 Atslng.com All rights reserved.
              </p>

              <nav
                className="flex space-x-6 mt-4 md:mt-0"
                role="navigation"
                aria-label="Legal navigation"
              >
                <a
                  href="#"
                  className="text-[#d2b48c] hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </a>

                <a
                  href="#"
                  className="text-[#d2b48c] hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </a>

                <a
                  href="#"
                  className="text-[#d2b48c] hover:text-white text-sm transition-colors"
                >
                  Cookie Policy
                </a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}