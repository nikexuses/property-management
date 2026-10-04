import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Moves the map when location changes
function MapController({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 16, {
        duration: 1.2,
      });
    }
  }, [position, map]);

  return null;
}

// Handles clicking on map
function LocationSelector({
  position,
  setPosition,
  onLocationSelect,
  readOnly,
}) {
  useMapEvents({
    click(e) {
      if (readOnly) return;

      const newPosition = [
        e.latlng.lat,
        e.latlng.lng,
      ];

      setPosition(newPosition);

      if (onLocationSelect) {
        onLocationSelect({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
      }
    },
  });

  if (!position) {
    return null;
  }

  return (
    <Marker position={position}>
      <Popup>
        <strong>Property location</strong>
        <br />
        This is where your property is located.
      </Popup>
    </Marker>
  );
}

function PropertyMap({
  onLocationSelect,
  initialLocation = null,
  readOnly = false,
}) {
  const defaultPosition = [12.9716, 77.5946];

  const startingPosition =
    initialLocation || defaultPosition;

  const [position, setPosition] =
    useState(startingPosition);

  // Update marker when address search selects a location
  useEffect(() => {
    if (initialLocation) {
      setPosition(initialLocation);
    }
  }, [initialLocation]);

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid #d9dfd9",
        }}
      >
        <MapContainer
          center={startingPosition}
          zoom={14}
          scrollWheelZoom={true}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController position={position} />

          <LocationSelector
            position={position}
            setPosition={setPosition}
            onLocationSelect={onLocationSelect}
            readOnly={readOnly}
          />
        </MapContainer>
      </div>

      {!readOnly && (
        <p
          style={{
            marginTop: "10px",
            color: "#777",
            fontSize: "14px",
          }}
        >
          Search for your property above, or click the map
          to adjust the exact location.
        </p>
      )}

      {readOnly && (
        <p
          style={{
            marginTop: "10px",
            color: "#777",
            fontSize: "14px",
          }}
        >
          📍 Property location
        </p>
      )}
    </div>
  );
}

export default PropertyMap;