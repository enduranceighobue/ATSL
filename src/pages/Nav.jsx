import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "../assets/atsl.png";
import { products } from "../data/products";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    const target = event.target;

    if (dropdownRef.current && dropdownRef.current.contains(target)) {
      return;
    }

    if (
      mobileDropdownRef.current &&
      mobileDropdownRef.current.contains(target)
    ) {
      return;
    }

    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="bg-[#291a06] w-full z-50 relative">
      <nav className="container mx-auto flex w-[90%] items-center">
        <Link to="/" aria-label="Home" className="block shrink-0">
          <div className="flex h-18 w-32 shrink-0 items-center overflow-hidden">
            <img
              src={Logo}
              alt="ATSL"
              className="h-full w-full origin-center scale-[2.05] object-cover object-center"
            />
          </div>
        </Link>
        <p className="ml-3 min-w-0 font-['Fraunces'] text-xs font-normal italic leading-snug text-white sm:ml-4 sm:text-sm lg:text-base">
          Adaptive Tech Solutions Limited
        </p>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="ml-auto p-2 text-gray-700 lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6 text-white" aria-hidden="true" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="ml-auto hidden items-center gap-8 lg:flex xl:gap-12">

          <Link
            to="/"
            className="font-['Fraunces'] font-normal italic text-white transition-colors hover:text-amber-700"
          >
            Home
          </Link>

          <Link
            to="/service"
            className="font-['Fraunces'] font-normal italic text-white transition-colors hover:text-amber-700"
          >
            Services
          </Link>

          {/* Products Dropdown */}
          <div
            ref={dropdownRef}
            className="relative inline-block cursor-pointer"
          >
            <button
              type="button"
              onClick={handleToggle}
              className="flex items-center gap-1 font-['Fraunces'] font-normal italic text-white transition-colors hover:text-amber-700"
            >
              Products

              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 z-50 mt-3 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    to={product.href}
                    className="block px-4 py-2 font-['Fraunces'] font-normal italic text-[#291a06] transition-colors hover:bg-amber-50 hover:text-amber-700"
                    onClick={() => setIsOpen(false)}
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/contactUs"
            className="font-['Fraunces'] font-normal italic text-white transition-colors hover:text-amber-700"
          >
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">

            <Link
              to="/"
              className="block py-2 font-['Fraunces'] font-normal italic text-[#291a06] transition-colors hover:text-amber-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/service"
              className="block py-2 font-['Fraunces'] font-normal italic text-[#291a06] transition-colors hover:text-amber-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>

            {/* Mobile Products Dropdown */}
            <div ref={mobileDropdownRef}>
              <button
                type="button"
                className="flex w-full items-center justify-between py-2 font-['Fraunces'] font-normal italic text-[#291a06] transition-colors hover:text-amber-700"
                onClick={handleToggle}
              >
                Products

                <ChevronDown
                  className={`w-4 h-4 text-[#291a06] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {products.map((product) => (
                    <Link
                      key={product.slug}
                      to={product.href}
                      className="block w-full py-2 text-left font-['Fraunces'] font-normal italic text-[#291a06] transition-colors hover:text-amber-700"
                      onClick={() => {
                        setIsOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contactUs"
              className="block py-2 font-['Fraunces'] font-normal italic text-[#291a06] transition-colors hover:text-amber-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}