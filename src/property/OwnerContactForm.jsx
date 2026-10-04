import { useState } from "react";

function OwnerContactForm({ data = {}, onNext, onBack }) {
  const [form, setForm] = useState({
    ownerType: data.ownerType || "individual",
    ownerName: data.ownerName || "",
    phone: data.phone || "",
    email: data.email || "",
    whatsapp: data.whatsapp ?? true,
    contactMethod: data.contactMethod || "phone",
  });

  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.ownerName.trim()) {
      setError("Please enter the owner's name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (
      !form.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    onNext(form);
  };

  return (
    <div className="owner-contact-container">
      <div className="owner-contact-card">

        <div className="owner-contact-header">
          <span className="property-step">
            STEP 5 • OWNER DETAILS
          </span>

          <h1>Tell us about yourself</h1>

          <p>
            These details will be used to contact you regarding your property.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* OWNER TYPE */}

          <div className="property-field">
            <label>Owner Type</label>

            <div className="owner-type-options">

              <button
                type="button"
                className={
                  form.ownerType === "individual"
                    ? "owner-type selected"
                    : "owner-type"
                }
                onClick={() =>
                  updateField("ownerType", "individual")
                }
              >
                <strong>Individual</strong>
                <small>I'm renting out my own property</small>
              </button>

              <button
                type="button"
                className={
                  form.ownerType === "company"
                    ? "owner-type selected"
                    : "owner-type"
                }
                onClick={() =>
                  updateField("ownerType", "company")
                }
              >
                <strong>Company</strong>
                <small>I'm representing a company</small>
              </button>

            </div>
          </div>

          {/* NAME */}

          <div className="property-field">
            <label>
              Owner Name <span>*</span>
            </label>

            <input
              type="text"
              placeholder="Enter full name"
              value={form.ownerName}
              onChange={(event) =>
                updateField(
                  "ownerName",
                  event.target.value
                )
              }
            />
          </div>

          {/* PHONE */}

          <div className="property-field">
            <label>
              Mobile Number <span>*</span>
            </label>

            <div className="phone-input">
              <span>+91</span>

              <input
                type="tel"
                inputMode="numeric"
                maxLength="10"
                placeholder="9876543210"
                value={form.phone}
                onChange={(event) => {
                  const value =
                    event.target.value.replace(/\D/g, "");

                  updateField("phone", value);
                }}
              />
            </div>
          </div>

          {/* EMAIL */}

          <div className="property-field">
            <label>
              Email Address <span>*</span>
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(event) =>
                updateField(
                  "email",
                  event.target.value
                )
              }
            />
          </div>

          {/* WHATSAPP */}

          <div className="contact-preference">

            <div>
              <strong>Available on WhatsApp?</strong>

              <p>
                Allow potential tenants to contact you on WhatsApp.
              </p>
            </div>

            <button
              type="button"
              className={
                form.whatsapp
                  ? "toggle active"
                  : "toggle"
              }
              onClick={() =>
                updateField(
                  "whatsapp",
                  !form.whatsapp
                )
              }
            >
              <span />
            </button>

          </div>

          {/* CONTACT METHOD */}

          <div className="property-field">
            <label>
              Preferred Contact Method
            </label>

            <div className="contact-method-options">

              <label>
                <input
                  type="radio"
                  name="contactMethod"
                  value="phone"
                  checked={
                    form.contactMethod === "phone"
                  }
                  onChange={(event) =>
                    updateField(
                      "contactMethod",
                      event.target.value
                    )
                  }
                />

                Phone
              </label>

              <label>
                <input
                  type="radio"
                  name="contactMethod"
                  value="whatsapp"
                  checked={
                    form.contactMethod === "whatsapp"
                  }
                  onChange={(event) =>
                    updateField(
                      "contactMethod",
                      event.target.value
                    )
                  }
                />

                WhatsApp
              </label>

              <label>
                <input
                  type="radio"
                  name="contactMethod"
                  value="email"
                  checked={
                    form.contactMethod === "email"
                  }
                  onChange={(event) =>
                    updateField(
                      "contactMethod",
                      event.target.value
                    )
                  }
                />

                Email
              </label>

            </div>
          </div>

          {/* ERROR */}

          {error && (
            <div className="property-form-error">
              {error}
            </div>
          )}

          {/* BUTTONS */}

          <div className="property-form-actions">

            <button
              type="button"
              className="property-back-button"
              onClick={onBack}
            >
              ← Back
            </button>

            <button
              type="submit"
              className="property-next-button"
            >
              Continue →
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default OwnerContactForm;