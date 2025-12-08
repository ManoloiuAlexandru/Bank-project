import React from "react";
import { Link } from "react-router-dom"; // import Link for navigation
import "./styles/home.css";

const App: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <header className="sc-header">
        <div className="sc-container">
          <div className="sc-brand">
            <h1>SnekkCredit</h1>
            <small>Modern Digital Banking</small>
          </div>
          <nav className="sc-nav">
            <span>Personal</span>
            <span>Business</span>
            <span>Cards</span>
            <span>Support</span>
            <Link to="/contact" className="sc-nav-item">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="sc-hero">
        <h2>Banking that feels effortless.</h2>
        <p>
          Simple accounts, transparent rates, and industry-grade security —
          thoughtfully designed for everyday finance.
        </p>
        {/* Button to navigate to AddUser page */}
        <Link to="/add_user">
          <button className="sc-hero-button">Join Us</button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="sc-footer">
        © {new Date().getFullYear()} SnekkCredit. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
