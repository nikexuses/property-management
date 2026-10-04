import { useNavigate } from "react-router-dom";
import "./PropertySubmitted.css";

function PropertySubmitted() {
  const navigate = useNavigate();

  return (
    <div className="submitted-page">
      <div className="submitted-card">

        <div className="submitted-icon">
          ✓
        </div>

        <div className="submitted-label">
          REQUEST RECEIVED
        </div>

        <h1>
          Property submitted.
        </h1>

        <p>
          Thank you for submitting your property details.
          Our property management team will review your information
          and get back to you shortly.
        </p>

        <div className="submitted-info">
          <div>
            <span>01</span>
            <strong>We'll review your property</strong>
            <p>
              Our team will verify the details you've provided.
            </p>
          </div>

          <div>
            <span>02</span>
            <strong>We'll contact you</strong>
            <p>
              We'll reach out using the contact details you provided.
            </p>
          </div>
        </div>

        <button
          className="submitted-home"
          onClick={() => navigate("/")}
        >
          ← Back to home
        </button>

      </div>
    </div>
  );
}

export default PropertySubmitted;