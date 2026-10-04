import { useNavigate } from "react-router-dom";
import PropertyMap from "../components/PropertyMap";

function PropertyPreview() {
  const navigate = useNavigate();

  const propertyData = JSON.parse(
    localStorage.getItem("propertyData") || "{}"
  );

  const photos = JSON.parse(
    localStorage.getItem("propertyPhotos") || "[]"
  );

  const amenities = JSON.parse(
    localStorage.getItem("propertyAmenities") || "[]"
  );

  const propertyLocation = JSON.parse(
    localStorage.getItem("propertyLocation") || "null"
  );

  const publishProperty = () => {
    // Create a unique property ID
    const propertyId =
      "PROP-" +
      Date.now() +
      "-" +
      Math.floor(Math.random() * 1000);

    // Create the complete listing
    const listing = {
      id: propertyId,

      // Property information
      propertyData: propertyData,

      // Photos
      photos: photos,

      // Amenities
      amenities: amenities,

      // Location
      location: propertyLocation,

      // Listing status
      status: "published",

      // Date published
      publishedAt: new Date().toISOString(),
    };

    // Get existing published properties
    const existingProperties = JSON.parse(
      localStorage.getItem("publishedProperties") || "[]"
    );

    // Add the new property
    existingProperties.push(listing);

    // Save everything
    localStorage.setItem(
      "publishedProperties",
      JSON.stringify(existingProperties)
    );

    // Save the currently published property too
    localStorage.setItem(
      "currentPublishedProperty",
      JSON.stringify(listing)
    );

    // Go to owner dashboard
    navigate("/owner-dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}

        <h1
          style={{
            marginBottom: "8px",
            color: "#222",
          }}
        >
          Property Preview
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          This is how your property listing will appear.
        </p>

        {/* Photos */}

        {photos.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                photos.length === 1
                  ? "1fr"
                  : "repeat(2, 1fr)",
              gap: "10px",
              marginBottom: "30px",
            }}
          >
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Property ${index + 1}`}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            ))}
          </div>
        )}

        {/* Property Information */}

        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ marginBottom: "15px" }}>
            {propertyData.bhk || "Property"}{" "}
            {propertyData.propertyType
              ? ` ${propertyData.propertyType}`
              : ""}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "15px",
            }}
          >
            <InfoCard
              title="Monthly Rent"
              value={
                propertyData.rent
                  ? `₹${Number(
                      propertyData.rent
                    ).toLocaleString("en-IN")}`
                  : "Not specified"
              }
            />

            <InfoCard
              title="Security Deposit"
              value={
                propertyData.deposit
                  ? `₹${Number(
                      propertyData.deposit
                    ).toLocaleString("en-IN")}`
                  : "Not specified"
              }
            />

            <InfoCard
              title="BHK"
              value={propertyData.bhk || "Not specified"}
            />

            <InfoCard
              title="Property Type"
              value={
                propertyData.propertyType ||
                "Not specified"
              }
            />
          </div>
        </div>

        {/* Address */}

        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: "25px",
            marginBottom: "30px",
          }}
        >
          <h2>📍 Location</h2>

          <p
            style={{
              fontSize: "16px",
              color: "#444",
              lineHeight: "1.6",
            }}
          >
            {propertyData.address || "Address not provided"}
            <br />

            {propertyData.city && propertyData.state
              ? `${propertyData.city}, ${propertyData.state}`
              : ""}

            {propertyData.pincode
              ? ` - ${propertyData.pincode}`
              : ""}
          </p>

          {/* MAP */}

          {propertyLocation ? (
            <div style={{ marginTop: "20px" }}>
              <PropertyMap
                initialLocation={[
                  propertyLocation.latitude,
                  propertyLocation.longitude,
                ]}
                readOnly={true}
              />
            </div>
          ) : (
            <div
              style={{
                padding: "30px",
                background: "#f3f4f6",
                borderRadius: "10px",
                textAlign: "center",
                color: "#666",
              }}
            >
              Property location has not been selected.
            </div>
          )}
        </div>

        {/* Amenities */}

        {amenities.length > 0 && (
          <div
            style={{
              borderTop: "1px solid #eee",
              paddingTop: "25px",
              marginBottom: "30px",
            }}
          >
            <h2>Amenities</h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              {amenities.map((amenity, index) => (
                <span
                  key={index}
                  style={{
                    padding: "9px 14px",
                    background: "#f3f4f6",
                    borderRadius: "20px",
                    fontSize: "14px",
                  }}
                >
                  ✓ {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}

        {propertyData.description && (
          <div
            style={{
              borderTop: "1px solid #eee",
              paddingTop: "25px",
              marginBottom: "30px",
            }}
          >
            <h2>About the Property</h2>

            <p
              style={{
                color: "#555",
                lineHeight: "1.7",
              }}
            >
              {propertyData.description}
            </p>
          </div>
        )}

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "30px",
          }}
        >
          {/* Edit */}

          <button
            onClick={() => navigate(-1)}
            style={{
              flex: 1,
              padding: "14px",
              border: "1px solid #d1d5db",
              background: "#fff",
              borderRadius: "8px",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            ← Edit Property
          </button>

          {/* Publish */}

          <button
            onClick={publishProperty}
            style={{
              flex: 1,
              padding: "14px",
              border: "none",
              background: "#111827",
              color: "#fff",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Publish Property
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div
      style={{
        padding: "18px",
        background: "#f8fafc",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          color: "#777",
          marginBottom: "6px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "16px",
          fontWeight: "600",
          color: "#222",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default PropertyPreview;