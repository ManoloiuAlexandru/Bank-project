import React from "react";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import "./styles/contact.css";

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Contact SnekkCredit</h1>
        <p>We’re here to help you 24/7 with your banking needs.</p>
      </header>

      <section className="contact-info-section">
        <ContactInfo />
      </section>

      <section className="contact-form-section">
        <ContactForm />
      </section>
    </div>
  );
};

export default Contact;
