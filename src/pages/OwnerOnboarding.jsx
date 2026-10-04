import { useState } from "react";
import PropertyFlow from "../property/PropertyFlow";

function OwnerOnboarding() {
  const [started, setStarted] = useState(false);

  // Once the owner starts, open the complete property flow
  if (started) {
    return <PropertyFlow />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f8f5",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      {/* ================= LEFT ================= */}
      <div
        style={{
          padding: "80px 70px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "3px",
            color: "#7c8d7d",
            marginBottom: "35px",
          }}
        >
          PROPERTY ONBOARDING
        </div>

        <h1
          style={{
            fontSize: "72px",
            lineHeight: "0.98",
            margin: 0,
            color: "#17201a",
            fontWeight: "700",
          }}
        >
          Tell us about
          <br />
          <span style={{ color: "#829384" }}>
            your property.
          </span>
        </h1>

        <p
          style={{
            fontSize: "20px",
            lineHeight: "1.7",
            color: "#788279",
            maxWidth: "560px",
            marginTop: "35px",
          }}
        >
          List your property with HavenCare and let us
          help you manage everything from tenants to
          maintenance.
        </p>

        <div
          style={{
            marginTop: "45px",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}
        >
          <Feature text="Verified tenant management" />
          <Feature text="Rent collection & reporting" />
          <Feature text="Repairs & maintenance" />
          <Feature text="Regular property inspections" />
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div
        style={{
          background: "#fff",
          padding: "60px 65px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "520px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#829384",
              fontWeight: "700",
              letterSpacing: "1px",
              marginBottom: "10px",
            }}
          >
            GET STARTED
          </div>

          <h2
            style={{
              fontSize: "40px",
              margin: 0,
              color: "#17201a",
            }}
          >
            Let's list your property.
          </h2>

          <p
            style={{
              color: "#8b938c",
              fontSize: "17px",
              lineHeight: "1.7",
              marginTop: "15px",
            }}
          >
            We'll take you through a few simple steps
            to create your property listing.
          </p>

          {/* ================= STEPS ================= */}
          <div
            style={{
              marginTop: "35px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Step
              number="01"
              title="Property details"
              text="Tell us about your property."
            />

            <Step
              number="02"
              title="Rental details"
              text="Set your rent and rental preferences."
            />

            <Step
              number="03"
              title="Location"
              text="Pinpoint your property precisely."
            />

            <Step
              number="04"
              title="Amenities"
              text="Tell tenants what your property offers."
            />

            <Step
              number="05"
              title="Photos & videos"
              text="Show your property to potential tenants."
            />

            <Step
              number="06"
              title="Preview & publish"
              text="Review everything before publishing."
            />
          </div>

          {/* ================= INFO ================= */}
          <div
            style={{
              marginTop: "35px",
              padding: "18px",
              background: "#f0f5ef",
              borderRadius: "12px",
              color: "#657168",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            ✓ You can save your progress and continue later.
            <br />
            ✓ You can edit everything before publishing.
          </div>

          {/* ================= START ================= */}
          <button
            type="button"
            onClick={() => setStarted(true)}
            style={{
              width: "100%",
              marginTop: "30px",
              height: "60px",
              border: "none",
              borderRadius: "12px",
              background: "#17201a",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Start Property Listing →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= FEATURE ================= */

function Feature({ text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        color: "#657168",
        fontSize: "16px",
      }}
    >
      <span
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          background: "#e8eee8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#7c8d7d",
          flexShrink: 0,
        }}
      >
        ✓
      </span>

      {text}
    </div>
  );
}

/* ================= STEP ================= */

function Step({ number, title, text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "18px",
        padding: "15px",
        border: "1px solid #e6e9e5",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          background: "#f0f5ef",
          color: "#829384",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "700",
          flexShrink: 0,
        }}
      >
        {number}
      </div>

      <div>
        <div
          style={{
            fontSize: "15px",
            fontWeight: "700",
            color: "#303730",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "13px",
            color: "#929a93",
            marginTop: "3px",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

export default OwnerOnboarding;