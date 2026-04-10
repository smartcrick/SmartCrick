import React from "react";
import "../../css/Footer/Terms.css";

const Terms = () => {
  return (
    <div className="page-container terms-page">
      <h1>Terms of Service</h1>
      <p>
        Welcome to SmartCrick! By accessing and using our platform, you agree to comply with these Terms of Service. Please read them carefully.
      </p>

      <section className="terms-section">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using SmartCrick, you acknowledge and agree to these terms. If you do not agree, please refrain from using our services.
        </p>

        <h2>2. User Accounts</h2>
        <p>
          Users must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your login credentials.
        </p>

        <h2>3. Use of the Platform</h2>
        <p>
          SmartCrick is intended for personal and team cricket analytics. You may not use the platform for any unlawful or unauthorized purpose.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          All content, designs, and analytics tools are owned by SmartCrick. You may not copy, reproduce, or distribute our content without explicit permission.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          SmartCrick is provided "as-is". We are not responsible for any errors in analytics or decisions based on our platform. Use it at your own risk.
        </p>

        <h2>6. Modifications</h2>
        <p>
          We reserve the right to update or modify these terms at any time. Changes will be posted on this page with the latest effective date.
        </p>
      </section>
    </div>
  );
};

export default Terms;
