import React from "react";
import "../../css/Footer/About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <h1>About SmartCrick</h1>
        <p>
          SmartCrick is a modern cricket analytics platform designed to help
          players, teams, and coaches make smarter, data-driven decisions.
        </p>
      </section>

      {/* MISSION */}
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to empower cricketers at every level by transforming
          raw match data into meaningful insights. We believe performance
          improves when players truly understand their strengths and areas for
          growth.
        </p>
      </section>

      {/* WHAT WE DO */}
      <section className="about-section light">
        <h2>What we do?</h2>
        <div className="about-grid">
          <div className="about-card">
            <h3>Performance Tracking</h3>
            <p>
              Track batting, bowling, and fielding performance with accurate
              statistics and match history.
            </p>
          </div>

          <div className="about-card">
            <h3>Smart Analytics</h3>
            <p>
              Visualize trends, consistency, and improvement areas using
              advanced analytics and charts.
            </p>
          </div>

          <div className="about-card">
            <h3>Personalized Insights</h3>
            <p>
              Get tailored recommendations to help you improve your game and
              reach your goals faster.
            </p>
          </div>
        </div>
      </section>

      {/* WHY SMARTCRICK */}
      <section className="about-section">
        <h2>Why SmartCrick?</h2>
        <ul className="about-list">
          <li>✔ Easy-to-use dashboard for players and teams</li>
          <li>✔ Data-driven insights, not guesswork</li>
          <li>✔ Designed for beginners to professionals</li>
          <li>✔ Continuous improvement through performance tracking</li>
        </ul>
      </section>

      {/* CLOSING */}
      <section className="about-cta">
        <h2>Built for Cricketers. Powered by Data.</h2>
        <p>
          Whether you’re an aspiring player or a competitive athlete,
          SmartCrick helps you understand your game better — one match at a
          time.
        </p>
      </section>
    </div>
  );
};

export default About;
