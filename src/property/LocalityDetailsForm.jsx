import { useState } from "react";

function LocalityDetailsForm({ data, onNext, onBack }) {
  const [form, setForm] = useState({
    state: data?.state || "",
    city: data?.city || "",
    locality: data?.locality || "",
    address: data?.address || "",
    pincode: data?.pincode || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.state) {
      alert("Please select a state.");
      return;
    }

    if (!form.city) {
      alert("Please enter a city.");
      return;
    }

    if (!form.locality) {
      alert("Please enter the locality.");
      return;
    }

    if (!form.address) {
      alert("Please enter the property address.");
      return;
    }

    if (!form.pincode || form.pincode.length !== 6) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    onNext(form);
  };

  return (
    <div className="locality-details-container">
      <div className="locality-details-card">

        {/* HEADER */}
        <div className="locality-details-header">
          <p className="step-label">STEP 3 OF 5</p>

          <h1>Where is your property?</h1>

          <p>
            Add the location details so tenants can easily find your property.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* STATE */}
          <div className="form-group">
            <label htmlFor="state">
              State <span>*</span>
            </label>

            <select
              id="state"
              name="state"
              value={form.state}
              onChange={handleChange}
            >
              <option value="">Select State</option>

              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Delhi">Delhi</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Ladakh">Ladakh</option>
            </select>
          </div>

          {/* CITY */}
          <div className="form-group">
            <label htmlFor="city">
              City <span>*</span>
            </label>

            <input
              id="city"
              type="text"
              name="city"
              placeholder="e.g. Bangalore"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          {/* LOCALITY */}
          <div className="form-group">
            <label htmlFor="locality">
              Locality / Area <span>*</span>
            </label>

            <input
              id="locality"
              type="text"
              name="locality"
              placeholder="e.g. Whitefield"
              value={form.locality}
              onChange={handleChange}
            />

            <small>
              Enter the neighbourhood, area or locality.
            </small>
          </div>

          {/* ADDRESS */}
          <div className="form-group">
            <label htmlFor="address">
              Property Address <span>*</span>
            </label>

            <textarea
              id="address"
              name="address"
              rows="4"
              placeholder="Enter the complete property address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          {/* PINCODE */}
          <div className="form-group">
            <label htmlFor="pincode">
              Pincode <span>*</span>
            </label>

            <input
              id="pincode"
              type="text"
              name="pincode"
              placeholder="6-digit pincode"
              value={form.pincode}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6);

                setForm((prev) => ({
                  ...prev,
                  pincode: value,
                }));
              }}
              maxLength="6"
            />
          </div>

          {/* MAP PLACEHOLDER */}
          <div className="map-section">
            <div className="map-placeholder">
              <div className="map-icon">📍</div>

              <h3>Property Location</h3>

              <p>
                We'll show your property location on the map here.
              </p>

              <button
                type="button"
                className="location-button"
                onClick={() =>
                  alert("Map location feature will be connected next.")
                }
              >
                📍 Use Location
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="form-actions">

            <button
              type="button"
              className="back-button"
              onClick={onBack}
            >
              ← Back
            </button>

            <button
              type="submit"
              className="next-button"
            >
              Continue →
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default LocalityDetailsForm;