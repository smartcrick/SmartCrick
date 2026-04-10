import React from "react";
import "../../css/Footer/Career.css";

const Career = () => {
  return (
    <div className="page-container career-page">
      <h1>Careers at SmartCrick</h1>
      <p>
        Join our team and be part of the future of cricket analytics. We're looking for passionate individuals to help us innovate and grow.
      </p>

      <section className="career-section">
        <h2>Open Positions</h2>
        <ul>
          <li>
            <strong>Frontend Developer:</strong> Work on React components, dashboards, and interactive data visualization.
          </li>
          <li>
            <strong>Backend Developer:</strong> Manage Django APIs, databases, and user authentication.
          </li>
          <li>
            <strong>Data Analyst:</strong> Analyze player performance data and generate actionable insights.
          </li>
          <li>
            <strong>UX/UI Designer:</strong> Design user-friendly interfaces and improve platform experience.
          </li>
        </ul>

        <h2>How to Apply</h2>
        <p>
          Send your resume and portfolio to <a href="mailto:careers@smartcrick.com">careers@smartcrick.com</a>. Include the position you are applying for in the subject line.
        </p>

        <h2>Why Work With Us</h2>
        <p>
          At SmartCrick, we value innovation, teamwork, and passion for cricket. You'll work in a collaborative environment where your ideas make an impact.
        </p>
      </section>
    </div>
  );
};

export default Career;
