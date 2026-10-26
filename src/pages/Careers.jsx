import { useEffect } from "react";
import Nav from "./Nav";
import Footer from "../components/Footer";
import CareerForm from "../components/CareerForm";
import { email } from "../data/company";

export default function Careers() {
    useEffect(() => {
        document.title = "Careers | ATSL";
        window.scrollTo(0, 0);
        return () => {
            document.title = "ATSL";
        };
    }, []);

    return (
        <div className="flex min-h-svh flex-col bg-[#fff7e3]">
            <Nav />
            <section className="flex flex-1 items-start justify-center px-4 py-5 sm:px-6">
                <div className="w-full max-w-2xl">
                    <div className="mb-4 text-center">
                        <h1 className="font-['Fraunces'] text-3xl font-normal italic leading-tight tracking-tight text-[#291a06] sm:text-4xl">
                            Careers
                        </h1>
                        <div className="mt-2 flex justify-center">
                            <div className="h-0.5 w-16 bg-[#cd9432]" />
                        </div>
                        <p className="mt-3 text-base text-gray-600 sm:text-lg">
                            Choose a role, upload your CV, and add a cover letter.
                            Applications are sent to {email}.
                        </p>
                    </div>

                    <div className="rounded-lg border-t-4 border-[#291a06] bg-white p-5 shadow-md sm:p-6">
                        <CareerForm />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
