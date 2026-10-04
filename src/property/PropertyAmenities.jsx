import { useState } from "react";
import "./PropertyAmenities.css";

const amenityGroups = [
  {
    title: "Essential",
    description: "Important facilities available at your property",
    items: [
      { name: "24/7 Water Supply", icon: "💧" },
      { name: "Power Backup", icon: "⚡" },
      { name: "Parking", icon: "🚗" },
      { name: "Lift", icon: "🛗" },
      { name: "Security", icon: "🛡️" },
      { name: "CCTV", icon: "📹" },
      { name: "Wi-Fi", icon: "📶" },
    ],
  },
  {
    title: "Home Features",
    description: "Features and appliances inside the property",
    items: [
      { name: "Air Conditioning", icon: "❄️" },
      { name: "Balcony", icon: "🌇" },
      { name: "Fully Furnished", icon: "🛋️" },
      { name: "Semi Furnished", icon: "🪑" },
      { name: "Modular Kitchen", icon: "🍳" },
      { name: "Geyser", icon: "🚿" },
      { name: "Refrigerator", icon: "🧊" },
      { name: "Washing Machine", icon: "🧺" },
      { name: "TV", icon: "📺" },
      { name: "Gas Stove", icon: "🔥" },
    ],
  },
  {
    title: "Lifestyle",
    description: "Recreation and lifestyle facilities",
    items: [
      { name: "Gym", icon: "🏋️" },
      { name: "Swimming Pool", icon: "🏊" },
      { name: "Garden", icon: "🌳" },
      { name: "Clubhouse", icon: "🏢" },
      { name: "Children's Play Area", icon: "🛝" },
      { name: "Jogging Track", icon: "🏃" },
      { name: "Sports Area", icon: "⚽" },
    ],
  },
  {
    title: "Other",
    description: "Additional services and facilities",
    items: [
      { name: "Pet Friendly", icon: "🐕" },
      { name: "Visitor Parking", icon: "🅿️" },
      { name: "Fire Safety", icon: "🚒" },
      { name: "Intercom", icon: "☎️" },
      { name: "Rainwater Harvesting", icon: "🌧️" },
      { name: "Maintenance Staff", icon: "🔧" },
      { name: "Housekeeping", icon: "🧹" },
    ],
  },
];

function PropertyAmenities({ selected = [], onNext, onBack }) {
  const [selectedAmenities, setSelectedAmenities] =
    useState(selected || []);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((previous) => {
      if (previous.includes(amenity)) {
        return previous.filter((item) => item !== amenity);
      }

      return [...previous, amenity];
    });
  };

  const handleContinue = () => {
    onNext(selectedAmenities);
  };

  return (
    <div className="amenities-page">
      <div className="amenities-container">

        {/* PAGE HEADER */}
        <div className="amenities-header">
          <div>
            <div className="step-label">STEP 4 OF 5</div>

            <h1>What does your property offer?</h1>

            <p>
              Select all the amenities and facilities available at your
              property.
            </p>
          </div>

          <div className="selected-counter">
            <span>{selectedAmenities.length}</span>
            <small>selected</small>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="progress-wrapper">
          <div className="progress-track">
            <div className="progress-fill"></div>
          </div>

          <div className="progress-text">
            <span>Property details</span>
            <span>Location</span>
            <span className="active">Amenities</span>
            <span>Photos</span>
          </div>
        </div>

        {/* AMENITY GROUPS */}
        <div className="amenities-content">
          {amenityGroups.map((group) => (
            <section
              className="amenity-section"
              key={group.title}
            >
              <div className="section-heading">
                <div>
                  <h2>{group.title}</h2>

                  <p>{group.description}</p>
                </div>
              </div>

              <div className="amenity-grid">
                {group.items.map((item) => {
                  const isSelected = selectedAmenities.includes(
                    item.name
                  );

                  return (
                    <button
                      type="button"
                      key={item.name}
                      className={`amenity-card ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() =>
                        toggleAmenity(item.name)
                      }
                    >
                      <div className="amenity-icon">
                        {item.icon}
                      </div>

                      <div className="amenity-name">
                        {item.name}
                      </div>

                      <div
                        className={`amenity-check ${
                          isSelected ? "checked" : ""
                        }`}
                      >
                        {isSelected ? "✓" : ""}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="amenities-footer">
          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            <span>←</span>
            Back
          </button>

          <div className="footer-right">
            <div className="selection-message">
              {selectedAmenities.length === 0
                ? "Select at least one amenity"
                : `${selectedAmenities.length} ${
                    selectedAmenities.length === 1
                      ? "amenity"
                      : "amenities"
                  } selected`}
            </div>

            <button
              type="button"
              className="continue-button"
              onClick={handleContinue}
            >
              Continue
              <span>→</span>
            </button>
          </div>
        </div>

        <div className="footer-note">
          You can always update these amenities later from your
          property dashboard.
        </div>

      </div>
    </div>
  );
}

export default PropertyAmenities;