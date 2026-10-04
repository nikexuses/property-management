import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PropertyDetails from "../pages/PropertyDetails";
import RentalDetailsForm from "./RentalDetailsForm";
import PropertyLocationForm from "./PropertyLocationForm";
import PropertyAmenities from "./PropertyAmenities";
import PropertyPhotos from "./PropertyPhotos";

function PropertyFlow() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const [property, setProperty] = useState({
    propertyDetails: {},
    rentalDetails: {},
    location: {},
    amenities: [],
    photos: [],
  });

  // ---------------------------------------------
  // UPDATE PROPERTY DATA
  // ---------------------------------------------
  const updateProperty = (section, data) => {
    setProperty((previous) => ({
      ...previous,
      [section]: data,
    }));
  };

  // ---------------------------------------------
  // NEXT / BACK
  // ---------------------------------------------
  const nextStep = () => {
    setStep((previous) => Math.min(previous + 1, 4));
  };

  const previousStep = () => {
    setStep((previous) => Math.max(previous - 1, 0));
  };

  // ---------------------------------------------
  // FINISH LISTING
  // ---------------------------------------------
  const finishListing = (photos) => {
    const finalProperty = {
      ...property,
      photos: photos,
    };

    // Save complete property
    localStorage.setItem(
      "propertyData",
      JSON.stringify(finalProperty)
    );

    // Save photos separately
    localStorage.setItem(
      "propertyPhotos",
      JSON.stringify(photos)
    );

    console.log("FINAL PROPERTY:", finalProperty);

    // GO TO PROPERTY PREVIEW
    navigate("/property-preview");
  };

  // ---------------------------------------------
  // RENDER
  // ---------------------------------------------
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f6f7",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#17201a",
            fontSize: "24px",
          }}
        >
          List Your Property
        </h2>

        <div
          style={{
            color: "#657168",
            fontWeight: "600",
          }}
        >
          Step {step + 1} of 5
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "0 25px 60px",
        }}
      >
        {/* STEP 1 */}
        {step === 0 && (
          <PropertyDetails
            onComplete={(data) => {
              updateProperty("propertyDetails", data);
              nextStep();
            }}
          />
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <RentalDetailsForm
            data={property.rentalDetails}
            onNext={(data) => {
              updateProperty("rentalDetails", data);
              nextStep();
            }}
            onBack={previousStep}
          />
        )}

        {/* STEP 3 */}
        {step === 2 && (
          <PropertyLocationForm
            data={property.location}
            onNext={(data) => {
              updateProperty("location", data);
              nextStep();
            }}
            onBack={previousStep}
          />
        )}

        {/* STEP 4 */}
        {step === 3 && (
          <PropertyAmenities
            selected={property.amenities}
            onNext={(data) => {
              updateProperty("amenities", data);
              nextStep();
            }}
            onBack={previousStep}
          />
        )}

        {/* STEP 5 */}
        {step === 4 && (
          <PropertyPhotos
            propertyData={property}
            onBack={previousStep}
            onComplete={(photos) => {
              finishListing(photos);
            }}
          />
        )}
      </main>
    </div>
  );
}

export default PropertyFlow;