import { useState } from "react";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import * as yup from "yup";

// ✅ Yup Validation Schema
const validationSchema = yup.object({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  email: yup.string().required("Email is required").email("Please enter a valid email address"),
  hotel: yup.string().required("Hotel name is required").min(2, "Hotel name must be at least 2 characters"),
  phone: yup.string().matches(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
  rooms: yup.string(),
  preferredTime: yup.string(),
});

export default function Demo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hotel: "",
    rooms: "",
    phone: "",
    preferredTime: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage(null);

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const formPayload = new FormData();
      formPayload.append("access_key", "fcad128c-bc8c-41d5-81dc-481f9c9a9db6");
      formPayload.append("subject", "Demo Booking Request from Adaptive Tech Solutions");
      formPayload.append("from_name", "Adaptive Tech Solutions");

      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage("✅ Thank you for booking a demo! We’ll get back to you shortly.");
        setFormData({
          name: "",
          email: "",
          hotel: "",
          rooms: "",
          phone: "",
          preferredTime: "",
        });
      } else {
        alert(`❌ Submission failed: ${data.message || "Please try again later."}`);
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          if (err.path) validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        alert("❌ Something went wrong. Please try again.");
        console.error("Submission error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="demo" className="py-20 bg-[#291a06]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Section */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Hotel Operations?
            </h2>

            <div className="space-y-6">
              {[
                { icon: <Calendar className="h-6 w-6" />, title: "Personalized Demo", desc: "Tailored to your hotel's specific needs" },
                { icon: <Clock className="h-6 w-6" />, title: "30-Minute Session", desc: "Quick overview of key features" },
                { icon: <Users className="h-6 w-6" />, title: "Expert Guidance", desc: "Learn from hotel industry specialists" },
              ].map((item, i) => (
                <article key={i} className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-[#f5e8d7]">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h3 className="font-bold text-[#562d0b] mb-4 text-center">
              Book Your Free Demo
            </h3>

            {successMessage && (
              <div className="bg-[#f5e8d7] text-[#291a06] p-4 mb-4 rounded-xl text-center font-medium">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Full Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                />
                <InputField
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Hotel Name *"
                  name="hotel"
                  value={formData.hotel}
                  onChange={handleInputChange}
                  error={errors.hotel}
                />
                <SelectField
                  label="Number of Rooms"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleInputChange}
                  options={["1-25", "26-50", "51-100", "100+"]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  type="tel"
                />
                <SelectField
                  label="Preferred Time"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  options={["morning", "afternoon", "evening"]}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#291a06] text-white py-4 rounded-xl cursor-pointer hover:bg-[#6a3711] transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Booking..."
                ) : (
                  <>
                    <span>Book My Demo</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              <p className="text-sm text-[#8d561e] text-center">
                No spam, ever. We'll only contact you about your demo.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ✅ Reusable Input Components */
function InputField({ label, name, value, onChange, error, type = "text" }) {
  return (
    <div>
      <label className="block text-[#562d0b] font-medium mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#6a3711] focus:border-transparent outline-none transition-all ${
          error ? "border-red-500" : "border-[#d2b48c]"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-[#562d0b] font-medium mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-[#d2b48c] rounded-xl focus:ring-2 focus:ring-[#8d561e] focus:border-transparent outline-none transition-all"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}