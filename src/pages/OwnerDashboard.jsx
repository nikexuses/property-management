import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OwnerDashboard() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);

  // Load published properties
  useEffect(() => {
    const savedProperties = JSON.parse(
      localStorage.getItem("publishedProperties") || "[]"
    );

    setProperties(savedProperties);
  }, []);

  // Delete property
  const deleteProperty = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    const updatedProperties = properties.filter(
      (property) => property.id !== id
    );

    localStorage.setItem(
      "publishedProperties",
      JSON.stringify(updatedProperties)
    );

    setProperties(updatedProperties);
  };

  // Unpublish property
  const unpublishProperty = (id) => {
    const updatedProperties = properties.map((property) =>
      property.id === id
        ? {
            ...property,
            status: "draft",
          }
        : property
    );

    localStorage.setItem(
      "publishedProperties",
      JSON.stringify(updatedProperties)
    );

    setProperties(updatedProperties);
  };

  // Format price
  const formatPrice = (price) => {
    if (!price) return "Not specified";

    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "Unknown";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Header */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#111827",
                fontSize: "32px",
              }}
            >
              Owner Dashboard
            </h1>

            <p
              style={{
                marginTop: "8px",
                color: "#6b7280",
              }}
            >
              Manage your properties and listings.
            </p>
          </div>

          <button
            onClick={() => navigate("/owner-onboarding")}
            style={{
              padding: "13px 20px",
              border: "none",
              background: "#111827",
              color: "#fff",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            + Add Property
          </button>
        </div>

        {/* Stats */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <StatCard
            title="Total Properties"
            value={properties.length}
          />

          <StatCard
            title="Published"
            value={
              properties.filter(
                (property) => property.status === "published"
              ).length
            }
          />

          <StatCard
            title="Drafts"
            value={
              properties.filter(
                (property) => property.status === "draft"
              ).length
            }
          />
        </div>

        {/* Properties */}

        <div>
          <h2
            style={{
              color: "#111827",
              marginBottom: "18px",
            }}
          >
            My Properties
          </h2>

          {properties.length === 0 ? (
            <EmptyState navigate={navigate} />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {properties.map((property) => {
                const data = property.propertyData || {};
                const photos = property.photos || [];

                return (
                  <div
                    key={property.id}
                    style={{
                      background: "#fff",
                      borderRadius: "14px",
                      overflow: "hidden",
                      boxShadow:
                        "0 4px 18px rgba(0,0,0,0.07)",
                    }}
                  >
                    {/* Property Image */}

                    <div
                      style={{
                        height: "210px",
                        background: "#e5e7eb",
                        position: "relative",
                      }}
                    >
                      {photos.length > 0 ? (
                        <img
                          src={photos[0]}
                          alt="Property"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#6b7280",
                          }}
                        >
                          No Photo
                        </div>
                      )}

                      {/* Status */}

                      <span
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          padding: "6px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                          background:
                            property.status === "published"
                              ? "#dcfce7"
                              : "#fef3c7",
                          color:
                            property.status === "published"
                              ? "#166534"
                              : "#92400e",
                        }}
                      >
                        {property.status === "published"
                          ? "● Published"
                          : "● Draft"}
                      </span>
                    </div>

                    {/* Property Details */}

                    <div
                      style={{
                        padding: "20px",
                      }}
                    >
                      <h3
                        style={{
                          margin: "0 0 8px",
                          color: "#111827",
                          fontSize: "20px",
                        }}
                      >
                        {data.bhk || "Property"}{" "}
                        {data.propertyType || ""}
                      </h3>

                      <p
                        style={{
                          margin: "0 0 15px",
                          color: "#6b7280",
                          fontSize: "14px",
                        }}
                      >
                        📍{" "}
                        {data.city ||
                          "Location not specified"}
                        {data.state
                          ? `, ${data.state}`
                          : ""}
                      </p>

                      {/* Price */}

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "15px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#9ca3af",
                            }}
                          >
                            Monthly Rent
                          </div>

                          <div
                            style={{
                              fontSize: "18px",
                              fontWeight: "700",
                              color: "#111827",
                            }}
                          >
                            {formatPrice(data.rent)}
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                color: "#6b7280",
                              }}
                            >
                              {" "}
                              / month
                            </span>
                          </div>
                        </div>

                        <div
                          style={{
                            textAlign: "right",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#9ca3af",
                            }}
                          >
                            Deposit
                          </div>

                          <div
                            style={{
                              fontSize: "15px",
                              fontWeight: "600",
                              color: "#374151",
                            }}
                          >
                            {formatPrice(data.deposit)}
                          </div>
                        </div>
                      </div>

                      {/* Date */}

                      <p
                        style={{
                          fontSize: "12px",
                          color: "#9ca3af",
                          marginBottom: "15px",
                        }}
                      >
                        Published{" "}
                        {formatDate(property.publishedAt)}
                      </p>

                      {/* Buttons */}

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "1fr 1fr",
                          gap: "8px",
                        }}
                      >
                        <button
                          onClick={() => {
                            localStorage.setItem(
                              "currentPublishedProperty",
                              JSON.stringify(property)
                            );

                            navigate("/property-preview");
                          }}
                          style={{
                            padding: "10px",
                            border:
                              "1px solid #d1d5db",
                            background: "#fff",
                            borderRadius: "7px",
                            cursor: "pointer",
                            fontWeight: "500",
                          }}
                        >
                          View
                        </button>

                        <button
                          onClick={() =>
                            unpublishProperty(property.id)
                          }
                          style={{
                            padding: "10px",
                            border:
                              "1px solid #d1d5db",
                            background: "#fff",
                            borderRadius: "7px",
                            cursor: "pointer",
                            fontWeight: "500",
                          }}
                        >
                          {property.status === "published"
                            ? "Unpublish"
                            : "Publish"}
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          deleteProperty(property.id)
                        }
                        style={{
                          width: "100%",
                          marginTop: "8px",
                          padding: "10px",
                          border: "1px solid #fecaca",
                          background: "#fff",
                          color: "#dc2626",
                          borderRadius: "7px",
                          cursor: "pointer",
                          fontWeight: "500",
                        }}
                      >
                        Delete Property
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- */
/* STAT CARD */
/* -------------------------------- */

function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "22px",
        borderRadius: "12px",
        boxShadow:
          "0 3px 15px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          color: "#6b7280",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "28px",
          fontWeight: "700",
          color: "#111827",
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* -------------------------------- */
/* EMPTY STATE */
/* -------------------------------- */

function EmptyState({ navigate }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "14px",
        padding: "60px 30px",
        textAlign: "center",
        boxShadow:
          "0 4px 18px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          fontSize: "50px",
          marginBottom: "15px",
        }}
      >
        🏠
      </div>

      <h3
        style={{
          marginBottom: "8px",
          color: "#111827",
        }}
      >
        No properties yet
      </h3>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "20px",
        }}
      >
        Add your first property to start receiving
        rental inquiries.
      </p>

      <button
        onClick={() => navigate("/owner-onboarding")}
        style={{
          padding: "12px 20px",
          border: "none",
          background: "#111827",
          color: "#fff",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Add Your First Property
      </button>
    </div>
  );
}

export default OwnerDashboard;