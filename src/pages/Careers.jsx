import { useEffect } from "react";
import Nav from "./Nav";
import Footer from "../components/Footer";
import CareerForm from "../components/CareerForm";

export default function Careers() {
    useEffect(() => {
        document.title = "Careers | ATSL";
        window.scrollTo(0, 0);
        return () => {
            document.title = "ATSL";
        };
    }, []);

    return (
        <div className="flex min-h-svh flex-col bg-white">
            <Nav />
            <section className="flex flex-1 items-start justify-center bg-white px-4 py-8 sm:px-6 sm:py-10">
                <div className="w-full max-w-6xl">
                    <div className="mb-4 text-center">
                        <h1 className="font-['Fraunces'] text-2xl font-normal italic leading-tight tracking-tight text-[#291a06] sm:text-3xl lg:text-4xl">
                            Careers
                        </h1>
                        <div className="mt-3 flex justify-center">
                            <div className="h-0.5 w-16 bg-[#cd9432]" />
                        </div>
                        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#5c4030] sm:text-base">
                            Share your contact details, location, and qualifications to apply.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-[#ead9bf] bg-white/90 p-4 shadow-[0_18px_40px_-28px_rgba(41,26,6,0.55)] sm:p-6 lg:p-8">
                        <CareerForm />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
