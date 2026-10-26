import { useEffect, useRef, useState } from "react";
import { email } from "../data/company";

const ROLES = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile Developer",
    "Product Manager",
    "Project Manager",
    "UI/UX Designer",
    "Quality Assurance Engineer",
    "DevOps Engineer",
    "Solutions Architect",
    "Business Analyst",
    "Data Analyst",
    "Implementation Specialist",
    "Technical Support",
    "Customer Success",
    "Sales Executive",
    "People Operations",
    "Marketing",
];

const MAX_CV_BYTES = 5 * 1024 * 1024;
const CV_EXTENSIONS = [".pdf", ".doc", ".docx"];
const COVER_LIMIT = 100;
const MAX_PHONE_DIGITS = 11;

const COUNTRIES = [
    { iso: "NG", name: "Nigeria", dial: "+234", digits: 10 },
    { iso: "GH", name: "Ghana", dial: "+233", digits: 9 },
    { iso: "KE", name: "Kenya", dial: "+254", digits: 9 },
    { iso: "ZA", name: "South Africa", dial: "+27", digits: 9 },
    { iso: "EG", name: "Egypt", dial: "+20", digits: 10 },
    { iso: "CM", name: "Cameroon", dial: "+237", digits: 9 },
    { iso: "SN", name: "Senegal", dial: "+221", digits: 9 },
    { iso: "CI", name: "Côte d'Ivoire", dial: "+225", digits: 10 },
    { iso: "GB", name: "United Kingdom", dial: "+44", digits: 10 },
    { iso: "IE", name: "Ireland", dial: "+353", digits: 9 },
    { iso: "US", name: "United States", dial: "+1", digits: 10 },
    { iso: "CA", name: "Canada", dial: "+1", digits: 10 },
    { iso: "IN", name: "India", dial: "+91", digits: 10 },
    { iso: "AE", name: "United Arab Emirates", dial: "+971", digits: 9 },
    { iso: "SA", name: "Saudi Arabia", dial: "+966", digits: 9 },
    { iso: "CN", name: "China", dial: "+86", digits: 11 },
    { iso: "DE", name: "Germany", dial: "+49", digits: 11 },
    { iso: "FR", name: "France", dial: "+33", digits: 9 },
    { iso: "NL", name: "Netherlands", dial: "+31", digits: 9 },
    { iso: "IT", name: "Italy", dial: "+39", digits: 10 },
    { iso: "ES", name: "Spain", dial: "+34", digits: 9 },
    { iso: "BR", name: "Brazil", dial: "+55", digits: 11 },
    { iso: "AU", name: "Australia", dial: "+61", digits: 9 },
];

const emptyForm = {
    name: "",
    country: "NG",
    phone: "",
    email: "",
    role: "",
    coverLetter: "",
};

function countryByIso(iso) {
    return COUNTRIES.find((country) => country.iso === iso) ?? COUNTRIES[0];
}

function phoneDigitLimit(iso) {
    return Math.min(countryByIso(iso).digits, MAX_PHONE_DIGITS);
}

function digitsOnly(value, max) {
    return value.replace(/\D/g, "").slice(0, max);
}

function lettersOnlyName(value) {
    return value.replace(/\d/g, "");
}

function flagSrc(iso) {
    return `https://flagcdn.com/w40/${iso.toLowerCase()}.png`;
}

function isAllowedCv(file) {
    const name = file.name.toLowerCase();
    return CV_EXTENSIONS.some((extension) => name.endsWith(extension));
}

function friendlySendError(message) {
    if (/activation/i.test(message)) {
        return `Open the activation email sent to ${email} and click the link once, then send the application again.`;
    }

    if (/pro feature|file upload/i.test(message)) {
        return "The email service blocked the CV. Please try again in a moment.";
    }

    return message;
}

async function readSubmitResult(response) {
    const data = await response.json().catch(() => ({}));
    const succeeded = data.success === true || data.success === "true";

    if (!response.ok || !succeeded) {
        throw new Error(
            friendlySendError(data.message || "Failed to send. Please try again later.")
        );
    }
}

export default function CareerForm() {
    const fileInputRef = useRef(null);
    const countryBoxRef = useRef(null);
    const [formData, setFormData] = useState(emptyForm);
    const [cvFile, setCvFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [toast, setToast] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countryOpen, setCountryOpen] = useState(false);
    const [countryQuery, setCountryQuery] = useState("");

    useEffect(() => {
        if (!toast) return undefined;

        const timeout = window.setTimeout(() => setToast(null), 6000);
        return () => window.clearTimeout(timeout);
    }, [toast]);

    useEffect(() => {
        if (!countryOpen) return undefined;

        const closeOnOutside = (event) => {
            if (!countryBoxRef.current?.contains(event.target)) {
                setCountryOpen(false);
                setCountryQuery("");
            }
        };

        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setCountryOpen(false);
                setCountryQuery("");
            }
        };

        document.addEventListener("mousedown", closeOnOutside);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("mousedown", closeOnOutside);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [countryOpen]);

    const validate = (data, file) => {
        const errs = {};

        if (!data.name.trim()) {
            errs.name = "Please enter your name.";
        } else if (/\d/.test(data.name)) {
            errs.name = "Name cannot contain numbers.";
        }

        if (!data.email.trim()) {
            errs.email = "Please enter your email address.";
        } else if (!/^[\w-.]+@[\w-]+\.[\w-.]+$/.test(data.email)) {
            errs.email = "Please enter a valid email address.";
        }

        const country = countryByIso(data.country);
        const limit = phoneDigitLimit(data.country);

        if (!data.phone) {
            errs.phone = "Please enter your phone number.";
        } else if (/\D/.test(data.phone)) {
            errs.phone = "Phone number can only contain numbers.";
        } else if (data.phone.length > MAX_PHONE_DIGITS) {
            errs.phone = "Phone number cannot be more than 11 digits.";
        } else if (data.phone.length !== limit) {
            errs.phone = country.iso === "NG"
                ? "Enter the remaining 10 digits."
                : `Enter ${limit} digits.`;
        }

        if (!data.role) {
            errs.role = "Please select a role.";
        }

        if (!file) {
            errs.cv = "Please upload your CV.";
        } else if (!isAllowedCv(file)) {
            errs.cv = "Upload a PDF or Word document.";
        } else if (file.size > MAX_CV_BYTES) {
            errs.cv = "CV must be 5 MB or smaller.";
        }

        if (!data.coverLetter.trim()) {
            errs.coverLetter = "Please add a cover letter.";
        }

        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setToast(null);
        setIsSubmitting(true);

        const validation = validate(formData, cvFile);
        setErrors(validation);

        if (Object.keys(validation).length > 0) {
            setTouched({
                name: true,
                email: true,
                phone: true,
                role: true,
                cv: true,
                coverLetter: true,
            });
            setIsSubmitting(false);
            return;
        }

        try {
            const formPayload = new FormData();

            formPayload.append("name", formData.name);
            formPayload.append(
                "phone",
                `${countryByIso(formData.country).dial}${formData.phone}`
            );
            formPayload.append("email", formData.email);
            formPayload.append("role", formData.role);
            formPayload.append("message", formData.coverLetter);
            formPayload.append("attachment", cvFile, cvFile.name);
            formPayload.append("_subject", `Job application: ${formData.role}`);
            formPayload.append("_replyto", formData.email);
            formPayload.append("_template", "table");
            formPayload.append("_captcha", "false");
            formPayload.append("_honey", "");

            const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
                method: "POST",
                body: formPayload,
                headers: { Accept: "application/json" },
            });

            await readSubmitResult(response);

            setToast({
                type: "success",
                message: "Your application has been sent. We will be in touch.",
            });

            setFormData(emptyForm);
            setCvFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            setErrors({});
            setTouched({});
        } catch (err) {
            console.error(err);
            setToast({
                type: "error",
                message: err instanceof Error && err.message
                    ? err.message
                    : "Something went wrong. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            if (name === "coverLetter") {
                return { ...prev, coverLetter: value.slice(0, COVER_LIMIT) };
            }

            if (name === "phone") {
                return {
                    ...prev,
                    phone: digitsOnly(value, phoneDigitLimit(prev.country)),
                };
            }

            if (name === "name") {
                return { ...prev, name: lettersOnlyName(value) };
            }

            if (name === "country") {
                return {
                    ...prev,
                    country: value,
                    phone: digitsOnly(prev.phone, phoneDigitLimit(value)),
                };
            }

            return { ...prev, [name]: value };
        });

        setErrors((prev) => {
            if (!prev[name] && !(name === "country" && prev.phone)) return prev;
            const next = { ...prev };
            delete next[name];
            if (name === "country") delete next.phone;
            return next;
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] ?? null;
        setCvFile(file);
        setErrors((prev) => {
            if (!prev.cv) return prev;
            const next = { ...prev };
            delete next.cv;
            return next;
        });
        setTouched((prev) => ({
            ...prev,
            cv: true,
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    const showError = (field) => Boolean(touched[field] && errors[field]);
    const coverRemaining = COVER_LIMIT - formData.coverLetter.length;
    const fieldClass = "w-full rounded border px-4 py-2.5 text-base";
    const selectedCountry = countryByIso(formData.country);
    const countryQueryText = countryQuery.trim().toLowerCase();
    const countryMatches = COUNTRIES.filter((country) => {
        if (!countryQueryText) return true;
        return (
            country.name.toLowerCase().includes(countryQueryText)
            || country.iso.toLowerCase().includes(countryQueryText)
            || country.dial.includes(countryQueryText)
        );
    });

    const selectCountry = (iso) => {
        setFormData((prev) => ({
            ...prev,
            country: iso,
            phone: digitsOnly(prev.phone, phoneDigitLimit(iso)),
        }));
        setCountryOpen(false);
        setCountryQuery("");
        setErrors((prev) => {
            if (!prev.phone && !prev.country) return prev;
            const next = { ...prev };
            delete next.phone;
            delete next.country;
            return next;
        });
    };

    return (
        <>
            {toast && (
                <div
                    role="status"
                    aria-live="polite"
                    className={`fixed top-5 right-5 z-[90] w-[min(92vw,24rem)] rounded-lg px-4 py-3 text-sm text-white shadow-lg ${
                        toast.type === "success" ? "bg-green-600" : "bg-red-600"
                    }`}
                >
                    <div className="flex items-start justify-between gap-3">
                        <p>{toast.message}</p>
                        <button
                            type="button"
                            onClick={() => setToast(null)}
                            aria-label="Dismiss message"
                            className="shrink-0 text-lg leading-none text-white/80 hover:text-white"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-3">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="name"
                            className={`${fieldClass} ${showError("name") ? "border-red-500" : ""}`}
                        />
                        {showError("name") && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <div ref={countryBoxRef} className="relative">
                                <div className="flex items-center gap-2 rounded border bg-white px-2 py-1.5">
                                    <img
                                        src={flagSrc(selectedCountry.iso)}
                                        alt=""
                                        className="h-4 w-6 shrink-0 rounded-sm object-cover"
                                    />
                                    <input
                                        type="text"
                                        value={countryOpen ? countryQuery : selectedCountry.iso}
                                        onChange={(event) => {
                                            let next = event.target.value;
                                            const iso = selectedCountry.iso;
                                            if (
                                                next.toLowerCase().startsWith(iso.toLowerCase())
                                                && next.length > iso.length
                                            ) {
                                                next = next.slice(iso.length);
                                            }
                                            setCountryQuery(next);
                                            setCountryOpen(true);
                                        }}
                                        onFocus={(event) => {
                                            setCountryOpen(true);
                                            setCountryQuery("");
                                            event.currentTarget.select();
                                        }}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter" && countryMatches[0]) {
                                                event.preventDefault();
                                                selectCountry(countryMatches[0].iso);
                                            }
                                        }}
                                        placeholder="Search"
                                        aria-label="Country"
                                        aria-expanded={countryOpen}
                                        autoComplete="off"
                                        className="w-16 bg-transparent text-base uppercase text-[#291a06] outline-none placeholder:normal-case"
                                    />
                                </div>
                                {countryOpen && (
                                    <ul
                                        role="listbox"
                                        aria-label="Countries"
                                        className="absolute z-30 mt-1 max-h-52 w-36 overflow-auto rounded border border-[#ead9bf] bg-white py-1 shadow-lg"
                                    >
                                        {countryMatches.length === 0 ? (
                                            <li className="px-3 py-2 text-sm text-gray-500">No country found</li>
                                        ) : (
                                            countryMatches.map((country) => (
                                                <li key={country.iso}>
                                                    <button
                                                        type="button"
                                                        role="option"
                                                        aria-selected={country.iso === formData.country}
                                                        onMouseDown={(event) => event.preventDefault()}
                                                        onClick={() => selectCountry(country.iso)}
                                                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-[#291a06] hover:bg-[#fff7e3]"
                                                    >
                                                        <img
                                                            src={flagSrc(country.iso)}
                                                            alt=""
                                                            className="h-4 w-6 shrink-0 rounded-sm object-cover"
                                                        />
                                                        <span className="font-medium">{country.iso}</span>
                                                    </button>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                )}
                            </div>
                            <span className="text-base font-medium text-[#291a06]">
                                {countryByIso(formData.country).dial}
                            </span>
                            <input
                                type="tel"
                                name="phone"
                                inputMode="numeric"
                                autoComplete="tel-national"
                                placeholder={formData.country === "NG" ? "10 digits" : "Phone"}
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                maxLength={phoneDigitLimit(formData.country)}
                                aria-label="Phone number"
                                className={`w-36 rounded border px-3 py-2.5 text-base ${showError("phone") ? "border-red-500" : ""}`}
                            />
                        </div>
                        {showError("phone") && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                        )}
                    </div>
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="email"
                        className={`${fieldClass} ${showError("email") ? "border-red-500" : ""}`}
                    />
                    {showError("email") && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                </div>

                <div>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-label="Role you are applying for"
                        className={`w-fit max-w-full rounded border bg-white px-3 py-2.5 text-base ${showError("role") ? "border-red-500" : ""} ${formData.role ? "text-gray-900" : "text-gray-500"}`}
                    >
                        <option value="">Select a role</option>
                        {ROLES.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                    {showError("role") && (
                        <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="career-cv" className="mb-1.5 block text-sm font-medium text-[#291a06]">
                        Upload CV
                        <span className="ml-1 font-normal text-gray-500">
                            (PDF or Word, max 5 MB)
                        </span>
                    </label>
                    <input
                        id="career-cv"
                        ref={fileInputRef}
                        type="file"
                        name="cv"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                        className={`w-full rounded border bg-white px-3 py-2 text-sm text-gray-700 file:mr-3 file:rounded-full file:border-0 file:bg-[#cd9432] file:px-4 file:py-1.5 file:text-sm file:font-medium file:text-black ${showError("cv") ? "border-red-500" : ""}`}
                    />
                    {showError("cv") && (
                        <p className="mt-1 text-sm text-red-600">{errors.cv}</p>
                    )}
                </div>

                <div>
                    <textarea
                        id="career-cover"
                        name="coverLetter"
                        placeholder="Cover letter"
                        aria-label="Cover letter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={COVER_LIMIT}
                        rows={3}
                        className={`h-24 w-full resize-none rounded border px-4 py-2.5 text-base leading-6 ${showError("coverLetter") ? "border-red-500" : ""}`}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        <span
                            aria-live="polite"
                            className={coverRemaining === 0 ? "font-semibold text-[#cd9432]" : ""}
                        >
                            {coverRemaining}
                        </span>
                        {" "}
                        characters
                    </p>
                    {showError("coverLetter") && (
                        <p className="mt-1 text-sm text-red-600">{errors.coverLetter}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer rounded-full bg-[#cd9432] px-6 py-2.5 text-base font-medium text-black transition hover:bg-[#b8832c] disabled:cursor-wait disabled:opacity-70"
                >
                    {isSubmitting ? "Sending..." : "Send application"}
                </button>
            </form>
        </>
    );
}
