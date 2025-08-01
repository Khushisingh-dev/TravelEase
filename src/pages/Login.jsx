import React, { useState, useEffect } from 'react';
import './Login.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    setStatus('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'This field is required';
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) newErrors.email = 'Enter a valid email';
    }

    if (!formData.password.trim()) newErrors.password = 'This field is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('');
      return;
    }

    setStatus('Login successful!');
    setFormData({ email: '', password: '' });
    setErrors({});
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <section className="login-section" data-aos="fade-in">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <p className="login-intro">Access your account below.</p>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              aria-describedby="emailError"
            />
            {errors.email && <p className="error-msg" id="emailError">{errors.email}</p>}
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              aria-describedby="passwordError"
            />
            {errors.password && <p className="error-msg" id="passwordError">{errors.password}</p>}
          </label>

          <button type="submit" className="login-btn">
            Login
          </button>

          {status && <p className="status-msg">{status}</p>}
        </form>

        <p className="switch-link">
          Don’t have an account? <Link to="/sign-up">Sign up here</Link>
        </p>
      </div>
      <img src="login.svg" alt="login" />
    </section>
  );
};

export default Login;
