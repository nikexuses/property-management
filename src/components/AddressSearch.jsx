import { useEffect, useState } from "react";

function AddressSearch({ initialValue = "", onSelect }) {
  const [query, setQuery] = useState(initialValue);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const url =
          "https://nominatim.openstreetmap.org/search?" +
          new URLSearchParams({
            q: query,
            format: "json",
            addressdetails: "1",
            limit: "8",
            countrycodes: "in",
          });

        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Address search failed");
        }

        const data = await response.json();

        setResults(data);
        setShowResults(true);
      } catch (error) {
        console.error("Nominatim error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (result) => {
    const address = result.address || {};

    const locationData = {
      fullAddress: result.display_name,

      city:
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        address.county ||
        "",

      state: address.state || "",

      country: address.country || "India",

      pincode: address.postcode || "",

      latitude: Number(result.lat),

      longitude: Number(result.lon),
    };

    setQuery(result.display_name);
    setShowResults(false);

    if (onSelect) {
      onSelect(locationData);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <input
        type="text"
        value={query}
        placeholder="e.g. Koramangala, Bengaluru"
        onChange={(e) => {
          setQuery(e.target.value);
          setShowResults(true);
        }}
        onFocus={() => {
          if (results.length > 0) {
            setShowResults(true);
          }
        }}
        style={{
          width: "100%",
          height: "64px",
          padding: "0 20px",
          border: "1px solid #d9dfd9",
          borderRadius: "14px",
          fontSize: "16px",
          boxSizing: "border-box",
          outline: "none",
          background: "#fff",
        }}
      />

      {loading && (
        <div
          style={{
            position: "absolute",
            right: "20px",
            top: "23px",
            fontSize: "13px",
            color: "#888",
          }}
        >
          Searching...
        </div>
      )}

      {showResults && results.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "72px",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          {results.map((result, index) => (
            <button
              key={result.place_id}
              type="button"
              onClick={() => handleSelect(result)}
              style={{
                width: "100%",
                padding: "15px 18px",
                textAlign: "left",
                border: "none",
                borderBottom:
                  index < results.length - 1
                    ? "1px solid #eeeeee"
                    : "none",
                background: "#fff",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f6f8f6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
              }}
            >
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#202620",
                  marginBottom: "5px",
                }}
              >
                📍{" "}
                {result.name ||
                  result.address?.city ||
                  result.address?.town ||
                  result.address?.village ||
                  "Location"}
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "#777",
                  lineHeight: "1.5",
                }}
              >
                {result.display_name}
              </div>
            </button>
          ))}
        </div>
      )}

      {showResults &&
        !loading &&
        query.length >= 2 &&
        results.length === 0 && (
          <div
            style={{
              position: "absolute",
              top: "72px",
              left: 0,
              right: 0,
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "18px",
              zIndex: 9999,
              color: "#777",
              fontSize: "14px",
            }}
          >
            No locations found.
          </div>
        )}
    </div>
  );
}

export default AddressSearch;