import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PropertyDetails.css";

function PropertyDetails({ onComplete }) {
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    title: "",
    type: "Apartment",
    rent: "",
    deposit: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    furnishing: "Unfurnished",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProperty((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the property details
    localStorage.setItem(
      "propertyDetails",
      JSON.stringify(property)
    );

    /*
      If PropertyDetails is being used inside PropertyFlow,
      tell PropertyFlow to move to the next step.
    */
    if (onComplete) {
      onComplete(property);
      return;
    }

    /*
      Fallback if this component is opened directly.
    */
    navigate("/property-photos");
  };

  return (
    <div className="property-page">
      <div className="property-container">

        {/* HEADER */}

        <div className="property-header">
          <h1>Add Your Property</h1>

          <p>
            Tell us a little about your property
          </p>
        </div>


        <form onSubmit={handleSubmit}>

          {/* BASIC INFORMATION */}

          <div className="form-section">

            <h2>Basic Information</h2>

            <label>
              Property Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="e.g. Spacious 2BHK Apartment"
              value={property.title}
              onChange={handleChange}
              required
            />


            <label>
              Property Type
            </label>

            <select
              name="type"
              value={property.type}
              onChange={handleChange}
              required
            >
              <option value="Apartment">
                Apartment
              </option>

              <option value="House">
                House
              </option>

              <option value="Villa">
                Villa
              </option>

              <option value="PG">
                PG
              </option>

              <option value="Studio">
                Studio
              </option>
            </select>

          </div>


          {/* PRICING */}

          <div className="form-section">

            <h2>Pricing</h2>

            <div className="two-column">

              <div>

                <label>
                  Monthly Rent (₹)
                </label>

                <input
                  type="number"
                  name="rent"
                  placeholder="25000"
                  value={property.rent}
                  onChange={handleChange}
                  min="0"
                  required
                />

              </div>


              <div>

                <label>
                  Security Deposit (₹)
                </label>

                <input
                  type="number"
                  name="deposit"
                  placeholder="100000"
                  value={property.deposit}
                  onChange={handleChange}
                  min="0"
                  required
                />

              </div>

            </div>

          </div>


          {/* PROPERTY DETAILS */}

          <div className="form-section">

            <h2>Property Details</h2>


            <div className="two-column">

              {/* BEDROOMS */}

              <div>

                <label>
                  Bedrooms
                </label>

                <select
                  name="bedrooms"
                  value={property.bedrooms}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select
                  </option>

                  <option value="1">
                    1 BHK
                  </option>

                  <option value="2">
                    2 BHK
                  </option>

                  <option value="3">
                    3 BHK
                  </option>

                  <option value="4">
                    4 BHK
                  </option>

                  <option value="5+">
                    5+ BHK
                  </option>

                </select>

              </div>


              {/* BATHROOMS */}

              <div>

                <label>
                  Bathrooms
                </label>

                <select
                  name="bathrooms"
                  value={property.bathrooms}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select
                  </option>

                  <option value="1">
                    1
                  </option>

                  <option value="2">
                    2
                  </option>

                  <option value="3">
                    3
                  </option>

                  <option value="4+">
                    4+
                  </option>

                </select>

              </div>

            </div>


            {/* AREA */}

            <label>
              Built-up Area (sq ft)
            </label>

            <input
              type="number"
              name="area"
              placeholder="1200"
              value={property.area}
              onChange={handleChange}
              min="1"
              required
            />


            {/* FURNISHING */}

            <label>
              Furnishing
            </label>

            <select
              name="furnishing"
              value={property.furnishing}
              onChange={handleChange}
              required
            >

              <option value="Unfurnished">
                Unfurnished
              </option>

              <option value="Semi-furnished">
                Semi-furnished
              </option>

              <option value="Fully Furnished">
                Fully Furnished
              </option>

            </select>

          </div>


          {/* BUTTON */}

          <div className="form-buttons">

            <button
              type="button"
              className="back-button"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>


            <button
              type="submit"
              className="continue-button"
            >
              Continue →
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default PropertyDetails;