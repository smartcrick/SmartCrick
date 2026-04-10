import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/home.css";

const STEPS = [
  {
    title: "Complete Your Profile",
    text: "Provide accurate personal and performance information to enable proper analysis."
  },
  {
    title: "Track & Analyze Performance",
    text: "View performance metrics, trends, and analytical insights in real time."
  },
  {
    title: "Get Smart Recommendations",
    text: "Receive personalized suggestions to improve performance and achieve goals."
  }
];

const StepsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % STEPS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % STEPS.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? STEPS.length - 1 : prev - 1));

  return (
    <div className="steps-carousel">
      <button className="carousel-btn left" onClick={prevSlide}>‹</button>

      <div className="step-card-wrapper">
        {STEPS.map((step, index) => (
          <div
            key={index}
            className="step-card"
            style={{
              transform: `translateX(${100 * (index - currentIndex)}%)`,
            }}
          >
            <h3 className="steps-headings">{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>

      <button className="carousel-btn right" onClick={nextSlide}>›</button>

      <div className="carousel-dots">
        {STEPS.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? "dot active" : "dot"}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="Home">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to SmartCrick</h1>
          <p>
            Your ultimate cricket analytics platform. Track your games, analyze performance, and make smarter decisions.
          </p>
          <button className="primary-btn" onClick={() => navigate("/dashboard")} type="button">
            Get Started
          </button>
        </div>
        <div className="hero-image">
          <img src="dashboard1.png" alt="Cricket Analytics" />
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="info-section">
        <h2>How SmartCrick Helps You</h2>
        <p>Analyze your cricket performance, keep track of stats, and visualize data with ease.</p>
      </section>

      {/* STEPS SECTION */}
      <section className="steps">
        <h2 className="carousel-head">Get Started in 3 Easy Steps</h2>
        <StepsCarousel />
      </section>

      {/* BENEFITS SECTION */}
      <section className="benefits">
        <h2>Benefits of Using SmartCrick</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Detailed Analytics</h3>
            <p>Visualize player performance and team stats with interactive charts.</p>
                      <img src="dashboard2.jpg" alt="Cricket Analytics" />

          </div>

          <div className="benefit-card">
            <h3>Team Insights</h3>
            <p>Manage team stats and collaborate effectively with teammates.</p>
                      <img src="dashboard3.jpg" alt="Cricket Analytics" />

          </div>

          <div className="benefit-card">
            <h3>Improve Skills</h3>
            <p>Track your progress over time and focus on areas of improvement.</p>
                      <img src="dashboard4.jpg" alt="Cricket Analytics" />

          </div>
        </div>
      </section>

    
    </div>
  );
};

export default Home;
