import { useState, useRef, useEffect } from "react";
import Logo from "../assets/atsl-logo.svg";
import menu from "../assets/menu.svg";
import x from "../assets/x.svg";
import chevrondown from "../assets/chevrondown.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const products = [
    { id: 1, name: "Innvista", href: "/innvista" },
  ];

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
    <header className="bg-[#291a06] w-full z-10">
      <nav className="container w-[90%] mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <a href="/" aria-label="Home">
          <div className="flex items-center cursor-pointer gap-2">
            <img
              src={Logo}
              alt="Logo"
              className="w-12 h-15 cursor-pointer"
            />
          </div>
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden text-gray-700 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <img src={x} alt="Close" className="w-6 h-6" />
          ) : (
            <img src={menu} alt="Menu" className="w-6 h-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">

          <a
            href="/"
            className="text-white hover:text-amber-700 font-medium transition-colors"
          >
            Home
          </a>

          <a
            href="/services"
            className="text-white hover:text-amber-700 font-medium transition-colors"
          >
            Services
          </a>

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

              <img
                src={chevrondown}
                alt="Chevron"
                className={`w-4 h-4 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {products.map((product) => (
                  <a
                    key={product.id}
                    href={product.href}
                    className="block px-4 py-3 text-[#291a06] hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {product.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="/contactus"
            className="text-white hover:text-amber-700 font-medium transition-colors"
          >
            Contact Us
          </a>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">

            <a
              href="/"
              className="block text-[#291a06] hover:text-amber-700 font-medium transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>

            <a
              href="/services"
              className="block text-[#291a06] hover:text-amber-700 font-medium transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>

            {/* Mobile Products Dropdown */}
            <div ref={mobileDropdownRef}>
              <button
                type="button"
                className="flex items-center justify-between w-full text-[#291a06] hover:text-amber-700 font-medium transition-colors py-2"
                onClick={handleToggle}
              >
                Products

                <img
                  src={chevrondown}
                  alt="Chevron"
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {products.map((product) => (
                    <a
                      key={product.id}
                      href={product.href}
                      className="block w-full text-left text-[#291a06] hover:text-amber-700 transition-colors py-2"
                      onClick={() => {
                        setIsOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {product.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/contactus"
              className="block text-[#291a06] hover:text-amber-700 font-medium transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}