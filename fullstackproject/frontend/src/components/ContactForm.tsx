import React from "react";

const ContactForm: React.FC = () => {
  return (
    <form className="contact-form" action="http://localhost:5001/contactForm" method="post">
      <h2>Send us a message</h2>
      <label>Name</label>
      <input type="text" placeholder="Your Name" name="requester_name" />
      <label>Email</label>
      <input type="email" placeholder="Your Email" name="email"/>
      <label>Message</label>
      <textarea placeholder="Your Message" name="message"></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
