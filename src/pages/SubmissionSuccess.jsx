import { useNavigate } from "react-router-dom";

function SubmissionSuccess() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f8f5",
        color: "#18231d",
        fontFamily: "Arial, Helvetica, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "680px",
          background: "#ffffff",
          border: "1px solid #e1e6e1",
          borderRadius: "20px",
          padding: "60px 50px",
          textAlign: "center",
          boxShadow: "0 18px 45px rgba(28,40,32,0.06)",
          boxSizing: "border-box",
        }}
      >
        {/* SUCCESS ICON */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "#e3ece4",
            color: "#52665a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 25px",
            fontSize: "34px",
            fontWeight: "700",
          }}
        >
          ✓
        </div>

        {/* SMALL LABEL */}
        <div
          style={{
            color: "#718a78",
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "15px",
          }}
        >
          PROPERTY SUBMITTED
        </div>

        {/* MAIN HEADING */}
        <h1
          style={{
            fontSize: "46px",
            lineHeight: "1.05",
            letterSpacing: "-2px",
            margin: "0 0 20px",
          }}
        >
          Your property is
          <br />
          under review.
        </h1>

        {/* DESCRIPTION */}
        <p
          style={{
            color: "#78827c",
            fontSize: "17px",
            lineHeight: "1.7",
            margin: "0 auto",
            maxWidth: "520px",
          }}
        >
          Thank you for submitting your property to HavenCare.
          <br />
          Our team will review your property details and get back
          to you shortly.
        </p>

        {/* DIVIDER */}
        <div
          style={{
            height: "1px",
            background: "#e1e6e1",
            margin: "35px 0",
          }}
        />

        {/* WHAT HAPPENS NEXT */}
        <div
          style={{
            textAlign: "left",
            marginBottom: "35px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              margin: "0 0 20px",
            }}
          >
            What happens next?
          </h2>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                minWidth: "28px",
                borderRadius: "50%",
                background: "#e3ece4",
                color: "#52665a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              1
            </div>

            <div>
              <strong>Our team reviews your property</strong>
              <p
                style={{
                  color: "#78827c",
                  margin: "5px 0 0",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                We will verify the information you provided.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                minWidth: "28px",
                borderRadius: "50%",
                background: "#e3ece4",
                color: "#52665a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              2
            </div>

            <div>
              <strong>We'll get back to you</strong>
              <p
                style={{
                  color: "#78827c",
                  margin: "5px 0 0",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                We'll contact you using the phone number or email
                you provided.
              </p>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            height: "58px",
            border: "none",
            borderRadius: "8px",
            background: "#1c2a22",
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Back to HavenCare
          <span style={{ marginLeft: "12px" }}>→</span>
        </button>
      </div>
    </div>
  );
}

export default SubmissionSuccess;