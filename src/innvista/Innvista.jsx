import { useState, useEffect, useRef } from "react";
import { Menu, X, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import Heroinnvista from "../innvista/HeroInnvista";
import Features from "../innvista/Features";
import FAQ from "../innvista/FAQ";
import Pricing from "../innvista/Pricing";
import ContactUs from "../pages/ContactUs";
import Demo from "../innvista/Demo";
import Footer from "../components/Footer";

export default function Innvista() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsResourcesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>

      
      <header
        className={`w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#291a06] backdrop-blur-md shadow-lg"
            : "bg-[#291a06]"
        }`}
        role="banner"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" aria-label="Home">
              <div className="flex items-center space-x-2 cursor-pointer">
               
                <span className="text-2xl font-bold text-[#f1efec] ml-10">
                  Inn<span className="text-[#d4a017]">vista</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center space-x-8"
              role="navigation"
              aria-label="Main navigation"
            >
              {/* <button
                onClick={() => scrollToSection("home")}
                className="text-[#f1efec] hover:text-[#8d561e] cursor-pointer transition-colors font-medium"
              >
                Home
              </button> */}

              <button
                onClick={() => scrollToSection("features")}
                className="text-[#f1efec] hover:text-[#8d561e] cursor-pointer transition-colors font-medium"
              >
                Features
              </button>

              <button
                onClick={() => scrollToSection("faq")}
                className="text-[#f1efec] hover:text-[#8d561e] cursor-pointer transition-colors font-medium"
              >
                FAQ
              </button>

              <button
                onClick={() => scrollToSection("pricing")}
                className="text-[#f1efec] hover:text-[#8d561e] cursor-ponter transition-colors font-medium"
              >
                Pricing
              </button>

             

              <button
                onClick={() => scrollToSection("demo")}
                className="bg-[#f1efec] text-[#291a06] px-6 py-2 rounded-full cursor-pointer hover:bg-[#8d561e] hover:text-white transition-colors font-medium"
              >
                Book Demo
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() =>
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }
              className="md:hidden text-[#f1efec]"
              aria-label={
                isMobileMenuOpen ? "Close menu" : "Open menu"
              }
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4">
              <nav
                className="flex flex-col space-y-4 px-6"
                role="navigation"
                aria-label="Mobile navigation"
              >
                {/* <button
                  onClick={() => scrollToSection("home")}
                  className="text-[#291a06] hover:text-[#8d561e] cursor-pointer text-left font-medium"
                >
                  Home
                </button> */}

                <button
                  onClick={() => scrollToSection("features")}
                  className="text-[#291a06] hover:text-[#8d561e] cursor-pointer text-left font-medium"
                >
                  Features
                </button>

                <button
                  onClick={() => scrollToSection("faq")}
                  className="text-[#291a06] hover:text-[#8d561e] cursor-pointer text-left font-medium"
                >
                  FAQ
                </button>

                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-[#291a06] hover:text-[#8d561e] cursor-pointer text-left font-medium"
                >
                  Pricing
                </button>

                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-[#291a06] hover:text-[#8d561e] cursor-pointer text-left font-medium"
                >
                  Contact
                </button>

                <button
                  onClick={() => scrollToSection("demo")}
                  className="bg-[#291a06] text-white px-6 py-2 rounded-full cursor-pointer hover:bg-[#8d561e] transition-colors font-medium w-fit"
                >
                  Book Demo
                </button>
              </nav>
            </div>
          )}
        </div>
        </header>
        <Heroinnvista/>
        <Features/>
        <FAQ/>
        <Pricing/>
        <Demo/>
        <ContactUs/>
        {/* <Footer /> */}
    </>
  );
}