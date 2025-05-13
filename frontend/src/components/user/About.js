import React from "react";
import Navbar from "./Navbar"; // Import Navbar
import "../../styles/About.css"; // Import the CSS

const AboutPage = () => {
  return (
    <div className="about-page-container">
      

      {/* Logo Section */}
      <div className="about-logo-section">
        <img src="user/home/1.jpg" alt="SMT Shuttle Industries Logo" className="about-logo-image" />
      </div>

      {/* Hero Section */}
      <header className="about-hero-section">
        <h1 className="about-hero-heading">About SMT Power PArts Dealer</h1>
        <p className="about-hero-text">
          Superior  is the key to our quality.
        </p>
      </header>

      {/* Company Overview Section */}
      <section className="about-company-section">
        <h2 className="about-section-title">Company Overview</h2>
        <p className="about-section-description">
          Established in 1994, SMT is the power parts Dealer in
           Textile Weaving Shuttles. We are pioneers in the weaving shuttle
          manufacturing process and also produce other textile machinery parts
          such as textile bobbins, loom pickers, and PU buffers.
        </p>
        <div className="about-overview-grid">
          <div className="about-overview-card">
            <h3 className="about-card-title">Our Sales Unit</h3>
            <p className="about-card-text">
              We operate a state-of-the-art tie up  unit equipped with the
              latest technology. This allows us to get supply from high-quality products
              that meet global standards.We make direct contact with manufacture and supply at affordable rate.
            </p>
          </div>
          <div className="about-overview-card">
            <h3 className="about-card-title">Product Quality</h3>
            <p className="about-card-text">
              We use only the finest raw materials and advanced technology to
              manufacture our products. Our quality control team ensures that every
              product meets the highest standards before reaching our customers.
            </p>
          </div>
          <div className="about-overview-card">
            <h3 className="about-card-title">Customer-Centric Approach</h3>
            <p className="about-card-text">
              Our aim is to  works closely with customers to
              understand their specific requirements. We customize our products to
              meet their exact needs, ensuring complete satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-why-choose-section">
        <h2 className="about-section-title">Why Choose SMT?</h2>
        <div className="about-features-grid">
          <div className="about-feature-card">
            <h3 className="about-card-title">Greater connection</h3>
            <p className="about-card-text">
              Has well Establishedconnection over India with leaing company for supply of product.
              Also,We have our own manufacturing unit equipped with the latest machinery
              and technology, ensuring high-quality production.
            </p>
          </div>
          <div className="about-feature-card">
            <h3 className="about-card-title">Retail and Wholesale</h3>
            <p className="about-card-text">
              We cater to both retail and wholesale customers, providing flexible
              solutions to meet their needs.
            </p>
          </div>
          <div className="about-feature-card">
            <h3 className="about-card-title">Global Standards</h3>
            <p className="about-card-text">
              Our products are manufactured in compliance with global standards,
              making them suitable for international markets.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="about-footer-section">
        <p className="about-footer-text">&copy; 2025 SMT Shuttle Industries. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
