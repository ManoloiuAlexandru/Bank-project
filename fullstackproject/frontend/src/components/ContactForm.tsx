import React from "react";

const ContactForm: React.FC = () => {
  return (
    <form className="contact-form">
      <h2>Send us a message</h2>
      <label>Name</label>
      <input type="text" placeholder="Your Name" />
      <label>Email</label>
      <input type="email" placeholder="Your Email" />
      <label>Message</label>
      <textarea placeholder="Your Message"></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
