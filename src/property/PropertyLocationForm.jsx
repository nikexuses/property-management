import { useEffect, useState } from "react";
import "./PropertyLocationForm.css";

function PropertyLocationForm({ data = {}, onNext, onBack }) {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState({
    state: data.state || "",
    district: data.district || "",
    city: data.city || "",
    locality: data.locality || "",
    street: data.street || "",
    building: data.building || "",
    houseNumber: data.houseNumber || "",
    pincode: data.pincode || "",
    latitude: data.latitude || "",
    longitude: data.longitude || "",
    displayAddress: data.displayAddress || "",
  });

  // ----------------------------------------------------
  // KEEP DATA WHEN GOING BACK / FORWARD
  // ----------------------------------------------------

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setLocation((previous) => ({
        ...previous,
        ...data,
      }));
    }
  }, [data]);

  // ----------------------------------------------------
  // SEARCH OPENSTREETMAP
  // ----------------------------------------------------

  useEffect(() => {
    if (search.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const url =
          `https://nominatim.openstreetmap.org/search?` +
          `q=${encodeURIComponent(search)}` +
          `&format=json` +
          `&addressdetails=1` +
          `&limit=8` +
          `&countrycodes=in`;

        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Location search failed");
        }

        const results = await response.json();

        setSuggestions(results);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Location search error:", error);
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  // ----------------------------------------------------
  // SELECT LOCATION
  // ----------------------------------------------------

  const selectLocation = (result) => {
    const address = result.address || {};

    console.log("SELECTED LOCATION:", result);
    console.log("ADDRESS DATA:", address);

    // Nominatim can use different keys depending on the place.
    const city =
      address.city ||
      address.town ||
      address.municipality ||
      address.village ||
      "";

    const district =
      address.state_district ||
      address.district ||
      address.county ||
      "";

    const locality =
      address.suburb ||
      address.neighbourhood ||
      address.quarter ||
      address.hamlet ||
      "";

    const street =
      address.road ||
      address.pedestrian ||
      address.footway ||
      "";

    const building =
      address.building ||
      "";

    const houseNumber =
      address.house_number ||
      "";

    const pincode =
      address.postcode ||
      "";

    const newLocation = {
      state: address.state || "",
      district,
      city,
      locality,
      street,
      building,
      houseNumber,
      pincode,
      latitude: result.lat || "",
      longitude: result.lon || "",
      displayAddress: result.display_name || "",
    };

    // IMPORTANT:
    // Put the selected address directly into the form.
    setLocation(newLocation);

    // Put selected location into search box.
    setSearch(result.display_name || "");

    // Close suggestions.
    setSuggestions([]);
  };

  // ----------------------------------------------------
  // MANUAL FIELD EDITING
  // ----------------------------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLocation((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ----------------------------------------------------
  // CONTINUE
  // ----------------------------------------------------

  const handleContinue = () => {
    if (!location.state.trim()) {
      alert("Please select or enter a state.");
      return;
    }

    if (!location.city.trim()) {
      alert("Please select or enter a city.");
      return;
    }

    if (!location.pincode.trim()) {
      alert("Please enter a pincode.");
      return;
    }

    console.log("LOCATION SAVED:", location);

    onNext(location);
  };

  return (
    <div className="location-page">
      <div className="location-container">

        {/* HEADER */}

        <div className="location-header">
          <h1>Property Location</h1>

          <p>
            Search for your property and select the exact location.
          </p>
        </div>

        {/* SEARCH */}

        <div className="search-section">

          <label>
            Search Property Location
          </label>

          <div className="search-wrapper">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Start typing city, area, street or building..."
              autoComplete="off"
            />

            {loading && (
              <div className="search-loading">
                Searching...
              </div>
            )}

            {/* SUGGESTIONS */}

            {suggestions.length > 0 && (
              <div className="location-suggestions">

                {suggestions.map((result, index) => (
                  <button
                    type="button"
                    className="location-suggestion"
                    key={`${result.place_id}-${index}`}
                    onClick={() => selectLocation(result)}
                  >

                    <div className="suggestion-icon">
                      📍
                    </div>

                    <div className="suggestion-content">

                      <div className="suggestion-title">
                        {result.name ||
                          result.address?.suburb ||
                          result.address?.city ||
                          result.address?.town ||
                          "Location"}
                      </div>

                      <div className="suggestion-address">
                        {result.display_name}
                      </div>

                    </div>

                  </button>
                ))}

              </div>
            )}

          </div>

          <div className="search-help">
            Start typing something like{" "}
            <strong>Koramangala</strong>,{" "}
            <strong>80 Feet Road</strong>,{" "}
            <strong>Coimbatore</strong>, or{" "}
            <strong>Prestige Towers</strong>.
          </div>

        </div>

        {/* ADDRESS DETAILS */}

        <div className="address-section">

          <h2>
            Address Details
          </h2>

          <p>
            These details are automatically filled from the
            selected location. You can edit them if needed.
          </p>

          {/* FORM GRID */}

          <div className="address-grid">

            {/* STATE */}

            <div className="field">

              <label>
                State <span>*</span>
              </label>

              <input
                type="text"
                name="state"
                value={location.state}
                onChange={handleChange}
                placeholder="e.g. Karnataka"
              />

            </div>

            {/* DISTRICT */}

            <div className="field">

              <label>
                District
              </label>

              <input
                type="text"
                name="district"
                value={location.district}
                onChange={handleChange}
                placeholder="e.g. Bengaluru Urban"
              />

            </div>

            {/* CITY */}

            <div className="field">

              <label>
                City <span>*</span>
              </label>

              <input
                type="text"
                name="city"
                value={location.city}
                onChange={handleChange}
                placeholder="e.g. Bengaluru"
              />

            </div>

            {/* LOCALITY */}

            <div className="field">

              <label>
                Locality / Area
              </label>

              <input
                type="text"
                name="locality"
                value={location.locality}
                onChange={handleChange}
                placeholder="e.g. Koramangala"
              />

            </div>

            {/* STREET */}

            <div className="field">

              <label>
                Street / Road
              </label>

              <input
                type="text"
                name="street"
                value={location.street}
                onChange={handleChange}
                placeholder="e.g. 80 Feet Road"
              />

            </div>

            {/* BUILDING */}

            <div className="field">

              <label>
                Building / Apartment
              </label>

              <input
                type="text"
                name="building"
                value={location.building}
                onChange={handleChange}
                placeholder="e.g. Prestige Towers"
              />

            </div>

            {/* HOUSE NUMBER */}

            <div className="field">

              <label>
                House / Flat Number
              </label>

              <input
                type="text"
                name="houseNumber"
                value={location.houseNumber}
                onChange={handleChange}
                placeholder="e.g. Flat 402"
              />

            </div>

            {/* PINCODE */}

            <div className="field">

              <label>
                Pincode <span>*</span>
              </label>

              <input
                type="text"
                name="pincode"
                value={location.pincode}
                onChange={handleChange}
                placeholder="e.g. 560001"
                maxLength="6"
              />

            </div>

          </div>

        </div>

        {/* SELECTED LOCATION INFO */}

        {location.displayAddress && (
          <div className="selected-location">

            <div className="selected-location-icon">
              ✓
            </div>

            <div>
              <strong>
                Location selected
              </strong>

              <p>
                {location.displayAddress}
              </p>
            </div>

          </div>
        )}

        {/* BUTTONS */}

        <div className="location-buttons">

          <button
            type="button"
            className="back-button"
            onClick={onBack}
          >
            ← Back
          </button>

          <button
            type="button"
            className="continue-button"
            onClick={handleContinue}
          >
            Continue →
          </button>

        </div>

        <div className="osm-credit">
          Location data © OpenStreetMap contributors
        </div>

      </div>
    </div>
  );
}

export default PropertyLocationForm;