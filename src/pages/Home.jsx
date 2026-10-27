import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "../assets/atsl.png";
import { products } from "../data/products";

import Hero from "../components/Hero";
import Service from "../components/Services";
import Contact from "../components/Contact";
import Faqs from "../components/Faqs";
import Footer from "../components/Footer";
import ProductPage from "../components/ProductPage";

export default function Home() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);
    const mobileDropdownRef = useRef(null);

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

    useEffect(() => {
        if (location.hash !== "#faqs") return undefined;

        const frame = requestAnimationFrame(() => {
            document.getElementById("faqs")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        return () => cancelAnimationFrame(frame);
    }, [location.hash]);

    useEffect(() => {
        if (!isProductsOpen) return undefined;

        const handleClickOutside = (event) => {
            const target = event.target;
            if (dropdownRef.current?.contains(target)) return;
            if (mobileDropdownRef.current?.contains(target)) return;
            setIsProductsOpen(false);
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") setIsProductsOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isProductsOpen]);

    const closeMenus = () => {
        setIsProductsOpen(false);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-[#291a06] shadow-md backdrop-blur-md"
                        : "bg-transparent shadow-md backdrop-blur-md"
                }`}
            >
                <nav className="container mx-auto flex w-[90%] items-center">
                    <div className="flex h-18 w-32 shrink-0 items-center overflow-hidden">
                        <img
                            src={Logo}
                            alt="ATSL"
                            className="h-full w-full origin-center scale-[2.05] object-cover object-center"
                        />
                    </div>
                    <p className="ml-3 min-w-0 font-['Fraunces'] text-xs font-normal italic leading-snug text-white sm:ml-4 sm:text-sm lg:text-base">
                        Adaptive Tech Solutions Limited
                    </p>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="ml-auto p-2 text-gray-700 lg:hidden"
                        onClick={() =>
                            setIsMobileMenuOpen(!isMobileMenuOpen)
                        }
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6 text-white" aria-hidden="true" />
                        ) : (
                            <Menu className="w-6 h-6 text-white" aria-hidden="true" />
                        )}
                    </button>

                    {/* Desktop Navigation */}
                    <div className="ml-auto hidden items-center gap-8 text-white lg:flex xl:gap-12">
                        <a
                            href="#services"
                            className="font-['Fraunces'] font-normal italic text-white transition-colors hover:text-amber-700"
                        >
                            Services
                        </a>

                        <div ref={dropdownRef} className="relative">
                            <button
                                type="button"
                                onClick={() => setIsProductsOpen((open) => !open)}
                                className="flex items-center gap-1 font-['Fraunces'] font-normal italic text-white transition-colors hover:text-amber-700"
                                aria-expanded={isProductsOpen}
                                aria-haspopup="true"
                            >
                                Products
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform duration-300 ${
                                        isProductsOpen ? "rotate-180" : ""
                                    }`}
                                    aria-hidden="true"
                                />
                            </button>

                            {isProductsOpen && (
                                <div className="absolute top-full left-0 z-50 mt-3 w-48 rounded-xl border border-amber-100 bg-white py-2 shadow-xl">
                                    {products.map((product) => (
                                        <Link
                                            key={product.slug}
                                            to={product.href}
                                            className="block px-4 py-2 font-['Fraunces'] font-normal italic text-[#291a06] transition-colors hover:bg-amber-50 hover:text-amber-700"
                                            onClick={closeMenus}
                                        >
                                            {product.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <a
                            href="#contact"
                            className="font-['Fraunces'] font-normal italic text-white transition-colors hover:text-amber-700"
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
                                href="#services"
                                className="block py-2 font-['Fraunces'] font-normal italic text-[#291a06] transition-colors hover:text-amber-700"
                                onClick={() =>
                                    setIsMobileMenuOpen(false)
                                }
                            >
                                Services
                            </a>

                            <div ref={mobileDropdownRef}>
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between py-2 font-['Fraunces'] font-normal italic text-[#291a06] transition-colors hover:text-amber-700"
                                    onClick={() => setIsProductsOpen((open) => !open)}
                                    aria-expanded={isProductsOpen}
                                >
                                    Products
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform duration-300 ${
                                            isProductsOpen ? "rotate-180" : ""
                                        }`}
                                        aria-hidden="true"
                                    />
                                </button>

                                {isProductsOpen && (
                                    <div className="mt-1 space-y-1 pl-3">
                                        {products.map((product) => (
                                            <Link
                                                key={product.slug}
                                                to={product.href}
                                                className="block py-2 font-['Fraunces'] font-normal italic text-[#291a06] transition-colors hover:text-amber-700"
                                                onClick={closeMenus}
                                            >
                                                {product.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <a
                                href="#contact"
                                className="block py-2 font-['Fraunces'] font-normal italic text-[#291a06] transition-colors hover:text-amber-700"
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

            <div id="services" className="scroll-mt-[4.5rem]">
                <Service />
            </div>

            <div id="product" className="scroll-mt-[4.5rem]">
                <ProductPage />
            </div>

            <div id="contact" className="scroll-mt-[4.5rem]">
                <Contact />
            </div>

            <Faqs />
            <Footer />
        </>
    );
}