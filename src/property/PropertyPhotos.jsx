import { useEffect, useState } from "react";
import "./RentalDetailsForm.css";

function RentalDetailsForm({ propertyData = {}, onBack, onComplete }) {
  const [formData, setFormData] = useState({
    rent: propertyData.rent || "",
    securityDeposit: propertyData.securityDeposit || "",
    negotiable: propertyData.negotiable || false,

    maintenanceType: propertyData.maintenanceType || "",
    maintenanceAmount: propertyData.maintenanceAmount || "",

    availableFrom: propertyData.availableFrom || "",

    preferredTenants: propertyData.preferredTenants || "",
    leaseDuration: propertyData.leaseDuration || "",
    noticePeriod: propertyData.noticePeriod || "",
  });

  useEffect(() => {
    setFormData({
      rent: propertyData.rent || "",
      securityDeposit: propertyData.securityDeposit || "",
      negotiable: propertyData.negotiable || false,

      maintenanceType: propertyData.maintenanceType || "",
      maintenanceAmount: propertyData.maintenanceAmount || "",

      availableFrom: propertyData.availableFrom || "",

      preferredTenants: propertyData.preferredTenants || "",
      leaseDuration: propertyData.leaseDuration || "",
      noticePeriod: propertyData.noticePeriod || "",
    });
  }, [propertyData]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContinue = (event) => {
    event.preventDefault();

    const updatedProperty = {
      ...propertyData,
      ...formData,
    };

    localStorage.setItem(
      "propertyData",
      JSON.stringify(updatedProperty)
    );

    if (onComplete) {
      onComplete(formData);
    }
  };

  return (
    <div className="rental-page">
      <div className="rental-container">

        {/* HEADER */}
        <div className="rental-header">
          <div>
            <div className="rental-step">
              STEP 4 OF 5
            </div>

            <h1>Rental Details</h1>

            <p>
              Add pricing, maintenance and tenant preferences
              for your property.
            </p>
          </div>

          <div className="rental-step-number">
            Step 4 of 5
          </div>
        </div>

        <form onSubmit={handleContinue}>

          {/* PRICING */}
          <section className="rental-section">
            <h2>Pricing</h2>

            <div className="rental-grid">

              <div className="form-group">
                <label htmlFor="rent">
                  Monthly Rent (₹)
                </label>

                <input
                  id="rent"
                  name="rent"
                  type="number"
                  min="0"
                  value={formData.rent}
                  onChange={handleChange}
                  placeholder="e.g. 25000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="securityDeposit">
                  Security Deposit (₹)
                </label>

                <input
                  id="securityDeposit"
                  name="securityDeposit"
                  type="number"
                  min="0"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  placeholder="e.g. 100000"
                />
              </div>

            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                name="negotiable"
                checked={formData.negotiable}
                onChange={handleChange}
              />

              <span>Rent is negotiable</span>
            </label>
          </section>

          {/* MAINTENANCE */}
          <section className="rental-section">
            <h2>Maintenance</h2>

            <div className="rental-grid">

              <div className="form-group">
                <label htmlFor="maintenanceType">
                  Maintenance Type
                </label>

                <select
                  id="maintenanceType"
                  name="maintenanceType"
                  value={formData.maintenanceType}
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
                    Variable
                  </option>

                  <option value="Tenant Pays">
                    Tenant pays separately
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="maintenanceAmount">
                  Maintenance Amount (₹)
                </label>

                <input
                  id="maintenanceAmount"
                  name="maintenanceAmount"
                  type="number"
                  min="0"
                  value={formData.maintenanceAmount}
                  onChange={handleChange}
                  placeholder="e.g. 2500"
                />
              </div>

            </div>
          </section>

          {/* AVAILABILITY */}
          <section className="rental-section">
            <h2>Availability</h2>

            <div className="form-group single-field">
              <label htmlFor="availableFrom">
                Available From
              </label>

              <input
                id="availableFrom"
                name="availableFrom"
                type="date"
                value={formData.availableFrom}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* TENANT PREFERENCES */}
          <section className="rental-section">
            <h2>Tenant Preferences</h2>

            <div className="rental-grid">

              <div className="form-group">
                <label htmlFor="preferredTenants">
                  Preferred Tenants
                </label>

                <select
                  id="preferredTenants"
                  name="preferredTenants"
                  value={formData.preferredTenants}
                  onChange={handleChange}
                >
                  <option value="">
                    Select
                  </option>

                  <option value="Anyone">
                    Anyone
                  </option>

                  <option value="Students">
                    Students
                  </option>

                  <option value="Working Professionals">
                    Working Professionals
                  </option>

                  <option value="Family">
                    Family
                  </option>

                  <option value="Couples">
                    Couples
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="leaseDuration">
                  Lease Duration
                </label>

                <select
                  id="leaseDuration"
                  name="leaseDuration"
                  value={formData.leaseDuration}
                  onChange={handleChange}
                >
                  <option value="">
                    Select
                  </option>

                  <option value="6 Months">
                    6 Months
                  </option>

                  <option value="11 Months">
                    11 Months
                  </option>

                  <option value="1 Year">
                    1 Year
                  </option>

                  <option value="2 Years">
                    2 Years
                  </option>
                </select>
              </div>

            </div>

            {/* NOTICE PERIOD */}
            <div className="form-group notice-field">
              <label htmlFor="noticePeriod">
                Notice Period
              </label>

              <select
                id="noticePeriod"
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleChange}
              >
                <option value="">
                  Select
                </option>

                <option value="15 Days">
                  15 Days
                </option>

                <option value="30 Days">
                  30 Days
                </option>

                <option value="60 Days">
                  60 Days
                </option>

                <option value="90 Days">
                  90 Days
                </option>
              </select>
            </div>

            {/* RENTAL SUMMARY */}
            <div className="rental-summary">
              <h3>Rental Summary</h3>

              <div className="summary-grid">

                <div>
                  <span>Monthly Rent</span>

                  <strong>
                    {formData.rent
                      ? `₹${Number(
                          formData.rent
                        ).toLocaleString("en-IN")}`
                      : "—"}
                  </strong>
                </div>

                <div>
                  <span>Deposit</span>

                  <strong>
                    {formData.securityDeposit
                      ? `₹${Number(
                          formData.securityDeposit
                        ).toLocaleString("en-IN")}`
                      : "—"}
                  </strong>
                </div>

                <div>
                  <span>Maintenance</span>

                  <strong>
                    {formData.maintenanceAmount
                      ? `₹${Number(
                          formData.maintenanceAmount
                        ).toLocaleString("en-IN")}`
                      : formData.maintenanceType === "Included"
                      ? "Included"
                      : "—"}
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

        </form>

      </div>
    </div>
  );
}

export default RentalDetailsForm;