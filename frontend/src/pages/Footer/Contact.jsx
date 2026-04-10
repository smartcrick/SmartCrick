import React from "react";
import "../../css/Footer/Contact.css";

const Contact = () => {
  return (
    <div className="page-container contact-page">
      <h1>Contact Us</h1>
      <p>
        Have questions, feedback, or need assistance? Reach out to our team and we'll get back to you as soon as possible.
      </p>

      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" placeholder="Name" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Gmail" />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" rows="5" placeholder="Write your message here..." />
        </div>

        <button type="submit" className="primary-btn">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
