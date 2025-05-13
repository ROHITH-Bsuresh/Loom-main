"use client";

import { useState } from "react";
import Navbar from "./Navbar"; // Import Navbar

import emailjs from "@emailjs/browser";

import { FaLinkedin, FaFacebook, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "../../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // Use environment variables
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_email: "ssnallasamy@gmail.com", // Replace with your email
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
          setIsSubmitting(false);
        },
        (error) => {
          console.error("FAILED...", error);
          setStatus("error");
          setIsSubmitting(false);
        }
      );
  };

  return (
    <div className="contact-container">



      
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <div className="header-underline"></div>
        <p>We're here to help and answer any questions you might have</p>
      </div>

      <div className="contact-wrapper">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-header">
              <h2>Contact Information</h2>
              <p>Reach out to us using any of the following methods</p>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="info-content">
                <h3>Our Location</h3>
                <p>6/1 Kovai Main Road Pallagoundan Palayam Tiruppur Dt 638056</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <FaEnvelope />
              </div>
              <div className="info-content">
                <h3>Email Us</h3>
                <p>ssnallasamy@gmail.com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <FaPhoneAlt />
              </div>
              <div className="info-content">
                <h3>Call Us</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <FaClock />
              </div>
              <div className="info-content">
                <h3>Working Hours</h3>
                <p>Monday - Friday, 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <div className="form-card">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className={`submit-button ${isSubmitting ? "submitting" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <div className="status-message success">
                  <p>Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}

              {status === "error" && (
                <div className="status-message error">
                  <p>Failed to send message. Please try again or contact us directly.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="map-section">
        <h2>Find Us Here</h2>
        <div className="map-container">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.987456784982!2d77.3210123!3d11.1078765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96e87dffd7dbb%3A0xa0b3d5f2d40e5f80!2s6%2F1%20Kovai%20Main%20Road%2C%20Pallagoundan%20Palayam%2C%20Tiruppur%20Dt%20638056!5e0!3m2!1sen!2sin!4v1709500000000"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;