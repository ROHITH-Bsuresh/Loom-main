import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar
import '../../styles/Home.css';
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="homepage">
      

      {/* Hero Section */}
      <motion.header 
        className="hero"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Textile Bobbin
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Superior manufacturing is the key to SMT Shuttle Industries quality.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="btn btn-primary" onClick={() => navigate("/about")}>
              Read more
            </button>
            <button className="btn btn-secondary" onClick={() => navigate("/contact")}>
              Contact us
            </button>
          </motion.div>
        </div>
        
        <motion.div 
          className="hero-image"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img src="/user/home/1.jpg" alt="SMT Brand" />
        </motion.div>
      </motion.header>

      {/* Why Choose Us */}
      <section className="why-choose" id="why-choose">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="section-title">Why Choose SMT</h2>
            <p className="section-description">
              We are Professional. We resource, train, speak, mentor, and encourage
              business leaders and professionals to be effective in the workplace.
            </p>
          </motion.div>
          
          <div className="features">
            {[
              {
                title: "Quality Assurance",
                description: "We ensure the highest quality standards in all our products.",
                icon: "quality-icon"
              },
              {
                title: "Innovative Solutions",
                description: "We provide cutting-edge solutions for the textile industry.",
                icon: "innovation-icon"
              },
              {
                title: "Customer Support",
                description: "24/7 customer support to address all your concerns.",
                icon: "support-icon"
              }
            ].map((feature, index) => (
              <motion.div 
                className="feature-card"
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
                transition={{ delay: index * 0.2 }}
              >
                <div className={`feature-icon ${feature.icon}`}></div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products" id="products">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="section-title">Our Products</h2>
          </motion.div>
          
          <div className="product-list">
            {[
              {
                image: "user//product/1.jpg",
                title: "Textile Weaving Shuttle",
                description: "Offering you a complete choice of products..."
              },
              {
                image: "user//product/2.jpg",
                title: "Loom Picker",
                description: "Providing the best range of colored Loom Pickers..."
              },
              {
                image: "user//product/3.jpg",
                title: "PU Buffer",
                description: "Our product range includes a wide range of Colored PU Buffers..."
              }
            ].map((product, index) => (
              <motion.div 
                className="product-card"
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
                transition={{ delay: index * 0.2 }}
              >
                <div className="product-image">
                  <img src={product.image || "/placeholder.svg"} alt={product.title} />
                </div>
                <div className="product-content">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <button className="btn btn-outline" onClick={() => navigate("/products")}>
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="section-title">What Our Clients Say</h2>
          </motion.div>
          
          <div className="testimonial-list">
            {[
              {
                quote: "SMT Shuttle Industries has been a reliable partner for our textile needs. Their products are top-notch!",
                author: "Client A",
                company: "Textile Corp"
              },
              {
                quote: "Excellent customer service and high-quality products. Highly recommended!",
                author: "Client B",
                company: "Fabric Industries"
              }
            ].map((testimonial, index) => (
              <motion.div 
                className="testimonial-card"
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUp}
                transition={{ delay: index * 0.2 }}
              >
                <div className="quote-icon"></div>
                <p>{testimonial.quote}</p>
                <div className="testimonial-author">
                  <h4>{testimonial.author}</h4>
                  <span>{testimonial.company}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2>Ready to elevate your textile manufacturing?</h2>
            <p>Contact us today to discuss how we can help your business.</p>
            <button className="btn btn-primary" onClick={() => navigate("/contact")}>
              Get in Touch
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h3>SMT Shuttle Industries</h3>
              <p>Superior manufacturing is our promise.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Quick Links</h4>
                <ul>
                    <li><span onClick={() => navigate("/home")}>Home</span></li>
                    <li><span onClick={() => navigate("/about")}>About</span></li>
                    <li><span onClick={() => navigate("/products")}>Products</span></li>
                    <li><span onClick={() => navigate("/contact")}>Contact</span></li>
                </ul>

              </div>
              <div className="footer-column">
                <h4>Products</h4>
                <ul>
                  <li><a href="#" onClick={() => navigate("/products")}>Textile Weaving Shuttle</a></li>
                  <li><a href="#" onClick={() => navigate("/products")}>Loom Picker</a></li>
                  <li><a href="#" onClick={() => navigate("/products")}>PU Buffer</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Contact</h4>
                <ul>
                  <li>Email: ssnallasamy@gmail.com</li>
                  <li>Phone: +1 234 567 890</li>
                  <li>Address: 6/1 Kovai main road ,Pallagoundan Palayam ,Tiruppur-638056</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} SMT Shuttle Industries. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
