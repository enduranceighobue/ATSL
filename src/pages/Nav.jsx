import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "../assets/atsl.jpeg";
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
      <nav className="container w-[90%] mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" aria-label="Home" className="block shrink-0">
          <div className="flex h-32 w-48 items-center overflow-hidden sm:h-40 sm:w-60">
            <img
              src={Logo}
              alt="ATSL"
              className="h-full w-full origin-center scale-100 object-contain object-center"
            />
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden text-gray-700 p-2"
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
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">

          <Link
            to="/"
            className="text-white hover:text-amber-700 font-medium transition-colors"
          >
            Home
          </Link>

          <Link
            to="/service"
            className="text-white hover:text-amber-700 font-medium transition-colors"
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
              className="flex items-center gap-1 text-white hover:text-amber-700 font-medium transition-colors"
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
              <div className="absolute top-full left-0 mt-3 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    to={product.href}
                    className="block px-4 py-3 text-[#291a06] hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="block font-semibold">{product.displayName}</span>
                    <span className="block text-sm text-[#8d561e]">{product.tagline}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/contactUs"
            className="text-white hover:text-amber-700 font-medium transition-colors"
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
              className="block text-[#291a06] hover:text-amber-700 font-medium transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/service"
              className="block text-[#291a06] hover:text-amber-700 font-medium transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>

            {/* Mobile Products Dropdown */}
            <div ref={mobileDropdownRef}>
              <button
                type="button"
                className="flex items-center justify-between w-full text-[#291a06] hover:text-amber-700 font-medium transition-colors py-2"
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
                      className="block w-full text-left text-[#291a06] hover:text-amber-700 transition-colors py-2"
                      onClick={() => {
                        setIsOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <span className="block font-semibold">{product.displayName}</span>
                      <span className="block text-sm text-[#8d561e]">{product.tagline}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contactUs"
              className="block text-[#291a06] hover:text-amber-700 font-medium transition-colors py-2"
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