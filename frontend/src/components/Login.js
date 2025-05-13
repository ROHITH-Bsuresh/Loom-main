import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("userRole", "admin"); // or "customer" based on preference
    navigate("/admin-home"); // Navigate directly to home
  };

  const continueAsUser = () => {
    localStorage.setItem("userRole", "customer");
    navigate("/home");
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img src="/login.jpg" alt="Login Illustration" className="login-image" />
      </div>
      <div className="login-right">
        <div className="form-container">
          <h2>Power Loom Shop Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email:</label>
              <input type="email" required />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input type="password" required />
            </div>
            <button type="submit">Login</button>
          </form>
          <button onClick={continueAsUser} className="continue-button">
            Continue as Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
