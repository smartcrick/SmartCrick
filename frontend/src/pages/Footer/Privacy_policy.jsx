import React from "react";
import "../../css/Footer/Privacy_policy.css";

const Privacy_policy = () => {
  return (
    <div className="page-container privacy-page">
      <h1>Privacy Policy</h1>
      <p>
        At SmartCrick, your privacy is our priority. We are committed to protecting your personal information and ensuring transparency in how we collect, use, and store data.
      </p>

      <section className="privacy-section">
        <h2>Information We Collect</h2>
        <p>
          We collect personal details you provide when registering and performance data you input to analyze your cricket statistics.
        </p>

        <h2>How We Use Information</h2>
        <p>
          Your data helps us provide analytics, recommendations, and improve your user experience. We do not share your information with third parties without your consent.
        </p>

        <h2>Data Security</h2>
        <p>
          We implement industry-standard security measures to safeguard your data against unauthorized access or disclosure.
        </p>

        <h2>Cookies</h2>
        <p>
          Our platform may use cookies to improve functionality and performance. Cookies do not contain personal information unless you provide it voluntarily.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update our privacy policy from time to time. All changes will be reflected on this page with the date updated.
        </p>
      </section>
    </div>
  );
};

export default Privacy_policy;
