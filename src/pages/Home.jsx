import { useState, useEffect } from "react";
import Logo from "../assets/atsl-logo.svg";
import menu from "../assets/menu.svg";
import x from "../assets/x.svg";

import Hero from "../components/Hero";
import Service from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ProductPage from "../components/ProductPage";

export default function Home() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    scrolled
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
                        onClick={() =>
                            setIsMobileMenuOpen(!isMobileMenuOpen)
                        }
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <img
                                src={x}
                                alt="Close"
                                className="w-6 h-6"
                            />
                        ) : (
                            <img
                                src={menu}
                                alt="Menu"
                                className="w-6 h-6"
                            />
                        )}
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8 xl:gap-12 text-white">
                        <a
                            href="#home"
                            className={`font-medium transition-colors hover:text-amber-700 ${
                                scrolled ? "text-white" : "text-white"
                            }`}
                        >
                            Home
                        </a>

                        <a
                            href="#services"
                            className={`font-medium transition-colors hover:text-amber-700 ${
                                scrolled ? "text-white" : "text-white"
                            }`}
                        >
                            Services
                        </a>

                        {/* Products Link */}
                        <a
                            href="#product"
                            className={`font-medium transition-colors hover:text-amber-700 ${
                                scrolled ? "text-white" : "text-white"
                            }`}
                        >
                            Product
                        </a>

                        <a
                            href="#contact"
                            className={`font-medium transition-colors hover:text-amber-700 ${
                                scrolled ? "text-white" : "text-white"
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
                                className={`block ${
                                    scrolled
                                        ? "text-[#291a06]"
                                        : "text-[#291a06]"
                                } hover:text-amber-700 font-medium transition-colors py-2`}
                                onClick={() =>
                                    setIsMobileMenuOpen(false)
                                }
                            >
                                Home
                            </a>

                            <a
                                href="#services"
                                className={`block ${
                                    scrolled
                                        ? "text-[#291a06]"
                                        : "text-[#291a06]"
                                } hover:text-amber-700 font-medium transition-colors py-2`}
                                onClick={() =>
                                    setIsMobileMenuOpen(false)
                                }
                            >
                                Services
                            </a>

                            {/* Products Link */}
                            <a
                                href="#product"
                                className={`block ${
                                    scrolled
                                        ? "text-[#291a06]"
                                        : "text-[#291a06]"
                                } hover:text-amber-700 font-medium transition-colors py-2`}
                                onClick={() =>
                                    setIsMobileMenuOpen(false)
                                }
                            >
                                Product
                            </a>

                            <a
                                href="#contact"
                                className={`block ${
                                    scrolled
                                        ? "text-[#291a06]"
                                        : "text-[#291a06]"
                                } hover:text-amber-700 font-medium transition-colors py-2`}
                                onClick={() =>
                                    setIsMobileMenuOpen(false)
                                }
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                )}
            </header>

            <div id="home">
                <Hero />
            </div>

            <div id="services">
                <Service />
            </div>

            <div id="product">
                <ProductPage />
            </div>

            <div id="contact">
                <Contact />
            </div>

            <Footer />
        </>
    );
}