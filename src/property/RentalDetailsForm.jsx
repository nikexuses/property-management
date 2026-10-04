import { useEffect, useState } from "react";
import "./RentalDetailsForm.css";

function RentalDetailsForm({ data, onNext, onBack }) {
  const [form, setForm] = useState({
    monthlyRent: "",
    securityDeposit: "",
    rentNegotiable: false,

    maintenanceType: "",
    maintenanceAmount: "",

    availableFrom: "",

    preferredTenants: "",
    leaseDuration: "",
    noticePeriod: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        monthlyRent: data.monthlyRent || "",
        securityDeposit: data.securityDeposit || "",
        rentNegotiable: data.rentNegotiable || false,

        maintenanceType: data.maintenanceType || "",
        maintenanceAmount: data.maintenanceAmount || "",

        availableFrom: data.availableFrom || "",

        preferredTenants: data.preferredTenants || "",
        leaseDuration: data.leaseDuration || "",
        noticePeriod: data.noticePeriod || "",
      });
    }
  }, [data]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.monthlyRent) {
      alert("Please enter the monthly rent.");
      return;
    }

    if (!form.securityDeposit) {
      alert("Please enter the security deposit.");
      return;
    }

    onNext(form);
  };

  const formatMoney = (value) => {
    if (!value) return "—";

    const number = Number(value);

    if (Number.isNaN(number)) return "—";

    return `₹${number.toLocaleString("en-IN")}`;
  };

  return (
    <form className="rental-page" onSubmit={handleSubmit}>
      <div className="rental-container">

        {/* HEADER */}
        <div className="rental-header">
          <div>
            <div className="rental-step">STEP 2 OF 5</div>

            <h1>Rental Details</h1>

            <p>
              Set the rent, maintenance, availability and tenant
              preferences for your property.
            </p>
          </div>

          <div className="rental-step-number">
            Step 2 of 5
          </div>
        </div>

        {/* PRICING */}
        <section className="rental-section">
          <h2>Pricing</h2>

          <div className="rental-grid">

            <div className="rental-field">
              <label htmlFor="monthlyRent">
                Monthly Rent (₹)
              </label>

              <input
                id="monthlyRent"
                name="monthlyRent"
                type="number"
                min="0"
                value={form.monthlyRent}
                onChange={handleChange}
                placeholder="e.g. 25000"
              />
            </div>

            <div className="rental-field">
              <label htmlFor="securityDeposit">
                Security Deposit (₹)
              </label>

              <input
                id="securityDeposit"
                name="securityDeposit"
                type="number"
                min="0"
                value={form.securityDeposit}
                onChange={handleChange}
                placeholder="e.g. 100000"
              />
            </div>

          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              name="rentNegotiable"
              checked={form.rentNegotiable}
              onChange={handleChange}
            />

            <span>Rent is negotiable</span>
          </label>
        </section>

        {/* MAINTENANCE */}
        <section className="rental-section">
          <h2>Maintenance</h2>

          <div className="rental-grid">

            <div className="rental-field">
              <label htmlFor="maintenanceType">
                Maintenance Type
              </label>

              <select
                id="maintenanceType"
                name="maintenanceType"
                value={form.maintenanceType}
                onChange={handleChange}
              >
                <option value="">
                  Select maintenance type
                </option>

                <option value="Included">
                  Included in rent
                </option>

                <option value="Fixed">
                  Fixed monthly amount
                </option>

                <option value="Variable">
                  Variable / usage based
                </option>

                <option value="Tenant">
                  Paid by tenant
                </option>
              </select>
            </div>

            <div className="rental-field">
              <label htmlFor="maintenanceAmount">
                Maintenance Amount (₹)
              </label>

              <input
                id="maintenanceAmount"
                name="maintenanceAmount"
                type="number"
                min="0"
                value={form.maintenanceAmount}
                onChange={handleChange}
                placeholder="e.g. 2500"
              />
            </div>

          </div>
        </section>

        {/* AVAILABILITY */}
        <section className="rental-section">
          <h2>Availability</h2>

          <div className="rental-field availability-field">
            <label htmlFor="availableFrom">
              Available From
            </label>

            <input
              id="availableFrom"
              name="availableFrom"
              type="date"
              value={form.availableFrom}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* TENANT PREFERENCES */}
        <section className="rental-section">
          <h2>Tenant Preferences</h2>

          <div className="rental-grid">

            <div className="rental-field">
              <label htmlFor="preferredTenants">
                Preferred Tenants
              </label>

              <select
                id="preferredTenants"
                name="preferredTenants"
                value={form.preferredTenants}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Anyone">Anyone</option>
                <option value="Family">Family</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Working Professionals">
                  Working Professionals
                </option>
                <option value="Students">Students</option>
              </select>
            </div>

            <div className="rental-field">
              <label htmlFor="leaseDuration">
                Lease Duration
              </label>

              <select
                id="leaseDuration"
                name="leaseDuration"
                value={form.leaseDuration}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="6 Months">6 Months</option>
                <option value="11 Months">11 Months</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
              </select>
            </div>

          </div>

          <div className="rental-field notice-field">
            <label htmlFor="noticePeriod">
              Notice Period
            </label>

            <select
              id="noticePeriod"
              name="noticePeriod"
              value={form.noticePeriod}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="15 Days">15 Days</option>
              <option value="30 Days">30 Days</option>
              <option value="60 Days">60 Days</option>
              <option value="90 Days">90 Days</option>
            </select>
          </div>

          {/* SUMMARY */}
          <div className="rental-summary">
            <h3>Rental Summary</h3>

            <div className="summary-grid">

              <div>
                <span>Monthly Rent</span>
                <strong>
                  {formatMoney(form.monthlyRent)}
                </strong>
              </div>

              <div>
                <span>Deposit</span>
                <strong>
                  {formatMoney(form.securityDeposit)}
                </strong>
              </div>

              <div>
                <span>Maintenance</span>
                <strong>
                  {formatMoney(form.maintenanceAmount)}
                </strong>
              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <div className="rental-footer">

          <button
            type="button"
            className="rental-back"
            onClick={onBack}
          >
            ← Back
          </button>

          <button
            type="submit"
            className="rental-continue"
          >
            Continue →
          </button>

        </div>

      </div>
    </form>
  );
}

export default RentalDetailsForm;