import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa6";
import { email, offices } from "../data/company";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#291a06] text-white" role="contentinfo">
        <div className="w-11/12 mx-auto px-6 py-16">
          <div className="flex justify-center">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2 flex flex-col items-center text-center">
              <p className="text-[#f5e8d7] mb-3">
                Adaptive Tech Solutions Limited.
              </p>
              <p className="text-[#d2b48c] text-sm mb-4">{offices}</p>
              <a
                href={`mailto:${email}`}
                className="mb-6 text-sm text-[#f5e8d7] hover:text-white"
              >
                {email}
              </a>
              <nav
                className="flex items-center justify-center gap-4"
                aria-label="Social media"
              >
                <a
                  href="https://www.instagram.com/atslng"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-full border border-[#d2b48c]/40 flex items-center justify-center text-[#f5e8d7] hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 hover:border-transparent transition-all duration-300"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/share/1Cqi2fTx7D/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-11 h-11 rounded-full border border-[#d2b48c]/40 flex items-center justify-center text-[#f5e8d7] hover:text-white hover:bg-[#1877F2] hover:border-transparent transition-all duration-300"
                >
                  <FaFacebookF className="h-5 w-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@atslng"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-11 h-11 rounded-full border border-[#d2b48c]/40 flex items-center justify-center text-[#f5e8d7] hover:text-white hover:bg-black hover:border-transparent transition-all duration-300"
                >
                  <FaTiktok className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com/@atslng?si=vzKePumah89hagdB"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-11 h-11 rounded-full border border-[#d2b48c]/40 flex items-center justify-center text-[#f5e8d7] hover:text-white hover:bg-[#FF0000] hover:border-transparent transition-all duration-300"
                >
                  <FaYoutube className="h-5 w-5" />
                </a>
              </nav>
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