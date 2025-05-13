import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "../../styles/Navbar.css"; // Import the CSS

const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="logo">SMT</div>
        <ul className="nav-links">
          <li>
            <Link to="/home">Home</Link> {/* Link to Home Page */}
          </li>
          <li>
            <Link to="/about">About us</Link> {/* Link to About Page */}
          </li>
          <li>
            <Link to="/products">Product</Link> {/* Link to Products Page */}
          </li>
          
          <li>
            <Link to="/contact">Contact</Link> {/* Link to Contact Page */}
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;
