import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    requester_name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("requester_name", formData.requester_name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("message", formData.message);

    const res = await fetch("http://localhost:5001/contactForm", {
      method: "POST",
      body: formDataToSend,
    });

    const data = await res.json();
    console.log("Response:", data);
    alert(data.result);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Send us a message</h2>

      <label>Name</label>
      <input
        type="text"
        placeholder="Your Name"
        name="requester_name"
        value={formData.requester_name}
        onChange={handleChange}
      />

      <label>Email</label>
      <input
        type="email"
        placeholder="Your Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label>Message</label>
      <textarea
        placeholder="Your Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
