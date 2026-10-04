import { Routes, Route, Link } from "react-router-dom";

import PropertyDetails from "./pages/PropertyDetails";
import PropertyPhotos from "./property/PropertyPhotos";
import PropertyPreview from "./pages/PropertyPreview";
import SubmissionSuccess from "./pages/SubmissionSuccess";
import OwnerDashboard from "./pages/OwnerDashboard";
import PropertyFlow from "./property/PropertyFlow";

import "./App.css";

function Home() {
  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">

          <div className="logo">
            <div className="logo-mark">H</div>
            <span>
              Haven<span>Care</span>
            </span>
          </div>

          <div className="nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#owners">For owners</a>
          </div>

          <div className="nav-actions">
            <button className="login-btn">
              Login
            </button>

            <Link
              to="/manage-property"
              className="nav-cta"
            >
              Manage my property
            </Link>
          </div>

        </div>
      </nav>


      {/* HERO */}
      <main>

        <section className="hero">
          <div className="hero-container">

            <div className="hero-content">

              <div className="eyebrow">
                <span className="eyebrow-dot"></span>
                Property management, simplified
              </div>

              <h1>
                Your property.
                <br />
                <span>
                  Our responsibility.
                </span>
              </h1>

              <p className="hero-description">
                From finding verified tenants to collecting
                rent, handling repairs and managing
                inspections — we take care of your property
                from end to end.
              </p>

              <Link
                to="/manage-property"
                className="cta-button"
              >
                Manage my property
                <span>→</span>
              </Link>

            </div>

          </div>
        </section>


        {/* CTA */}
        <section
          className="cta-section"
          id="owners"
        >
          <div className="cta-container">

            <div>

              <div className="eyebrow">
                Ready to stop managing?
              </div>

              <h2>
                Your property should
                <br />
                <span>
                  work for you.
                </span>
              </h2>

              <p>
                Tell us about your property and we'll show
                you how we can manage it.
              </p>

            </div>

            <Link
              to="/manage-property"
              className="cta-button"
            >
              Manage my property
              <span>→</span>
            </Link>

          </div>
        </section>

      </main>


      {/* FOOTER */}
      <footer>
        <div className="footer-container">

          <div className="logo">
            <div className="logo-mark">
              H
            </div>

            <span>
              Haven<span>Care</span>
            </span>
          </div>

          <p>
            Property management, without the headache.
          </p>

          <span className="copyright">
            © 2026 HavenCare
          </span>

        </div>
      </footer>

    </div>
  );
}


function App() {
  return (
    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={<Home />}
      />


      {/* MAIN PROPERTY FLOW */}
      {/* Manage my property now starts at Step 1 */}
      <Route
        path="/manage-property"
        element={<PropertyFlow />}
      />

      <Route
        path="/property-flow"
        element={<PropertyFlow />}
      />


      {/* OLD PROPERTY DETAILS PAGE */}
      <Route
        path="/property-details"
        element={<PropertyDetails />}
      />


      {/* PROPERTY PHOTOS */}
      <Route
        path="/property-photos"
        element={<PropertyPhotos />}
      />

      <Route
        path="/add-photos"
        element={<PropertyPhotos />}
      />


      {/* PROPERTY PREVIEW */}
      <Route
        path="/property-preview"
        element={<PropertyPreview />}
      />


      {/* SUBMISSION SUCCESS */}
      <Route
        path="/submission-success"
        element={<SubmissionSuccess />}
      />


      {/* OWNER DASHBOARD */}
      <Route
        path="/owner-dashboard"
        element={<OwnerDashboard />}
      />


      {/* FALLBACK */}
      <Route
        path="*"
        element={
          <div
            style={{
              padding: "50px",
              fontFamily: "Arial",
            }}
          >
            <h1>Page not found</h1>

            <Link to="/">
              Go back home
            </Link>
          </div>
        }
      />

    </Routes>
  );
}

export default App;