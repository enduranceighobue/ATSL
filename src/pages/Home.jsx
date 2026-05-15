import { useState, useRef, useEffect } from "react";
import Logo from "../assets/atsl-logo.svg";
import menu from "../assets/menu.svg";
import x from "../assets/x.svg";
import { ChevronDown } from "lucide-react";


import Hero from "../components/Hero";
import Service from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ProductPage from "../components/ProductPage";


export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
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

        // If the click/tap happened inside the desktop dropdown, keep it open
        if (dropdownRef.current && dropdownRef.current.contains(target)) {
            return;
        }

        // If the click/tap happened inside the mobile dropdown, keep it open
        if (
            mobileDropdownRef.current &&
            mobileDropdownRef.current.contains(target)
        ) {
            return;
        }

        // Otherwise close the dropdown
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

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? "bg-[#291a06] shadow-md backdrop-blur-md"
                    : "bg-transparent shadow-md backdrop-blur-md"
                    }`}
            >
                <nav className="container w-[90%] mx-auto flex items-center justify-between">

                    <div className="flex items-center gap-2">
                        <img src={Logo} alt="Logo" className="w-12 h-15" />
                    </div>

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
                    <div className="hidden lg:flex items-center gap-8 xl:gap-12 text-white">

                        <a
                            href="#home"
                            className={`font-medium transition-colors hover:text-amber-700 ${scrolled ? "text-white" : "text-white"
                                }`}
                        >
                            Home
                        </a>

                        <a
                            href="#services"
                            className={`font-medium transition-colors hover:text-amber-700 ${scrolled ? "text-white" : "text-white"
                                }`}
                        >
                            Services
                        </a>

                        {/* Desktop Products Dropdown */}
                        <div
                            ref={dropdownRef}
                            className="relative inline-block cursor-pointer"
                        >
                            <button
                                type="button"
                                onClick={handleToggle}
                                className={`flex items-center gap-1 font-medium transition-colors hover:text-amber-700 ${scrolled ? "text-white" : "text-white"
                                    }`}
                            >
                                Products

                                <ChevronDown size={18} 
                                     className={`font-medium transition-colors hover:text-amber-700 ${scrolled ? "text-white" : "text-white"
                                }`}
                                />
                            </button>

                            {isOpen && (
                                <div className="absolute top-full left-0 mt-12 w-45 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    {products.map((product) => (
                                        <a
                                            key={product.id}
                                            href={product.href || `#product-${product.id}`}
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
                            href="#contact"
                            className={`font-medium transition-colors hover:text-amber-700 ${scrolled ? "text-white" : "text-white"
                                }`}
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
                                href="#home"
                                className={`block ${scrolled ? "text-[#291a06]" : "text-[#291a06]"} hover:text-amber-700 font-medium transition-colors py-2`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </a>

                            <a
                                href="#services"
                                className={`block ${scrolled ? "text-[#291a06]" : "text-[#291a06]"} hover:text-amber-700 font-medium transition-colors py-2`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Services
                            </a>

                            {/* Mobile Products Dropdown */}
                            <div ref={mobileDropdownRef}>
                                <button
                                    type="button"
                                    className="flex items-center justify-between w-full text-[#291a06] hover:text-amber-700 font-medium transition-colors cursor-pointer py-2"
                                    onClick={handleToggle}
                                >
                                    Products
                                    <ChevronDown size={18}   className={`font-medium transition-colors hover:text-amber-700 ${scrolled ? "text-[#291a06]" : "text-[#291a06]"
                                }`}/>

                                    {/* <img
                    src={chevrondown}
                    alt="Chevron"
                    className={`w-4 h-4 text-whitetransition-transform cursor-pointer duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  /> */}
                                </button>

                                {isOpen && (
                                    <div className="pl-4 mt-2 space-y-2">
                                        {products.map((product) => (
                                            <a
                                                key={product.id}
                                                href={product.href || `#product-${product.id}`}
                                                className={`block w-full text-left ${scrolled ? "text-[#291a06]" : "text-white"} cursor-pointer hover:text-amber-700 transition-colors py-2`}
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
                                href="#contact"
                                className={`block ${scrolled ? "text-[#291a06]" : "text-[#291a06]"} hover:text-amber-700 font-medium transition-colors py-2`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                )}
            </header>

            <Hero />
            <div id="services">
                <Service />
            </div>
            <ProductPage/>

            <div id="contact">
                <Contact />
            </div>

            <Footer />
        </>
    );
}