import React, { useState, useRef } from "react";
import "./styles/AddUser.css";

const AddUser: React.FC = () => {
  const [status, setStatus] = useState<string>("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const body = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      date_of_birth: formData.get("date_of_birth"),
      nationality: formData.get("nationality"),
      phone_number: formData.get("phone_number"),
      address: formData.get("address"),
      email: formData.get("email"),
    };

    try {
      const response = await fetch("http://localhost:5001/add_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

if (!response.ok) {
  const errorData = await response.json();

  console.log("Error data:", errorData);

  let message = "Unknown error";

  // Case: FastAPI/Pydantic validation error → array of objects
  if (Array.isArray(errorData.detail) && errorData.detail.length > 0) {
    message = errorData.detail[0].msg;
  }
  // Case: `detail` is just a string
  else if (typeof errorData.detail === "string") {
    message = errorData.detail;
  }

  setStatus("Error: " + message);
  return;
}

      const data = await response.json();
      formRef.current.reset();
      console.log(data);
      setStatus("User added successfully!");
    } catch (err) {
      setStatus("Error submitting form.");
      console.error(err);
    }
  };

  return (
    <div className="add-user-container">
      <div className="form-card">
        <h2 className="title">Add User</h2>

        <form ref={formRef} onSubmit={handleSubmit} className="add-user-form">
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input id="first_name" name="first_name" type="text" placeholder="First Name" required />
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input id="last_name" name="last_name" type="text" placeholder="Last Name" required />
          </div>

          <div className="form-group">
            <label htmlFor="date_of_birth">Date of Birth</label>
            <input id="date_of_birth" name="date_of_birth" type="date" required />
          </div>

          <div className="form-group">
            <label htmlFor="nationality">Nationality</label>
            <input id="nationality" name="nationality" type="text" placeholder="Nationality" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone_number">Phone Number</label>
            <input id="phone_number" name="phone_number" type="tel" placeholder="Phone Number" required />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input id="address" name="address" type="text" placeholder="Address" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="Email" required />
          </div>

          <button type="submit" className="submit-button">Add User</button>
        </form>

        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
};

export default AddUser;
