import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
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

const QUALIFICATIONS = [
    "Secondary school certificate",
    "OND",
    "HND",
    "Bachelor's degree",
    "Postgraduate diploma",
    "Master's degree",
    "Doctorate",
    "Other",
];

const GENDERS = ["Female", "Male", "Other", "Prefer not to say"];

const MARITAL_STATUSES = [
    "Single",
    "Married",
    "Separated",
    "Divorced",
    "Widowed",
    "Prefer not to say",
];

const RELATIONSHIPS = [
    "Parent",
    "Spouse",
    "Sibling",
    "Child",
    "Relative",
    "Friend",
    "Guardian",
    "Other",
];

const STATES = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
];

const MAX_DOCUMENT_BYTES = 5 * 1024 * 1024;
const DOCUMENT_EXTENSIONS = [".pdf", ".doc", ".docx"];
const MAX_PHONE_DIGITS = 11;
const CURRENT_YEAR = new Date().getFullYear();
const DRAFT_KEY = "atsl-career-application-draft";
const FORM_FIELDS = [
    "firstName",
    "lastName",
    "dateOfBirth",
    "gender",
    "maritalStatus",
    "email",
    "phone",
    "role",
    "state",
    "lga",
    "address",
    "kinFirstName",
    "kinLastName",
    "kinRelationship",
    "kinPhone",
];

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
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    country: "NG",
    phone: "",
    email: "",
    role: "",
    state: "",
    lga: "",
    address: "",
    qualifications: [{ qualification: "", institution: "", course: "", yearAwarded: "" }],
    kinFirstName: "",
    kinLastName: "",
    kinRelationship: "",
    kinPhone: "",
};

const fieldBaseClass =
    "w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-[#291a06] outline-none transition placeholder:text-[#9b8877] focus:ring-4 focus:ring-[#cd9432]/15";

function countryByIso(iso) {
    return COUNTRIES.find((country) => country.iso === iso) ?? COUNTRIES[0];
}

function phoneDigitLimit(iso) {
    return Math.min(countryByIso(iso).digits, MAX_PHONE_DIGITS);
}

function phoneInputMaxLength(iso) {
    return iso === "NG" ? 11 : phoneDigitLimit(iso);
}

function isValidPhone(value, iso) {
    if (iso === "NG") {
        return (
            (value.length === 10 && !value.startsWith("0"))
            || (value.length === 11 && value.startsWith("0"))
        );
    }

    return value.length === phoneDigitLimit(iso);
}

function internationalPhone(iso, value) {
    const number = iso === "NG" && value.length === 11 && value.startsWith("0")
        ? value.slice(1)
        : value;
    return `${countryByIso(iso).dial}${number}`;
}

function currentISODate() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}`;
}

function digitsOnly(value, max) {
    return value.replace(/\D/g, "").slice(0, max);
}

function lettersOnlyName(value) {
    return value.replace(/\d/g, "");
}

function createQualification() {
    return { qualification: "", institution: "", course: "", yearAwarded: "" };
}

function isAllowedDocument(file) {
    const name = file.name.toLowerCase();
    return DOCUMENT_EXTENSIONS.some((extension) => name.endsWith(extension));
}

function friendlySendError(message) {
    if (/activation/i.test(message)) {
        return `Open the activation email sent to ${email} and click the link once, then send the application again.`;
    }

    if (/pro feature|file upload/i.test(message)) {
        return "The email service could not attach the document. Please try again in a moment.";
    }

    return message;
}

function parseDraft(serializedDraft) {
    const saved = JSON.parse(serializedDraft);
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
        throw new Error("Saved draft is not valid.");
    }

    const draft = { ...emptyForm, qualifications: [createQualification()] };
    FORM_FIELDS.forEach((field) => {
        if (typeof saved[field] === "string") {
            draft[field] = saved[field];
        }
    });

    if (COUNTRIES.some((country) => country.iso === saved.country)) {
        draft.country = saved.country;
    }

    if (Array.isArray(saved.qualifications)) {
        const qualifications = saved.qualifications
            .filter((item) => item && typeof item === "object" && !Array.isArray(item))
            .map((item) => ({
                qualification: typeof item.qualification === "string" ? item.qualification : "",
                institution: typeof item.institution === "string" ? item.institution : "",
                course: typeof item.course === "string" ? item.course : "",
                yearAwarded: typeof item.yearAwarded === "string" ? item.yearAwarded : "",
            }));
        draft.qualifications = qualifications.length ? qualifications : [createQualification()];
    } else if (typeof saved.qualification === "string" || typeof saved.institution === "string") {
        draft.qualifications = [{
            qualification: typeof saved.qualification === "string" ? saved.qualification : "",
            institution: typeof saved.institution === "string" ? saved.institution : "",
            course: typeof saved.course === "string" ? saved.course : "",
            yearAwarded: "",
        }];
    }

    return draft;
}

function loadCareerDraft() {
    let serializedDraft;
    try {
        serializedDraft = window.localStorage.getItem(DRAFT_KEY);
    } catch (error) {
        console.error(error);
        return {
            formData: emptyForm,
            toast: {
                type: "error",
                message: "Saved drafts are unavailable in this browser.",
            },
        };
    }

    if (!serializedDraft) {
        return { formData: emptyForm, toast: null };
    }

    try {
        return {
            formData: parseDraft(serializedDraft),
            toast: {
                type: "success",
                message: "Your saved details were restored. Re-upload your document before submitting.",
            },
        };
    } catch (error) {
        console.error(error);
        return {
            formData: emptyForm,
            toast: {
                type: "error",
                message: "The saved draft could not be restored. You can start a new application.",
            },
        };
    }
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

function Field({ id, label, error, children, description, className = "" }) {
    return (
        <div className={`min-w-0 space-y-1 ${className}`}>
            <label htmlFor={id} className="text-xs font-medium text-[#5c4030]">
                {label}
            </label>
            {children}
            {description && <p className="text-xs leading-relaxed text-[#8a715d]">{description}</p>}
            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    );
}

function FormSection({ title, children }) {
    return (
        <section className="rounded-2xl border border-[#ead9bf] bg-white/90 p-4 shadow-[0_18px_40px_-28px_rgba(41,26,6,0.55)] sm:p-5">
            <h2 className="mb-4 font-['Fraunces'] text-lg font-normal italic leading-snug text-[#291a06]">
                {title}
            </h2>
            {children}
        </section>
    );
}

function PhoneInput({ id, name, country, value, onChange, onBlur, onCountryChange, invalid }) {
    return (
        <div className="flex flex-col gap-2 min-[420px]:flex-row">
            <div className="relative w-full min-[420px]:w-28 min-[420px]:shrink-0">
                <select
                    id={`${id}-country`}
                    value={country}
                    onChange={(event) => onCountryChange(event.target.value)}
                    aria-label={`${name === "kinPhone" ? "Next of kin " : ""}country and calling code`}
                    className={`h-[42px] w-full appearance-none rounded-xl border bg-white px-3 pr-9 text-sm text-[#291a06] outline-none focus:border-[#cd9432] focus:ring-4 focus:ring-[#cd9432]/15 ${invalid ? "border-red-500" : "border-[#ead9bf]"}`}
                >
                    {COUNTRIES.map((item) => (
                        <option key={item.iso} value={item.iso}>
                            {item.iso} {item.dial}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a715d]"
                />
            </div>
            <input
                id={id}
                name={name}
                type="tel"
                inputMode="numeric"
                autoComplete={name === "phone" ? "tel-national" : "tel"}
                placeholder={country === "NG" ? "0803 123 4567" : "Phone number"}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                maxLength={phoneInputMaxLength(country)}
                aria-invalid={invalid}
                className={`${fieldBaseClass} min-w-0 flex-1 ${invalid ? "border-red-500 focus:border-red-500" : "border-[#ead9bf] focus:border-[#cd9432]"}`}
            />
        </div>
    );
}

export default function CareerForm() {
    const formId = useId();
    const fileInputRef = useRef(null);
    const [initialDraft] = useState(loadCareerDraft);
    const [formData, setFormData] = useState(initialDraft.formData);
    const [documentFile, setDocumentFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [toast, setToast] = useState(initialDraft.toast);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [consentAccepted, setConsentAccepted] = useState(false);

    useEffect(() => {
        if (!toast) return undefined;

        const timeout = window.setTimeout(() => setToast(null), 6000);
        return () => window.clearTimeout(timeout);
    }, [toast]);

    const showError = (field) => Boolean(touched[field] && errors[field]);
    const fieldId = (field) => `${formId}-${field}`;
    const getFieldClass = (field) =>
        `${fieldBaseClass} ${showError(field) ? "border-red-500 focus:border-red-500" : "border-[#ead9bf] focus:border-[#cd9432]"}`;

    const validate = (data, file, hasConsent) => {
        const errs = {};

        if (!data.firstName.trim()) errs.firstName = "Enter your first name.";
        if (!data.lastName.trim()) errs.lastName = "Enter your last name.";
        if (!hasConsent) errs.consent = "Consent is required to submit your application.";

        if (!data.email.trim()) {
            errs.email = "Enter your email address.";
        } else if (!/^[\w-.]+@[\w-]+\.[\w-.]+$/.test(data.email)) {
            errs.email = "Enter a valid email address.";
        }

        if (!data.phone) {
            errs.phone = "Enter your phone number.";
        } else if (!isValidPhone(data.phone, data.country)) {
            errs.phone = data.country === "NG"
                ? "Enter 10 digits, or include the leading 0."
                : `Enter ${phoneDigitLimit(data.country)} digits.`;
        }

        if (!data.role) errs.role = "Choose a role.";
        if (!data.dateOfBirth) {
            errs.dateOfBirth = "Enter your date of birth.";
        } else if (data.dateOfBirth > currentISODate()) {
            errs.dateOfBirth = "Date of birth cannot be in the future.";
        }
        if (!data.state) errs.state = "Choose your state of residence.";
        if (!data.lga.trim()) errs.lga = "Enter your city or LGA.";
        if (!data.address.trim()) errs.address = "Enter your residential address.";

        data.qualifications.forEach((qualification, index) => {
            const prefix = `qualifications.${index}`;
            if (!qualification.qualification) {
                errs[`${prefix}.qualification`] = "Choose a qualification.";
            }
            if (!qualification.institution.trim()) {
                errs[`${prefix}.institution`] = "Enter the institution.";
            }
            if (
                qualification.yearAwarded
                && (
                    !/^\d{4}$/.test(qualification.yearAwarded)
                    || Number(qualification.yearAwarded) < 1950
                    || Number(qualification.yearAwarded) > CURRENT_YEAR
                )
            ) {
                errs[`${prefix}.yearAwarded`] = `Enter a year from 1950 to ${CURRENT_YEAR}.`;
            }
        });

        if (!data.kinFirstName.trim()) errs.kinFirstName = "Enter your next of kin's first name.";
        if (!data.kinLastName.trim()) errs.kinLastName = "Enter your next of kin's last name.";
        if (!data.kinRelationship) errs.kinRelationship = "Choose a relationship.";

        if (!data.kinPhone) {
            errs.kinPhone = "Enter your next of kin's phone number.";
        } else if (!isValidPhone(data.kinPhone, data.country)) {
            errs.kinPhone = data.country === "NG"
                ? "Enter 10 digits, or include the leading 0."
                : `Enter ${phoneDigitLimit(data.country)} digits.`;
        }

        if (!file) {
            errs.document = "Upload a document.";
        } else if (!isAllowedDocument(file)) {
            errs.document = "Upload a PDF or Word document.";
        } else if (file.size > MAX_DOCUMENT_BYTES) {
            errs.document = "The document must be 5 MB or smaller.";
        }

        return errs;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setToast(null);
        setIsSubmitting(true);

        const validation = validate(formData, documentFile, consentAccepted);
        setErrors(validation);

        if (Object.keys(validation).length > 0) {
            const allTouched = Object.fromEntries(
                [...FORM_FIELDS, "document", "consent"].map((field) => [field, true])
            );
            formData.qualifications.forEach((_, index) => {
                ["qualification", "institution", "yearAwarded"].forEach((field) => {
                    allTouched[`qualifications.${index}.${field}`] = true;
                });
            });
            setTouched(allTouched);
            setIsSubmitting(false);
            return;
        }

        try {
            const formPayload = new FormData();
            const applicantName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
            const nextOfKinName = `${formData.kinFirstName.trim()} ${formData.kinLastName.trim()}`;
            formPayload.append("name", applicantName);
            formPayload.append("phone", internationalPhone(formData.country, formData.phone));
            formPayload.append("email", formData.email);
            formPayload.append("role", formData.role);
            formPayload.append("date of birth", formData.dateOfBirth);
            formPayload.append("recruitment data processing consent", "Agreed under the Nigeria Data Protection Act (NDPA) 2023");
            formPayload.append("consent recorded at", new Date().toISOString());
            formPayload.append("gender", formData.gender);
            formPayload.append("marital status", formData.maritalStatus);
            formPayload.append("state of residence", formData.state);
            formPayload.append("city or LGA", formData.lga);
            formPayload.append("residential address", formData.address);
            formData.qualifications.forEach((qualification, index) => {
                const suffix = index === 0 ? "" : ` ${index + 1}`;
                formPayload.append(
                    index === 0 ? "highest qualification" : `additional qualification${suffix}`,
                    qualification.qualification
                );
                formPayload.append(`institution${suffix}`, qualification.institution);
                if (qualification.course.trim()) {
                    formPayload.append(`course or field${suffix}`, qualification.course);
                }
                if (qualification.yearAwarded) {
                    formPayload.append(`year awarded${suffix}`, qualification.yearAwarded);
                }
            });
            formPayload.append("next of kin", nextOfKinName);
            formPayload.append("next of kin relationship", formData.kinRelationship);
            formPayload.append(
                "next of kin phone",
                internationalPhone(formData.country, formData.kinPhone)
            );
            formPayload.append("attachment", documentFile, documentFile.name);
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

            let successMessage = "Application submitted successfully. We will be in touch.";
            try {
                window.localStorage.removeItem(DRAFT_KEY);
            } catch (error) {
                console.error(error);
                successMessage = "Application submitted. The saved draft could not be removed from this device.";
            }

            setToast({ type: "success", message: successMessage });
            setFormData({
                ...emptyForm,
                qualifications: [createQualification()],
            });
            setConsentAccepted(false);
            setDocumentFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            setErrors({});
            setTouched({});
        } catch (error) {
            console.error(error);
            setToast({
                type: "error",
                message: error instanceof Error && error.message
                    ? error.message
                    : "Something went wrong. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSaveDraft = () => {
        try {
            window.localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
            setToast({
                type: "success",
                message: "Draft saved on this device. Re-upload your document before submitting.",
            });
        } catch (error) {
            console.error(error);
            setToast({
                type: "error",
                message: "Could not save your draft in this browser. Please try again.",
            });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const qualificationMatch = name.match(
            /^qualifications\.(\d+)\.(qualification|institution|course|yearAwarded)$/
        );

        setFormData((previous) => {
            if (name === "phone" || name === "kinPhone") {
                return {
                    ...previous,
                    [name]: digitsOnly(value, phoneInputMaxLength(previous.country)),
                };
            }

            if (["firstName", "lastName", "kinFirstName", "kinLastName"].includes(name)) {
                return { ...previous, [name]: lettersOnlyName(value) };
            }

            if (qualificationMatch) {
                const index = Number(qualificationMatch[1]);
                const field = qualificationMatch[2];
                const fieldValue = field === "yearAwarded" ? digitsOnly(value, 4) : value;
                return {
                    ...previous,
                    qualifications: previous.qualifications.map((qualification, itemIndex) =>
                        itemIndex === index
                            ? { ...qualification, [field]: fieldValue }
                            : qualification
                    ),
                };
            }

            return { ...previous, [name]: value };
        });

        setErrors((previous) => {
            if (!previous[name]) return previous;
            const next = { ...previous };
            delete next[name];
            return next;
        });
    };

    const handleAddQualification = () => {
        setFormData((previous) => ({
            ...previous,
            qualifications: [...previous.qualifications, createQualification()],
        }));
    };

    const handleRemoveQualification = (removeIndex) => {
        setFormData((previous) => ({
            ...previous,
            qualifications: previous.qualifications.filter((_, index) => index !== removeIndex),
        }));
        const clearQualificationState = (previous) =>
            Object.fromEntries(
                Object.entries(previous).filter(([field]) => !field.startsWith("qualifications."))
            );
        setErrors(clearQualificationState);
        setTouched(clearQualificationState);
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0] ?? null;
        setDocumentFile(file);
        setTouched((previous) => ({ ...previous, document: true }));
        setErrors((previous) => {
            const next = { ...previous };
            delete next.document;
            if (file && !isAllowedDocument(file)) {
                next.document = "Upload a PDF or Word document.";
            } else if (file && file.size > MAX_DOCUMENT_BYTES) {
                next.document = "The document must be 5 MB or smaller.";
            }
            return next;
        });
    };

    const handleBlur = (event) => {
        const { name } = event.target;
        setTouched((previous) => ({ ...previous, [name]: true }));
    };

    const selectCountry = (iso) => {
        setFormData((previous) => ({
            ...previous,
            country: iso,
            phone: digitsOnly(previous.phone, phoneInputMaxLength(iso)),
            kinPhone: digitsOnly(previous.kinPhone, phoneInputMaxLength(iso)),
        }));
        setErrors((previous) => {
            const next = { ...previous };
            delete next.phone;
            delete next.kinPhone;
            return next;
        });
    };

    const handleConsentChange = (event) => {
        setConsentAccepted(event.target.checked);
        setTouched((previous) => ({ ...previous, consent: true }));
        setErrors((previous) => {
            if (!previous.consent) return previous;
            const next = { ...previous };
            delete next.consent;
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

            <form onSubmit={handleSubmit} className="space-y-4">
                <header className="space-y-3">
                    <h2 className="font-['Fraunces'] text-xl font-normal italic leading-snug text-[#291a06] sm:text-2xl">
                        Application Form
                    </h2>
                    <div className={`flex items-start gap-3 rounded-xl border bg-[#fffdf9] p-4 ${showError("consent") ? "border-red-500" : "border-[#ead9bf]"}`}>
                        <input
                            id={fieldId("consent")}
                            name="consent"
                            type="checkbox"
                            checked={consentAccepted}
                            onChange={handleConsentChange}
                            onBlur={handleBlur}
                            aria-invalid={showError("consent")}
                            aria-describedby={showError("consent") ? fieldId("consent-error") : undefined}
                            className="mt-1 h-4 w-4 shrink-0 accent-[#cd9432]"
                        />
                        <label
                            htmlFor={fieldId("consent")}
                            className="cursor-pointer text-sm leading-relaxed text-[#5c4030]"
                        >
                            By continuing, you consent to ATSL storing and verifying your details
                            for recruitment purposes under the Nigeria Data Protection Act (NDPA)
                            2023; this consent is recorded prior to any background checks. Saved
                            drafts are kept for 14 days, after which unfinished applications are
                            closed and permanently deleted 90 days later. Contact ATSL to request
                            earlier deletion.
                        </label>
                    </div>
                    {showError("consent") && (
                        <p id={fieldId("consent-error")} className="text-xs text-red-600">
                            {errors.consent}
                        </p>
                    )}
                </header>

                <FormSection title="Contact & identity">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Field
                            id={fieldId("firstName")}
                            label={<>First name <span aria-hidden="true" className="text-red-600">*</span></>}
                            error={showError("firstName") && errors.firstName}
                        >
                            <input
                                id={fieldId("firstName")}
                                name="firstName"
                                type="text"
                                placeholder="First name"
                                value={formData.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="given-name"
                                aria-required="true"
                                aria-invalid={showError("firstName")}
                                className={getFieldClass("firstName")}
                            />
                        </Field>

                        <Field
                            id={fieldId("lastName")}
                            label={<>Last name <span aria-hidden="true" className="text-red-600">*</span></>}
                            error={showError("lastName") && errors.lastName}
                        >
                            <input
                                id={fieldId("lastName")}
                                name="lastName"
                                type="text"
                                placeholder="Last name"
                                value={formData.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="family-name"
                                aria-required="true"
                                aria-invalid={showError("lastName")}
                                className={getFieldClass("lastName")}
                            />
                        </Field>

                        <Field id={fieldId("email")} label="Email" error={showError("email") && errors.email}>
                            <input
                                id={fieldId("email")}
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="email"
                                aria-invalid={showError("email")}
                                className={getFieldClass("email")}
                            />
                        </Field>

                        <Field
                            id={fieldId("phone")}
                            label="Phone number"
                            error={showError("phone") && errors.phone}
                        >
                            <PhoneInput
                                id={fieldId("phone")}
                                name="phone"
                                country={formData.country}
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onCountryChange={selectCountry}
                                invalid={showError("phone")}
                            />
                        </Field>

                        <Field id={fieldId("role")} label="Position applied for" error={showError("role") && errors.role}>
                            <select
                                id={fieldId("role")}
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={showError("role")}
                                className={`${getFieldClass("role")} ${formData.role ? "" : "text-[#9b8877]"}`}
                            >
                                <option value="">Select a role</option>
                                {ROLES.map((role) => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </Field>

                        <Field
                            id={fieldId("dateOfBirth")}
                            label={<>Date of birth <span aria-hidden="true" className="text-red-600">*</span></>}
                            error={showError("dateOfBirth") && errors.dateOfBirth}
                        >
                            <input
                                id={fieldId("dateOfBirth")}
                                name="dateOfBirth"
                                type="date"
                                max={currentISODate()}
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="bday"
                                aria-required="true"
                                aria-invalid={showError("dateOfBirth")}
                                className={getFieldClass("dateOfBirth")}
                            />
                        </Field>

                        <Field id={fieldId("gender")} label="Gender">
                            <select
                                id={fieldId("gender")}
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`${getFieldClass("gender")} ${formData.gender ? "" : "text-[#9b8877]"}`}
                            >
                                <option value="">Select gender</option>
                                {GENDERS.map((gender) => (
                                    <option key={gender} value={gender}>{gender}</option>
                                ))}
                            </select>
                        </Field>

                        <Field id={fieldId("maritalStatus")} label="Marital status">
                            <select
                                id={fieldId("maritalStatus")}
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`${getFieldClass("maritalStatus")} ${formData.maritalStatus ? "" : "text-[#9b8877]"}`}
                            >
                                <option value="">Select marital status</option>
                                {MARITAL_STATUSES.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </Field>
                    </div>
                </FormSection>

                <FormSection title="Where you live">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Field id={fieldId("state")} label="State of residence" error={showError("state") && errors.state}>
                            <select
                                id={fieldId("state")}
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={showError("state")}
                                className={`${getFieldClass("state")} ${formData.state ? "" : "text-[#9b8877]"}`}
                            >
                                <option value="">Choose a state</option>
                                {STATES.map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </Field>

                        <Field id={fieldId("lga")} label="City or LGA" error={showError("lga") && errors.lga}>
                            <input
                                id={fieldId("lga")}
                                name="lga"
                                type="text"
                                placeholder="City or local government area"
                                value={formData.lga}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="address-level2"
                                aria-invalid={showError("lga")}
                                className={getFieldClass("lga")}
                            />
                        </Field>

                        <div className="sm:col-span-2 lg:col-span-1">
                            <Field id={fieldId("address")} label="Residential address" error={showError("address") && errors.address}>
                                <input
                                    id={fieldId("address")}
                                    name="address"
                                    type="text"
                                    placeholder="House number, street, area"
                                    value={formData.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="street-address"
                                    aria-invalid={showError("address")}
                                    className={getFieldClass("address")}
                                />
                            </Field>
                        </div>
                    </div>
                </FormSection>

                <FormSection title="Qualification">
                    <div className="space-y-4">
                        {formData.qualifications.map((qualification, index) => {
                            const prefix = `qualifications.${index}`;
                            const label = index === 0 ? "Highest qualification" : `Qualification ${index + 1}`;

                            return (
                                <div
                                    key={index}
                                    className="rounded-xl border border-[#f0e4d3] bg-[#fffdf9] p-3 sm:p-4"
                                >
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <h3 className="text-sm font-semibold text-[#5c4030]">{label}</h3>
                                        {formData.qualifications.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveQualification(index)}
                                                aria-label={`Remove ${label.toLowerCase()}`}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#8a715d] transition hover:bg-red-50 hover:text-red-600"
                                            >
                                                <X aria-hidden="true" className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                        <Field
                                            id={fieldId(`${prefix}.qualification`)}
                                            label="Qualification *"
                                            error={showError(`${prefix}.qualification`) && errors[`${prefix}.qualification`]}
                                        >
                                            <select
                                                id={fieldId(`${prefix}.qualification`)}
                                                name={`${prefix}.qualification`}
                                                value={qualification.qualification}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                aria-invalid={showError(`${prefix}.qualification`)}
                                                className={`${getFieldClass(`${prefix}.qualification`)} ${qualification.qualification ? "" : "text-[#9b8877]"}`}
                                            >
                                                <option value="">Select qualification</option>
                                                {QUALIFICATIONS.map((item) => (
                                                    <option key={item} value={item}>{item}</option>
                                                ))}
                                            </select>
                                        </Field>

                                        <Field
                                            id={fieldId(`${prefix}.institution`)}
                                            label="Institution *"
                                            error={showError(`${prefix}.institution`) && errors[`${prefix}.institution`]}
                                        >
                                            <input
                                                id={fieldId(`${prefix}.institution`)}
                                                name={`${prefix}.institution`}
                                                type="text"
                                                placeholder="School, college or university"
                                                value={qualification.institution}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                aria-invalid={showError(`${prefix}.institution`)}
                                                className={getFieldClass(`${prefix}.institution`)}
                                            />
                                        </Field>

                                        <Field id={fieldId(`${prefix}.course`)} label="Course or field (optional)">
                                            <input
                                                id={fieldId(`${prefix}.course`)}
                                                name={`${prefix}.course`}
                                                type="text"
                                                placeholder="e.g. Computer Science"
                                                value={qualification.course}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={getFieldClass(`${prefix}.course`)}
                                            />
                                        </Field>

                                        <Field
                                            id={fieldId(`${prefix}.yearAwarded`)}
                                            label="Year awarded"
                                            error={showError(`${prefix}.yearAwarded`) && errors[`${prefix}.yearAwarded`]}
                                        >
                                            <input
                                                id={fieldId(`${prefix}.yearAwarded`)}
                                                name={`${prefix}.yearAwarded`}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={4}
                                                placeholder="e.g. 2022"
                                                value={qualification.yearAwarded}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                aria-invalid={showError(`${prefix}.yearAwarded`)}
                                                className={getFieldClass(`${prefix}.yearAwarded`)}
                                            />
                                        </Field>
                                    </div>
                                </div>
                            );
                        })}

                        <button
                            type="button"
                            onClick={handleAddQualification}
                            className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#ead9bf] bg-white px-4 py-2 text-sm font-medium text-[#5c4030] transition hover:bg-[#fff8eb]"
                        >
                            + Add qualification
                        </button>
                    </div>
                </FormSection>

                <FormSection title="Next of kin">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Field id={fieldId("kinFirstName")} label="First name" error={showError("kinFirstName") && errors.kinFirstName}>
                            <input
                                id={fieldId("kinFirstName")}
                                name="kinFirstName"
                                type="text"
                                placeholder="First name"
                                value={formData.kinFirstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={showError("kinFirstName")}
                                className={getFieldClass("kinFirstName")}
                            />
                        </Field>

                        <Field id={fieldId("kinLastName")} label="Last name" error={showError("kinLastName") && errors.kinLastName}>
                            <input
                                id={fieldId("kinLastName")}
                                name="kinLastName"
                                type="text"
                                placeholder="Last name"
                                value={formData.kinLastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={showError("kinLastName")}
                                className={getFieldClass("kinLastName")}
                            />
                        </Field>

                        <Field id={fieldId("kinRelationship")} label="Relationship" error={showError("kinRelationship") && errors.kinRelationship}>
                            <select
                                id={fieldId("kinRelationship")}
                                name="kinRelationship"
                                value={formData.kinRelationship}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={showError("kinRelationship")}
                                className={`${getFieldClass("kinRelationship")} ${formData.kinRelationship ? "" : "text-[#9b8877]"}`}
                            >
                                <option value="">Select relationship</option>
                                {RELATIONSHIPS.map((relationship) => (
                                    <option key={relationship} value={relationship}>{relationship}</option>
                                ))}
                            </select>
                        </Field>

                        <Field
                            id={fieldId("kinPhone")}
                            label="Phone number"
                            error={showError("kinPhone") && errors.kinPhone}
                        >
                            <PhoneInput
                                id={fieldId("kinPhone")}
                                name="kinPhone"
                                country={formData.country}
                                value={formData.kinPhone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onCountryChange={selectCountry}
                                invalid={showError("kinPhone")}
                            />
                        </Field>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-[#8a715d]">
                        Use the same country code selected for your phone number.
                    </p>
                </FormSection>

                <FormSection title="Documents">
                    <Field
                        id={fieldId("document")}
                        label="Upload documents"
                        error={showError("document") && errors.document}
                        description="Upload supporting document (PDF or Word, max 5 MB)."
                    >
                        <input
                            id={fieldId("document")}
                            ref={fileInputRef}
                            type="file"
                            name="document"
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={handleFileChange}
                            aria-invalid={showError("document")}
                            className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-gray-700 file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-[#fff8eb] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#291a06] hover:file:bg-amber-100 ${showError("document") ? "border-red-500" : "border-[#ead9bf]"}`}
                        />
                    </Field>
                </FormSection>

                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={handleSaveDraft}
                        disabled={isSubmitting}
                        className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#ead9bf] bg-white px-5 py-2.5 text-sm font-medium text-[#291a06] transition hover:bg-[#fff8eb] disabled:cursor-wait disabled:opacity-70"
                    >
                        Save to finish later
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#291a06] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#3b260b] focus:outline-none focus:ring-4 focus:ring-[#cd9432]/25 disabled:cursor-wait disabled:opacity-70"
                    >
                        {isSubmitting ? "Submitting..." : "Submit application"}
                    </button>
                </div>
            </form>
        </>
    );
}
